# MTV Tech Solutions - Deployment Checklist

## Pre-Deployment Checklist

### ✅ Project Preparation
- [ ] `package.json` has correct `start` script: `"start": "node server.js"`
- [ ] `server.js` listens on `process.env.PORT || 3000`
- [ ] All dependencies listed in `package.json`
- [ ] `.env.example.production` created with production values
- [ ] Project packaged (excluding `node_modules/`, `.git/`, `.env`)

### ✅ Stripe Configuration
- [ ] Live Stripe secret key obtained (`sk_live_xxx`)
- [ ] Live Stripe publishable key obtained (`pk_live_xxx`)
- [ ] Webhook endpoint planned: `https://mtvtechsolutions.com/webhook`
- [ ] Stripe account verified for live payments

## cPanel Deployment Checklist

### ✅ File Upload
- [ ] Project zip uploaded to cPanel home directory
- [ ] Files extracted to dedicated folder (e.g., `mtvtechsolutions-app`)
- [ ] File permissions set correctly

### ✅ Node.js App Setup
- [ ] Node.js app created in cPanel
- [ ] Node.js version set to 18+ 
- [ ] App mode set to "Production"
- [ ] App root points to correct folder
- [ ] Startup file set to `server.js`

### ✅ Environment Variables
- [ ] `STRIPE_SECRET_KEY=sk_live_xxx` (live key)
- [ ] `STRIPE_PUBLISHABLE_KEY=pk_live_xxx` (live key)
- [ ] `STRIPE_WEBHOOK_SECRET=whsec_xxx`
- [ ] `YOUR_DOMAIN=https://mtvtechsolutions.com`
- [ ] `PORT=3000`
- [ ] `NODE_ENV=production`

### ✅ Dependencies & Startup
- [ ] `npm install --production` run successfully
- [ ] Node.js app started successfully
- [ ] App logs show no errors

## Domain & SSL Checklist

### ✅ Domain Configuration
- [ ] Domain `mtvtechsolutions.com` points to Node.js app
- [ ] `.htaccess` file uploaded to `public_html` (if needed)
- [ ] Proxy configuration working

### ✅ SSL Certificate
- [ ] AutoSSL enabled in cPanel
- [ ] SSL certificate generated successfully
- [ ] HTTPS redirect working
- [ ] Site accessible at `https://mtvtechsolutions.com`

## Stripe Webhook Checklist

### ✅ Webhook Setup
- [ ] Webhook endpoint created: `https://mtvtechsolutions.com/webhook`
- [ ] Event `checkout.session.completed` selected
- [ ] Webhook signing secret copied to environment variables
- [ ] Webhook secret updated in cPanel

## Testing Checklist

### ✅ Basic Functionality
- [ ] Site loads at `https://mtvtechsolutions.com`
- [ ] No console errors in browser
- [ ] CSS styling loads correctly
- [ ] Test button works (shows alert)

### ✅ Stripe Integration
- [ ] "Buy now" button visible and styled
- [ ] Clicking button redirects to Stripe Checkout
- [ ] Test payment with card `4242 4242 4242 4242` works
- [ ] Success page loads after payment
- [ ] Cancel page loads when payment cancelled

### ✅ Webhook Testing
- [ ] Webhook events received in Stripe Dashboard
- [ ] No webhook delivery failures
- [ ] Server logs show webhook processing
- [ ] Payment completion triggers webhook

## Security Checklist

### ✅ Production Security
- [ ] Using HTTPS (not HTTP)
- [ ] Live Stripe keys (not test keys)
- [ ] Environment variables secure
- [ ] No sensitive data in logs
- [ ] Webhook signature verification working

## Post-Deployment

### ✅ Monitoring
- [ ] App logs monitored for errors
- [ ] Stripe Dashboard checked for webhook status
- [ ] SSL certificate auto-renewal confirmed
- [ ] Backup strategy in place

### ✅ Documentation
- [ ] Deployment process documented
- [ ] Environment variables documented
- [ ] Troubleshooting guide available
- [ ] Contact information for support

---

## Quick Test Commands

After deployment, test these URLs:

1. **Main Site:** `https://mtvtechsolutions.com`
2. **API Test:** `https://mtvtechsolutions.com/create-checkout-session` (POST)
3. **Webhook:** `https://mtvtechsolutions.com/webhook` (POST)
4. **Success Page:** `https://mtvtechsolutions.com/success.html`
5. **Cancel Page:** `https://mtvtechsolutions.com/cancel.html`

## Emergency Contacts

- **Hosting Support:** [Your hosting provider]
- **Stripe Support:** [Stripe Dashboard Support]
- **Domain Registrar:** [Your domain provider]

---

**🎉 Your app should be live at: https://mtvtechsolutions.com**

