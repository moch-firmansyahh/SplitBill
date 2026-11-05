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
- Judul kartu: `text-lg font-bold`
- Label dan teks biasa: `text-sm font-medium` atau `text-base`
- Teks bantu: `text-sm text-muted-foreground`
- Label kecil (mis. "Peserta", "Dibayar oleh"): `text-xs font-semibold uppercase tracking-wide text-muted-foreground`
- Angka uang: `font-bold tabular-nums`
- Total di kartu hitam: `text-3xl lg:text-4xl font-extrabold tabular-nums`
- Format uang: `Rp 52.500` (titik ribuan, tanpa desimal)

## 4. Bentuk, jarak, dan efek

- Radius: kartu `rounded-2xl`, input dan tombol `rounded-xl`, chip dan avatar `rounded-full`.
- Border: `border-2 border-border` di kartu, input, dan tombol.
- Jarak: kelipatan 4px. Padding kartu `p-4` (mobile), `p-5` (desktop). Jarak antar kartu `gap-5` hingga `gap-6`.
- Bayangan: tombol utama memakai hard shadow `shadow-[2px_2px_0_0_var(--border)]`.
- Efek tekan tombol: `active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`.
- Fokus: `focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 ring-offset-background`.
- Transisi: 150-200ms, `ease-out`.

### Potongan tiket (notch)

Untuk kartu item dan kartu ringkasan:

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

## 5. Komponen (gaya shadcn, ditulis sendiri di `components/ui/`)

Gunakan helper `cn()` (`clsx` + `tailwind-merge`) di `utils/cn.js`. Tiap komponen punya `variant` dan `size` lewat objek mapping sederhana.

| Komponen        | Variant / perilaku |
| --------------- | ------------------ |
| **Button**      | `default` (latar kuning, border hitam, hard shadow), `dark` (latar ink), `outline` (latar kartu), `ghost`, `destructive`. Ukuran `sm` (h-9), `md` (h-11), `lg` (h-12). Bentuk pill (`rounded-full`) untuk CTA utama. |
| **IconButton**  | Lingkaran 40px, border 2px, ikon lucide di tengah. Wajib `aria-label`. |
| **Card**        | `bg-card border-2 rounded-2xl`. Variant `ticket` menambah notch. Variant `ink` untuk total. |
| **Input**       | `h-11` atau `h-12` rounded-xl border-2 bg-card px-3.5, placeholder `text-muted-foreground`, fokus ring kuning. Input uang punya prefix "Rp". |
| **Segmented**   | Pengganti switch persen/nominal dan stepper mobile: pil dengan opsi aktif berlatar kuning. |
| **Chip**        | Pil kecil: aktif `bg-primary border-2`, non-aktif `bg-secondary border-2 border-transparent`. |
| **Avatar**      | Lingkaran berinisial dengan warna pastel. `AvatarStack` menumpuk avatar dengan `-space-x-2`. |
| **Badge**       | Pil kecil: `success` (Lunas), `warning` (Belum ada yang ikut), `muted`, `primary`. |
| **Dialog**      | Pusat layar, `rounded-2xl border-2`, latar gelap transparan. Dipakai di desktop. |
| **BottomSheet** | Naik dari bawah, sudut atas `rounded-t-3xl`, ada handle di atas. Dipakai di mobile. |
| **ResponsiveOverlay** | Memilih `BottomSheet` di mobile dan `Dialog` di desktop via `useMediaQuery`. |
| **EmptyState**  | Ilustrasi SVG inline sederhana (struk, koin, teman) + teks ramah + tombol aksi. |
| **Toast**       | Notifikasi salin "Rincian lengkap siap dikirim ke WhatsApp!". |

## 6. Layout mobile (< 1024px): alur bertahap

Komponen: `layout/MobileLayout.jsx`. Area utama `max-w-md mx-auto px-4 pb-28`.

**Struktur layar dari atas ke bawah**

1. **Header**: `IconButton` kiri (reset), judul "Split Bill", `IconButton` kanan (mode gelap).
2. **Hero singkat**: judul besar sesuai langkah aktif.
3. **Stepper (Segmented)**: 4 langkah `Peserta`, `Pesanan`, `Biaya`, `Hasil`.
4. **Konten langkah aktif**:
   - **Peserta**: input nama + tombol tambah, daftar `PersonChip` dengan avatar.
   - **Pesanan**: tombol tambah membuka BottomSheet form. Item tampil sebagai kartu tiket.
   - **Biaya**: kartu akordion diskon, service, pajak.
   - **Hasil**: kartu hitam "Bagianmu" + kartu ringkasan per orang.
5. **Bottom bar tetap** (`fixed bottom-0`): total tagihan di kiri, tombol lanjut/salin di kanan.

## 7. Layout desktop (>= 1024px): dashboard tiga panel sejajar

Komponen: `layout/DesktopLayout.jsx`.

- **Wadah**: `w-full px-6 lg:px-8 py-5`, grid `grid-cols-12 gap-6`. Melebar penuh dengan margin samping yang rapi.
- **Tanpa Scrollbar Kosong**: Menggunakan layout alami tanpa padding berlebih, sehingga pas 1 layar monitor jika item masih sedikit.
- **Sejajar di Atas**: Ketiga kartu paling atas (**Peserta**, **Daftar Pesanan**, dan **Ringkasan per Orang**) sejajar persis pada garis horizontal yang sama.

**Panel kiri (col-span-12 lg:col-span-4 xl:col-span-3 space-y-5): Peserta dan Biaya**
- Kartu Peserta: input nama, daftar chip avatar peserta.
- Kartu Biaya tambahan: **Akordion collapsible** dengan panah buka-tutup (`ChevronDown`/`ChevronUp`). Menampilkan badge aktif saat ditutup, dan form lega saat dibuka.

**Panel tengah (col-span-12 lg:col-span-8 xl:col-span-5): Pesanan**
- Form tambah item inline di bagian atas (Nama Menu, Harga Satuan, Qty, chip peserta).
- Daftar item sebagai kartu tiket dengan rincian harga, pembagian peserta, tombol ubah & hapus.

**Panel kanan (col-span-12 lg:col-span-12 xl:col-span-4 sticky top-20 self-start space-y-4): Ringkasan**
- Kartu tiket "Ringkasan per Orang" (bisa di-scroll internal `max-h-[44vh]` jika pesertanya banyak).
- Kartu hitam `Card variant=ink`: Total Seluruh Tagihan + tombol kuning **"Salin untuk WhatsApp"**.
- Mengambang mulus (*sticky*) mengikuti scroll saat pesanan memanjang, sehingga Total Tagihan selalu terlihat.

## 8. Salin WhatsApp Lengkap

Fungsi `buildCompleteReceiptText(state, summary)` di `utils/format.js` menyalin seluruh rincian matematika:
1. Daftar pesanan lengkap (nama menu, qty, harga satuan, subtotal, dan daftar peserta yang ikut).
2. Total biaya (subtotal, diskon %, service %, pajak %, dan grand total).
3. Pembagian per orang lengkap (menu yang dimakan beserta porsinya, penyesuaian diskon/service/pajak per orang, dan total bersih yang harus dibayar).

## 9. Mode gelap

- Class `dark` pada `<html>`. Default mengikuti `prefers-color-scheme`, tombol di header mengubah dan menyimpan pilihan ke localStorage (`splitbill:theme`).
- Kartu hitam dibalik (terang di atas gelap). Border berubah krem.

## 10. Aksesibilitas

- Kontras teks hitam di atas krem dan kuning memenuhi WCAG AA.
- Tombol ikon punya `aria-label`.
- Dialog & BottomSheet bisa ditutup dengan `Esc` atau klik luar.
