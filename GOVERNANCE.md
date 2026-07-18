# Tata Kelola BHT-Nexus API

Dokumen ini menjelaskan cara tanggung jawab dan keputusan dikelola tanpa bergantung pada satu orang.

## Prinsip

1. Kebutuhan produk mengikuti SRS yang disetujui.
2. Keputusan arsitektur penting dicatat dalam ADR.
3. Kontrak API, schema database, code, dan test harus tetap selaras.
4. Perubahan berisiko memerlukan bukti dan peninjauan yang lebih kuat.
5. Keamanan, privasi, audit, dan pemulihan bukan pekerjaan tambahan di akhir.
6. Keputusan penting dari chat atau meeting dipindahkan ke dokumen resmi.

## Tanggung Jawab

Penanggung jawab produk menjaga tujuan dan prioritas. Maintainer menjaga struktur, akses, aturan branch, dokumentasi, dan riwayat Git. Kontributor memahami tugas, menguji perubahan, serta menjaga data. Reviewer menilai kebenaran, keamanan, keterbacaan, dan keselarasan dengan sumber kebenaran proyek.

Pembagian orang untuk setiap tanggung jawab akan mengikuti kesepakatan tim dan dapat berkembang tanpa mengubah prinsip tata kelola ini.

## Tingkat Keputusan

| Jenis keputusan | Cara mencatat |
|---|---|
| perbaikan teks kecil | commit yang jelas |
| bug atau tugas terarah | issue dan commit/PR |
| perubahan kontrak API | issue, OpenAPI, test, dan PR |
| perubahan schema atau data | issue, migration, test, dokumentasi, dan PR |
| arsitektur, keamanan, penyimpanan, dependency inti | ADR dan PR |
| perubahan kebutuhan produk | revisi SRS yang disetujui |

## Tahap Persiapan Repositori

Pada tahap persiapan awal, maintainer dapat mengirim dokumentasi dan konfigurasi dasar yang sudah disepakati langsung ke `main` setelah audit menyeluruh. Pengecualian ini tidak mencakup dependency atau implementasi aplikasi.

Ketika implementasi dimulai, perubahan menggunakan branch dan pull request. Perlindungan `main` serta pemeriksaan CI diwajibkan setelah workflow nyata tersedia dan terbukti lulus.

## Catatan Keputusan

ADR dibuat ketika keputusan sulit dibalik, memengaruhi banyak modul, menyentuh data atau keamanan, mengganti keputusan sebelumnya, atau perlu dipahami anggota tim berikutnya.

ADR berstatus `Proposed`, `Accepted`, `Superseded`, atau `Rejected`. ADR yang diganti tidak dihapus; statusnya diperbarui dan menunjuk keputusan pengganti.

## Konflik

Konflik dibahas berdasarkan bukti, kebutuhan pengguna, risiko, dan kemampuan tim. Kritik diarahkan pada keputusan atau perubahan, bukan pribadi. Jika konsensus belum tercapai, pilihan dan konsekuensinya dicatat sebelum keputusan pihak berwenang diterapkan.
