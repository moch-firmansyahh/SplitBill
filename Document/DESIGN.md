# DESIGN

Referensi visual: aplikasi bill-splitting bergaya **soft neo-brutalism**. Latar krem hangat, kartu dengan outline hitam tebal, aksen kuning-amber, kartu hitam untuk angka yang harus dibayar, dan potongan tiket (notch) seperti struk. Struktur komponen meniru **shadcn/ui** (design token berbasis CSS variable, variant komponen, `cn()` helper), tetapi semua komponen ditulis sendiri.

## 1. Prinsip

1. **Outline, bukan bayangan.** Kartu dan tombol dibatasi garis 2px hitam. Bayangan hanya sedikit (hard offset) pada tombol.
2. **Hangat dan playful.** Krem, kuning, sudut sangat membulat, avatar warna-warni.
3. **Angka adalah bintang.** Total dan bagian per orang paling besar dan paling kontras.
4. **Rasa struk.** Kartu item dan ringkasan seperti tiket: ada notch di sisi, garis putus-putus, dan nada "receipt".
5. **Mobile dan desktop beda layout**, bukan sekadar diperlebar (lihat bagian 6 dan 7).

## 2. Design tokens

Taruh di `src/index.css` (Tailwind v4). Semua warna dipakai lewat nama token, bukan hex langsung.

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: #fce9cf; /* krem peach, latar halaman */
  --foreground: #161411; /* tinta / hitam hangat */
  --card: #fff9ee; /* krem terang, latar kartu */
  --card-foreground: #161411;
  --primary: #fbc56b; /* kuning amber, aksen utama */
  --primary-foreground: #161411;
  --secondary: #f6ddb5; /* krem lebih gelap, chip non-aktif */
  --secondary-foreground: #161411;
  --muted: #f3e0bf;
  --muted-foreground: #7a6a52;
  --border: #161411; /* outline hitam */
  --ring: #f5a524;
  --ink: #161411; /* kartu hitam "Bagianmu" */
  --ink-foreground: #fff9ee;
  --success: #2fb36d; /* status lunas */
  --warning: #e8590c; /* item belum di-assign */
  --destructive: #e5484d; /* hapus */
  --radius: 1rem;
}

.dark {
  --background: #17130d;
  --foreground: #fff3dc;
  --card: #231c12;
  --card-foreground: #fff3dc;
  --primary: #fbc56b;
  --primary-foreground: #161411;
  --secondary: #33291a;
  --secondary-foreground: #fff3dc;
  --muted: #2c2216;
  --muted-foreground: #b8a486;
  --border: #fff3dc;
  --ring: #fbc56b;
  --ink: #fff3dc; /* kartu total dibalik: terang di atas gelap */
  --ink-foreground: #161411;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --color-ink: var(--ink);
  --color-ink-foreground: var(--ink-foreground);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-destructive: var(--destructive);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --font-sans: "Plus Jakarta Sans", system-ui, sans-serif;
}

body {
  @apply bg-background text-foreground font-sans antialiased;
}
```

### Aturan pemakaian warna

- Latar halaman `bg-background`, kartu `bg-card border-2 border-border`.
- **Kuning (`primary`) hanya untuk latar tombol, chip aktif, dan highlight.** Jangan pernah jadi warna teks (kontras buruk di atas krem).
- Teks di atas kuning selalu `text-primary-foreground` (hitam).
- Merah (`destructive`) hanya untuk hapus. Oranye (`warning`) hanya untuk peringatan item belum punya peserta. Hijau (`success`) hanya untuk status lunas.
- Kartu total memakai `bg-ink text-ink-foreground`.

### Warna avatar peserta

Pastel, dipilih berdasarkan urutan peserta (index modulo 6), semuanya dengan border 2px `border-border`:
`#FFB4A2` (salmon), `#B5E48C` (hijau muda), `#A0C4FF` (biru muda), `#FDFFB6` (kuning pucat), `#CDB4DB` (ungu muda), `#9BF6FF` (cyan muda).
Isi avatar: inisial 1-2 huruf, `font-bold`, teks hitam.

## 3. Typography

- Font: **Plus Jakarta Sans** (bobot 400, 500, 600, 700, 800), fallback `system-ui, sans-serif`.
- Judul besar / hero: `text-3xl font-extrabold leading-tight tracking-tight` (mobile), `text-4xl` (desktop). Gaya kalimat tanya yang akrab, contoh: "Siapa makan _apa_?" dengan satu kata dibuat tebal.
- Judul kartu: `text-lg font-bold`
- Label dan teks biasa: `text-sm font-medium` atau `text-base`
- Teks bantu: `text-sm text-muted-foreground`
- Label kecil (mis. "Peserta", "Dibayar oleh"): `text-xs font-semibold uppercase tracking-wide text-muted-foreground`
- Angka uang: `font-bold tabular-nums`
- Total di kartu hitam: `text-4xl font-extrabold tabular-nums` (mobile), `text-5xl` (desktop)
- Format uang: `Rp 52.500` (titik ribuan, tanpa desimal)

## 4. Bentuk, jarak, dan efek

- Radius: kartu `rounded-2xl`, input dan tombol `rounded-xl`, chip dan avatar `rounded-full`.
- Border: `border-2 border-border` di kartu, input, dan tombol.
- Jarak: kelipatan 4px. Padding kartu `p-4` (mobile), `p-5` (desktop). Jarak antar kartu `gap-4`.
- Bayangan: **tidak ada** di kartu. Tombol utama memakai hard shadow `shadow-[2px_2px_0_0_var(--border)]`.
- Efek tekan tombol: `active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`.
- Fokus: `focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 ring-offset-background`.
- Transisi: 150-200ms, `ease-out`.

### Potongan tiket (notch)

Untuk kartu item dan kartu ringkasan. Kartu tidak boleh `overflow-hidden`.

```css
.ticket {
  position: relative;
}
.ticket::before,
.ticket::after {
  content: "";
  position: absolute;
  top: var(--notch-y, 50%);
  width: 22px;
  height: 22px;
  margin-top: -11px;
  border-radius: 9999px;
  background: var(--background);
  border: 2px solid var(--border);
  z-index: 1;
}
.ticket::before {
  left: -13px;
  clip-path: inset(0 0 0 50%);
}
.ticket::after {
  right: -13px;
  clip-path: inset(0 50% 0 0);
}
```

Bagian bawah kartu dipisahkan garis putus-putus: `border-t-2 border-dashed border-border`. Kalau notch bermasalah di suatu tempat, cukup pakai garis putus-putus saja.

## 5. Komponen (gaya shadcn, ditulis sendiri di `components/ui/`)

Gunakan helper `cn()` (`clsx` + `tailwind-merge`) di `utils/cn.js`. Tiap komponen punya `variant` dan `size` lewat objek mapping sederhana.

| Komponen        | Variant / perilaku                                                                                                                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Button**      | `default` (latar kuning, border hitam, hard shadow, ikon panah `ArrowRight` di kanan), `dark` (latar ink), `outline` (latar kartu), `ghost`, `destructive`. Ukuran `sm` (h-9), `md` (h-11), `lg` (h-12). Bentuk pill (`rounded-full`) untuk CTA utama. |
| **IconButton**  | Lingkaran 40px, border 2px, ikon lucide di tengah (seperti tombol di header referensi). Wajib `aria-label`.                                                                                                                                            |
| **Card**        | `bg-card border-2 rounded-2xl`. Variant `ticket` menambah notch. Variant `ink` untuk total.                                                                                                                                                            |
| **Input**       | `h-11 rounded-xl border-2 bg-card px-3`, placeholder `text-muted-foreground`, fokus ring kuning. Input uang punya prefix "Rp".                                                                                                                         |
| **Segmented**   | Pengganti switch persen/nominal dan stepper mobile: pil dengan opsi aktif berlatar kuning.                                                                                                                                                             |
| **Chip**        | Pil kecil: aktif `bg-primary border-2`, non-aktif `bg-secondary border-2 border-transparent`. Dipakai untuk memilih peserta per item.                                                                                                                  |
| **Avatar**      | Lingkaran berinisial dengan warna pastel. `AvatarStack` menumpuk avatar dengan `-space-x-2` dan menampilkan `+N`.                                                                                                                                      |
| **Badge**       | Pil kecil: `success` (Lunas), `warning` (Belum ada yang ikut), `muted`.                                                                                                                                                                                |
| **Dialog**      | Pusat layar, `rounded-2xl border-2`, latar gelap transparan. Dipakai di desktop.                                                                                                                                                                       |
| **BottomSheet** | Naik dari bawah, sudut atas `rounded-t-3xl`, ada handle kecil di atas. Dipakai di mobile.                                                                                                                                                              |
| **EmptyState**  | Ilustrasi SVG inline sederhana (struk, koin, kartu) bergaya isometrik datar + teks ramah + tombol aksi.                                                                                                                                                |
| **Toast**       | Muncul di bawah (mobile) atau kanan atas (desktop), untuk "Ringkasan disalin".                                                                                                                                                                         |

Ilustrasi dibuat dari SVG inline dengan palet token (kuning, krem, hitam). Jangan memakai gambar eksternal.

## 6. Layout mobile (< 1024px): alur bertahap

Komponen: `layout/MobileLayout.jsx`. Area utama `max-w-md mx-auto` (di tablet tetap satu kolom di tengah).

**Struktur layar dari atas ke bawah**

1. **Header**: `IconButton` kiri (reset, ikon `RotateCcw`), judul "Split Bill" di tengah, `IconButton` kanan (mode gelap, ikon `Moon`/`Sun`).
2. **Hero singkat**: judul besar bergaya tanya, contoh "Siapa makan _apa_?", dengan teks bantu satu baris. Berubah sesuai langkah aktif.
3. **Stepper (Segmented)**: 4 langkah `Peserta`, `Pesanan`, `Biaya`, `Hasil`. Langkah aktif berlatar kuning, tampil sebagai pil horizontal yang bisa di-scroll jika sempit.
4. **Konten langkah aktif** (satu langkah per layar, tidak semuanya sekaligus):
   - **Peserta**: input nama + tombol tambah, daftar `PersonChip` dengan avatar, tombol hapus per chip.
   - **Pesanan**: tombol besar "+ Tambah item" membuka **BottomSheet** berisi form (nama, harga, qty, pilih peserta). Item tampil sebagai **kartu tiket**: nama + qty di kiri, harga di kanan, garis putus-putus, lalu `AvatarStack` peserta. Ketuk kartu untuk edit di BottomSheet. Geser atau tombol ikon untuk hapus.
   - **Biaya**: tiga kartu (diskon, service, pajak), masing-masing dengan `Segmented` persen/nominal + input.
   - **Hasil**: daftar kartu per orang (avatar, nama, total). Ketuk untuk membuka rincian (item, diskon, service, pajak). Di bagian bawah ada tombol "Salin ringkasan".
5. **Bottom bar tetap** (`fixed bottom-0`, mengikuti safe area):
   - Kiri: label kecil "Total tagihan" dan angka total (`font-bold tabular-nums`).
   - Kanan: tombol pill kuning "Lanjut →" (langkah berikutnya), di langkah terakhir berubah jadi "Salin".
   - Latar `bg-card border-t-2`.

**Kartu hitam "Bagianmu"** (hanya di langkah Hasil): `Card variant=ink` penuh lebar, label "Bagian untuk <nama>", angka sangat besar, tombol "Salin" kuning di bawahnya. Pilih orang lewat `AvatarStack` yang bisa diketuk.

**Gestur dan sentuhan**

- Semua target sentuh minimal 44px.
- BottomSheet bisa ditutup dengan tarik ke bawah atau ketuk latar.
- Konten diberi `pb-28` agar tidak tertutup bottom bar.

## 7. Layout desktop (>= 1024px): dashboard tiga panel

Komponen: `layout/DesktopLayout.jsx`. Semua langsung terlihat, **tanpa stepper dan tanpa bottom bar**. Terinspirasi tiga layar di referensi.

Wadah: `max-w-7xl mx-auto px-8 py-6`, grid `grid-cols-12 gap-6`.

**Navbar atas** (tinggi 64px, `border-b-2`): logo kecil + "Split Bill" di kiri; di kanan tombol "Salin ringkasan" (kuning), `IconButton` mode gelap, dan "Reset".

**Panel kiri (col-span-3): Peserta dan Biaya**

- Kartu Peserta: input nama, daftar peserta berupa baris avatar + nama + tombol hapus (muncul saat hover).
- Kartu Biaya tambahan: diskon, service, pajak berjajar vertikal, masing-masing dengan `Segmented` persen/nominal.

**Panel tengah (col-span-5): Pesanan** (panel utama)

- Hero "Siapa makan _apa_?" di atas panel.
- Form tambah item **inline** di bagian atas (nama, harga, qty sebaris, Enter untuk menambah), bukan BottomSheet.
- Daftar item sebagai **kartu tiket lebar**: kolom nama, qty, harga satuan, subtotal, lalu baris `Chip` peserta yang bisa di-toggle langsung (tanpa membuka dialog). Edit inline dengan klik dua kali atau tombol pensil.
- Hover kartu: tombol edit dan hapus muncul di kanan.

**Panel kanan (col-span-4): Ringkasan** (`sticky top-24`)

- Kartu tiket "Ringkasan": daftar per orang (avatar, nama, total), garis putus-putus, rincian subtotal, diskon, service, pajak, lalu **Grand total** tebal.
- Di bawahnya **kartu hitam** `Card variant=ink`: "Total tagihan" dengan angka `text-5xl`, tombol kuning "Salin ringkasan".
- Klik satu orang untuk mengembangkan rincian di tempat (accordion), tanpa pindah halaman.

**Interaksi desktop**

- Hover state di semua elemen interaktif (`hover:bg-secondary`, kursor pointer).
- Fokus keyboard jelas; `Enter` menambah item/peserta, `Esc` menutup Dialog.
- Konfirmasi hapus memakai **Dialog** di tengah layar (bukan BottomSheet).

**Tablet (640-1023px)** memakai layout mobile, hanya dengan lebar konten `max-w-xl` dan form item di BottomSheet yang tampil sebagai Dialog di tengah.

## 8. Cara memilih layout di kode

- Gunakan hook `useMediaQuery("(min-width: 1024px)")` di `hooks/useMediaQuery.js`.
- `App.jsx` merender `<DesktopLayout />` atau `<MobileLayout />`. Keduanya memakai **komponen fitur dan state yang sama** (BillContext); hanya susunan dan pembungkusnya yang beda.
- Komponen yang membuka form (tambah item, konfirmasi hapus) memilih `BottomSheet` di mobile dan `Dialog` di desktop lewat satu wrapper `ResponsiveOverlay`.
- Dilarang menduplikasi logika bisnis di dua layout.

## 9. Mode gelap

- Class `dark` pada `<html>`. Default mengikuti `prefers-color-scheme`, tombol di header mengubah dan menyimpan pilihan ke localStorage (`splitbill:theme`).
- Kartu hitam jadi terang-di-atas-gelap (token `ink` dibalik). Border berubah krem.

## 10. Empty state dan tulisan

- Nada ramah, singkat, akrab. Contoh:
  - Peserta kosong: "Belum ada teman. Tambah dulu yuk."
  - Pesanan kosong: "Belum ada pesanan. Catat yang kalian makan."
  - Hasil kosong: "Isi peserta dan pesanan dulu, nanti dihitung otomatis."
- Item tanpa peserta: border putus-putus warna `warning`, badge "Belum ada yang ikut".
- Hapus selalu minta konfirmasi dengan kalimat jelas ("Hapus Nasi Goreng?").

## 11. Animasi

- Kartu baru: muncul dengan `fade-in` + `translate-y-1` ke 0, 200ms.
- Hapus: `fade-out` + mengecil, 150ms.
- Angka total: hitung naik singkat (count-up 300ms) saat berubah.
- Avatar baru: `scale` 0.8 ke 1 (pop).
- Hormati `prefers-reduced-motion`: matikan semua animasi tersebut.

## 12. Aksesibilitas

- Kontras teks hitam di atas krem dan kuning memenuhi WCAG AA. Jangan menaruh teks kuning di atas krem.
- Tombol ikon punya `aria-label`. BottomSheet dan Dialog menjebak fokus dan bisa ditutup dengan `Esc`.
- Status tidak hanya lewat warna: peringatan selalu disertai ikon atau teks.

## 13. Opsional: layar sambutan (mobile)

Sekali saja di kunjungan pertama (flag `splitbill:welcome` di localStorage): ilustrasi SVG isometrik kartu dan koin, judul "Kenapa harus catat tagihan?", teks singkat, indikator titik, tombol "Lewati" dan tombol pill kuning "Mulai →".
