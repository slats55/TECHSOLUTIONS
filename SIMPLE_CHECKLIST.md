# ✅ Simple Deployment Checklist

## Just 5 Easy Steps!

### 📦 Step 1: Create Package
- [ ] Run: `.\EASY_DEPLOY.ps1`
- [ ] Wait for "Package created" message

### 📤 Step 2: Upload to cPanel
- [ ] Log into cPanel
- [ ] Click "File Manager"
- [ ] Go to home folder (not public_html)
- [ ] Upload the .zip file
- [ ] Right-click zip → Extract

### ⚙️ Step 3: Create Node.js App
- [ ] Find "Setup Node.js App" in cPanel
- [ ] Click "Create Application"
- [ ] Set App Root: (the extracted folder)
- [ ] Set Startup File: `server.js`
- [ ] Set Node Version: 18+

### 🔑 Step 4: Add Environment Variables
Copy and paste these 5 variables:

```
STRIPE_SECRET_KEY=sk_live_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
YOUR_DOMAIN=https://mtvtechsolutions.com
PORT=3000
```

### 🚀 Step 5: Start App
- [ ] Click "Start App"
- [ ] Wait 30 seconds
- [ ] Visit: https://mtvtechsolutions.com

## 🎉 Done!

If you see your website with a green "Buy now" button, you're all set!

---

## 🆘 Quick Fixes

**App won't start?** → Check that you copied the Stripe keys correctly

**Website shows error?** → Make sure your domain points to the Node.js app

**Stripe not working?** → Use live keys (sk_live_ and pk_live_)

---

**Need help?** Check the error messages in cPanel - they usually tell you exactly what's wrong!



