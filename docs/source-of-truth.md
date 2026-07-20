# Sumber Kebenaran BHT-Nexus API

Dokumen ini menetapkan tempat resmi untuk setiap jenis informasi agar keputusan tidak tersebar atau saling bertentangan.

## 1. Kebutuhan Produk: SRS yang Disetujui

SRS menjelaskan tujuan, pengguna, ruang lingkup, kebutuhan fungsi, dan kebutuhan kualitas. Perubahan kebutuhan produk harus memperbarui SRS melalui proses persetujuan yang berlaku.

## 2. Keputusan Teknis Penting: ADR yang Diterima

ADR menjelaskan keputusan arsitektur, pilihan yang dipertimbangkan, konsekuensi, dan alasan. ADR yang lebih baru dapat mengganti ADR lama, tetapi ADR lama tidak dihapus.

## 3. Kontrak HTTP: OpenAPI/Swagger

OpenAPI menjelaskan endpoint, method, parameter, request, response, kode status, dan autentikasi yang didukung API. Dokumentasi ini harus dihasilkan dari atau diverifikasi terhadap implementasi.

## 4. Struktur Data: Schema dan Migration

Schema Drizzle serta migration PostgreSQL menjelaskan tabel, kolom, relasi, index, constraint, dan perubahan database. Diagram yang tidak sesuai migration bukan sumber final.

## 5. Perilaku Implementasi: Source Code dan Automated Test

Source code menjalankan perilaku sistem. Automated test membuktikan perilaku penting dan mencegah regresi. Jika code berbeda dari kontrak atau kebutuhan, perbedaan tersebut adalah masalah yang harus diperbaiki, bukan alasan untuk mengabaikan dokumen.

## 6. Pekerjaan Perubahan: Issue dan Pull Request

Issue menjelaskan masalah atau kebutuhan terarah. Pull request menjelaskan perubahan, bukti verifikasi, review, dan hubungan dengan keputusan resmi.

## 7. Masukan Awal: Meeting dan Chat

Meeting dan chat membantu koordinasi, tetapi bukan tempat permanen untuk keputusan produk atau arsitektur. Keputusan penting dipindahkan ke SRS, ADR, issue, OpenAPI, schema, atau dokumentasi repositori yang sesuai.

## Stack Dasar yang Dikunci

- Node.js 24 LTS;
- NestJS 11 dengan Express;
- npm dan `package-lock.json`;
- Drizzle ORM;
- PostgreSQL 18;
- Python 3.12 untuk worker scraper dan RAG;
- OpenAPI/Swagger untuk kontrak API;
- modular monolith untuk backend awal;
- repositori web dan API tetap terpisah.

Perubahan terhadap keputusan dasar ini memerlukan bukti, ADR baru, penilaian dampak terhadap kemampuan tim, dan persetujuan yang sesuai.

## Menangani Pertentangan

Jika dua sumber bertentangan:

1. jangan memilih diam-diam;
2. catat perbedaannya;
3. tentukan jenis informasinya;
4. bawa perubahan ke sumber resmi yang tepat;
5. perbarui sumber turunan;
6. tambahkan test atau pemeriksaan agar konflik tidak berulang.

## Larangan

- Jangan menjadikan pesan chat sebagai satu-satunya bukti keputusan penting.
- Jangan menyalin materi lokal atau percakapan AI ke repositori produk.
- Jangan mengubah kontrak API hanya melalui code tanpa memperbarui OpenAPI dan test.
- Jangan mengubah database produksi tanpa migration yang dapat ditinjau.
- Jangan menulis angka KPI tanpa definisi, sumber data, periode, dan aturan perhitungan.
