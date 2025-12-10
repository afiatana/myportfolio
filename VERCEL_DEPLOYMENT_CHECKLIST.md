# 🚀 Vercel Deployment Checklist

## ✅ Status: Code Sudah di GitHub
- ✅ Repository: https://github.com/afiatana/myportfolio.git
- ✅ File `.env.local` tidak ter-upload (AMAN!)
- ✅ File `.env.example` sudah ada di GitHub

---

## 📝 Environment Variables untuk Vercel

**⚠️ PENTING**: Anda perlu set 5 environment variables di Vercel Dashboard!

Copy nilai dari file `.env.local` Anda (yang ADA di komputer lokal Anda, BUKAN yang di GitHub).

### Daftar Environment Variables:

#### 1. EMAIL_USER
```
Name: EMAIL_USER
Value: [email gmail Anda, contoh: yourname@gmail.com]
Environment: ✅ Production, ✅ Preview, ✅ Development
```

#### 2. EMAIL_PASS
```
Name: EMAIL_PASS
Value: [App Password dari Gmail, BUKAN password biasa!]
Environment: ✅ Production, ✅ Preview, ✅ Development
```

**📌 Cara Dapat Gmail App Password:**
1. Buka: https://myaccount.google.com/security
2. Aktifkan **2-Step Verification** (jika belum)
3. Klik **App passwords**
4. Generate password untuk "Mail" / "Other"
5. Copy password yang muncul (16 karakter tanpa spasi)

#### 3. ADMIN_USERNAME
```
Name: ADMIN_USERNAME
Value: [username untuk login dashboard, contoh: admin]
Environment: ✅ Production, ✅ Preview, ✅ Development
```

#### 4. ADMIN_PASSWORD
```
Name: ADMIN_PASSWORD
Value: [password kuat untuk login dashboard]
Environment: ✅ Production, ✅ Preview, ✅ Development
```

**💡 Tips Password Kuat:**
- Minimal 12 karakter
- Kombinasi huruf besar, kecil, angka, dan simbol
- Contoh: `MyP0rtf0l!o2025`

#### 5. NEXT_PUBLIC_ADMIN_SECRET
```
Name: NEXT_PUBLIC_ADMIN_SECRET
Value: [string random untuk security, contoh: abc123xyz456def789]
Environment: ✅ Production, ✅ Preview, ✅ Development
```

---

## 🎯 Langkah Deploy di Vercel

### 1. Login/Sign Up ke Vercel
- Buka: https://vercel.com
- Klik **Sign Up** atau **Login**
- **Pilih: Continue with GitHub** (recommended!)
- Authorize Vercel

### 2. Import Project
- Klik **Add New...** → **Project**
- Cari repository: `afiatana/myportfolio`
- Klik **Import**

### 3. Configure Project
**Framework Preset**: Next.js (auto-detected) ✅

**Root Directory**: `./` (default) ✅

**Build Settings**:
- Build Command: `next build` ✅
- Output Directory: `.next` ✅
- Install Command: `npm install` ✅

### 4. Add Environment Variables ⚠️ CRITICAL!
Klik **Environment Variables** tab, lalu tambahkan satu per satu:

Untuk SETIAP variable:
1. Ketik **Name** (lihat daftar di atas)
2. Ketik **Value** (dari file `.env.local` Anda)
3. **✅ Centang semua**: Production, Preview, Development
4. Klik **Add**

**Ulangi untuk semua 5 variables!**

### 5. Deploy!
- Setelah semua environment variables selesai
- Klik tombol **Deploy**
- Tunggu 2-5 menit (build process)

### 6. Troubleshooting Jika Ada Error

#### Error: "MODULE_NOT_FOUND"
**Penyebab**: Dependency tidak lengkap
**Solusi**: 
- Check package.json sudah di-push ke GitHub
- Vercel akan otomatis npm install

#### Error: "Environment variable not found"
**Penyebab**: Environment variables belum di-set
**Solusi**:
- Vercel Dashboard → Settings → Environment Variables
- Tambahkan yang kurang
- Redeploy

#### Error: Build failed di "Next.js compilation"
**Penyebab**: Ada TypeScript error atau syntax error
**Solusi**:
- Lihat detail error di Vercel build log
- Fix error di local
- Push ke GitHub (akan auto-redeploy)

#### Error: "SMTP connection failed"
**Penyebab**: EMAIL_PASS salah atau bukan App Password
**Solusi**:
- Pastikan gunakan **App Password** dari Gmail (bukan password biasa)
- Re-generate App Password
- Update di Vercel environment variables
- Redeploy

---

## ✅ Checklist Setelah Deploy Berhasil

- [ ] Website bisa diakses (https://your-project.vercel.app)
- [ ] Halaman home tampil dengan benar
- [ ] Semua section: About, Projects, Skills, Contact tampil
- [ ] Test Admin Login: `https://your-project.vercel.app/admin/login`
- [ ] Bisa login dengan username/password yang di-set
- [ ] Dashboard admin berfungsi
- [ ] Test Contact Form: kirim pesan test
- [ ] Email masuk ke inbox (atau spam)

---

## 🔄 Update Portfolio di Masa Depan

Setiap kali Anda push ke GitHub, Vercel akan otomatis deploy ulang:

```bash
# 1. Edit file yang diperlukan
# 2. Commit
git add .
git commit -m "Update portfolio: [deskripsi perubahan]"

# 3. Push
git push

# Vercel otomatis deploy! 🚀
```

---

## 📞 URL Penting Setelah Deploy

**Production URL**: `https://[your-project-name].vercel.app`
**Admin Login**: `https://[your-project-name].vercel.app/admin/login`
**Vercel Dashboard**: https://vercel.com/dashboard

---

**Good luck! 🎉**
