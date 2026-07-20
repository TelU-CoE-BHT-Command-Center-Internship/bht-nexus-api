# ADR-0001: npm dan Lefthook sebagai alur pengembangan Node.js

- **Status:** Proposed
- **Tanggal:** 2026-07-20
- **Pemilik keputusan:** Tim BHT-Nexus (menunggu pembahasan)
- **Terkait:** fondasi NestJS, CI, dan panduan kontribusi

## Konteks

Fondasi API menggunakan Node.js 24 LTS dan menghasilkan `package-lock.json` melalui npm. CI juga memasang dependency dengan `npm ci`. Menggunakan package manager atau lockfile lain pada repository yang sama dapat membuat versi dependency lokal berbeda dari CI.

Tim juga membutuhkan pemeriksaan cepat sebelum perubahan masuk ke commit atau dikirim ke GitHub. Pemeriksaan lokal harus membantu pengembang tanpa mengubah file atau staging secara diam-diam, dan tidak boleh dianggap sebagai pengganti CI.

## Usulan

1. npm 11 dan `package-lock.json` menjadi satu-satunya alur package Node.js pada repository API.
2. `npm ci` dipakai setelah clone dan pada CI agar versi dependency mengikuti lockfile secara tepat.
3. Lefthook dipakai untuk memasang Git hooks lintas sistem operasi.
4. `pre-commit` menjalankan format check, lint, dan typecheck.
5. `pre-push` menjalankan unit test, end-to-end test, dan build.
6. Hook tidak melakukan auto-fix atau memasukkan file ke staging secara otomatis.
7. GitHub CI tetap menjadi pemeriksaan resmi sebelum perubahan digabungkan.
8. Jika tim memilih package manager lain, migrasi dilakukan secara atomik (seluruh konfigurasi, lockfile, dokumentasi, hook, dan CI berubah bersama dalam satu pull request).

## Alasan

- npm sudah menjadi bagian dari Node.js dan paling mudah digunakan anggota baru;
- satu lockfile mencegah dependency dipasang melalui dua sumber kebenaran;
- Lefthook memberi konfigurasi hook yang sama untuk Windows, Linux, dan macOS;
- pemeriksaan lokal mempercepat umpan balik, sedangkan CI memverifikasi ulang pada lingkungan bersih;
- tidak adanya auto-fix tersembunyi membuat pengembang tetap mengetahui isi commit.

## Konsekuensi

Konsekuensi berikut berlaku apabila usulan disetujui. Selama pembahasan berlangsung, npm tetap dipakai sebagai baseline kerja karena tree tersebut sudah lulus instalasi bersih dan CI.

- anggota menjalankan `npm ci`, bukan pnpm atau Yarn;
- `package-lock.json` wajib ikut berubah ketika dependency berubah;
- commit atau push dapat ditolak jika pemeriksaan gagal;
- keadaan darurat yang melewati hook tetap harus lulus CI dan dijelaskan pada pull request;
- dependency Lefthook dipelihara melalui Dependabot seperti dependency pengembangan lain.

## Alternatif yang Masih Dibahas

### pnpm

pnpm merupakan package manager yang layak dipertimbangkan. Baseline pemulihan tetap memakai npm karena fondasi, dokumentasi, dan CI yang dipulihkan sudah konsisten serta lulus pemeriksaan dengan npm. Hal ini tidak berarti pnpm sudah ditolak.

Jika tim memilih pnpm, perpindahan harus dilakukan dalam satu pull request yang sekaligus menyelaraskan versi package manager, lockfile, CI, Git hooks, dokumentasi, dan cara deployment. Tim kemudian membandingkan hasilnya berdasarkan kemudahan anggota, kecepatan instalasi, penggunaan disk, dukungan deployment, dan konsistensi CI.

### Hook yang melakukan auto-fix dan auto-stage

Baseline pemulihan tidak memakai auto-fix atau auto-stage karena keduanya dapat mengubah isi commit tanpa terlihat jelas oleh pengembang. Perbaikan format saat ini dilakukan secara sadar melalui `npm run format`. Perilaku hook dapat dibahas kembali setelah tim memperoleh pengalaman penggunaan, tetapi perubahan harus tetap terlihat melalui pull request.

## Cara Verifikasi

```powershell
npm ci
npm run hooks:validate
npm run hooks:run:pre-commit
npm run hooks:run:pre-push
```

Seluruh perintah harus selesai dengan exit code `0` pada fondasi yang sehat.
