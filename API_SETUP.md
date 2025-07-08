# Azure Functions API Setup Guide

## Overview
The `/api` folder contains Azure Functions that will be deployed alongside your static website using Azure Static Web Apps. This provides a serverless backend for your portfolio.

## What's Included

### API Endpoints
- **GET `/api/health`** - Health check and API status
- **POST `/api/contact`** - Contact form submission handler  
- **GET `/api/stats`** - Dynamic portfolio statistics

### Files Structure
```
api/
├── health/
│   ├── function.json
│   └── index.js
├── contact/
│   ├── function.json
│   └── index.js
├── stats/
│   ├── function.json
│   └── index.js
├── host.json
├── package.json
├── local.settings.json
└── README.md
```

## Deployment

### Automatic Deployment (Recommended)
The API is configured to deploy automatically with your static site:

1. **GitHub Actions Workflow** - The `.github/workflows/azure-static-web-apps-*.yml` file includes:
   ```yaml
   api_location: "api"
   ```

2. **Push to Main Branch** - When you push changes to the main branch, both the frontend and API deploy together.

### Local Development

#### Prerequisites
- Node.js 18+
- Azure Functions Core Tools v4

#### Setup API
```bash
# Install API dependencies
cd api
npm install

# Install Azure Functions Core Tools globally (if not installed)
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```

#### Run API Locally
```bash
# Start the Functions runtime (from api/ directory)
func start

# Or use npm script
npm start

# API will be available at http://localhost:7071/api/
```

#### Run Frontend + API Together
```bash
# From project root
npm run dev:static    # Static HTML + API
# or
npm run dev:full      # Gatsby + API (requires gatsby build first)
```

#### Test Endpoints Locally
```bash
# Health check
curl http://localhost:7071/api/health

# Portfolio stats
curl http://localhost:7071/api/stats

# Contact form
curl -X POST http://localhost:7071/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Hello"}'
```

## Configuration

### Static Web Apps Config
The `staticwebapp.config.json` includes API routing:
```json
{
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["anonymous"]
    }
  ]
}
```

### CORS
API endpoints include CORS headers for browser compatibility:
```javascript
'Access-Control-Allow-Origin': '*'
```

## Security Features
- Input validation on all endpoints
- Email format validation
- Structured error handling
- Request logging for monitoring

## Monitoring
- All functions log to Azure Application Insights automatically
- Health endpoint provides status monitoring
- Error tracking and performance metrics

## Customization

### Add New Endpoints
1. Create new folder in `/api/`
2. Add `function.json` and `index.js`
3. Follow existing patterns for error handling and CORS

### Modify Existing Endpoints
- Edit the `index.js` files in each endpoint folder
- Follow Azure Functions v4 Node.js programming model
- Use `@azure/functions` package for the app object

### Environment Variables
Add environment variables in Azure Static Web Apps portal:
- Configuration → Application settings
- Variables are available as `process.env.VARIABLE_NAME`

## Troubleshooting

### Common Issues
1. **API not found (404)** - Check `staticwebapp.config.json` routing
2. **CORS errors** - Verify CORS headers in function responses
3. **Timeout errors** - Check function execution time (default 5min limit)

### Debug Locally
1. Check `func start` output for errors
2. View logs in terminal
3. Test endpoints with curl or Postman
4. Check `local.settings.json` configuration

### Production Debug
1. Check Azure Static Web Apps logs in Azure Portal
2. View Application Insights for function logs
3. Test endpoints directly: `https://yoursite.azurestaticapps.net/api/health`

## Next Steps
- Set up email integration for contact form
- Add database storage for messages
- Implement authentication for admin endpoints
- Add rate limiting and spam protection
- Monitor usage with Application Insights

## Resources
- [Azure Functions Documentation](https://docs.microsoft.com/en-us/azure/azure-functions/)
- [Azure Static Web Apps API](https://docs.microsoft.com/en-us/azure/static-web-apps/apis)
- [Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local)
