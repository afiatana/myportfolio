---
description: Auto-deploy portfolio ke GitHub dan Vercel
---

# 🚀 Auto Deploy Workflow

Workflow ini akan otomatis deploy perubahan Anda ke GitHub dan Vercel.

## Persiapan (Hanya Sekali)

### 1. Setup GitHub Repository
```bash
# Jika belum ada repository
git init
git remote add origin https://github.com/username/portfolio.git
```

### 2. Setup Vercel
- Buka https://vercel.com
- Login dengan GitHub
- Import repository portfolio Anda
- Vercel akan otomatis deploy setiap kali ada push ke GitHub

### 3. Set Environment Variables di Vercel
Di Vercel dashboard → Settings → Environment Variables, tambahkan:
```
ADMIN_USERNAME=your-username
ADMIN_PASSWORD=your-password
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
NEXT_PUBLIC_ADMIN_SECRET=your-secret-key
```

## Cara Menggunakan Auto-Deploy

### Opsi 1: Menggunakan PowerShell Script (Recommended)

// turbo-all

1. Jalankan tanpa pesan commit (akan auto-generate timestamp):
```bash
./auto-deploy.ps1
```

2. Atau dengan custom commit message:
```bash
./auto-deploy.ps1 "Update homepage design"
```

### Opsi 2: Menggunakan NPM Script

// turbo-all

1. Quick deploy (auto-generated message):
```bash
npm run deploy
```

2. Deploy dengan custom message:
```bash
npm run deploy:msg "Your commit message here"
```

### Opsi 3: Manual (Cara Tradisional)

1. Add changes:
```bash
git add .
```

2. Commit changes:
```bash
git commit -m "Your commit message"
```

3. Push to GitHub:
```bash
git push origin main
```

## Apa yang Terjadi?

1. ✅ **Script akan:**
   - Check ada perubahan atau tidak
   - Add semua file yang berubah (kecuali yang ada di .gitignore)
   - Commit dengan message yang Anda tentukan
   - Push ke GitHub repository

2. ✅ **Vercel akan otomatis:**
   - Detect push baru di GitHub
   - Mulai build portfolio Anda
   - Deploy ke production (biasanya 1-2 menit)
   - Send notifikasi deployment success/failed

3. ✅ **Keamanan:**
   - File `.env.local` TIDAK akan ter-upload (sudah di .gitignore)
   - Environment variables aman di Vercel dashboard
   - Kredensial email dan admin tetap private

## Monitoring Deployment

### Cek Status di Vercel:
- Dashboard: https://vercel.com/dashboard
- Lihat deployment logs real-time
- Cek error jika ada masalah

### Cek di GitHub:
- Repository: https://github.com/username/portfolio
- Lihat commit history
- Cek GitHub Actions (jika ada)

## Tips & Tricks

### 1. Auto-Deploy Setelah Edit
Buat habit untuk run script setiap selesai edit:
```bash
# Edit files...
./auto-deploy.ps1 "Update About section"
```

### 2. Setup Alias (Optional)
Tambahkan di PowerShell profile untuk shortcut:
```powershell
Set-Alias deploy "C:\path\to\portfolio\auto-deploy.ps1"

# Lalu cukup ketik:
deploy
```

### 3. Schedule Auto-Deploy (Advanced)
Bisa setup Windows Task Scheduler untuk auto-deploy setiap X jam.

## Troubleshooting

### ❌ "Error pushing to GitHub"
**Solusi:**
1. Pastikan sudah login: `git config --global user.name "Your Name"`
2. Setup credential: `git config --global user.email "your@email.com"`
3. Atau gunakan GitHub Desktop

### ❌ "Vercel deployment failed"
**Solusi:**
1. Cek Vercel dashboard untuk error details
2. Pastikan environment variables sudah di-set
3. Cek build logs di Vercel

### ❌ "No changes to commit"
**Info:** Tidak ada perubahan untuk di-deploy. Ini normal!

## Workflow Lengkap

```
1. Edit code/content lokal
   ↓
2. Save files
   ↓
3. Run: ./auto-deploy.ps1 "description"
   ↓
4. Script auto:
   - git add .
   - git commit
   - git push
   ↓
5. GitHub menerima push
   ↓
6. Vercel detect & auto-deploy
   ↓
7. Website live dalam 1-2 menit! 🚀
```

---

**Sekarang Anda bisa update portfolio dengan 1 command saja!** 🎉
