/**
 * Test script to simulate production where SendGrid module might not be available
 */

// Mock the require for SendGrid to simulate module not found
const Module = require('module');
const originalRequire = Module.prototype.require;
Module.prototype.require = function(id) {
    if (id === '@sendgrid/mail') {
        const error = new Error("Cannot find module '@sendgrid/mail'");
        error.code = 'MODULE_NOT_FOUND';
        throw error;
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

// Add the missing log methods
mockContext.log.error = (...args) => console.error('🚨 [ERROR]', ...args);
mockContext.log.warn = (...args) => console.warn('⚠️  [WARN]', ...args);
mockContext.log.info = (...args) => console.info('ℹ️  [INFO]', ...args);

// Mock request object for testing
const mockRequest = {
    method: 'POST',
    body: {
        name: 'Test User Without SendGrid',
        email: 'test@example.com',
        subject: 'Test Without SendGrid Module',
        message: 'This tests the fallback behavior when SendGrid module is not available.'
    },
    headers: {
        'user-agent': 'Contact Form Test Script (No SendGrid)',
        'x-forwarded-for': '127.0.0.1'
    }
};

async function testContactFunctionWithoutSendGrid() {
    console.log('🧪 Testing Contact Function WITHOUT SendGrid Module...\n');
    
    try {
        console.log('📨 Sending test contact form submission...');
        await contactFunction(mockContext, mockRequest);
        
        console.log('\n✅ Function executed successfully without SendGrid!');
        console.log('📋 Response Status:', mockContext.res?.status);
        console.log('📋 Response Body:', JSON.stringify(mockContext.res?.body, null, 2));
        
    } catch (error) {
        console.error('\n❌ Function failed:', error);
        console.error('Stack trace:', error.stack);
    }
}

// Run the test
testContactFunctionWithoutSendGrid();
