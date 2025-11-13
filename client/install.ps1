# Posterco.tv Next.js Setup Script
# Run this from the posterco.tv root directory

Write-Host "🚀 Setting up Posterco.tv Next.js Project..." -ForegroundColor Cyan

# Create public directories
Write-Host "`n📁 Creating public directories..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "client\public\animations" -Force | Out-Null
New-Item -ItemType Directory -Path "client\public\fonts" -Force | Out-Null
New-Item -ItemType Directory -Path "client\public\images" -Force | Out-Null
New-Item -ItemType Directory -Path "client\public\images\about" -Force | Out-Null

# Copy Lottie animation
Write-Host "`n🎬 Copying Lottie animation..." -ForegroundColor Yellow
if (Test-Path "assets\img\intro-animation.json") {
    Copy-Item "assets\img\intro-animation.json" "client\public\animations\intro-animation.json" -Force
    Write-Host "   ✓ intro-animation.json copied" -ForegroundColor Green
} else {
    Write-Host "   ✗ intro-animation.json not found" -ForegroundColor Red
}

# Copy fonts
Write-Host "`n🔤 Copying fonts..." -ForegroundColor Yellow
if (Test-Path "assets\fonts\monument-extended-bold.woff2") {
    Copy-Item "assets\fonts\monument-extended-bold.woff2" "client\public\fonts\monument-extended-bold.woff2" -Force
    Write-Host "   ✓ monument-extended-bold.woff2 copied" -ForegroundColor Green
} else {
    Write-Host "   ✗ Font file not found" -ForegroundColor Red
}

# Copy logos
Write-Host "`n🎨 Copying logos..." -ForegroundColor Yellow
if (Test-Path "assets\img\poster-logo-bolder.svg") {
    Copy-Item "assets\img\poster-logo-bolder.svg" "client\public\images\poster-logo-bolder.svg" -Force
    Write-Host "   ✓ poster-logo-bolder.svg copied" -ForegroundColor Green
}
if (Test-Path "assets\img\poster-logo-dark-bolder.svg") {
    Copy-Item "assets\img\poster-logo-dark-bolder.svg" "client\public\images\poster-logo-dark-bolder.svg" -Force
    Write-Host "   ✓ poster-logo-dark-bolder.svg copied" -ForegroundColor Green
}

# Install npm packages
Write-Host "`n📦 Installing npm packages..." -ForegroundColor Yellow
Set-Location "client"
npm install

Write-Host "`n✨ Setup complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "  1. cd client" -ForegroundColor White
Write-Host "  2. npm run dev" -ForegroundColor White
Write-Host "  3. Open http://localhost:3000" -ForegroundColor White
Write-Host "`n🎉 Happy coding!" -ForegroundColor Magenta
