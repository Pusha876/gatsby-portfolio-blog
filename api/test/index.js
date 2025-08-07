/**
 * Simple test endpoint to verify Azure Functions are working
 */
module.exports = async function (context, req) {
    context.log('Test endpoint called:', {
        method: req.method,
        hasBody: !!req.body,
        bodyData: req.body
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

    const response = {
        success: true,
        message: 'Test endpoint is working!',
        method: req.method,
        timestamp: new Date().toISOString(),
        receivedData: req.body || null
    };

    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: response
    };
};
