/**
 * Simple test script to test the contact function locally
 */
const contactFunction = require('./contact/index.js');

// Mock Azure Function context
const mockContext = {
    log: console.log,
    res: null
};

// Mock request object
const mockRequest = {
    method: 'POST',
    body: {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message from the local test script.'
    },
    headers: {
        'user-agent': 'Test Script',
        'x-forwarded-for': '127.0.0.1'
    }
};

async function testContactFunction() {
    console.log('🧪 Testing Contact Function...');
    console.log('📧 SendGrid API Key configured:', process.env.SENDGRID_API_KEY ? 'Yes' : 'No');
    console.log('📬 TO_EMAIL:', process.env.TO_EMAIL);
    console.log('📤 FROM_EMAIL:', process.env.FROM_EMAIL);
    console.log('');
    
    try {
        await contactFunction(mockContext, mockRequest);
        console.log('✅ Function executed successfully!');
        console.log('📋 Response:', JSON.stringify(mockContext.res, null, 2));
    } catch (error) {
        console.error('❌ Function failed:', error);
    }
}

testContactFunction();
