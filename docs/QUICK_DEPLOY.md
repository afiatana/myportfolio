# 🚀 Quick Deploy Guide

## Setup Auto-Deployment (Sekali Saja)

### 1️⃣ Setup GitHub Repository
```bash
# Jika belum ada repository, buat di https://github.com/new
# Lalu jalankan:
git init
git remote add origin https://github.com/USERNAME/REPO-NAME.git
```

### 2️⃣ Setup Vercel
1. Buka https://vercel.com
2. Login dengan GitHub
3. Klik "Import Project"
4. Pilih repository portfolio Anda
5. **PENTING**: Set Environment Variables:
   - `ADMIN_USERNAME` = username admin Anda
   - `ADMIN_PASSWORD` = password admin Anda
   - `EMAIL_USER` = email Gmail Anda
   - `EMAIL_PASS` = App Password Gmail
   - `NEXT_PUBLIC_ADMIN_SECRET` = secret key random
6. Klik "Deploy"

✅ **Setup selesai!** Selanjutnya Vercel akan auto-deploy setiap kali ada push ke GitHub.

---

## 📤 Cara Deploy Perubahan

Setelah edit file, pilih salah satu cara:

### 🎯 Cara 1: Auto-Deploy dengan NPM (Termudah!)
```bash
npm run deploy
```

### 🎯 Cara 2: Auto-Deploy dengan Custom Message
```bash
./auto-deploy.ps1 "Update homepage design"
```

### 🎯 Cara 3: Manual
```bash
git add .
git commit -m "Your message"
git push origin main
```

---

## ⏱️ Timeline Deploy

```
1. Run deploy command         → 1 detik
2. Push ke GitHub             → 2-5 detik
3. Vercel detect & build      → 30-60 detik
4. Website live! 🎉           → Total ~1-2 menit
```

---

## 🔔 Monitoring

- **GitHub**: https://github.com/USERNAME/REPO-NAME
- **Vercel**: https://vercel.com/dashboard
- **Live Site**: https://SITENAME.vercel.app

---

## 🔒 Keamanan

✅ File `.env.local` TIDAK akan ter-upload (sudah di `.gitignore`)  
✅ Kredensial aman di Vercel dashboard  
✅ Email & password tetap private  

---

## 🆘 Troubleshooting

### ❌ Error: "Permission denied"
```bash
# Enable execution policy
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### ❌ Error: "No remote origin"
```bash
git remote add origin https://github.com/USERNAME/REPO.git
```

### ❌ Vercel deployment failed
1. Cek Vercel dashboard → Deployments
2. Lihat error logs
3. Pastikan environment variables sudah di-set

---

## 📝 Workflow Harian

```
1. Buka VSCode
2. Edit file yang mau diubah
3. Save (Ctrl+S)
4. Run: npm run deploy
5. Done! Website update dalam 1-2 menit
```

**Sesimpel itu! 🚀**
