const { app } = require('@azure/functions');

/**
 * Portfolio statistics endpoint
 * Returns dynamic stats about the portfolio and experience
 */
app.http('stats', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            context.log('Portfolio stats requested');
            
            // Calculate years of experience (example: started in 2020)
            const startYear = 2020;
            const currentYear = new Date().getFullYear();
            const yearsExperience = currentYear - startYear;
            
            // Portfolio statistics (these could come from a database in a real application)
            const stats = {
                yearsExperience: yearsExperience,
                projectsCompleted: 25 + Math.floor((Date.now() - new Date('2020-01-01')) / (1000 * 60 * 60 * 24 * 30)), // Approximate monthly increment
                technologiesUsed: [
                    'Azure',
                    'React',
                    'TypeScript',
                    'Node.js',
                    'Gatsby',
                    'Azure Functions',
                    'Azure Static Web Apps',
                    'DevOps',
                    'CI/CD',
                    'Infrastructure as Code'
                ],
                certifications: [
                    'Azure Fundamentals (AZ-900)',
                    'Azure Administrator Associate (AZ-104)',
                    'Azure Solutions Architect Expert (AZ-305)'
                ],
                lastUpdated: new Date().toISOString(),
                siteVisits: Math.floor(Math.random() * 1000) + 500, // Mock visitor count
                apiCalls: Math.floor(Math.random() * 100) + 50 // Mock API call count
            };
            
            // Add some dynamic content based on current time
            const hour = new Date().getHours();
            let timeOfDayMessage;
            if (hour < 12) {
                timeOfDayMessage = 'Good morning! Thanks for visiting my portfolio.';
            } else if (hour < 17) {
                timeOfDayMessage = 'Good afternoon! Hope you\'re having a great day.';
            } else {
                timeOfDayMessage = 'Good evening! Thanks for checking out my work.';
            }
            
            const response = {
                ...stats,
                greeting: timeOfDayMessage,
                serverTime: new Date().toLocaleString('en-US', {
                    timeZone: 'UTC',
                    timeZoneName: 'short'
                })
            };

            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
                },
                body: JSON.stringify(response)
            };
            
        } catch (error) {
            context.log.error('Stats endpoint failed:', error);
            
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: 'Failed to fetch portfolio statistics',
                    message: error.message,
                    timestamp: new Date().toISOString()
                })
            };
        }
    }
});
