/**
 * Test script that mocks SendGrid to test contact function logic
 */

// Mock SendGrid module
const mockSendGrid = {
    setApiKey: (key) => {
        console.log('🔑 SendGrid API Key set:', key ? key.substring(0, 10) + '...' : 'Not provided');
    },
    send: async (emailData) => {
        console.log('📧 Email would be sent:');
        console.log('   To:', emailData.to);
        console.log('   From:', emailData.from);
        console.log('   Subject:', emailData.subject);
        console.log('   Text preview:', emailData.text.substring(0, 100) + '...');
        return { success: true };
    }
};

// Mock the require for SendGrid
const Module = require('module');
const originalRequire = Module.prototype.require;
Module.prototype.require = function(id) {
    if (id === '@sendgrid/mail') {
        return mockSendGrid;
    }
    return originalRequire.apply(this, arguments);
};

// Load environment variables from local.settings.json
const fs = require('fs');
const path = require('path');

try {
    const settingsPath = path.join(__dirname, 'local.settings.json');
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    
    // Set environment variables
    Object.keys(settings.Values).forEach(key => {
        process.env[key] = settings.Values[key];
    });
    
    console.log('📋 Environment variables loaded from local.settings.json');
} catch (error) {
    console.error('❌ Failed to load local.settings.json:', error.message);
}

// Now load and test the contact function
const contactFunction = require('./contact/index.js');

// Mock Azure Function context
const mockContext = {
    log: (...args) => console.log('📝 [LOG]', ...args),
    res: null
};

// Mock request object for testing
const mockRequest = {
    method: 'POST',
    body: {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Contact Form',
        message: 'This is a test message to verify the contact form functionality works correctly with email sending.'
    },
    headers: {
        'user-agent': 'Contact Form Test Script',
        'x-forwarded-for': '127.0.0.1'
    }
};

async function testContactFunction() {
    console.log('🧪 Testing Contact Function with Email Simulation...\n');
    
    // Display configuration
    console.log('🔧 Configuration:');
    console.log('   SendGrid API Key:', process.env.SENDGRID_API_KEY ? 'Configured ✅' : 'Missing ❌');
    console.log('   TO_EMAIL:', process.env.TO_EMAIL || 'Not set');
    console.log('   FROM_EMAIL:', process.env.FROM_EMAIL || 'Not set');
    console.log('');
    
    try {
        console.log('📨 Sending test contact form submission...');
        await contactFunction(mockContext, mockRequest);
        
        console.log('\n✅ Function executed successfully!');
        console.log('📋 Response Status:', mockContext.res?.status);
        console.log('📋 Response Body:', JSON.stringify(mockContext.res?.body, null, 2));
        
    } catch (error) {
        console.error('\n❌ Function failed:', error);
        console.error('Stack trace:', error.stack);
    }
}

// Run the test
testContactFunction();
