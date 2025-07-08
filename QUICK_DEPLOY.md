# Quick Deployment Guide

## Option 1: Static HTML Deployment (Fast & Simple)

### Current State
Your static HTML deployment is **ready to go**. The `index.html` file in the root directory contains your complete portfolio.

### Deploy Static Version
1. Simply deploy the root directory containing `index.html`
2. Azure Static Web Apps will automatically serve `index.html`
3. The `staticwebapp.config.json` is configured for this deployment

### Files Used
- `index.html` (main page)
- `staticwebapp.config.json` (configuration)
- CSS and assets are inline/CDN-based

---

## Option 2: Gatsby Build Deployment (Full Featured)

### Before Building
Your Gatsby setup is complete with all theme files, but builds can take 3-5 minutes.

### Build Steps
```bash
# Navigate to project
cd "c:\WORKSPACE\azure-static-web-apps\gatsby-portfolio-blog"

# Clean previous builds
npm run clean

# Build (this will take 3-5 minutes - BE PATIENT!)
npm run build

# Verify build
ls public/
```

### Deploy Gatsby Version
1. After successful build, deploy the `public/` folder
2. Use `staticwebapp.config.gatsby.json` as your configuration
3. Copy it to `staticwebapp.config.json` before deployment:
   ```bash
   cp staticwebapp.config.gatsby.json staticwebapp.config.json
   ```

### Files Used After Build
- `public/` folder (contains entire built site)
- `staticwebapp.config.json` (Gatsby-specific routing)

---

## Current Recommendation

**Start with Option 1 (Static)** since it's working perfectly and deploys instantly.

**Use Option 2 (Gatsby)** when you want:
- Blog functionality
- Better SEO
- Dynamic content management
- Advanced theming features

---

## Switching Between Deployments

### To Deploy Static
```bash
# Ensure you're using the static config
cp staticwebapp.config.json staticwebapp.config.json.backup
# Deploy index.html as root
```

### To Deploy Gatsby
```bash
# Build first
npm run build:gatsby

# Switch to Gatsby config
cp staticwebapp.config.gatsby.json staticwebapp.config.json

# Deploy public/ folder
```

---

## Troubleshooting

### If Gatsby Build Fails
1. Check `npm install` completed successfully
2. Verify all content files exist
3. Run `npm run clean` then try again
4. Check for TypeScript errors with `npx tsc --noEmit`

### If Deployment Shows White Screen
1. Check browser console for errors
2. Verify correct `staticwebapp.config.json` is used
3. Ensure either `index.html` OR `public/index.html` exists (not both)

### Performance
- Static deployment: Instant
- Gatsby build: 3-5 minutes first time, 1-2 minutes subsequent builds
- Gatsby development: `npm run develop` for local testing
