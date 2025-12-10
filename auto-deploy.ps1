# ========================================
# AUTO DEPLOY SCRIPT
# ========================================
# Script ini akan otomatis:
# 1. Add semua perubahan
# 2. Commit dengan timestamp
# 3. Push ke GitHub
# 4. Vercel akan auto-deploy dari GitHub
# ========================================

param(
    [string]$message = ""
)

Write-Host "Starting Auto-Deploy..." -ForegroundColor Cyan
Write-Host ""

# 1. Check if there are changes
Write-Host "Checking for changes..." -ForegroundColor Yellow
git status --porcelain

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error checking git status" -ForegroundColor Red
    exit 1
}

$changes = git status --porcelain
if ([string]::IsNullOrWhiteSpace($changes)) {
    Write-Host "No changes to commit. Repository is up to date!" -ForegroundColor Green
    exit 0
}

# 2. Add all changes (kecuali yang di .gitignore)
Write-Host ""
Write-Host "Adding changes..." -ForegroundColor Yellow
git add .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error adding files" -ForegroundColor Red
    exit 1
}

# 3. Create commit message
if ([string]::IsNullOrWhiteSpace($message)) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $commitMessage = "Auto-update: $timestamp"
}
else {
    $commitMessage = $message
}

Write-Host ""
Write-Host "Commit message: $commitMessage" -ForegroundColor Cyan

# 4. Commit changes
Write-Host ""
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m $commitMessage

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error committing changes" -ForegroundColor Red
    exit 1
}

# 5. Push to GitHub
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error pushing to GitHub" -ForegroundColor Red
    Write-Host "Pastikan Anda sudah login ke GitHub dan repository sudah di-setup!" -ForegroundColor Yellow
    exit 1
}

# 6. Success!
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "AUTO-DEPLOY BERHASIL!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Changes pushed to GitHub successfully!" -ForegroundColor Green
Write-Host "Vercel akan auto-deploy dalam beberapa detik..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Cek status deployment di:" -ForegroundColor Yellow
Write-Host "https://vercel.com/dashboard" -ForegroundColor White
Write-Host ""
