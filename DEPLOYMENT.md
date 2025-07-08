# Deployment Guide

This portfolio supports two deployment methods:

## 1. Static HTML Deployment (Recommended for quick deployment)

### Files used:
- `index.html` (root level)
- `staticwebapp.config.json` (configured for static deployment)

### Steps:
1. **Deploy directly:** The `index.html` file in the root is ready for deployment
2. **Using Azure CLI:**
   ```bash
   az staticwebapp create --name "jamie-pryce-portfolio" --resource-group "your-rg" --location "East US 2" --source "https://github.com/your-username/your-repo" --branch "main" --app-location "/" --output-location "/"
   ```

### Pros:
- Fast deployment
- No build process required
- Lightweight
- Always works

### Cons:
- Static content only
- Manual updates required for content changes

## 2. Gatsby Build Deployment (Full featured)

### Files used:
- All `src/` files
- `gatsby-config.js`, `gatsby-node.js`
- `content/` directory
- Theme files in `src/components/`, `src/templates/`, etc.

### Steps:
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the site:**
   ```bash
   npm run build:gatsby
   ```

3. **Deploy the `public/` folder:**
   ```bash
   az staticwebapp create --name "jamie-pryce-portfolio-gatsby" --resource-group "your-rg" --location "East US 2" --source "https://github.com/your-username/your-repo" --branch "main" --app-location "/" --output-location "public" --build-command "npm run build"
   ```

### Pros:
- Dynamic content from `content/` directory
- Theme-based styling
- Full Gatsby features
- Easy content management

### Cons:
- Requires build process
- Larger deployment
- More complex setup

## 3. Using Static Web Apps CLI (Recommended)

### Install SWA CLI:
```bash
npm install -g @azure/static-web-apps-cli
```

### For Static HTML:
```bash
# Initialize (only needed once)
npx swa init --yes

# Build and deploy
npx swa build
npx swa deploy --env production
```

### For Gatsby:
```bash
# Initialize (only needed once)
npx swa init --yes

# Build Gatsby first
npm run build:gatsby

# Deploy
npx swa deploy --env production
```

## Configuration Files

### staticwebapp.config.json
Currently configured for static HTML deployment with:
- Navigation fallback to `/index.html`
- Proper MIME types
- Cache control headers

### GitHub Actions (if using GitHub)
You can set up automatic deployment with GitHub Actions. The workflow should:
- For static: Deploy root directory
- For Gatsby: Run `npm run build:gatsby` then deploy `public/` folder

## Switching Between Deployment Types

### To Static HTML:
- Ensure `index.html` is in root
- Use `staticwebapp.config.json` as is
- Deploy root directory

### To Gatsby:
- Run `npm install` to install dependencies
- Run `npm run build:gatsby` to build
- Deploy the `public/` folder
- Update `staticwebapp.config.json` if needed for Gatsby routing

## Current Status

✅ **Static HTML:** Ready for deployment
✅ **Gatsby Build:** All theme files restored, ready for building
✅ **Dependencies:** All Gatsby dependencies included in package.json
✅ **Configuration:** Both deployment types configured

Choose the deployment method that best fits your needs!
