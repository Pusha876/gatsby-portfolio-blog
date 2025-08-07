/**
 * Debug endpoint to check module availability and environment
 */
module.exports = async function (context, req) {
    context.log('Debug endpoint called');
    
    // Handle CORS
    if (req.method === 'OPTIONS') {
        context.res = {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        };
        return;
    }
    
    const debugInfo = {
        timestamp: new Date().toISOString(),
        environment: {
            nodeVersion: process.version,
            platform: process.platform,
            azureFunctionsEnvironment: process.env.AZURE_FUNCTIONS_ENVIRONMENT || 'unknown',
            functionWorkerRuntime: process.env.FUNCTIONS_WORKER_RUNTIME || 'unknown'
        },
        environmentVariables: {
            hasSendGridKey: !!process.env.SENDGRID_API_KEY,
            sendGridKeyLength: process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.length : 0,
            fromEmail: process.env.FROM_EMAIL || 'not set',
            toEmail: process.env.TO_EMAIL || 'not set'
        },
        modules: {},
        packageInfo: {}
    };
    
    // Check SendGrid module availability
    try {
        const sgMail = require('@sendgrid/mail');
        debugInfo.modules.sendgrid = {
            available: true,
            version: 'loaded successfully',
            hasSetApiKey: typeof sgMail.setApiKey === 'function',
            hasSend: typeof sgMail.send === 'function'
        };
    } catch (error) {
        debugInfo.modules.sendgrid = {
            available: false,
            error: error.message,
            stack: error.stack
        };
    }
    
    // Check package.json
    try {
        const packageJson = require('../package.json');
        debugInfo.packageInfo = {
            name: packageJson.name,
            version: packageJson.version,
            dependencies: packageJson.dependencies || {},
            engines: packageJson.engines || {}
        };
    } catch (error) {
        debugInfo.packageInfo = {
            error: 'Could not load package.json: ' + error.message
        };
    }
    
    // Check if modules exist in file system
    try {
        const fs = require('fs');
        const path = require('path');
        
        // Check if node_modules exists
        const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
        debugInfo.filesystem = {
            nodeModulesExists: fs.existsSync(nodeModulesPath),
            nodeModulesPath: nodeModulesPath
        };
        
        if (fs.existsSync(nodeModulesPath)) {
            const sendgridPath = path.join(nodeModulesPath, '@sendgrid');
            debugInfo.filesystem.sendgridExists = fs.existsSync(sendgridPath);
            
            if (fs.existsSync(sendgridPath)) {
                const mailPath = path.join(sendgridPath, 'mail');
                debugInfo.filesystem.sendgridMailExists = fs.existsSync(mailPath);
            }
        }
    } catch (error) {
        debugInfo.filesystem = {
            error: 'Could not check filesystem: ' + error.message
        };
    }
    
    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: debugInfo
    };
};
