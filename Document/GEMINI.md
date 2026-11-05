# CLAUDE.md / GEMINI.md

Pintu masuk untuk AI coding assistant. Baca file ini sampai habis, lalu baca file rujukan di bagian "Urutan membaca" sebelum menulis kode.

## Gambaran proyek

**Split Bill**: aplikasi untuk membagi tagihan makan ke beberapa orang, termasuk menu patungan, diskon, service, dan pajak.

- Frontend only, satu halaman, tanpa backend dan tanpa login.
- Data disimpan di localStorage (key `splitbill:v1`).
- Semua teks UI berbahasa Indonesia. Nama variabel dan komentar kode boleh bahasa Inggris.
- Target: HP 375px dan desktop, dengan layout yang berbeda untuk masing-masing.

## Tech stack ringkas

React 18 + Vite, JavaScript (bukan TypeScript), Tailwind CSS v4, lucide-react, helper `clsx` + `tailwind-merge`, state dengan `useReducer` + Context. Detail ada di `TECH_STACK.md`.

## Perintah

```bash
npm install        # pasang dependency
npm run dev        # jalankan dev server
npm run build      # build produksi, harus lolos tanpa error
npm run preview    # cek hasil build
```

## Urutan membaca

1. `TECH_STACK.md`: tool yang boleh dipakai
2. `RESTRICTIONS.md`: hal yang dilarang
3. `FOLDER_STRUCTURE.md`: di mana file diletakkan
4. `ARCHITECTURE.md`: model data, state, aturan hitung
5. `DESIGN.md`: warna, tipografi, responsive, perilaku UI
6. `WORKFLOW.md`: cara kerja dan format laporan
7. `TASKS.md`: daftar pekerjaan, kerjakan berurutan

## Aturan inti (jangan dilanggar)

1. **Satu fitur per langkah.** Ambil tugas pertama yang belum dicentang di `TASKS.md`.
2. **Tanpa dependency baru** di luar `TECH_STACK.md` tanpa izin.
3. **Logika hitung hanya di `src/utils/calculate.js`**, berupa fungsi murni (tanpa React, tanpa DOM).
4. **Uang selalu integer rupiah.** Tampilkan lewat `formatRupiah()`, contoh `Rp 25.000`.
5. **Jangan ubah bentuk data** di `ARCHITECTURE.md` tanpa izin.
6. **Jangan hapus atau tulis ulang** kode yang tidak berkaitan dengan tugas.
7. **Jangan mengaku sudah diuji** kalau belum dijalankan.

## Ringkasan model data

```js
{
  people: [{ id, name }],
  items:  [{ id, name, price, qty, sharedBy: [personId] }],
  charges: {
    discount: { type: "percent" | "amount", value },
    service:  { type: "percent" | "amount", value },
    tax:      { type: "percent" | "amount", value }
  }
}
```

## Ringkasan aturan hitung

- Subtotal item = harga x qty, dibagi rata ke peserta di `sharedBy`.
- Urutan: subtotal, diskon, service, pajak. Ketiganya dibagi proporsional ke subtotal tiap orang.
- Dibulatkan ke rupiah, selisih pembulatan masuk ke peserta dengan porsi terbesar sehingga jumlah semua orang = grand total.
- Item tanpa peserta tidak dihitung dan harus diberi peringatan.

## Konvensi kode

- Functional component + hooks. Nama komponen PascalCase, hooks diawali `use`.
- Satu komponen satu file, nama file sama dengan nama komponen.
- Styling dengan Tailwind langsung di JSX, hindari file CSS tambahan.
- Komponen di `components/ui/` tidak boleh tahu soal data bill.
- Tombol ikon wajib punya `aria-label`.
- Tidak ada `console.log` yang tersisa.

## Ringkasan UI

- **Gaya**: Soft neo-brutalism (latar krem, kartu outline hitam 2px, aksen kuning-amber, kartu hitam untuk total, potongan tiket/notch struk). Komponen meniru shadcn/ui tetapi ditulis sendiri.
- **Layout mobile dan desktop berbeda**:
  - **Mobile (< 1024px)**: Alur bertahap Peserta, Pesanan, Biaya, Hasil dengan stepper, BottomSheet, dan bottom bar tetap.
  - **Desktop (≥ 1024px)**: Dashboard 3 panel sejajar di bagian atas, lebar penuh (`w-full px-6 lg:px-8`), pas layar tanpa scroll kosong, dan panel ringkasan kanan mengambang mulus (*sticky top-20 self-start*).
- **Biaya Tambahan**: Akordion collapsible dengan panah buka-tutup dan badge ringkasan saat ditutup.
- **Salin untuk WhatsApp**: Rincian matematika lengkap transparan (daftar menu, subtotal, potongan diskon, service, pajak, porsi tiap orang, dan grand total).
- **Mode Gelap**: Menggunakan class `dark`, default mengikuti preferensi sistem, tersimpan di `splitbill:theme`.

## Definisi selesai

Sebuah tugas dianggap selesai kalau:

- [ ] Berjalan di `npm run dev` tanpa error di console
- [ ] `npm run build` lolos
- [ ] Tampilan rapi di 375px dan desktop
- [ ] Data tetap ada setelah refresh (jika menyangkut data)
- [ ] Tugas dicentang di `TASKS.md`
