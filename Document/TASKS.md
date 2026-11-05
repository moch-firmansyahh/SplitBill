# TASKS

Kerjakan berurutan. Centang setelah selesai dan sudah diuji.

## 1. Setup

- [x] Buat project Vite + React
- [x] Pasang Tailwind CSS dan lucide-react
- [x] Pasang font Plus Jakarta Sans
- [x] Tulis design tokens di `index.css` (lihat `DESIGN.md` bagian 2)
- [x] Bersihkan boilerplate, buat struktur folder

## 2. Fondasi

- [x] `utils/format.js` (`formatRupiah`, `buildCompleteReceiptText`)
- [x] `utils/id.js`
- [x] `hooks/useLocalStorage.js`
- [x] `context/BillContext.jsx` (reducer + provider)
- [x] `utils/cn.js`, `hooks/useMediaQuery.js`, `ThemeContext`
- [x] Komponen `ui/`: Button, IconButton, Card (ticket dan ink), Input, Segmented, Chip, Avatar, Badge, Dialog, BottomSheet, ResponsiveOverlay, EmptyState, Toast, ConfirmDialog

## 3. Peserta

- [x] Tambah peserta
- [x] Ubah nama peserta
- [x] Hapus peserta (lepas dari semua item)

## 4. Item

- [x] Form tambah item
- [x] Daftar item
- [x] Edit dan hapus item
- [x] Toggle peserta per item

## 5. Biaya tambahan

- [x] Form diskon, service, pajak (persen atau nominal)
- [x] Akordion collapsible dengan toggle panah & badge status saat tertutup

## 6. Hitung dan ringkasan

- [x] `utils/calculate.js` sesuai `ARCHITECTURE.md`
- [x] `SummaryCard`: total per orang dan grand total
- [x] Peringatan item belum punya peserta

## 7. Polish

- [x] Tombol salin ringkasan (rincian lengkap WhatsApp: menu, porsi, diskon, service, pajak, grand total)
- [x] Reset semua dengan konfirmasi
- [x] Animasi kecil tambah/hapus
- [x] Mode gelap
- [x] `MobileLayout`: stepper, hero, bottom bar
- [x] `DesktopLayout`: dashboard tiga panel sejajar di atas, full width (`w-full px-6 lg:px-8`), pas layar tanpa scroll kosong
- [x] Potongan tiket (notch) di kartu item dan ringkasan
- [x] Cek tampilan 375px, 768px, 1024px, dan 1440px

## 8. Opsional

- [ ] Riwayat beberapa bill
- [ ] Layar sambutan (mobile)
- [ ] PWA agar bisa di-install

## Kasus uji manual

1. 2 orang, 1 item Rp100.000 dibagi berdua: masing-masing Rp50.000.
2. 3 orang, 1 item Rp100.000 dibagi bertiga: jumlah tiga orang tepat Rp100.000.
3. Service 5% + pajak 10%: total semua orang sesuai hitungan manual.
4. Hapus satu peserta: item yang ia ikuti tetap terhitung untuk sisanya.
5. Refresh browser: data tidak hilang.
6. Item tanpa peserta: muncul peringatan dan tidak masuk total.
