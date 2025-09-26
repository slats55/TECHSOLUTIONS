# 🚀 Deploy Your App in 5 Minutes!

## The Absolute Simplest Way

### ⏱️ Minute 1: Create Package
```powershell
.\EASY_DEPLOY.ps1
```
**That's it!** The script tells you exactly what to do next.

### ⏱️ Minute 2: Upload to cPanel
1. Log into cPanel
2. File Manager → Upload your .zip file
3. Extract it

### ⏱️ Minute 3: Create Node.js App
1. cPanel → "Setup Node.js App"
2. Create Application
3. Set App Root to your extracted folder
4. Set Startup File to `server.js`

### ⏱️ Minute 4: Add Your Stripe Keys
Copy these 5 lines into Environment Variables:

```
STRIPE_SECRET_KEY=sk_live_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
YOUR_DOMAIN=https://mtvtechsolutions.com
PORT=3000
```

### ⏱️ Minute 5: Start & Test
1. Click "Start App"
2. Visit: https://mtvtechsolutions.com
3. See your green "Buy now" button? You're done! 🎉

---

## 🎯 That's It!

**Total time: 5 minutes**
**Total steps: 5**
**Total complexity: Zero!**

Your Stripe checkout app is now live at **https://mtvtechsolutions.com**

---

## 📞 If You Get Stuck

1. **Check the error message** - it usually tells you exactly what's wrong
2. **Make sure you copied the Stripe keys correctly** - no extra spaces!
3. **Try restarting the Node.js app** - sometimes that fixes everything

**You've got this!** 🚀



