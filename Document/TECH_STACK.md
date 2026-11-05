# TECH_STACK

| Kebutuhan    | Pilihan                          | Alasan                                    |
| ------------ | -------------------------------- | ----------------------------------------- |
| Framework    | React 18                         | Populer, banyak referensi, AI paling jago |
| Build tool   | Vite                             | Cepat, setup minimal                      |
| Bahasa       | JavaScript (ES2022)              | Sesuai permintaan, tanpa TypeScript       |
| Styling      | Tailwind CSS                     | Cepat, konsisten, tanpa banyak file CSS   |
| Ikon         | lucide-react                     | Ringan dan rapi                           |
| Helper class | clsx + tailwind-merge            | Untuk fungsi `cn()` gaya shadcn           |
| State        | `useReducer` + Context           | Cukup untuk skala app ini                 |
| Penyimpanan  | localStorage                     | Tanpa backend                             |
| Font         | Plus Jakarta Sans (Google Fonts) | Ramah dan terbaca di layar kecil          |

## Setup

```bash
npm create vite@latest splitbill -- --template react
cd splitbill
npm install
npm install -D tailwindcss @tailwindcss/vite
npm install lucide-react clsx tailwind-merge
npm run dev
```

## Catatan

- Gunakan versi stabil terbaru dari tiap paket.
- Tidak ada React Router: app satu halaman.
- Gaya UI meniru shadcn/ui (token CSS variable, variant komponen), tetapi shadcn, Radix, dan MUI **tidak dipasang**. Semua komponen ditulis sendiri di `components/ui/`.
- Tidak ada library state (Redux, Zustand, dll).
