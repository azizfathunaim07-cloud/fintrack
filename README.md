# FinTrack Dashboard

Aplikasi dashboard keuangan berbasis HTML + CSS + JavaScript dengan potensi integrasi ke Supabase.

## Fitur

- Halaman dashboard dengan ringkasan pemasukan, pengeluaran, dan saldo
- Form transaksi untuk menambah data
- Mode demo agar aplikasi tetap dapat dibuka tanpa konfigurasi Supabase
- Persiapan integrasi Supabase Auth dan database

## Cara menjalankan

1. Buka folder project di terminal.
2. Jalankan server statis:

   ```bash
   python -m http.server 8000
   ```

3. Buka browser ke:

   ```text
   http://localhost:8000
   ```

## Setup Supabase

1. Buat project di Supabase.
2. Buka file `script.js` dan ganti nilai `appConfig.supabaseUrl` dan `appConfig.supabaseAnonKey`.
3. Buat tabel `transactions` di Supabase sesuai skema di folder `supabase/schema.sql`.
4. Aktifkan Authentication > Email Provider.
5. Ulangi langkah menjalankan aplikasi.

## Struktur file

- `index.html` : layout dashboard dan form
- `styles.css` : desain UI
- `script.js` : logika aplikasi dan koneksi Supabase
- `supabase/schema.sql` : skema database awal
