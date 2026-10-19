/**
 * Rent It Campus — Generator Surat Perjanjian Sewa-Menyewa (PDF).
 *
 * Dokumen dibuat sepenuhnya di sisi klien memakai jsPDF:
 *   1. Sampul (cover) dengan identitas para pihak, ringkasan transaksi, dan
 *      blok verifikasi + QR.
 *   2. Batang tubuh 13 pasal bergaya kontrak hukum Indonesia.
 *   3. Lampiran A (daftar perangkat & rincian biaya) dan Lampiran B
 *      (berita acara serah terima).
 *   4. Kolom tanda tangan Penyedia & Penyewa lengkap dengan catatan meterai.
 *
 * Preview dibuka di tab baru sebagai PDF (bukan teks mentah), dan tersedia
 * unduhan berkas .pdf.
 */
(function () {
  'use strict';

  const { COMPANY, HUBS } = window.RIC.data;
  const S = window.RIC.store;

  const NAVY = [15, 23, 42];
  const TEAL = [13, 148, 136];
  const SLATE = [71, 85, 105];
  const MUTED = [100, 116, 139];
  const LINE = [203, 213, 225];
  const SOFT = [241, 245, 249];

  const PAGE_W = 210;
  const PAGE_H = 297;
  const MARGIN = 18;
  const CONTENT_W = PAGE_W - MARGIN * 2;

  const STATUS_LABEL = {
    menunggu_pembayaran: 'Menunggu Pembayaran',
    dikonfirmasi: 'Dikonfirmasi',
    aktif: 'Sedang Berjalan',
    selesai: 'Selesai',
    dibatalkan: 'Dibatalkan',
  };

  function rupiah(n) {
    return 'Rp ' + Math.round(Number(n) || 0).toLocaleString('id-ID');
  }

  function tanggalPanjang(iso) {
    const d = iso ? new Date(String(iso).slice(0, 10) + 'T00:00:00') : new Date();
    if (Number.isNaN(d.getTime())) return String(iso || '-');
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function hashGroups(hash) {
    return String(hash || '-').match(/.{1,8}/g)?.join(' ') || '-';
  }

  /* --------------------------------------------------------------- QR helper */

  function qrDataUrl(text) {
    try {
      if (!window.QRCode) return null;
      const holder = document.createElement('div');
      holder.style.position = 'fixed';
      holder.style.left = '-9999px';
      holder.style.top = '0';
      document.body.appendChild(holder);
      // eslint-disable-next-line no-new
      new window.QRCode(holder, {
        text,
        width: 320,
        height: 320,
        colorDark: '#0f172a',
        colorLight: '#ffffff',
        correctLevel: window.QRCode.CorrectLevel ? window.QRCode.CorrectLevel.M : 2,
      });
      const canvas = holder.querySelector('canvas');
      const url = canvas ? canvas.toDataURL('image/png') : null;
      holder.remove();
      return url;
    } catch (err) {
      console.warn('[RIC] QR gagal dibuat', err);
      return null;
    }
  }

  /* ----------------------------------------------------- primitif gambar */

  function addHeader(doc) {
    // Header identitas perusahaan di setiap halaman
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, PAGE_W, 10, 'F');
    doc.setFillColor(...TEAL);
    doc.rect(0, 10, PAGE_W, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(COMPANY.brand.toUpperCase(), MARGIN, 6.8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(203, 213, 225);
    doc.text(`${COMPANY.tagline}  ·  ${COMPANY.email}  ·  ${COMPANY.website}`, MARGIN, 9.2);
  }

  /** Footer bernomor halaman */
  function addFooter(doc, pageNum, total) {
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, PAGE_H - 12, PAGE_W - MARGIN, PAGE_H - 12);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6.8);
    doc.setTextColor(...MUTED);
    doc.text(`${COMPANY.legalName} — ${COMPANY.jurisdiction}`, MARGIN, PAGE_H - 8.4);
    doc.text(`Halaman ${pageNum} dari ${total}`, PAGE_W - MARGIN, PAGE_H - 8.4, { align: 'right' });
  }

  function para(doc, y, text, opts) {
    const o = Object.assign({ size: 9.5, leading: 5.2, indent: false, align: 'justify' }, opts || {});
    doc.setFont('times', o.indent ? 'bold' : 'normal');
    doc.setFontSize(o.size);
    doc.setTextColor(...SLATE);
    let px = MARGIN;
    if (o.indent) {
      px += 4;
      doc.setFont('times', 'bold');
    }
    doc.text(doc.splitTextToSize(text, CONTENT_W - (o.indent ? 4 : 0)), px, y, { align: o.align });
    const lines = doc.splitTextToSize(text, CONTENT_W - (o.indent ? 4 : 0));
    return y + lines.length * o.leading + (o.after || 0);
  }

  function clause(doc, y, no, title, body) {
    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...NAVY);
    doc.text(`${no}.  ${title}`, MARGIN, y);
    let ny = y + 5;
    doc.setFont('times', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...SLATE);
    doc.text(doc.splitTextToSize(body, CONTENT_W), MARGIN, ny, { align: 'justify' });
    return ny + doc.splitTextToSize(body, CONTENT_W).length * 4.9 + 7;
  }

  function sectionTitle(doc, y, text, sub) {
    doc.setFillColor(...SOFT);
    doc.rect(MARGIN, y - 4.5, CONTENT_W, 8.4, 'F');
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.4);
    doc.rect(MARGIN, y - 4.5, CONTENT_W, 8.4, 'S');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...NAVY);
    doc.text(text, MARGIN + 2, y);
    if (sub) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...MUTED);
      doc.text(sub, PAGE_W - MARGIN - 2, y, { align: 'right' });
    }
    return y + 7;
  }

  function addPageBreakIfNeeded(doc, y, height) {
    if (y + height > PAGE_H - 18) {
      doc.addPage();
      addHeader(doc);
      return 22;
    }
    return y;
  }

  /* ---------------------------------------------------------------- cover */

  function buildCover(doc, booking, assets) {
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, PAGE_W, 84, 'F');
    doc.setFillColor(...TEAL);
    doc.rect(0, 84, PAGE_W, 1.6, 'F');

    // Logo sederhana
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(MARGIN, 14, 10, 10, 2, 2, 'F');
    doc.setTextColor(...TEAL);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text('R', MARGIN + 5, 21.6, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text(COMPANY.brand, MARGIN + 15, 17.6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(COMPANY.legalName, MARGIN + 15, 22.2);
    doc.text(COMPANY.tagline, MARGIN + 15, 27);

    // badan atas
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text(COMPANY.email, PAGE_W - MARGIN, 16, { align: 'right' });
    doc.text(COMPANY.phone, PAGE_W - MARGIN, 19.5, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.text(COMPANY.address, PAGE_W - MARGIN, 23, { align: 'right' });
    const wAddr = doc.splitTextToSize(COMPANY.address, 90);
    let ay = 27;
    wAddr.slice(1).forEach(() => ay += 3);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text('TANDA TANGAN DIGITAL', PAGE_W - MARGIN, ay + 4);
    doc.setDrawColor(148, 163, 184);
    doc.setLineWidth(0.5);
    doc.line(PAGE_W - MARGIN - 90, ay + 8, PAGE_W - MARGIN, ay + 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.text(COMPANY.representative + ' — ' + COMPANY.representativeRole, PAGE_W - MARGIN, ay + 12);

    // judul
    const titleLines = doc.splitTextToSize('Surat Perjanjian Sewa-Menyewa', CONTENT_W - 8);
    let ty = 104;
    doc.setFont('times', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(...NAVY);
    doc.text(titleLines, MARGIN, ty);
    ty += titleLines.length * 10;
    doc.setDrawColor(13, 148, 136);
    doc.setLineWidth(0.8);
    doc.line(MARGIN, ty + 2, MARGIN + 42, ty + 2);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...MUTED);
    doc.text('Nomor: ' + booking.code + '   ·   Versi dokumen ' + COMPANY.docVersion, MARGIN, ty + 11);
    doc.setFontSize(9);
    doc.text('Dibuat: ' + tanggalPanjang(booking.createdAt) + ' untuk sewa tanggal ' + tanggalPanjang(booking.date) + ' (' + (booking.days || 1) + ' hari)', MARGIN, ty + 16);

    // ringkasan dalam kartu
    const cardTop = ty + 24;
    doc.setFillColor(...SOFT);
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN, cardTop, CONTENT_W, 40, 3, 3, 'DF');
    doc.setTextColor(...NAVY);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Ringkasan Sewa', MARGIN + 6, cardTop + 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...SLATE);
    let yC = cardTop + 15;
    (booking.quote.lines || booking.items || []).forEach((it) => {
      doc.text('• ' + it.title + ' (' + it.variantName + ') × ' + it.qty + ' — ' + rupiah(it.unitPrice * it.qty * (booking.quote.peak?1:1) ), MARGIN + 6, yC);
      yC += 4.6;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...TEAL);
      doc.text('  ' + (booking.days || 1) + ' hari', MARGIN + 6, yC);
      yC += 1;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...SLATE);
      doc.text('  Subtotal ', MARGIN + 6, yC);
      yC += 5;
    });

    // blok para pihak
    const partyTop = cardTop + 40 + 16;
    sectionTitle(doc, partyTop, 'Para Pihak', 'Dibuat oleh sistem — tidak perlu tanda tangan');
    let py = partyTop + 15;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...NAVY);
    doc.text('PENYEDIA', MARGIN, py);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...SLATE);
    doc.text(COMPANY.legalName, MARGIN, py + 5);
    doc.text(COMPANY.address, MARGIN + 1, py + 6);
    doc.text(COMPANY.representative + ' — ' + COMPANY.representativeRole, MARGIN, py + 12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...NAVY);
    doc.text('PENYEWA', PAGE_W - MARGIN - 30, py, { align: 'left' });

    // blok verifikasi QR
    const qrTop = PAGE_H - 58;
    const qr = qrDataUrl('https://' + COMPANY.website + '/verifikasi?kode=' + encodeURIComponent(booking.code) + '&hash=' + (booking.hash || ''));
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.4);
    doc.roundedRect(MARGIN, qrTop, CONTENT_W, 40, 3, 3, 'S');
    doc.setTextColor(...NAVY);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Verifikasi Keaslian Dokumen', MARGIN + 6, qrTop + 8);
    if (qr) {
      doc.addImage(qr, 'PNG', MARGIN + 4, qrTop + 12, 22, 22);
    }
    doc.setTextColor(...SLATE);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Pindai kode QR untuk memverifikasi keaslian.', MARGIN + 30, qrTop + 12);
    doc.text('Nomor berkas: ' + booking.code, MARGIN + 24, qrTop + 18);
    doc.text('Hash integritas: ' + hashGroups(booking.hash || '-'), MARGIN + 24, qrTop + 23);
    doc.setTextColor(...MUTED);
    doc.setFontSize(6.5);
    doc.text('Dokumen dikunci sebagai arsip sah. Perubahan apa pun pada berkas akan membuat hash berbeda.', MARGIN + 30, qrTop + 28);
    return ty + 64;
  }

  /* ------------------------------------------------- batang tubuh + pasal */

  function buildBody(doc, booking) {
    let y = 22;
    y = para(doc, y, 'Yang bertanda tangan di bawah ini:', { size: 9.5 });
    y = para(doc, y, 'Nama	: ' + (booking.customer?.name || '-'), { indent: false });
    y = para(doc, y, 'NIM/NIK	: ' + (booking.customer?.nim || '-'), { indent: false });
    y = para(doc, y, 'Instansi	: ' + (booking.customer?.campus || 'Mahasiswa Umum'), { indent: false });
    y = para(doc, y, 'Alamat	: ' + (booking.customer?.address || '-'), { indent: false });
    y = para(doc, y, 'No. HP	: ' + (booking.customer?.phone || '-'), { indent: false });
    y = para(doc, y, 'Email	: ' + (booking.customer?.email || '-'), { indent: false });
    y = para(doc, y, '—. —.', { size: 6 });
    y += 3;

    sectionTitle(doc, y, 'Pasal 1 — Ketentuan Umum', 'Klausul kontrak otomatis');
    y += 10;
    y = para(doc, y, '1.1. Para pihak sepakat bahwa kontrak ini mengikat sejak tanggal persetujuan elektronik.');
    y = para(doc, y, '1.2. Kontrak ini dibuat dalam Bahasa Indonesia yang sah. Jika terjadi perbedaan penafsiran, versi Bahasa Indonesia berlaku.');
    y = para(doc, y, '1.3. Istilah yang digunakan dalam kontrak ini memiliki arti sebagai berikut:');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    y += 2;
    doc.text('“Perangkat” berarti barang-barang yang terdaftar pada Lampiran A;', MARGIN + 2, y + 2);
    y += 5;
    doc.text('“Sewa” berarti penggunaan perangkat selama masa sewa;', MARGIN + 2, y + 2);
    y += 5;
    doc.text('“Deposit” berarti jaminan kerusakan yang dikembalikan saat selesai;', MARGIN + 2, y + 2);
    y += 5;
    doc.text('“Penyedia” berarti ' + COMPANY.legalName + '.'  ) ;
    y += 8;

    // Pasa 2
    y = addPageBreakIfNeeded(doc, y, 30);
    y = sectionTitle(doc, y, 'Pasal 2 — Objek Sewa', null);
    y += 8;
    y = para(doc, y, '2.1. Penyedia menyewakan kepada Penyewa perangkat yang tercantum pada Lampiran A hingga berakhirnya masa sewa tanpa hak untuk mengalihkan atau menyewakan kepada pihak lain tanpa persetujuan tertulis Penyedia.');
    y = para(doc, y, '2.2. Jumlah, merek, nomor seri, dan kelengkapan setiap perangkat tercantum pada Berita Acara Serah Terima (Lampiran B) yang ditandatangani saat penyerahan.');
    y = para(doc, y, '2.3. Penyedia menjamin perangkat dalam kondisi berfungsi baik dan siap pakai selama masa sewa.');
    y += 4;

    // Pasa 3
    y = addPageBreakIfNeeded(doc, y, 30);
    y = sectionTitle(doc, y, 'Pasal 3 — Masa Sewa', null);
    y += 8;
    y = para(doc, y, '3.1. Masa sewa dimulai pada ' + tanggalPanjang(booking.date) + ' selama ' + (booking.days || 1) + ' hari kalender dan berakhir otomatis pada pukul 24.00 WIB pada hari terakhir, kecuali diperpanjang dan disepakati kedua belah pihak.');
    y = para(doc, y, '3.2. Perpanjangan masa sewa wajib dikomunikasikan paling lambat 24 jam sebelum masa sewa berakhir melalui aplikasi atau email resmi Penyedia.');
    y = para(doc, y, '3.3. Keterlambatan pengembalian dikenakan biaya keterlambatan sesuai Pasal 6.');
    y += 4;

    // Pasa 4
    y = addPageBreakIfNeeded(doc, y, 30);
    y = sectionTitle(doc, y, 'Pasal 4 — Harga Sewa dan Biaya', null);
    y += 8;
    y = para(doc, y, '4.1. Harga sewa per hari tertera pada Lampiran A dan total biaya tercantum pada Lampiran B (Rincian).');
    y = para(doc, y, '4.2. Total biaya meliputi biaya sewa, biaya jasa tambahan, dan biaya pengiriman (bila ada), dikurangi diskon/promo yang sah, serta ditambah deposit jaminan.');
    y = para(doc, y, '4.3. Pembayaran dilakukan melalui transfer ke ' + COMPANY.bank.name + ' a.n. ' + COMPANY.bank.holder + ' nomor rekening ' + COMPANY.bank.account + ', atau metode pembayaran lain yang tercantum pada E-Tiket.');
    y = para(doc, y, '4.4. Seluruh biaya sudah termasuk pajak yang berlaku dan tidak dapat dikurangi sepihak.');
    y += 4;

    // Pasa 5
    y = addPageBreakIfNeeded(doc, y, 30);
    y = sectionTitle(doc, y, 'Pasal 5 — Deposit Jaminan', null);
    y += 8;
    y = para(doc, y, '5.1. Penyewa menyerahkan deposit jaminan sebesar ' + rupiah((booking.quote && booking.quote.deposit) || 0) + ' sebagai jaminan atas kerusakan/kehilangan.');
    y = para(doc, y, '5.2. Deposit dikembalikan paling lambat 7 × 24 jam setelah pengembalian perangkat dinyatakan lengkap dan baik, dipotong penggantian kerusakan sesuai Pasal 9.');
    y += 4;

    // Pasa 6
    y = addPageBreakIfNeeded(doc, y, 30);
    sectionTitle(doc, y, 'Pasal 6 — Keterlambatan', null);
    y += 8;
    y = para(doc, y, '6.1. Keterlambatan pengembalian dikenakan biaya sebesar 100% tarif sewa harian per unit untuk setiap hari keterlambatan.');
    y = para(doc, y, '6.2. Penyedia berhak menarik unit di lokasi penyewa apabila keterlambatan melebihi 24 jam, dengan biaya penarikan ditanggung Penyewa.');
    y += 4;

    // Pasa 7
    y = addPageBreakIfNeeded(doc, y, 30);
    sectionTitle(doc, y, 'Pasal 7 — Hak dan Kewajiban Penyedia', null);
    y += 8;
    y = para(doc, y, '7.1. Penyedia wajib menyerahkan perangkat sesuai spesifikasi pada waktu yang disepakati.');
    y = para(doc, y, '7.2. Penyedia berhak menerima pembayaran sesuai Pasal 4 dan menahan deposit sesuai Pasal 5.');
    y = para(doc, y, '7.3. Penyedia wajib menjaga kerahasiaan data penyewa sesuai peraturan perundang-undangan.');
    y += 4;

    // Pasa 8
    y = addPageBreakIfNeeded(doc, y, 30);
    sectionTitle(doc, y, 'Pasal 8 — Hak dan Kewajiban Penyewa', null);
    y += 8;
    y = para(doc, y, '8.1. Penyewa wajib memakai perangkat sesuai fungsi dan ketentuan yang tercantum pada E-Tiket.');
    y = para(doc, y, '8.2. Penyewa wajib menjaga perangkat dari kerusakan dan menanggung biaya perbaikan sesuai Pasal 9.');
    y = para(doc, y, '8.3. Penyewa wajib mengembalikan perangkat tepat waktu dalam kondisi yang sama.');
    y += 4;

    // Pasa 9
    y = addPageBreakIfNeeded(doc, y, 30);
    sectionTitle(doc, y, 'Pasal 9 — Kerusakan dan Kehilangan', null);
    y += 8;
    y = para(doc, y, '9.1. Penyewa menanggung biaya perbaikan atas kerusakan yang disebabkan kelalaian penyewa.');
    y = para(doc, y, '9.2. Kehilangan atau kerusakan berat yang tidak dapat diperbaiki dihitung berdasarkan nilai pasar wajar perangkat.');
    y = para(doc, y, '9.3. Force majeure (bencana alam, kerusuhan, kebijakan pemerintah) membebaskan para pihak dari tanggung jawab sepanjang tidak dapat dihindari.');
    y += 4;

    // Pasa 10
    y = addPageBreakIfNeeded(doc, y, 30);
    sectionTitle(doc, y, 'Pasal 10 — Pengalihan dan Sub-sewa', null);
    y += 8;
    y = para(doc, y, '10.1. Penyewa dilarang mengalihkan atau menyewakan kembali perangkat kepada pihak ketiga.');
    y = para(doc, y, '10.2. Pelanggaran Pasal 10.1 memberikan hak kepada Penyedia untuk mengakhiri sewa secara sepihak tanpa mengembalikan deposit.');
    y += 4;

    // Pasa 11
    y = addPageBreakIfNeeded(doc, y, 30);
    sectionTitle(doc, y, 'Pasal 11 — Perlindungan Data', null);
    y += 8;
    y = para(doc, y, '11.1. Data pribadi penyewa hanya digunakan untuk keperluan administrasi sewa.');
    y = para(doc, y, '11.2. Penyedia wajib melindungi data sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.');
    y = para(doc, y, '11.3. Penyewa berhak meminta salinan, pembaruan, atau penghapusan data pribadinya melalui ' + COMPANY.email + '.');
    y += 4;

    // Pasa 12
    y = addPageBreakIfNeeded(doc, y, 30);
    sectionTitle(doc, y, 'Pasal 12 — Penyelesaian Sengketa', null);
    y += 8;
    y = para(doc, y, '12.1. Setiap sengketa diselesaikan terlebih dahulu secara musyawarah untuk mufakat.');
    y = para(doc, y, '12.2. Para pihak sepakat memilih hukum Indonesia sebagai hukum yang berlaku.');
    y = para(doc, y, '12.3. Apabila musyawarah tidak mencapai kesepakatan, para pihak memilih domisili hukum yang umum dan tetap di Kantor Panitera ' + COMPANY.jurisdiction + '.');
    y += 4;

    // Pasa 13
    y = addPageBreakIfNeeded(doc, y, 30);
    sectionTitle(doc, y, 'Pasal 13 — Penutup', null);
    y += 8;
    y = para(doc, y, '13.1. Hal-hal yang belum diatur dalam kontrak ini akan diatur kemudian secara tertulis oleh para pihak.');
    y = para(doc, y, '13.2. Kontrak ini mengikat para pihak sejak ditandatangani secara elektronik melalui platform ' + COMPANY.brand + '.');
    y += 6;

    // tanda tangan
    y = addPageBreakIfNeeded(doc, y, 70);
    return y;
  }

  /* --------------------------------------------------------- lampiran A */

  function buildAnnexA(doc, booking) {
    doc.addPage();
    addHeader(doc);
    let y = 20;
    doc.setFont('times', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(...NAVY);
    doc.text('LAMPIRAN A — DAFTAR PERANGKAT SEWA', MARGIN, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text('Nomor: ' + booking.code, MARGIN, y + 6);
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.4);
    doc.rect(MARGIN, y + 2, CONTENT_W, 0.4, 'S');
    doc.line(MARGIN, y + 10, PAGE_W - MARGIN, y + 10);

    const cols = ['Nama Perangkat', 'Variasi', 'Qty', 'Harga/ Hari', 'Subtotal / ' + (booking.days || 1) + ' hr'];
    const COL = [MARGIN, MARGIN + 54, MARGIN + 108, MARGIN + 130, PAGE_W - MARGIN - 40];
    let ty = y + 20;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...NAVY);
    cols.forEach((c, i) => doc.text(c, COL[i] + (i === 0 ? 0 : 0), ty));
    doc.setDrawColor(...NAVY);
    doc.setLineWidth(0.4);
    doc.line(MARGIN, ty + 2, PAGE_W - MARGIN, ty + 2);
    doc.setTextColor(...SLATE);

    let base = 0;
    (booking.quote.lines || booking.items || []).forEach((it, i) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const body = doc.splitTextToSize(it.title, 50);
      ty += 6;
      if (ty + 10 > PAGE_H - 30) {
        doc.addPage();
        addHeader(doc);
        ty = 22;
      }
      doc.text(body, COL[0], ty);
      doc.text(it.variantName, COL[1], ty);
      doc.setFont('helvetica', 'bold');
      doc.text(String(it.qty), COL[2], ty);
      doc.setFont('helvetica', 'normal');
      doc.text(rupiah(it.unitPrice) + '/hr', COL[3], ty);
      doc.text(rupiah(it.unitPrice * it.qty * (booking.days || 1)), COL[4], ty);
      base += (it.unitPrice * it.qty * (booking.days || 1));
      ty += body.length * 4.6;
      if (it.addons && it.addons.length) {
        it.addons.forEach((a) => {
          doc.setTextColor(...MUTED);
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(7.5);
          doc.text('+ ' + a.name, COL[0], ty);
          doc.text(rupiah(a.price * (booking.days || 1)), COL[4], ty);
          base += a.price * (booking.days || 1);
          ty += 4.5;
          doc.setTextColor(...SLATE);
        });
      }
    });

    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.4);
    doc.line(MARGIN, ty + 4, PAGE_W - MARGIN, ty + 4);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...NAVY);
    doc.text('Total Sewa (sebelum diskon/deposit)', MARGIN, ty + 12);
    doc.text(rupiah(base) + ' / ' + (booking.days || 1) + ' hari', PAGE_W - MARGIN, ty + 12, { align: 'right' });
    return ty + 24;
  }

  /* --------------------------------------------------------- lampiran B */

  function buildAnnexB(doc, booking) {
    doc.addPage();
    addHeader(doc);
    let y = 20;
    doc.setFont('times', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(...NAVY);
    doc.text('LAMPIRAN B — BERITA ACARA SERAH TERIMA', MARGIN, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text('Nomor: ' + booking.code + ' · Disusun otomatis oleh ' + COMPANY.brand, MARGIN, y + 6);
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.4);
    doc.line(MARGIN, y + 10, PAGE_W - MARGIN, y + 10);

    y += 20;
    y = para(doc, y, 'Pada hari ini, ' + tanggalPanjang(booking.date) + ', telah dilakukan serah terima perangkat sewa-menyewa antara ' + COMPANY.legalName + ' (PENYEDIA) dan ' + (booking.customer?.name || 'PENYEWA') + ' (PENYEWA).');
    y = para(doc, y, 'Serah terima dilakukan di ' + (booking.hub?.name || 'kampus') + ' dengan kondisi perangkat yang dicatat pada tabel berikut:', { size: 9.5 });
    y += 4;

    const cx = [MARGIN, MARGIN + 56, MARGIN + 100, PAGE_W - MARGIN];
    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...NAVY);
    doc.text('Nama', cx[0], y);
    doc.text('Kelengkapan', cx[1], y);
    doc.text('Nomor Seri', cx[2], y);
    doc.text('Kondisi', cx[3], y);
    doc.setDrawColor(...NAVY);
    doc.setLineWidth(0.4);
    doc.line(MARGIN, y + 2, PAGE_W - MARGIN, y + 2);
    doc.setTextColor(...SLATE);
    (booking.quote.lines || booking.items || []).forEach((it) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      y += 6;
      if (y + 8 > PAGE_H - 24) { doc.addPage(); addHeader(doc); y = 22; }
      doc.text(it.title, cx[0], y);
      doc.text((it.addons || []).map(a => a.name).join(', ') || 'Sesuai spesifikasi', cx[1], y);
      doc.text('—', cx[2], y);
      doc.text('Baik & berfungsi', cx[3], y);
      y += 4;
    });

    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.4);
    doc.line(MARGIN, y + 4, PAGE_W - MARGIN, y + 4);
    y += 12;
    y = para(doc, y, 'Kedua belah pihak menyatakan bahwa seluruh perangkat telah diperiksa, berfungsi baik, dan diterima dengan kondisi sesuai catatan di atas.');
    y += 12;
    return y;
  }

  /* -------------------------------------------------------- tanda tangan */

  function buildSignatures(doc, booking, y0) {
    let y = y0 || 24;
    doc.addPage();
    addHeader(doc);
    sectionTitle(doc, y, 'Tanda Tangan Para Pihak', 'Kontrak dikunci — verifikasi via QR');
    y += 18;
    const colW = (CONTENT_W - 18) / 2;
    y = Math.max(y, 60);

    doc.setFont('times', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...SLATE);
    doc.text('Dibuat dalam rangkap dua, masing-masing dianggap asli.', MARGIN, y);
    y += 4;
    doc.text('PENYEDIA', MARGIN, y + 6);
    doc.text('PENYEWA', PAGE_W - MARGIN - colW, y + 6);

    y += 42;
    doc.setDrawColor(...SLATE);
    doc.setLineWidth(0.5);
    doc.line(MARGIN + 6, y, MARGIN + colW - 6, y);
    doc.line(PAGE_W - MARGIN - colW + 6, y, PAGE_W - MARGIN - 6, y);
    y += 6;
    doc.setFont('times', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...NAVY);
    doc.text(COMPANY.representative, MARGIN + 6, y);
    doc.text(booking.customer?.name || 'Penyewa', PAGE_W - MARGIN - colW + 6, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...MUTED);
    doc.text(COMPANY.representativeRole, MARGIN + 6, y);
    doc.text('Mahasiswa/Kuasa', PAGE_W - MARGIN - colW + 6, y);

    // catatan meterai
    y += 26;
    doc.setFillColor(...SOFT);
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN, y, CONTENT_W, 24, 3, 3, 'DF');
    doc.setTextColor(...NAVY);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('Catatan', MARGIN + 6, y + 7);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...SLATE);
    doc.text('• Dokumen ini berupa tanda tangan elektronik yang sah sesuai ketentuan yang berlaku.', MARGIN + 6, y + 12);
    doc.text('• Simpan E-Tiket sebagai bukti sekaligus meterai digital dari penyelenggara.', MARGIN + 6, y + 17);
    doc.text('• Verifikasi keaslian dokumen melalui QR di halaman sampul.', MARGIN + 6, y + 22);
    return y + 30;
  }

  /* --------------------------------------------------------- halaman utama */

  function buildContract(booking) {
    const doc = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4', compress: true });
    if (!doc) throw new Error('Mesin PDF tidak tersedia. Muat jsPDF terlebih dahulu.');

    // Sampul
    buildCover(doc, booking);

    // Body
    doc.addPage();
    addHeader(doc);
    let y = buildBody(doc, booking);

    // Lampiran A dan B
    buildAnnexA(doc, booking);
    buildAnnexB(doc, booking);

    // Tanda tangan
    buildSignatures(doc, booking, 0);

    // Footer bernomor
    try {
      const n = doc.internal.getNumberOfPages();
      for (let i = 1; i <= n; i++) {
        doc.setPage(i);
        addFooter(doc, i, n);
      }
    } catch (err) { /* abaikan */ }

    return doc;
  }

  function fileName(booking) {
    const clean = String(booking.code || 'kontrak').replace(/[^0-9A-Za-z_-]/g, '');
    return `Kontrak-${clean}.pdf`;
  }

  function build(booking) {
    return buildContract(booking);
  }

  function download(booking) {
    const doc = buildContract(booking);
    doc.save(fileName(booking));
    return fileName(booking);
  }

  /**
   * Buka pratinjau PDF di tab baru. Jika popup diblokir, berkas diunduh
   * sebagai fallback agar pengguna tetap menerima dokumen.
   */
  function open(booking) {
    if (!window.jspdf) {
      throw new Error('Mesin PDF belum siap. Muat jsPDF dahulu.');
    }
    const doc = buildContract(booking);
    let url = '';
    try {
      url = String(doc.output('bloburl'));
    } catch (err) {
      console.warn('[RIC] gagal membuat blob url', err);
    }
    let win = null;
    if (url) win = window.open(url, '_blank', 'noopener');
    if (!win) {
      doc.save(fileName(booking));
      return { opened: false, downloaded: true, url: '' };
    }
    return { opened: true, downloaded: false, url };
  }


  /**
   * Pratinjau kontrak (HTML) yang dipakai oleh halaman contract.html —
   * menampilkan sampul dan ringkasan batang tubuh + tombol unduh PDF lengkap.
   */
  function renderPDF({ booking, assets, target, onReady }) {
    if (!booking || !target) return;
    // Sampul
    const coverImg = document.createElement('img');
    coverImg.src = (assets && assets.cover) || '';
    coverImg.alt = 'Sampul Surat Perjanjian Sewa-Menyewa';
    coverImg.style.width = '100%';
    coverImg.style.height = 'auto';
    coverImg.style.borderRadius = '14px';
    coverImg.style.boxShadow = '0 20px 50px rgba(13,36,71,0.25)';
    target.appendChild(coverImg);

    // Ringkasan hukum
    const body = document.createElement('div');
    body.className = 'contract-body-text';
    body.innerHTML = [
      '<h2>Surat Perjanjian Sewa-Menyewa</h2>',
      '<p class="lead">Nomor : ' + esc(booking.code) + '</p>',
      '<p class="lead">Tanggal : ' + esc(S.humanDate(booking.date)) + '</p>',
      renderBlock('Para Pihak', [
        'Penyedia : ' + esc(COMPANY.name || COMPANY.brand),
        'Penyewa : ' + esc((booking.customer && booking.customer.name) || '-'),
        'NIM/NIK  : ' + esc((booking.customer && booking.customer.nim) || '-'),
        'Alamat   : ' + esc((booking.customer && booking.customer.address) || '-'),
      ]),
      renderBlock('Objek Sewa', (booking.items || booking.quote.lines || []).map((i) =>
        '• ' + esc(i.title) + ' (' + esc(i.variantName) + ') — ' + S.money(i.unitPrice) + '/hari × ' + i.qty + ' unit × ' + (booking.days || 1) + ' hari'
      ).join('<br>')),
      renderBlock('Harga', [
        'Subtotal Sewa         : ' + S.money(booking.quote?.subtotal || 0),
        'Promo                : ' + (booking.quote?.promo ? ('-' + S.money(booking.quote.promo.amount)) : '-'),
        'Deposit Jaminan      : ' + S.money(booking.quote?.deposit || 0),
        'TOTAL                : ' + S.money(booking.quote?.total || 0),
      ].join('<br>')),
      '<p class="disclaimer" style="color:#5b6b80;font-size:12px;margin-top:16px">Halaman ini adalah pratinjau. Unduh PDF lengkap untuk versi yang dapat ditandatangani — lengkap dengan sampul dan 13 pasal.</p>',
    ].join('');
    target.appendChild(body);
    if (onReady) onReady({ status: 'ok' });
  }

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function renderBlock(title, lines) {
    return '<div class="block"><h3 class="block-title">' + esc(title) + '</h3><div class="block-lines">' + lines.join('<br>') + '</div></div>';
  }

  window.RIC.contract = {
    build,
    open,
    download,
    fileName,
    rupiah,
    statusLabel: STATUS_LABEL,
    renderPDF,
  };
})();
