/**
 * Contact form submission endpoint
 * Handles contact form submissions with validation and email sending
 */

// Safely require SendGrid with fallback
let sgMail;
try {
    sgMail = require('@sendgrid/mail');
} catch (error) {
    console.warn('SendGrid module not available:', error.message);
    sgMail = null;
}

module.exports = async function (context, req) {
    // Log the incoming request for debugging
    context.log('Contact endpoint hit:', {
        method: req.method,
        url: req.url,
        headers: req.headers,
        hasBody: !!req.body
    });

    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        context.res = {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            }
        };
        return;
    }

    // Handle GET requests for debugging
    if (req.method === 'GET') {
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                message: 'Contact endpoint is working! Use POST method to submit contact forms.',
                allowedMethods: ['GET', 'POST', 'OPTIONS'],
                timestamp: new Date().toISOString()
            }
        };
        return;
    }

    // Only allow POST method for form submissions
    if (req.method !== 'POST') {
        context.res = {
            status: 405,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Allow': 'GET, POST, OPTIONS'
            },
            body: {
                success: false,
                message: `Method ${req.method} not allowed. Use POST to submit contact forms.`,
                allowedMethods: ['GET', 'POST', 'OPTIONS'],
                timestamp: new Date().toISOString()
            }
        };
        return;
    }

    try {
        context.log('Contact form submission received');
        
        // Parse request body
        const data = req.body;
        
        // Validate required fields
        const { name, email, subject, message } = data;
        
        if (!name || !email || !subject || !message) {
            context.res = {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: {
                    success: false,
                    message: 'All fields are required: name, email, subject, message',
                    timestamp: new Date().toISOString()
                }
            };
            return;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            context.res = {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: {
                    success: false,
                    message: 'Please provide a valid email address',
                    timestamp: new Date().toISOString()
                }
            };
            return;
        }
        
        // Log the contact form data (in production, you'd send this via email or store in database)
        context.log('Contact form data:', {
            name: name,
            email: email,
            subject: subject,
            messageLength: message.length,
            timestamp: new Date().toISOString(),
            userAgent: req.headers['user-agent'] || 'unknown',
            ip: req.headers['x-forwarded-for'] || 'unknown'
        });

        // Send email notification using SendGrid
        try {
            await sendEmailNotification(context, { name, email, subject, message });
        } catch (emailError) {
            context.log.error('Email sending failed, but continuing with response:', emailError);
            // Don't fail the entire request if email fails
        }
        
        const response = {
            success: true,
            message: 'Thank you for your message! I will get back to you soon.',
            timestamp: new Date().toISOString(),
            id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };

        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache'
            },
            body: response
        };
        
    } catch (error) {
        // Safely log error
        if (context.log && context.log.error) {
            context.log.error('Contact form submission failed:', error);
        } else {
            console.error('Contact form submission failed:', error);
        }
        
        // Ensure we always return a proper JSON response
        const errorResponse = {
            success: false,
            message: 'An error occurred while processing your message. Please try again later.',
            timestamp: new Date().toISOString(),
            error: error.message || 'Unknown error'
        };
        
        context.res = {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: errorResponse
        };
    }
    
    // Fallback: Ensure context.res is always set
    if (!context.res) {
        if (context.log && context.log.error) {
            context.log.error('No response was set, providing fallback response');
        } else {
            console.error('No response was set, providing fallback response');
        }
        context.res = {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                success: false,
                message: 'An unexpected error occurred',
                timestamp: new Date().toISOString()
            }
        };
    }
};

/**
 * Send email notification using SendGrid
 * @param {Object} context - Azure Function context
 * @param {Object} formData - Contact form data
 */
async function sendEmailNotification(context, formData) {
    try {
        const apiKey = process.env.SENDGRID_API_KEY;
        const fromEmail = process.env.FROM_EMAIL || 'noreply@pipush.com';
        const toEmail = process.env.TO_EMAIL || 'pushtech@pipush.com';

        // Check if SendGrid module is available
        if (!sgMail) {
            context.log.warn('SendGrid module not available - email will not be sent');
            context.log.info('Contact form data would be emailed to:', toEmail);
            context.log.info('Form submission details:', {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message.substring(0, 100) + '...'
            });
            return;
        }

        if (!apiKey) {
            context.log.warn('SendGrid API key not configured - email will not be sent');
            return;
        }

        // Set SendGrid API key
        sgMail.setApiKey(apiKey);

        // Create email content
        const emailContent = {
            to: toEmail,
            from: fromEmail,
            subject: `Portfolio Contact: ${formData.subject}`,
            text: `
New contact form submission from your portfolio website:

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Submitted at: ${new Date().toISOString()}
            `.trim(),
            html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
        New Contact Form Submission
    </h2>
    
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
    </div>
    
    <div style="margin: 20px 0;">
        <h3 style="color: #333;">Message:</h3>
        <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #0066cc; border-radius: 3px;">
            ${formData.message.replace(/\n/g, '<br>')}
        </div>
    </div>
    
    <hr style="border: none; height: 1px; background-color: #ddd; margin: 30px 0;">
    <p style="color: #666; font-size: 12px;">
        Submitted at: ${new Date().toISOString()}<br>
        From: Portfolio Website Contact Form
    </p>
</div>
            `.trim()
        };

        // Send email
        await sgMail.send(emailContent);
        context.log('Email notification sent successfully');

        // Send confirmation email to the user
        await sendConfirmationEmail(context, formData, fromEmail);
        
    } catch (error) {
        context.log.error('Failed to send email notification:', error);
        // Don't throw - we don't want email failure to break the contact form
    }
}

/**
 * Send confirmation email to the user
 * @param {Object} context - Azure Function context
 * @param {Object} formData - Contact form data
 * @param {string} fromEmail - From email address
 */
async function sendConfirmationEmail(context, formData, fromEmail) {
    try {
        // Check if SendGrid module is available
        if (!sgMail) {
            context.log.warn('SendGrid module not available - confirmation email will not be sent');
            return;
        }

        const confirmationEmail = {
            to: formData.email,
            from: fromEmail,
            subject: 'Thank you for contacting me!',
            text: `
Hi ${formData.name},

Thank you for reaching out through my portfolio website! I have received your message about "${formData.subject}" and will get back to you as soon as possible.

Your message:
${formData.message}

Best regards,
Jamie Pryce
            `.trim(),
            html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #0066cc;">Thank you for contacting me!</h2>
    
    <p>Hi ${formData.name},</p>
    
    <p>Thank you for reaching out through my portfolio website! I have received your message about "<strong>${formData.subject}</strong>" and will get back to you as soon as possible.</p>
    
    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Your message:</h3>
        <p style="margin-bottom: 0;">${formData.message.replace(/\n/g, '<br>')}</p>
    </div>
    
    <p>Best regards,<br>
    <strong>Jamie Pryce</strong></p>
    
    <hr style="border: none; height: 1px; background-color: #ddd; margin: 30px 0;">
    <p style="color: #666; font-size: 12px;">
        This is an automated confirmation email from my portfolio website.
    </p>
</div>
            `.trim()
        };

        await sgMail.send(confirmationEmail);
        context.log('Confirmation email sent to user');
        
    } catch (error) {
        context.log.error('Failed to send confirmation email:', error);
        // Don't throw - confirmation email failure shouldn't break the main flow
    }
}
