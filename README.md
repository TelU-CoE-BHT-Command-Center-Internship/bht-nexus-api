# BHT-Nexus API

<div align="center">

**Layanan backend terpadu untuk data, otomasi, scraper, dan RAG dokumen BHT.**

![Status](https://img.shields.io/badge/status-fondasi_awal-475569)
![Akses](https://img.shields.io/badge/akses-private-7c3aed)
![Node.js](https://img.shields.io/badge/Node.js-24_LTS-339933)
![NestJS](https://img.shields.io/badge/NestJS-11-e0234e)

[Status saat ini](#status-saat-ini) · [Arsitektur](#arsitektur-ringkas) · [Struktur](#struktur-repositori) · [Kontribusi](CONTRIBUTING.md)

</div>

## Gambaran Umum

BHT-Nexus API adalah pusat layanan untuk Dashboard Automation Specialist BHT. Repositori ini akan menangani aturan bisnis, akses data, autentikasi, pengelolaan publikasi dan dokumen, pekerjaan scraper, serta layanan RAG dokumen yang digunakan oleh aplikasi web BHT-Nexus.

Backend dan antarmuka web dikelola dalam repositori terpisah. Dengan batas ini, pengembangan tampilan dapat berjalan tanpa mencampur aturan bisnis, sementara layanan scraper dan RAG tetap masuk melalui satu pintu API yang terdokumentasi.

## Status Saat Ini

Repositori berada pada tahap **fondasi awal**. Struktur direktori dan standar kolaborasi sudah disiapkan, tetapi aplikasi belum dapat dijalankan karena dependency dan source code NestJS belum ditambahkan.

| Bagian | Status |
|---|---|
| Struktur repositori | Tersedia |
| Standar Git dan kolaborasi | Tersedia |
| Dokumentasi dasar | Tersedia |
| Aplikasi NestJS | Belum ditambahkan |
| Database dan migration | Belum ditambahkan |
| Worker scraper dan RAG | Belum diintegrasikan |
| CI/CD dan deployment | Belum ditambahkan |

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
| ORM | Drizzle ORM |
| Database | PostgreSQL 18 |
| Worker | Python 3.12 |
| Kontrak API | OpenAPI/Swagger |

## Struktur Repositori

```text
.
├── .github/      # kepemilikan, issue form, dan template kolaborasi
├── .vscode/      # pengaturan bersama VS Code pada tahap berikutnya
├── docs/         # keputusan dan dokumentasi teknis
├── drizzle/      # migration database yang akan dibuat Drizzle
├── scripts/      # otomasi pengembangan dan operasi
├── src/          # aplikasi NestJS utama
├── test/         # pengujian lintas modul dan layanan
└── workers/      # worker Python untuk scraper dan RAG
```

Folder source code masih dipertahankan dengan `.gitkeep` sampai implementasi nyata dibuat. Penjelasan keputusan teknis akan disimpan di `docs/decisions/` agar alasan perubahan tetap dapat ditelusuri.

## Memulai Pengembangan

Belum ada perintah instalasi atau menjalankan aplikasi pada tahap ini. Jangan menjalankan `npm install` sebelum fondasi NestJS dan `package.json` resmi ditambahkan.

Versi Node.js yang dituju tercatat dalam `.node-version`. Aturan kontribusi dan pola commit tersedia di [CONTRIBUTING.md](CONTRIBUTING.md).

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

Repositori ini bersifat private dan digunakan untuk pekerjaan internal proyek BHT-Nexus. Belum ada lisensi open-source yang diberikan. Penggunaan, penyalinan, atau distribusi di luar kewenangan organisasi memerlukan persetujuan tertulis dari pihak yang berwenang.
