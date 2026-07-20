# Kebijakan Keamanan BHT-Nexus API

Keamanan menjadi bagian dari desain, pengembangan, pengujian, deployment, dan operasi BHT-Nexus API.

## Status Dukungan

Selama aplikasi belum mempunyai rilis produksi, branch `main` menjadi baseline aktif yang dipelihara. Kebijakan versi yang lebih rinci akan ditambahkan ketika rilis pertama tersedia.

## Melaporkan Kerentanan

Jangan membuat issue biasa untuk dugaan kerentanan. Laporkan secara privat melalui GitHub Private Vulnerability Reporting atau draft Security Advisory jika tersedia, kanal internal proyek yang telah disetujui, atau maintainer repositori melalui jalur organisasi.

Laporan sebaiknya memuat ringkasan, komponen terdampak, langkah reproduksi minimal, kemungkinan dampak, bukti yang sudah disanitasi, dan saran mitigasi bila tersedia.

Jangan mengirim password, token aktif, private key, dokumen rahasia, atau data pribadi sebagai bukti. Gunakan contoh buatan atau bukti yang telah disamarkan.

## Jika Secret Terlanjur Terbuka

Prioritas pertama adalah mencabut atau merotasi secret pada sistem penerbitnya. Menghapus teks dari commit terbaru saja tidak membuat secret lama kembali aman.

Setelah secret dinonaktifkan:

1. beri tahu pihak berwenang melalui kanal privat;
2. periksa log penggunaan;
3. tentukan kebutuhan pembersihan sejarah Git;
4. dokumentasikan penyebab dan pencegahan tanpa mempublikasikan nilai secret.

## Target Penanganan

Tim menargetkan konfirmasi penerimaan laporan dalam dua hari kerja dan penilaian awal dalam lima hari kerja. Waktu perbaikan bergantung pada dampak, kompleksitas, dan kebutuhan koordinasi. Pembaruan diberikan melalui kanal privat yang sama.

## Ruang Lingkup Utama

Contoh masalah keamanan meliputi akses tanpa izin, kebocoran sesi atau credential, validasi input yang dapat dilewati, akses dokumen lintas pengguna, injeksi SQL atau command, upload berbahaya, kebocoran data melalui log atau RAG, dependency rentan, dan konfigurasi deployment yang membuka layanan internal.

## Pengungkapan

Jangan mengungkapkan rincian kerentanan kepada pihak yang tidak berwenang sebelum mitigasi selesai dan pihak institusi menyetujui bentuk pengungkapannya.
