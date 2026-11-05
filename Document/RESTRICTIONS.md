# RESTRICTIONS

Larangan keras untuk AI. Kalau ada kebutuhan yang melanggar, **tanya dulu**, jangan dilanggar diam-diam.

## Teknologi

- Dilarang TypeScript.
- Dilarang backend, API call, atau database.
- Dilarang menambah dependency di luar `TECH_STACK.md` tanpa izin.
- Dilarang library UI (shadcn CLI, Radix, MUI, dll), state management, atau router. Gaya shadcn ditiru manual.
- Dilarang `sessionStorage`, cookie, atau IndexedDB. Hanya localStorage.

## Kode

- Dilarang menaruh logika hitung di dalam komponen. Harus di `utils/calculate.js`.
- Dilarang menyimpan uang sebagai float atau string. Harus integer rupiah.
- Dilarang mengubah bentuk data di `ARCHITECTURE.md` tanpa izin.
- Dilarang menulis ulang file yang tidak berkaitan dengan tugas.
- Dilarang menghapus fitur yang sudah jalan saat menambah fitur baru.
- Dilarang `dangerouslySetInnerHTML`.
- Dilarang inline style kalau bisa pakai Tailwind.
- Dilarang membiarkan `console.log` tersisa.

## Tampilan

- Dilarang warna di luar token `DESIGN.md` dan dilarang hex langsung di JSX.
- Dilarang memakai warna kuning (`primary`) sebagai warna teks.
- Dilarang menduplikasi logika bisnis di `MobileLayout` dan `DesktopLayout`.
- Dilarang font selain yang ditentukan.
- Dilarang tampilan yang rusak di 375px.

## Perilaku AI

- Dilarang mengerjakan banyak fitur sekaligus.
- Dilarang mengarang fitur yang tidak ada di `TASKS.md`.
- Dilarang mengaku sudah diuji kalau belum dijalankan.
