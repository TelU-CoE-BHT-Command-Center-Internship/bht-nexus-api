# ADR-0002: Modul NestJS dikelompokkan berdasarkan fitur bisnis

- **Status:** Accepted
- **Tanggal:** 2026-07-20
- **Pemilik keputusan:** Tim BHT-Nexus
- **Terkait:** arsitektur modular monolith dan repository web terpisah

## Konteks

BHT-Nexus akan memiliki banyak bagian, antara lain autentikasi, anggota, publikasi, dokumen, impor, review, KPI, audit, pekerjaan scraper, dan RAG. Struktur kode harus tetap mudah dicari ketika fitur dan kontributor bertambah.

NestJS secara resmi mengelompokkan controller dan provider yang saling berkaitan di dalam feature module. BHT-Nexus juga memisahkan antarmuka pengguna ke repository web Next.js, sehingga API tidak mempunyai lapisan *view* halaman.

## Keputusan

API dibangun sebagai modular monolith (satu aplikasi backend yang dibagi menjadi modul dengan tanggung jawab jelas). Setiap fitur bisnis memiliki folder sendiri di bawah `src/modules`.

Contoh bentuk satu fitur:

```text
src/modules/publications/
├── dto/
├── publications.controller.ts
├── publications.module.ts
├── publications.repository.ts
├── publications.service.ts
└── publications.service.spec.ts
```

Makna setiap bagian:

- `module` mendaftarkan dan menghubungkan komponen fitur kepada NestJS;
- `controller` menerima permintaan HTTP dan mengembalikan respons;
- `service` menjalankan aturan bisnis;
- `repository` membatasi akses data fitur;
- `dto` menjelaskan bentuk data masuk dan keluar;
- `spec` menguji perilaku fitur.

Komponen lintas fitur seperti konfigurasi, database, logging, keamanan, dan error bersama berada di `src/common` atau `src/config` sesuai tanggung jawabnya.

## Alasan

- seluruh berkas satu fitur berada berdekatan;
- batas tanggung jawab lebih mudah dipahami pengembang baru dan alat bantu AI;
- fitur dapat diuji dan ditinjau tanpa mencari controller atau service di folder global;
- pola mengikuti konsep feature module resmi NestJS;
- lapisan halaman tetap menjadi tanggung jawab repository web Next.js.

## Konsekuensi

- tidak dibuat folder global `src/controllers`, `src/services`, `src/models`, dan `src/views` untuk menampung seluruh fitur;
- perubahan struktur dilakukan melalui branch dan pull request, bukan dengan menginisialisasi ulang repository;
- satu fitur dapat memiliki subfolder tambahan ketika kebutuhannya nyata, tetapi tidak dibuat hanya sebagai placeholder;
- `AppModule` menjadi pintu penggabung modul, bukan tempat menumpuk seluruh aturan bisnis.

## Pilihan yang Tidak Dipakai

Struktur MVC global tidak dipakai karena bagian *view* berada pada aplikasi web terpisah dan folder controller/service global akan bercampur ketika modul bertambah. Konsep pemisahan tanggung jawab MVC tetap dihormati melalui controller, service, repository/data, dan web terpisah, tetapi organisasi folder mengikuti pola feature module NestJS.
