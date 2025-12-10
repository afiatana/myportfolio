---
description: Deploy Portfolio ke GitHub dan Vercel
---

# 🚀 Workflow: Deploy Portfolio ke GitHub dan Vercel

## Langkah 1: Persiapan Sebelum Push ke GitHub

### 1.1 Cek file .env.local sudah tidak akan ter-commit
```bash
git status
```
**✅ Pastikan**: File `.env.local` **TIDAK ADA** di output (sudah di-ignore)

### 1.2 Commit semua perubahan
// turbo
```bash
git add .
```

```bash
git commit -m "Ready for deployment: complete portfolio with admin dashboard"
```

## Langkah 2: Setup GitHub Repository

### 2.1 Buat Repository Baru di GitHub
1. Buka https://github.com/new
2. Nama repository: **my-portfolio** (atau nama pilihan Anda)
3. Pilih **Private** atau **Public** (terserah Anda)
4. ❌ **JANGAN** centang "Initialize with README" (kita sudah punya)
5. Klik **Create repository**

### 2.2 Connect Local ke GitHub
Setelah repository dibuat, GitHub akan menampilkan URL. Copy URL tersebut, lalu jalankan:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Contoh:**
```bash
git remote add origin https://github.com/johndoe/my-portfolio.git
```

### 2.3 Push ke GitHub
```bash
git branch -M main
git push -u origin main
```

**⚠️ Catatan**: Mungkin akan diminta login GitHub. Ikuti instruksi yang muncul.

## Langkah 3: Deploy ke Vercel

### 3.1 Login ke Vercel
1. Buka https://vercel.com
2. Klik **Sign Up** atau **Login**
3. Pilih **Continue with GitHub**
4. Authorize Vercel untuk akses repository Anda

### 3.2 Import Project
1. Klik tombol **Add New...** → **Project**
2. Pilih repository **my-portfolio** (atau nama yang Anda buat)
3. Klik **Import**

### 3.3 Configure Project

**Framework Preset**: Next.js (sudah otomatis terdeteksi)

**Build Settings** (biarkan default):
- Build Command: `next build` atau `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 3.4 **PENTING!** Set Environment Variables

Klik **Environment Variables**, lalu tambahkan satu per satu:

| Name | Value |
|------|-------|
| `ADMIN_USERNAME` | admin (atau username pilihan Anda) |
| `ADMIN_PASSWORD` | YourStrongPassword123! |
| `EMAIL_USER` | your-email@gmail.com |
| `EMAIL_PASS` | your-gmail-app-password |
| `NEXT_PUBLIC_ADMIN_SECRET` | any-random-secret-string |

**✅ Untuk setiap variable:**
1. Environment: Centang **Production**, **Preview**, dan **Development**
2. Klik **Add**

### 3.5 Deploy!
1. Setelah environment variables selesai, klik **Deploy**
2. Tunggu 2-5 menit (Vercel akan build project Anda)
3. Setelah selesai, akan muncul **"Congratulations!"**

## Langkah 4: Test Deployment

### 4.1 Buka Production URL
Klik tombol **Visit** atau copy URL (contoh: `https://my-portfolio-abc123.vercel.app`)

### 4.2 Test Halaman Utama
- Pastikan website muncul dengan benar
- Cek semua section: About, Projects, Skills, Contact

### 4.3 Test Admin Login
1. Buka: `https://your-site.vercel.app/admin/login`
2. Masukkan username dan password yang Anda set di environment variables
3. **✅ Harus bisa login** dan masuk ke dashboard

### 4.4 Test Contact Form
1. Isi form contact dengan email Anda
2. Submit
3. Cek email masuk (mungkin di folder spam)

## Troubleshooting Vercel Deployment Errors

### Error 1: Build Failed - Module Not Found
**Solusi**: Pastikan semua dependencies sudah di-commit
```bash
git add package.json package-lock.json
git commit -m "Add dependencies"
git push
```

### Error 2: Environment Variables Not Working
**Solusi**: 
1. Ke Vercel Dashboard → Settings → Environment Variables
2. Pastikan semua 5 variables sudah ada
3. Klik **Redeploy** di tab Deployments

### Error 3: "Internal Server Error" di Admin/Contact
**Solusi**: Cek environment variables:
- `EMAIL_USER` harus email lengkap (@gmail.com)
- `EMAIL_PASS` harus **App Password** dari Gmail (bukan password biasa)

**Cara buat Gmail App Password:**
1. Google Account → Security
2. 2-Step Verification (harus aktif dulu)
3. App passwords → Generate password
4. Copy dan paste ke Vercel

### Error 4: Cannot Push to GitHub
**Solusi**: Jika diminta authentication:
```bash
# Install GitHub CLI (jika belum)
# Atau gunakan Personal Access Token:
# https://github.com/settings/tokens
```

## Langkah 5: Custom Domain (Opsional)

### Jika Anda Punya Domain Sendiri:
1. Vercel Dashboard → Project Settings → Domains
2. Add domain Anda (contoh: `yourname.com`)
3. Ikuti instruksi DNS configuration
4. Tunggu propagasi (1-48 jam)

## ✅ Checklist Final

- [ ] Code ter-push ke GitHub
- [ ] `.env.local` **TIDAK** ada di GitHub
- [ ] Project berhasil deploy di Vercel
- [ ] Website bisa diakses
- [ ] Admin login berfungsi
- [ ] Contact form berfungsi
- [ ] Environment variables sudah di-set di Vercel

---

## 🎉 Selamat! 

Portfolio Anda sekarang live di internet!

**URL Production**: `https://your-project.vercel.app`
**Admin Panel**: `https://your-project.vercel.app/admin/login`

### Update Portfolio di Masa Depan:
```bash
# 1. Edit file yang diperlukan
# 2. Commit dan push
git add .
git commit -m "Update portfolio content"
git push

# Vercel akan otomatis deploy ulang! 🚀
```
