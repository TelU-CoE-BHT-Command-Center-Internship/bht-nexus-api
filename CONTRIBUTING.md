# Panduan Kontribusi BHT-Nexus API

Panduan ini menjaga agar setiap perubahan mudah dipahami, diuji, ditinjau, dan dilanjutkan oleh anggota tim lain.

## Prinsip Dasar

1. Satu perubahan mempunyai satu tujuan utama.
2. Baca seluruh diff sebelum commit.
3. Jangan memasukkan secret, data pribadi, prompt AI, transkrip chat, atau catatan lokal.
4. Perbarui dokumentasi ketika kontrak, perilaku, atau keputusan berubah.
5. Jalankan seluruh pemeriksaan yang tersedia sebelum perubahan dibagikan.
6. Jangan menutupi pemeriksaan gagal dengan mematikan aturan.

## Tahap Persiapan

Repository pernah menerima commit persiapan langsung ke `main` untuk struktur kosong, dokumen kolaborasi, dan bootstrap resmi NestJS. Pengecualian terakhir tersebut hanya berlaku untuk fondasi yang belum memuat fitur bisnis dan harus melewati format, lint, typecheck, test, build, pemeriksaan secret, serta peninjauan diff.

Setelah fondasi NestJS masuk ke `main`, pengecualian berakhir. Penambahan modul, endpoint, database, worker, dependency baru, perubahan CI, atau konfigurasi runtime berikutnya menggunakan branch kerja dan pull request.

## Alur Kerja Setelah Implementasi Dimulai

1. sinkronkan `main`;
2. buat branch dengan satu tujuan;
3. kerjakan perubahan kecil;
4. jalankan format, lint, test, build, dan pemeriksaan keamanan yang tersedia;
5. periksa diff dan data sensitif;
6. buat commit yang jelas;
7. push branch;
8. buka pull request;
9. tanggapi review;
10. gabungkan hanya setelah seluruh pemeriksaan lulus.

Pemeriksaan minimum untuk repository API:

```powershell
npm ci
npm run check
```

Contoh nama branch:

```text
feat/publication-import
fix/session-expiry
chore/ci-baseline
docs/api-conventions
test/rag-citations
refactor/job-claiming
```

## Format Commit

Gunakan pola:

```text
type(scope): deskripsi
```

`type` dan `scope` memakai istilah Inggris yang konsisten. Deskripsi memakai bahasa Indonesia yang ringkas, natural, dan profesional.

| Type | Dipakai untuk |
|---|---|
| `feat` | kemampuan baru yang dirasakan pengguna atau konsumen API |
| `fix` | perbaikan perilaku yang salah |
| `docs` | perubahan dokumentasi saja |
| `test` | penambahan atau perbaikan test saja |
| `refactor` | perapian internal tanpa mengubah perilaku |
| `perf` | peningkatan performa |
| `chore` | fondasi, alat, dependency, atau pemeliharaan |
| `ci` | workflow dan konfigurasi CI/CD |
| `build` | sistem build atau packaging |
| `revert` | membalik commit sebelumnya |

Contoh:

```text
chore(repo): siapkan standar awal kolaborasi
chore(api): siapkan fondasi NestJS
feat(publications): tambahkan impor publikasi terkontrol
fix(auth): cegah sesi kedaluwarsa tetap digunakan
docs(architecture): jelaskan alur pekerjaan scraper
test(rag): tambahkan evaluasi ketepatan sitasi
```

Hindari pesan seperti `update`, `fix`, `done`, `revisi`, atau `coba lagi` karena tidak menjelaskan tujuan.

## Pull Request

Pull request harus menjelaskan masalah, perubahan, batas pekerjaan, cara verifikasi, dampak terhadap data dan keamanan, serta dokumentasi yang diperbarui. Perubahan besar perlu dipecah jika reviewer tidak dapat memahaminya dalam satu sesi.

## Dependency Baru

Sebelum menambah dependency:

1. pastikan fungsi tersebut belum tersedia pada platform atau dependency yang sudah ada;
2. periksa dokumentasi resmi, pemeliharaan, lisensi, dan kerentanan;
3. gunakan versi yang kompatibel dengan Node.js 24 atau Python 3.12;
4. commit lockfile;
5. jelaskan alasannya pada pull request;
6. hapus dependency yang ternyata tidak dipakai.

## Database dan API

- perubahan schema selalu melalui migration;
- migration yang sudah dibagikan tidak diubah diam-diam;
- perubahan endpoint diperbarui pada OpenAPI/Swagger;
- validasi input dilakukan di batas API;
- data hasil scraper tidak langsung dianggap data resmi;
- proses persetujuan dan audit trail tidak boleh dilewati.

## Hasil Bantuan AI

AI adalah alat bantu, bukan reviewer dan bukan penanggung jawab akhir. Setiap perubahan yang dibantu AI harus dibaca file demi file, diuji sendiri, diperiksa terhadap dokumentasi resmi, dan ditinjau manusia sesuai risikonya.

Pastikan tidak ada kode fiktif, endpoint fiktif, test yang hanya terlihat lulus, bahasa percakapan AI, materi kerja lokal, atau panduan pribadi di dalam repositori produk.

## Keamanan

Jangan commit `.env`, password, token, cookie, private key, data produksi mentah, dokumen internal yang belum disetujui, dump database, atau log yang masih memuat data sensitif.

Kerentanan mengikuti [SECURITY.md](SECURITY.md), bukan issue biasa.