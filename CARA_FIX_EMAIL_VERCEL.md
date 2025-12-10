
# Cara Memperbaiki Masalah Email "Failed" di Vercel

Masalah "Failed, Try Again" saat mengirim pesan di website versi live (Vercel) terjadi karena **Vercel tidak membaca file `.env` di komputer Anda** demi alasan keamanan.

Anda harus memasukkan Email dan Password secara manual di dashboard Vercel.

### Langkah-langkah:

1.  Buka dashboard Vercel Anda: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2.  Pilih project portfolio Anda.
3.  Klik tab **Settings** (Pengaturan) di bagian atas.
4.  Di menu sebelah kiri, pilih **Environment Variables**.
5.  Masukkan data berikut satu per satu:

    **Environment Variable 1:**
    *   **Key:** `EMAIL_USER`
    *   **Value:** (Masukkan alamat email gmail Anda, contoh: `emailanda@gmail.com`)
    *   Klik **Save** / **Add**.

    **Environment Variable 2:**
    *   **Key:** `EMAIL_PASS`
    *   **Value:** (Masukkan 16 digit App Password/Sandi Aplikasi yang Anda buat di Google, contoh: `abcd efgh ijkl mnop`)
    *   Klik **Save** / **Add**.

6.  **PENTING:** Setelah menyimpan, Anda harus men-deploy ulang agar perubahan berlaku.
    *   Buka tab **Deployments**.
    *   Klik titik tiga pada deployment terbaru, lalu pilih **Redeploy**.
    *   Atau cukup lakukan perubahan kecil pada kode (seperti yang baru saya lakukan pada foto profil) dan jalankan `npm run deploy` dari terminal Anda.

Setelah proses redeploy selesai, fitur kirim pesan akan berfungsi normal.
