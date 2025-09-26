# MTV Tech Solutions - Deployment Script for Windows PowerShell
# This script packages your project for cPanel deployment

Write-Host "🚀 MTV Tech Solutions - Deployment Package Creator" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "server.js")) {
    Write-Host "❌ Error: server.js not found. Run this script from your project root." -ForegroundColor Red
    exit 1
}

# Create deployment package
$packageName = "mtvtechsolutions-deploy-$(Get-Date -Format 'yyyyMMdd-HHmm').zip"

Write-Host "📦 Creating deployment package: $packageName" -ForegroundColor Yellow

# Files to include in deployment
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

# Check which files exist
$existingFiles = @()
foreach ($file in $filesToInclude) {
    if (Test-Path $file) {
        $existingFiles += $file
        Write-Host "✅ Including: $file" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Missing: $file" -ForegroundColor Yellow
    }
}

# Create the zip file
try {
    Compress-Archive -Path $existingFiles -DestinationPath $packageName -Force
    Write-Host "✅ Deployment package created: $packageName" -ForegroundColor Green
} catch {
    Write-Host "❌ Error creating package: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Show package info
$packageSize = (Get-Item $packageName).Length / 1MB
Write-Host "📊 Package size: $([math]::Round($packageSize, 2)) MB" -ForegroundColor Cyan

Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Green
Write-Host "1. Upload $packageName to your cPanel File Manager" -ForegroundColor White
Write-Host "2. Extract it in your home directory (not public_html)" -ForegroundColor White
Write-Host "3. Follow the README_DEPLOY.md guide" -ForegroundColor White
Write-Host "4. Use DEPLOYMENT_CHECKLIST.md to verify everything" -ForegroundColor White

Write-Host ""
Write-Host "🔑 Don't forget to:" -ForegroundColor Yellow
Write-Host "- Get your live Stripe keys from https://dashboard.stripe.com/apikeys" -ForegroundColor White
Write-Host "- Set up webhook endpoint: https://mtvtechsolutions.com/webhook" -ForegroundColor White
Write-Host "- Configure environment variables in cPanel" -ForegroundColor White

Write-Host ""
Write-Host "🌐 Your app will be live at: https://mtvtechsolutions.com" -ForegroundColor Green



