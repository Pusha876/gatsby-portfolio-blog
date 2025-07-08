# Portfolio API

Azure Functions backend for Jamie Pryce's portfolio website.

## Overview

This API provides serverless backend functionality for the portfolio, including:

- **Health Check** (`/api/health`) - API status and health monitoring
- **Contact Form** (`/api/contact`) - Handle contact form submissions
- **Portfolio Stats** (`/api/stats`) - Dynamic portfolio statistics and information

## Endpoints

### GET /api/health
Returns the API health status and basic information.

**Response:**
```json
{
  "status": "healthy",
  "message": "Portfolio API is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0",
  "environment": "production"
}
```

### POST /api/contact
Handles contact form submissions with validation.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! I will get back to you soon.",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "id": "contact_1705312200000_abc123def"
}
```

### GET /api/stats
Returns dynamic portfolio statistics and information.

**Response:**
```json
{
  "yearsExperience": 4,
  "projectsCompleted": 47,
  "technologiesUsed": ["Azure", "React", "TypeScript", "..."],
  "certifications": ["Azure Fundamentals (AZ-900)", "..."],
  "greeting": "Good morning! Thanks for visiting my portfolio.",
  "serverTime": "1/15/2024, 10:30:00 AM UTC",
  "lastUpdated": "2024-01-15T10:30:00.000Z"
}
```

## Local Development

### Prerequisites
- Node.js 18+ 
- Azure Functions Core Tools v4

### Setup
```bash
cd api
npm install
```

### Run Locally
```bash
# Start the Functions runtime
func start

# Or use npm script
npm start
```

The API will be available at `http://localhost:7071/api/`

### Testing Endpoints

```bash
# Health check
curl http://localhost:7071/api/health

# Portfolio stats
curl http://localhost:7071/api/stats

# Contact form (POST)
curl -X POST http://localhost:7071/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"Test","message":"Hello world"}'
```

## Deployment

This API is automatically deployed with the frontend using Azure Static Web Apps. The Functions are deployed to the same resource as the static site.

### Configuration
- Functions runtime: Node.js 18
- Authorization level: Anonymous (suitable for Static Web Apps)
- CORS: Enabled for the frontend domain

## Security Features

- Input validation on all endpoints
- Email format validation on contact form
- Error handling and logging
- CORS configuration
- Rate limiting (recommended for production)

## Future Enhancements

- Email integration for contact form
- Database storage for messages
- Analytics and visitor tracking
- Authentication for admin endpoints
- Spam protection and rate limiting
- Azure Application Insights integration

## Architecture

The API follows Azure Functions best practices:
- Stateless functions
- Proper error handling
- Structured logging
- Environment-based configuration
- CORS support for browser clients
