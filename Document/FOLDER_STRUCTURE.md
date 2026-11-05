# FOLDER_STRUCTURE

```
splitbill/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ MobileLayout.jsx
│  │  │  ├─ DesktopLayout.jsx
│  │  │  ├─ Header.jsx
│  │  │  ├─ Stepper.jsx
│  │  │  └─ BottomBar.jsx
│  │  ├─ people/
│  │  │  ├─ PeopleSection.jsx
│  │  │  └─ PersonChip.jsx
│  │  ├─ items/
│  │  │  ├─ ItemForm.jsx
│  │  │  ├─ ItemList.jsx
│  │  │  └─ ItemCard.jsx
│  │  ├─ charges/
│  │  │  └─ ChargesForm.jsx
│  │  ├─ summary/
│  │  │  ├─ SummaryCard.jsx
│  │  │  ├─ PersonBreakdown.jsx
│  │  │  └─ TotalCard.jsx
│  │  ├─ welcome/
│  │  │  └─ WelcomeScreen.jsx
│  │  └─ ui/
│  │     ├─ Button.jsx
│  │     ├─ IconButton.jsx
│  │     ├─ Card.jsx
│  │     ├─ Input.jsx
│  │     ├─ Segmented.jsx
│  │     ├─ Chip.jsx
│  │     ├─ Avatar.jsx
│  │     ├─ Badge.jsx
│  │     ├─ Dialog.jsx
│  │     ├─ BottomSheet.jsx
│  │     ├─ ResponsiveOverlay.jsx
│  │     ├─ EmptyState.jsx
│  │     ├─ Illustration.jsx
│  │     └─ Toast.jsx
│  ├─ context/
│  │  ├─ BillContext.jsx
│  │  └─ ThemeContext.jsx
│  ├─ hooks/
│  │  ├─ useLocalStorage.js
│  │  └─ useMediaQuery.js
│  ├─ utils/
│  │  ├─ calculate.js
│  │  ├─ format.js
│  │  ├─ cn.js
│  │  └─ id.js
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css            # design tokens ada di sini
├─ index.html
├─ vite.config.js
└─ package.json
```

## Fungsi tiap folder

- `components/layout`: dua layout terpisah (mobile dan desktop) beserta bagian khususnya
- `components/people|items|charges|summary|welcome`: komponen per fitur, dipakai bersama oleh kedua layout
- `components/ui`: komponen dasar bergaya shadcn, dipakai berulang
- `context`: state bill dan tema
- `hooks`: custom hooks
- `utils`: fungsi murni tanpa React

## Aturan

- Satu komponen satu file, nama file sama dengan nama komponen (PascalCase).
- `MobileLayout` dan `DesktopLayout` hanya menyusun komponen fitur. Tidak boleh berisi logika bisnis.
- Komponen fitur tidak saling import langsung; data lewat Context.
- Komponen `ui/` tidak boleh tahu soal data bill.
