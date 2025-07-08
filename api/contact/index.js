const { app } = require('@azure/functions');

/**
 * Contact form submission endpoint
 * Handles contact form submissions with validation and logging
 */
app.http('contact', {
    methods: ['POST', 'OPTIONS'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        // Handle CORS preflight requests
        if (request.method === 'OPTIONS') {
            return {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Max-Age': '86400'
                }
            };
        }

        try {
            context.log('Contact form submission received');
            
            // Parse request body
            const body = await request.text();
            const data = JSON.parse(body);
            
            // Validate required fields
            const { name, email, subject, message } = data;
            
            if (!name || !email || !subject || !message) {
                return {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        success: false,
                        message: 'All fields are required: name, email, subject, message',
                        timestamp: new Date().toISOString()
                    })
                };
            }
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        success: false,
                        message: 'Please provide a valid email address',
                        timestamp: new Date().toISOString()
                    })
                };
            }
            
            // Log the contact form data (in production, you'd send this via email or store in database)
            context.log('Contact form data:', {
                name: name,
                email: email,
                subject: subject,
                messageLength: message.length,
                timestamp: new Date().toISOString(),
                userAgent: request.headers.get('user-agent') || 'unknown',
                ip: request.headers.get('x-forwarded-for') || 'unknown'
            });
            
            // In a real application, you would:
            // 1. Send an email notification
            // 2. Store the message in a database
            // 3. Send a confirmation email to the user
            // 4. Implement rate limiting
            // 5. Add spam protection
            
            const response = {
                success: true,
                message: 'Thank you for your message! I will get back to you soon.',
                timestamp: new Date().toISOString(),
                id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            };

            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache'
                },
                body: JSON.stringify(response)
            };
            
        } catch (error) {
            context.log.error('Contact form submission failed:', error);
            
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    success: false,
                    message: 'An error occurred while processing your message. Please try again later.',
                    timestamp: new Date().toISOString()
                })
            };
        }
    }
});
