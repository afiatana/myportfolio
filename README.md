# 🚀 Modern Portfolio Website

Portfolio website interaktif dengan tema Matrix, dibangun menggunakan Next.js 15 dan TypeScript.

## ✨ Fitur

- 🎨 **Design Modern** dengan tema Matrix (hijau neon)
- ⚡ **Next.js 15** dengan Turbopack ultra-fast
- 🎯 **Admin Dashboard** untuk mengelola konten
- 📧 **Contact Form** terintegrasi dengan email
- 🎭 **Smooth Animations** & parallax effects
- 📱 **Fully Responsive** di semua perangkat
- 🔒 **Secure Authentication** untuk admin
- 🎨 **Auto-generated Icons** untuk skills/teknologi

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules
- **Email:** Nodemailer
- **Icons:** Simple Icons CDN + DevIcon
- **Deployment:** Vercel / Netlify

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Copy `.env.example` ke `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` dengan kredensial Anda:
```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password

# Secret Key
NEXT_PUBLIC_ADMIN_SECRET=random-secret-key
```

### 4. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 🔐 Admin Access

**Login URL:** `/admin/login`

Gunakan username dan password yang Anda set di`.env.local`

**Dashboard URL:** `/admin/dashboard`

### Fitur Admin Dashboard:
- ✏️ Edit Hero section
- 📝 Update About & Bio
- 💼 Manage Projects
- 🛠️ Add/Remove Skills dengan auto-generated icons
- 🔗 Update Social Media links

## 📧 Setup Email (Gmail)

1. Buka [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Generate **App Password**:
   - Pilih "Mail" & "Other device"
   - Copy password yang di-generate
4. Paste ke `EMAIL_PASS` di `.env.local`

## 🌐 Deployment

Lihat **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** untuk panduan lengkap deployment yang aman.

### Quick Deploy ke Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**PENTING:** Jangan lupa set Environment Variables di Vercel dashboard!

## 📁 Struktur Project

```
portfolio/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin dashboard & login
│   │   ├── api/            # API routes
│   │   └── page.tsx        # Homepage
│   ├── components/         # React components
│   ├── data/
│   │   └── content.json    # Portfolio content
│   └── lib/                # Utilities
├── public/
│   └── uploads/            # Uploaded files
├── .env.local              # Environment variables (PRIVATE)
├── .env.example            # Template environment variables
└── DEPLOYMENT_GUIDE.md     # Panduan deployment
```

## 🔒 Security

- ✅ `.env.local` **TIDAK** di-commit ke GitHub
- ✅ Passwords di-hash dan stored securely
- ✅ HTTP-only cookies untuk authentication
- ✅ Environment variables untuk kredensial
- ✅ CORS protection
- ✅ Input validation

## 📝 Content Management

Edit konten portfolio Anda melalui:
1. **Admin Dashboard** (`/admin/dashboard`) - Recommended
2. **Direct edit** `src/data/content.json` - Manual

## 🎨 Customization

### Mengubah Warna Tema:
Edit CSS variables di components (contoh: `#00FF41` untuk Matrix green)

### Menambah Skill Baru:
1. Login ke dashboard
2. Tab "Skills"
3. Pilih kategori (Frontend/Backend/Tools)
4. Klik "+ ADD SKILL"
5. Ketik nama teknologi → Icon auto-generated!

## 🆘 Troubleshooting

**Q: Contact form tidak mengirim email?**
- Cek `EMAIL_USER` dan `EMAIL_PASS` sudah benar
- Pastikan App Password (bukan password Gmail biasa)

**Q: Tidak bisa login admin?**
- Periksa `ADMIN_USERNAME` dan `ADMIN_PASSWORD` di `.env.local`
- Clear cookies browser

**Q: Icon skill tidak muncul?**
- Icon auto-generated dari nama skill
- Pastikan nama teknologi umum (React, PHP, MySQL, dll)

## 📄 License

MIT License - Bebas digunakan untuk portfolio pribadi

## 👨‍💻 Author

**Aaf Afiatna**
- Portfolio: [your-portfolio-url]
- LinkedIn: [your-linkedin]
- GitHub: [your-github]

---

**Happy Coding! 🚀**
