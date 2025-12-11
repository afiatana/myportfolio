# 📋 Checklist Sebelum Push ke GitHub

## ✅ Yang Perlu Dilakukan:

### 1. **Cek File .env.local Sudah Terisi**
```bash
# Buka .env.local dan pastikan sudah diisi:
ADMIN_USERNAME=admin          # Username pilihan Anda
ADMIN_PASSWORD=Password123!   # Password kuat pilihan Anda
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 2. **Test Login Lokal**
```bash
# Jalankan development server
npm run dev

# Buka browser:
http://localhost:3000/admin/login

# Test login dengan kredensial dari .env.local
# Pastikan berhasil masuk dashboard
```

### 3. **Verifikasi .gitignore**
```bash
# Cek file .gitignore sudah benar:
cat .gitignore | grep "env"

# Harus ada baris:
.env*
!.env.example
```

### 4. **Cek File yang Akan Di-commit**
```bash
git status

# PASTIKAN .env.local TIDAK ADA di list!
# Yang boleh ada:
# - .env.example ✅
# - src/ ✅
# - public/ (kecuali uploads/) ✅
# - dll ✅
```

### 5. **Push ke GitHub**
```bash
git add .
git commit -m "Initial commit - Portfolio website"
git push origin main
```

### 6. **Cek GitHub Repository**
Buka repository di GitHub, PASTIKAN:
- ❌ **TIDAK ADA** file `.env.local`
- ✅ **ADA** file `.env.example`

---

## 🚀 Deploy ke Vercel

### 1. **Import Project**
- Buka https://vercel.com
- Login dengan GitHub
- Klik "Add New Project"
- Import repository Anda

### 2. **Set Environment Variables** ⚠️ PENTING!
Klik "Environment Variables" dan tambahkan:

```
ADMIN_USERNAME = admin
ADMIN_PASSWORD = YourSecurePassword123!
EMAIL_USER = your-email@gmail.com
EMAIL_PASS = your-gmail-app-password
NEXT_PUBLIC_ADMIN_SECRET = any-random-string-here
```

### 3. **Deploy**
- Klik "Deploy"
- Tunggu beberapa menit
- Buka URL yang diberikan

### 4. **Test Production**
```
https://your-site.vercel.app/admin/login
```
Login dengan kredensial yang sama!

---

## 🛡️ SECURITY CHECKLIST

- [ ] File `.env.local` **TIDAK** di-commit ke GitHub
- [ ] `.gitignore` sudah mencakup `.env*`
- [ ] Environment variables sudah di-set di Vercel
- [ ] Password admin sudah diganti dari default
- [ ] Test login berhasil di production
- [ ] Contact form berfungsi
- [ ] Kredensial disimpan di password manager

---

## ⚠️ JIKA ADA MASALAH

### File .env.local Ter-upload ke GitHub?
**SEGERA HAPUS!**
```bash
# Hapus dari git
git rm --cached .env.local
git commit -m "Remove sensitive file"
git push origin main

# Ganti SEMUA password yang ada di file tersebut!
```

### Environment Variables Terlupa?
```bash
# Login ke Vercel Dashboard
# Settings > Environment Variables
# Tambahkan yang kurang
# Redeploy project
```

---

**Setelah Checklist Ini Selesai, Portfolio Anda Siap Online! 🎉**
