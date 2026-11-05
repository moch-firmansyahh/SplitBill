# WORKFLOW

## Sebelum mulai
1. Baca `CLAUDE.md`, lalu semua file yang ditunjuk.
2. Buka `TASKS.md`, ambil **satu** tugas pertama yang belum dicentang.

## Saat mengerjakan
1. Tulis rencana singkat (maksimal 5 baris): file apa yang dibuat atau diubah.
2. Kerjakan hanya tugas itu.
3. Ikuti `FOLDER_STRUCTURE.md` untuk lokasi file.
4. Ikuti `DESIGN.md` untuk tampilan.
5. Jalankan `npm run dev` dan pastikan tidak ada error di console.

## Setelah selesai
Laporkan dengan format ini:
```
Selesai: <nama tugas>
File diubah: <daftar file>
Cara uji: <langkah singkat>
Catatan: <hal yang perlu diketahui, kalau ada>
Berikutnya: <tugas selanjutnya>
```
Lalu centang tugas di `TASKS.md`.

## Git
- Commit setelah tiap tugas selesai dan berjalan.
- Format pesan: `feat: tambah form item`, `fix: pembulatan total`, `style: rapikan kartu`, `refactor: pisah calculate`.

## Kalau ada masalah
- Error tidak ketemu penyebabnya setelah dua kali percobaan: berhenti, jelaskan situasinya, tanya arah.
- Kebutuhan bertabrakan dengan `RESTRICTIONS.md`: berhenti dan tanya.
- Instruksi dari pengguna kurang jelas: ajukan satu pertanyaan, jangan menebak.

## Cara kamu (pengguna) memberi prompt
- "Baca CLAUDE.md, lalu kerjakan tugas berikutnya di TASKS.md."
- "Ada bug: <deskripsi>. Perbaiki tanpa mengubah hal lain."
- "Ubah tampilan <bagian>, tetap ikuti DESIGN.md."
