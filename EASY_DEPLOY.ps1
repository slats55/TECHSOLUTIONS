# 🚀 MTV Tech Solutions - Super Easy Deployment Script
# This script does everything for you!

Write-Host "🎉 MTV Tech Solutions - Super Easy Deployment!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""

# Step 1: Create deployment package
Write-Host "📦 Step 1: Creating your deployment package..." -ForegroundColor Yellow

$packageName = "mtvtechsolutions-deploy-$(Get-Date -Format 'yyyyMMdd-HHmm').zip"

# Files to include
$filesToInclude = @(
    "server.js",
    "package.json", 
    "public",
    "shared",
    "drizzle.config.ts",
    "tailwind.config.ts", 
    "tsconfig.json",
    "vite.config.ts",
    "components.json",
    "postcss.config.js",
    "replit.md",
    ".env.example.production",
    "README_DEPLOY.md",
    "DEPLOYMENT_CHECKLIST.md",
    ".htaccess"
)

# Check which files exist and include them
$existingFiles = @()
foreach ($file in $filesToInclude) {
    if (Test-Path $file) {
        $existingFiles += $file
    }
}

# Create the zip file
Compress-Archive -Path $existingFiles -DestinationPath $packageName -Force

Write-Host "✅ Package created: $packageName" -ForegroundColor Green
Write-Host ""

# Step 2: Show next steps
Write-Host "📤 Step 2: Upload to cPanel" -ForegroundColor Yellow
Write-Host "1. Log into your cPanel" -ForegroundColor White
Write-Host "2. Click 'File Manager'" -ForegroundColor White
Write-Host "3. Go to your home folder (not public_html)" -ForegroundColor White
Write-Host "4. Upload: $packageName" -ForegroundColor White
Write-Host "5. Right-click zip → Extract" -ForegroundColor White
Write-Host ""

Write-Host "⚙️ Step 3: Set up Node.js App" -ForegroundColor Yellow
Write-Host "1. In cPanel, find 'Setup Node.js App'" -ForegroundColor White
Write-Host "2. Click 'Create Application'" -ForegroundColor White
Write-Host "3. Set App Root to the extracted folder" -ForegroundColor White
Write-Host "4. Set Startup File to: server.js" -ForegroundColor White
Write-Host "5. Set Node Version to: 18+" -ForegroundColor White
Write-Host ""

Write-Host "🔑 Step 4: Add Environment Variables" -ForegroundColor Yellow
Write-Host "Add these 5 variables in your Node.js app settings:" -ForegroundColor White
Write-Host ""
Write-Host "STRIPE_SECRET_KEY=sk_live_your_key_here" -ForegroundColor Cyan
Write-Host "STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here" -ForegroundColor Cyan
Write-Host "STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here" -ForegroundColor Cyan
Write-Host "YOUR_DOMAIN=https://mtvtechsolutions.com" -ForegroundColor Cyan
Write-Host "PORT=3000" -ForegroundColor Cyan
Write-Host ""

Write-Host "🚀 Step 5: Start Your App" -ForegroundColor Yellow
Write-Host "1. Click 'Start App' in Node.js settings" -ForegroundColor White
Write-Host "2. Wait 30 seconds" -ForegroundColor White
Write-Host "3. Visit: https://mtvtechsolutions.com" -ForegroundColor White
Write-Host ""

Write-Host "🎉 That's it! Your app will be live!" -ForegroundColor Green
Write-Host ""

# Show package info
$packageSize = (Get-Item $packageName).Length / 1MB
Write-Host "📊 Package size: $([math]::Round($packageSize, 2)) MB" -ForegroundColor Cyan
Write-Host "📁 Package location: $((Get-Location).Path)\$packageName" -ForegroundColor Cyan

Write-Host ""
Write-Host "💡 Pro Tip: Keep this window open while you deploy!" -ForegroundColor Yellow
Write-Host "   You can refer back to these steps if needed." -ForegroundColor Yellow



