# 🚀 Simple Deployment Guide for MTV Tech Solutions

## The Easiest Way to Deploy Your App

Don't worry about the complicated steps! Here's the super simple version:

## 📦 Step 1: Create Your Deployment Package

**Just run this one command:**
```powershell
.\deploy.ps1
```

This creates a file called `mtvtechsolutions-deploy-[date].zip` - that's your deployment package!

## 📤 Step 2: Upload to cPanel (Super Easy!)

1. **Log into your cPanel**
2. **Click "File Manager"**
3. **Go to your home folder** (the main folder, not public_html)
4. **Click "Upload"** and select your `.zip` file
5. **Right-click the zip file** → "Extract" → Done!

## ⚙️ Step 3: Set Up Node.js App (3 Clicks!)

1. **In cPanel, find "Setup Node.js App"** (or "Application Manager")
2. **Click "Create Application"**
3. **Fill in these 3 things:**
   - **App Root:** `/home/yourusername/mtvtechsolutions-deploy-[date]` (the folder you just extracted)
   - **Startup File:** `server.js`
   - **Node Version:** 18 or higher
4. **Click "Create"**

## 🔑 Step 4: Add Your Stripe Keys (Copy & Paste!)

1. **In your Node.js app settings, find "Environment Variables"**
2. **Add these 5 variables** (just copy and paste):

```
STRIPE_SECRET_KEY=sk_live_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
YOUR_DOMAIN=https://mtvtechsolutions.com
PORT=3000
```

**Where to get these keys:**
- Go to [stripe.com/dashboard](https://stripe.com/dashboard)
- Click "Developers" → "API Keys"
- Copy the **live** keys (not test keys!)

## 🚀 Step 5: Start Your App (1 Click!)

1. **Click "Start App"** in your Node.js settings
2. **Wait 30 seconds**
3. **Visit your website:** `https://mtvtechsolutions.com`

## 🎉 That's It!

Your app should now be live! If you see your website with a green "Buy now" button, you're all set!

---

## 🆘 If Something Goes Wrong

### Problem: "App won't start"
**Solution:** Make sure you copied the Stripe keys correctly (no extra spaces!)

### Problem: "Website shows error"
**Solution:** Check that your domain points to the Node.js app in cPanel

### Problem: "Stripe not working"
**Solution:** Make sure you're using **live** keys (starting with `sk_live_` and `pk_live_`)

---

## 📞 Need Help?

If you get stuck, just:
1. Check the error messages in cPanel
2. Make sure all 5 environment variables are set
3. Try restarting the Node.js app

**Your app will be live at: https://mtvtechsolutions.com** 🎉



