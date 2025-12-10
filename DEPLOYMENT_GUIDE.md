# 🔒 Panduan Deployment Aman ke GitHub & Hosting

## ✅ Keamanan File `.env.local`

### 1. **File Sudah Aman**
File `.env.local` **TIDAK AKAN** ter-upload ke GitHub karena sudah ada di `.gitignore`:
```
.env*        # Block semua file .env
!.env.example # Tapi izinkan .env.example
```

### 2. **File yang Akan Di-commit ke GitHub:**
- ✅ `.env.example` - Template tanpa data sensitif
- ❌ `.env.local` - **TIDAK** akan ter-commit (aman!)

---

## 🔐 Setup Kredensial Admin

### 1. **Edit File `.env.local` Lokal Anda**
Buka file `.env.local` dan atur:
```bash
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Admin Credentials
ADMIN_USERNAME=admin          # Ganti dengan username pilihan Anda
ADMIN_PASSWORD=YourPassword123! # Ganti dengan password kuat

# Secret Key (generate random string)
NEXT_PUBLIC_ADMIN_SECRET=random-secret-key-here
```

### 2. **Kredensial yang Kuat**
- Username: min 4 karakter
- Password: min 8 karakter, kombinasi huruf, angka, simbol
- Contoh password kuat: `MyP0rtf0l!o2025`

---

## 🚀 Deployment ke GitHub

### **A. Deploy ke Vercel (Recommended)**

1. **Push ke GitHub:**
   ```bash
   git add .
   git commit -m "Portfolio website ready"
   git push origin main
   ```

2. **Deploy di Vercel:**
   - Buka [vercel.com](https://vercel.com)
   - Login dengan GitHub
   - Import repository Anda
   - **PENTING**: Set Environment Variables di Vercel:
     ```
     ADMIN_USERNAME=admin
     ADMIN_PASSWORD=your-secure-password
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-app-password
     ```
   - Klik "Deploy"

3. **Akses Admin:**
   - Production URL: `https://your-site.vercel.app/admin/login`

---

### **B. Deploy ke Netlify**

1. **Push ke GitHub** (sama seperti di atas)

2. **Deploy di Netlify:**
   - Buka [netlify.com](https://netlify.com)
   - Login dan import repository
   - **Build settings:**
     - Build command: `npm run build`
     - Publish directory: `.next`
   - **Environment Variables:**
     ```
     ADMIN_USERNAME=admin
     ADMIN_PASSWORD=your-secure-password
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-app-password
     ```
   - Deploy!

---

### **C. Deploy ke GitHub Pages (Catatan)**

⚠️ **GitHub Pages hanya untuk static sites**. Karena portfolio ini menggunakan Next.js dengan API routes (server-side), Anda perlu:
- Gunakan Vercel/Netlify (recommended), atau
- Export sebagai static site (tapi fitur admin & contact form tidak akan berfungsi)

---

## 🔍 Cara Cek Keamanan

### **1. Cek .gitignore Sudah Benar:**
```bash
git status
```
Pastikan `.env.local` **TIDAK** muncul di list files to commit.

### **2. Cek GitHub Repository:**
Setelah push, buka repository di GitHub dan pastikan:
- ✅ Ada file `.env.example`
- ❌ **TIDAK ADA** `.env.local`

### **3. Test Login:**
- Akses: `https://your-site.com/admin/login`
- Masukkan username & password yang Anda set di environment variables
- Harus bisa login dan akses dashboard

---

## 📝 Checklist Deployment

- [ ] File `.env.local` sudah diisi dengan kredensial yang kuat
- [ ] File `.gitignore` sudah mencakup `.env*`
- [ ] Push code ke GitHub
- [ ] Set environment variables di platform hosting (Vercel/Netlify)
- [ ] Test website bisa diakses
- [ ] Test login admin berhasil
- [ ] Test contact form berfungsi
- [ ] Test dashboard admin berfungsi

---

## 🛡️ Tips Keamanan Tambahan

1. **Password Kuat:**
   - Minimal 12 karakter
   - Kombinasi huruf besar, kecil, angka, simbol
   - Jangan gunakan password yang sama dengan akun lain

2. **Update Berkala:**
   - Ganti password admin setiap 3-6 bulan
   - Update dependencies secara berkala

3. **Backup:**
   - Simpan kredensial di password manager (1Password, Bitwarden, dll)
   - Jangan simpan kredensial di notes yang tidak terenkripsi

4. **Monitoring:**
   - Cek analytics untuk aktivitas mencurigakan
   - Monitor login attempts di dashboard

---

## 🆘 Troubleshooting

### **Q: Lupa password admin?**
A: Update environment variable di Vercel/Netlify, lalu redeploy.

### **Q: Login tidak berfungsi setelah deploy?**
A: Pastikan environment variables sudah di-set di platform hosting.

### **Q: File .env.local ter-upload ke GitHub?**
A: **SEGERA HAPUS!** 
```bash
git rm --cached .env.local
git commit -m "Remove sensitive file"
git push origin main
```
Lalu ganti semua password yang ada di file tersebut!

---

## 📞 Login Admin

**URL:** `https://your-site.com/admin/login`

**Kredensial:** 
- Username: [Lihat di .env.local atau Vercel/Netlify dashboard]
- Password: [Lihat di .env.local atau Vercel/Netlify dashboard]

---

**Selamat! Portfolio Anda sekarang aman dan siap di-deploy! 🚀**
