/**
 * Health check endpoint for portfolio API
 * Returns API status and timestamp
 */
module.exports = async function (context, req) {
    try {
        context.log('Health check requested');
        
        const response = {
            status: 'healthy',
            message: 'Portfolio API is running',
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            environment: process.env.AZURE_FUNCTIONS_ENVIRONMENT || 'static-web-apps'
        };

        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: response
        };
    } catch (error) {
        context.log.error('Health check failed:', error);
        
        context.res = {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                status: 'unhealthy',
                message: 'Health check failed',
                error: error.message,
                timestamp: new Date().toISOString()
            }
        };
    }
};
