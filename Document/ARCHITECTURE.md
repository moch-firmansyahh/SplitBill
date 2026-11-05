# ARCHITECTURE

## Tujuan aplikasi
Membagi tagihan makan ke beberapa orang, termasuk menu patungan, diskon, service, dan pajak.

## Alur pengguna
1. Tambah peserta
2. Tambah item (nama, harga, qty)
3. Pilih siapa saja yang ikut tiap item
4. Atur diskon, service, pajak
5. Lihat total per orang dan salin ringkasan

## Model data
```js
{
  people: [{ id: "p1", name: "Andi" }],
  items: [
    { id: "i1", name: "Nasi Goreng", price: 25000, qty: 2, sharedBy: ["p1", "p2"] }
  ],
  charges: {
    discount: { type: "percent" | "amount", value: 0 },
    service:  { type: "percent" | "amount", value: 0 },
    tax:      { type: "percent" | "amount", value: 0 }
  }
}
```

## State
- Satu reducer di `BillContext`, disimpan ke localStorage dengan key `splitbill:v1`.
- Action: `ADD_PERSON`, `UPDATE_PERSON`, `REMOVE_PERSON`, `ADD_ITEM`, `UPDATE_ITEM`, `REMOVE_ITEM`, `TOGGLE_SHARE`, `SET_CHARGE`, `RESET`.
- Hapus peserta: id-nya dihapus dari semua `sharedBy`.
- Naikkan versi key localStorage jika bentuk data berubah.

## Aturan hitung (`utils/calculate.js`)
1. `subtotal item` = harga x qty.
2. Subtotal item dibagi rata ke peserta di `sharedBy`.
3. Urutan: subtotal, diskon, service, pajak.
4. Diskon, service, dan pajak dibagi **proporsional** terhadap subtotal tiap peserta.
5. Hasil per orang dibulatkan ke rupiah. Selisih akibat pembulatan ditambahkan ke peserta dengan porsi terbesar agar jumlah semua orang = grand total.
6. Item tanpa peserta tidak dihitung dan ditandai peringatan.

```js
calculateSummary(state) => {
  perPerson: [{ personId, subtotal, discount, service, tax, total }],
  grandTotal,
  unassignedItems: [itemId]
}
```
Fungsi ini murni: tanpa React, tanpa DOM, tanpa efek samping.

## Validasi input
- Nama tidak boleh kosong
- Harga >= 0, qty >= 1 (integer)
- Persen antara 0 dan 100
