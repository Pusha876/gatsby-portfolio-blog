const { app } = require('@azure/functions');

/**
 * Health check endpoint for portfolio API
 * Returns API status and timestamp
 */
app.http('health', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            context.log('Health check requested');
            
            const response = {
                status: 'healthy',
                message: 'Portfolio API is running',
                timestamp: new Date().toISOString(),
                version: '1.0.0',
                environment: process.env.AZURE_FUNCTIONS_ENVIRONMENT || 'local'
            };

            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                },
                body: JSON.stringify(response)
            };
        } catch (error) {
            context.log.error('Health check failed:', error);
            
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'unhealthy',
                    message: 'Health check failed',
                    error: error.message,
                    timestamp: new Date().toISOString()
                })
            };
        }
    }
});
