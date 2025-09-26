# MTV Tech Solutions - cPanel Deployment Guide

This guide will help you deploy your Node.js/Express Stripe Checkout app to your cPanel hosting at **mtvtechsolutions.com**.

## Prerequisites

- cPanel hosting account with Node.js support
- Domain: `mtvtechsolutions.com` pointing to your hosting
- Stripe account with live API keys
- Basic familiarity with cPanel

## Step 1: Prepare Your Project

### 1.1 Package Your Project

1. **Exclude unnecessary files** from your deployment:
   - `node_modules/` (will be installed on server)
   - `.git/` (version control)
   - `*.log` files
   - `.env` (contains local secrets)

2. **Create deployment package:**
   ```bash
   # On Windows (PowerShell)
   Compress-Archive -Path "server.js","package.json","public","shared","drizzle.config.ts","tailwind.config.ts","tsconfig.json","vite.config.ts","components.json","postcss.config.js","replit.md" -DestinationPath "mtvtechsolutions-deploy.zip" -Force
   
   # On Mac/Linux
   zip -r mtvtechsolutions-deploy.zip . -x "node_modules/*" ".git/*" "*.log" ".env"
   ```

### 1.2 Verify Production Files

Ensure these files are ready:
- ✅ `package.json` with `"start": "node server.js"`
- ✅ `server.js` listens on `process.env.PORT || 3000`
- ✅ `.env.example.production` with your production values

## Step 2: Upload to cPanel

### 2.1 Access cPanel File Manager

1. Log into your cPanel
2. Open **File Manager**
3. Navigate to your **home directory** (not `public_html`)

### 2.2 Upload and Extract

1. **Upload** `mtvtechsolutions-deploy.zip` to your home directory
2. **Extract** the zip file
3. **Rename** the extracted folder to `mtvtechsolutions-app` (or your preferred name)

Your structure should look like:
```
/home/yourusername/
├── public_html/          (your website files)
└── mtvtechsolutions-app/ (your Node.js app)
    ├── server.js
    ├── package.json
    ├── public/
    └── ...
```

## Step 3: Set Up Node.js App in cPanel

### 3.1 Create Node.js Application

1. In cPanel, find **"Setup Node.js App"** or **"Application Manager"**
2. Click **"Create Application"**
3. Fill in the details:
   - **Node.js Version:** 18.x or higher
   - **Application Mode:** Production
   - **Application Root:** `/home/yourusername/mtvtechsolutions-app`
   - **Application URL:** `mtvtechsolutions.com` (or subdomain)
   - **Application Startup File:** `server.js`

### 3.2 Configure Environment Variables

In the Node.js App settings, add these environment variables:

```
STRIPE_SECRET_KEY=sk_live_your_actual_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret
YOUR_DOMAIN=https://mtvtechsolutions.com
PORT=3000
NODE_ENV=production
```

**Important:** Use your **live** Stripe keys (starting with `sk_live_` and `pk_live_`)

### 3.3 Install Dependencies

1. In the Node.js App interface, click **"Terminal"** or **"Console"**
2. Run:
   ```bash
   cd /home/yourusername/mtvtechsolutions-app
   npm install --production
   ```

### 3.4 Start the Application

1. Click **"Start App"** in the Node.js App interface
2. Check the logs to ensure it started successfully

## Step 4: Connect Domain to Node.js App

### 4.1 Domain Configuration

1. In cPanel, go to **"Subdomains"** or **"Addon Domains"**
2. Ensure `mtvtechsolutions.com` points to your Node.js app
3. If needed, create a subdomain like `app.mtvtechsolutions.com`

### 4.2 Proxy Configuration (if needed)

If your hosting requires proxy routing, create `.htaccess` in `public_html`:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

## Step 5: Enable HTTPS

### 5.1 SSL Certificate

1. In cPanel, go to **"SSL/TLS"**
2. Enable **"AutoSSL"** (Let's Encrypt)
3. Wait for certificate generation (usually 5-10 minutes)

### 5.2 Force HTTPS

Update your `.htaccess` to force HTTPS:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

## Step 6: Configure Stripe Webhooks

### 6.1 Set Up Webhook Endpoint

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. **Endpoint URL:** `https://mtvtechsolutions.com/webhook`
4. **Events to send:** Select `checkout.session.completed`
5. **Copy the webhook signing secret** (starts with `whsec_`)

### 6.2 Update Environment Variables

Update your cPanel environment variables with the webhook secret:
```
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret
```

## Step 7: Testing Your Deployment

### 7.1 Basic Functionality Test

1. Visit `https://mtvtechsolutions.com`
2. Check browser console for errors
3. Verify the page loads with proper styling
4. Test the "Test Button" functionality

### 7.2 Stripe Integration Test

1. Click "Buy now" button
2. Verify redirect to Stripe Checkout
3. Use test card: `4242 4242 4242 4242`
4. Complete test payment
5. Verify redirect to success page

### 7.3 Webhook Test

1. Check Stripe Dashboard for webhook delivery attempts
2. Verify webhook events are received successfully
3. Check your server logs for webhook processing

## Troubleshooting

### Common Issues

#### 1. App Won't Start
**Symptoms:** Node.js app shows "Stopped" status
**Solutions:**
- Check Node.js version (must be 18+)
- Verify `server.js` exists and is valid
- Check environment variables are set correctly
- Review error logs in cPanel

#### 2. 502 Bad Gateway
**Symptoms:** Website shows 502 error
**Solutions:**
- Ensure Node.js app is running
- Check if port 3000 is correct
- Verify proxy configuration in `.htaccess`
- Check server logs for binding errors

#### 3. Stripe Keys Not Working
**Symptoms:** "Stripe not configured" message
**Solutions:**
- Verify you're using **live** keys (not test keys)
- Check environment variables in cPanel
- Ensure keys are copied correctly (no extra spaces)
- Restart the Node.js app after changing env vars

#### 4. Webhook Not Receiving Events
**Symptoms:** No webhook events in Stripe Dashboard
**Solutions:**
- Verify webhook URL is `https://mtvtechsolutions.com/webhook`
- Check SSL certificate is valid
- Ensure webhook secret is correct
- Test with Stripe CLI: `stripe listen --forward-to https://mtvtechsolutions.com/webhook`

#### 5. Static Files Not Loading
**Symptoms:** CSS/JS files return 404
**Solutions:**
- Verify `public/` folder exists in app directory
- Check `express.static('public')` in server.js
- Ensure file paths are correct
- Check server logs for static file requests

### Debugging Commands

Access cPanel Terminal and run:

```bash
# Check if app is running
ps aux | grep node

# Check app logs
tail -f /home/yourusername/mtvtechsolutions-app/logs/app.log

# Test environment variables
cd /home/yourusername/mtvtechsolutions-app
node -e "console.log(process.env.STRIPE_SECRET_KEY ? 'Keys loaded' : 'Keys missing')"

# Restart app
pkill -f "node server.js"
npm start
```

## Security Checklist

- ✅ Using HTTPS in production
- ✅ Live Stripe keys (not test keys)
- ✅ Environment variables stored securely
- ✅ Webhook signature verification enabled
- ✅ No sensitive data in logs
- ✅ SSL certificate valid and auto-renewing

## Maintenance

### Regular Tasks

1. **Monitor logs** for errors
2. **Update dependencies** monthly: `npm update`
3. **Check SSL certificate** renewal
4. **Monitor Stripe webhook** delivery success
5. **Backup** your app files regularly

### Updates

To update your app:
1. Upload new files to cPanel
2. Run `npm install` if dependencies changed
3. Restart the Node.js app
4. Test functionality

## Support

If you encounter issues:
1. Check cPanel error logs
2. Verify Stripe Dashboard for webhook status
3. Test with Stripe test mode first
4. Contact your hosting provider for Node.js support

---

**Your app should now be live at: https://mtvtechsolutions.com** 🚀
