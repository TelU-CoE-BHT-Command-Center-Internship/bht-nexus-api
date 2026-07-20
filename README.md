# BHT-Nexus API

<div align="center">

**Layanan backend terpadu untuk data, otomasi, scraper, dan RAG dokumen BHT.**

![Status](https://img.shields.io/badge/status-fondasi_NestJS-475569)
![Akses](https://img.shields.io/badge/akses-public-2563eb)
![Node.js](https://img.shields.io/badge/Node.js-24_LTS-339933)
![NestJS](https://img.shields.io/badge/NestJS-11-e0234e)

[Status saat ini](#status-saat-ini) · [Arsitektur](#arsitektur-ringkas) · [Struktur](#struktur-repositori) · [Kontribusi](CONTRIBUTING.md)

</div>

## Gambaran Umum

BHT-Nexus API adalah pusat layanan untuk Dashboard Automation Specialist BHT. Repositori ini akan menangani aturan bisnis, akses data, autentikasi, pengelolaan publikasi dan dokumen, pekerjaan scraper, serta layanan RAG dokumen yang digunakan oleh aplikasi web BHT-Nexus.

Backend dan antarmuka web dikelola dalam repositori terpisah. Dengan batas ini, pengembangan tampilan dapat berjalan tanpa mencampur aturan bisnis, sementara layanan scraper dan RAG tetap masuk melalui satu pintu API yang terdokumentasi.

## Status Saat Ini

Repositori berada pada tahap **fondasi NestJS yang dapat dijalankan**. Generator resmi Nest CLI sudah membentuk aplikasi dasar, dependency sudah dikunci melalui `package-lock.json`, dan pemeriksaan format, lint, tipe, test, serta build sudah tersedia. Git hooks membantu menjalankan pemeriksaan penting sebelum commit dan push tanpa menggantikan pemeriksaan CI di GitHub.

Fondasi ini belum memuat fitur bisnis, koneksi database, scraper, atau RAG. Respons dasar hanya membuktikan bahwa runtime, struktur NestJS, pengujian, dan CI bekerja sebelum modul BHT-Nexus mulai ditambahkan.

| Bagian | Status |
|---|---|
| Struktur repositori | Tersedia |
| Standar Git dan kolaborasi | Tersedia |
| Dokumentasi dasar | Tersedia |
| Aplikasi NestJS dasar | Tersedia dan dapat dijalankan |
| Database dan migration | Belum ditambahkan |
| Worker scraper dan RAG | Belum diintegrasikan |
| CI minimum | Tersedia |
| Git hooks lokal | Tersedia melalui Lefthook |
| Deployment | Belum ditambahkan |

Status ini sengaja ditulis apa adanya. Repositori belum mengklaim fitur, pengujian, atau kesiapan deployment yang memang belum tersedia.

## Cakupan Layanan

BHT-Nexus API akan menangani:

- API untuk aplikasi web BHT-Nexus;
- autentikasi, sesi, peran, dan izin;
- penyimpanan data utama di PostgreSQL;
- impor, pemeriksaan, dan persetujuan data;
- pengelolaan anggota, publikasi, dokumen, KPI, dan audit log;
- orkestrasi pekerjaan scraper Google Scholar dan SINTA;
- orkestrasi pemrosesan serta pencarian RAG dokumen;
- dokumentasi kontrak API melalui OpenAPI/Swagger;
- worker Python untuk scraper dan RAG.

## Arsitektur Ringkas

```text
Pengguna
   │
   ▼
bht-nexus-web
   │  HTTPS / JSON
   ▼
bht-nexus-api
   ├── autentikasi dan aturan bisnis
   ├── modul anggota, publikasi, dokumen, KPI, dan audit
   ├── pengelolaan pekerjaan latar belakang
   │
   ├──────────────► PostgreSQL
   │
   ├──────────────► worker scraper Python
   └──────────────► worker RAG Python
```

Backend dibangun sebagai **modular monolith**: satu aplikasi backend yang dibagi menjadi modul-modul dengan tanggung jawab jelas. Scraper dan RAG tetap menggunakan Python, tetapi pekerjaan, status, dan hasilnya dikendalikan melalui API serta database yang sama.

## Teknologi yang Disepakati

| Lapisan | Teknologi |
|---|---|
| Runtime backend | Node.js 24 LTS |
| Framework API | NestJS 11 dengan Express |
| Package manager | npm dan `package-lock.json` |
| Git hooks | Lefthook |
| ORM | Drizzle ORM |
| Database | PostgreSQL 18 |
| Worker | Python 3.12 |
| Kontrak API | OpenAPI/Swagger |

## Struktur Repositori

```text
.
├── .github/      # kepemilikan, issue form, workflow, dan otomasi dependency
├── .vscode/      # rekomendasi alat dan pengaturan workspace bersama
├── docs/         # keputusan dan dokumentasi teknis
├── drizzle/      # migration database yang kelak dibuat Drizzle
├── scripts/      # otomasi pengembangan dan operasi
├── src/          # aplikasi NestJS utama
├── test/         # pengujian lintas modul dan layanan
└── workers/      # worker Python untuk scraper dan RAG
```

Folder fitur yang belum dikerjakan masih dipertahankan dengan `.gitkeep`. Berkas dasar `src/main.ts`, `src/app.module.ts`, controller, service, serta test berasal dari pola resmi NestJS dan menjadi titik awal yang dapat diverifikasi. Penjelasan keputusan teknis disimpan di `docs/decisions/` agar alasan perubahan tetap dapat ditelusuri.

## Memulai Pengembangan

Prasyarat:

- Node.js 24 LTS;
- npm 11;
- Git;
- PowerShell 7 pada Windows.

Repositori dapat dibaca dan di-clone secara public. Hak tulis tetap terbatas pada anggota yang diberi akses oleh organisasi.

### 1. Clone repository

Buka PowerShell pada folder tempat proyek akan disimpan, lalu jalankan:

```powershell
git clone https://github.com/TelU-CoE-BHT-Command-Center-Internship/bht-nexus-api.git
Set-Location bht-nexus-api
```

`git clone` mengunduh repository beserta riwayat perubahannya. `Set-Location` memindahkan terminal ke dalam folder repository. Clone public tidak memerlukan token. GitHub baru meminta autentikasi ketika anggota yang berwenang melakukan operasi tulis seperti push.

Jika repository sudah pernah di-clone, jangan clone ulang. Sinkronkan salinan yang ada:

```powershell
git switch main
git pull --ff-only origin main
```

`--ff-only` mencegah Git membuat merge commit yang tidak disengaja saat hanya ingin mengambil pembaruan.

### 2. Aktifkan versi Node.js proyek

Proyek menyimpan versi Node.js pada `.node-version`. Jika menggunakan fnm:

```powershell
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
fnm install
fnm use
node --version
npm --version
```

Hasil `node --version` harus diawali `v24.` dan `npm --version` harus diawali `11.`. Jika `fnm` belum tersedia, ikuti dokumentasi [fnm](https://github.com/Schniz/fnm) atau minta pendampingan tim sebelum mengganti versi proyek.

### 3. Buka folder di Visual Studio Code

1. buka Visual Studio Code;
2. pilih **File → Open Folder**;
3. pilih folder `bht-nexus-api` hasil clone;
4. pilih **Yes, I trust the authors** karena repository berasal dari organisasi tim sendiri;
5. buka **Terminal → New Terminal** dan pastikan nama folder aktif berakhir dengan `bht-nexus-api`.

### 4. Pasang dependency

Di terminal VS Code, jalankan:

```powershell
npm ci
```

Gunakan `npm ci`, bukan `npm install`, untuk pemakaian harian setelah clone. `npm ci` memasang versi persis yang sudah dikunci di `package-lock.json` sehingga hasil setiap anggota tim sama. Proses ini juga memasang Git hooks Lefthook yang telah disetujui proyek.

Repository ini memakai npm saja. Jangan menambahkan `pnpm-lock.yaml` atau `yarn.lock` tanpa keputusan arsitektur tertulis karena dua lockfile dapat menghasilkan dependency yang berbeda.

### 5. Periksa Git hooks

```powershell
npm run hooks:validate
```

Jika konfigurasi valid tetapi hook belum terpasang, jalankan sekali:

```powershell
npm run hooks:install
```

Hook `pre-commit` memeriksa format, lint, dan tipe TypeScript. Hook `pre-push` menjalankan unit test, end-to-end test, dan build. Hook tidak mengubah atau memasukkan file ke staging secara otomatis, sehingga isi commit tetap berada di bawah kendali pengembang.

### 6. Periksa fondasi

```powershell
npm run check
```

Perintah tersebut memeriksa format, lint, tipe TypeScript, unit test, end-to-end test, dan build. Jangan mulai mengubah kode jika pemeriksaan awal gagal; simpan output error lalu koordinasikan dengan tim.

### 7. Jalankan aplikasi

```powershell
npm run start:dev
```

Buka `http://localhost:3000/api/v1`. Fondasi yang sehat mengembalikan:

```json
{
  "name": "bht-nexus-api",
  "status": "ok"
}
```

Biarkan terminal tersebut tetap berjalan selama aplikasi digunakan. Tekan `Ctrl+C` untuk menghentikannya.

### 8. Sebelum mulai mengerjakan tugas

```powershell
git status
```

Working tree (daftar perubahan lokal) seharusnya bersih. Setelah fondasi ini, pekerjaan baru tidak dilakukan langsung di `main`; ikuti alur issue, branch, dan pull request pada [CONTRIBUTING.md](CONTRIBUTING.md).

## Keamanan dan Dukungan

- Jangan menyimpan password, token, cookie, private key, data produksi, atau isi `.env` dalam Git.
- Bug dilaporkan melalui formulir bug pada tab Issues.
- Usulan fitur dilaporkan melalui formulir fitur.
- Pertanyaan dan gangguan mengikuti [SUPPORT.md](SUPPORT.md).
- Kerentanan keamanan mengikuti [SECURITY.md](SECURITY.md) dan tidak dilaporkan melalui issue biasa.

## Sumber Kebenaran

Kebutuhan produk, keputusan arsitektur, kontrak API, schema database, code, dan test mempunyai fungsi yang berbeda. Urutan resminya dijelaskan dalam [docs/source-of-truth.md](docs/source-of-truth.md).

## Kontributor

- [Muhammad Zaenal Abidin Abdurrahman](https://github.com/Zendin110206)
- [Facalder](https://github.com/Facalder)
- [Liamours](https://github.com/Liamours)

Daftar ini akan diperbarui mengikuti perkembangan kontribusi pada BHT-Nexus.

## Akses dan Lisensi

Kode sumber repository ini dapat dilihat secara public agar pekerjaan, dokumentasi, dan kualitas teknis mudah ditinjau. Keterlihatan public **bukan** pemberian lisensi open-source. Belum ada izin umum untuk menggunakan, menyalin, memodifikasi, atau mendistribusikan kode di luar kewenangan organisasi.

Nilai `"private": true` pada `package.json` sengaja dipertahankan untuk mencegah package terpublikasi tidak sengaja ke registry npm; nilai tersebut tidak menentukan visibility repository GitHub.
