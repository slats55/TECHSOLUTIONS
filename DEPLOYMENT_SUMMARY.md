# MTV Tech Solutions - Deployment Files Summary

## 📁 Files Created for cPanel Deployment

### Core Application Files
- ✅ **`package.json`** - Updated with production settings and Node.js version requirements
- ✅ **`server.js`** - Production-ready Express server with proper binding and logging
- ✅ **`public/`** - Frontend files (HTML, CSS, JS) for the Stripe checkout interface

### Environment Configuration
- ✅ **`.env.example.production`** - Template for production environment variables
  - Stripe live keys configuration
  - Domain and port settings
  - Webhook secret placeholder

### Deployment Documentation
- ✅ **`README_DEPLOY.md`** - Comprehensive step-by-step deployment guide
  - cPanel Node.js app setup
  - Environment variable configuration
  - Domain and SSL setup
  - Stripe webhook configuration
  - Troubleshooting guide

- ✅ **`DEPLOYMENT_CHECKLIST.md`** - Complete checklist for deployment verification
  - Pre-deployment checks
  - cPanel configuration steps
  - Testing procedures
  - Security verification

### Server Configuration
- ✅ **`.htaccess`** - Apache configuration for cPanel proxy routing
  - HTTPS redirect
  - Proxy to Node.js app
  - Security headers
  - Gzip compression
  - Static asset caching

### Deployment Tools
- ✅ **`deploy.ps1`** - PowerShell script to package project for deployment
  - Automatically includes necessary files
  - Excludes development files
  - Creates timestamped deployment package

## 🚀 Quick Deployment Steps

### 1. Package Your Project
```powershell
# Run the deployment script
.\deploy.ps1
```

### 2. Upload to cPanel
1. Upload the generated `.zip` file to cPanel File Manager
2. Extract in your home directory (not `public_html`)
3. Rename folder to `mtvtechsolutions-app`

### 3. Configure Node.js App
1. Create Node.js app in cPanel
2. Set startup file to `server.js`
3. Add environment variables from `.env.example.production`
4. Run `npm install --production`
5. Start the app

### 4. Set Up Domain & SSL
1. Configure domain to point to Node.js app
2. Upload `.htaccess` to `public_html`
3. Enable AutoSSL in cPanel

### 5. Configure Stripe
1. Set webhook endpoint: `https://mtvtechsolutions.com/webhook`
2. Copy webhook secret to environment variables
3. Test with live Stripe keys

## 🔧 Environment Variables Required

```bash
STRIPE_SECRET_KEY=sk_live_your_actual_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_key
STRIPE_WEBHOOK_SECRET=whsec_your_actual_secret
YOUR_DOMAIN=https://mtvtechsolutions.com
PORT=3000
NODE_ENV=production
```

## 🧪 Testing URLs

After deployment, test these endpoints:

- **Main Site:** `https://mtvtechsolutions.com`
- **Checkout API:** `POST https://mtvtechsolutions.com/create-checkout-session`
- **Webhook:** `POST https://mtvtechsolutions.com/webhook`
- **Success Page:** `https://mtvtechsolutions.com/success.html`
- **Cancel Page:** `https://mtvtechsolutions.com/cancel.html`

## 📋 Key Features

### ✅ Production Ready
- Proper error handling and logging
- Environment variable configuration
- HTTPS enforcement
- Security headers
- Static file serving

### ✅ Stripe Integration
- Live payment processing
- Webhook signature verification
- Checkout session management
- Success/cancel page handling

### ✅ cPanel Optimized
- Proxy configuration for shared hosting
- Node.js app setup instructions
- SSL certificate management
- Environment variable configuration

## 🆘 Support Resources

- **Deployment Guide:** `README_DEPLOY.md`
- **Checklist:** `DEPLOYMENT_CHECKLIST.md`
- **Troubleshooting:** Included in README_DEPLOY.md
- **Stripe Docs:** https://stripe.com/docs/checkout
- **cPanel Node.js:** Your hosting provider's documentation

---

**🎉 Your MTV Tech Solutions Stripe Checkout app is ready for deployment to https://mtvtechsolutions.com!**



