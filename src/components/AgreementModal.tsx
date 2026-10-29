import React from 'react'
import { X, Printer, ShieldCheck } from 'lucide-react'
import { formatIDR } from '../data/gear'
import type { RentalOrder } from '../types'
import { formatDate, getOrderStatus } from '../lib/ticket'
import { useModalBehavior } from '../hooks/useModalBehavior'
import { LogoIcon } from './LogoIcon'

interface AgreementModalProps {
  order: RentalOrder
  onClose: () => void
}

export function AgreementModal({ order, onClose }: AgreementModalProps) {
  useModalBehavior(onClose)

  const issuedAt = new Date().toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div
      className="agreement-overlay fixed inset-0 z-[58] flex items-start justify-center overflow-y-auto p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="agreement-title"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm no-print" onClick={onClose} />

      <div className="relative w-full max-w-3xl">
        <div className="no-print flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 text-white">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-sm font-medium">Kontrak sewa digital</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Cetak / Simpan PDF
            </button>
            <button
              onClick={onClose}
              aria-label="Tutup kontrak"
              className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-black hover:bg-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <article
          id="rental-agreement"
          className="bg-white text-black rounded-lg shadow-2xl p-8 md:p-12"
        >
          <header className="flex items-start justify-between gap-6 border-b border-black/20 pb-5">
            <div className="flex items-center gap-3">
              <LogoIcon className="w-9 h-9 text-black" />
              <div>
                <p className="text-lg font-semibold tracking-tight">Rent It Campus</p>
                <p className="text-xs text-black/60">
                  Campus Electronics Rental · Jl. Kampus Raya No. 1
                </p>
              </div>
            </div>
            <div className="text-right text-xs text-black/60">
              <p>No. Kontrak</p>
              <p className="font-mono text-sm text-black">{order.ticketCode}</p>
              <p className="mt-1">{issuedAt}</p>
            </div>
          </header>

          <h1
            id="agreement-title"
            className="text-center text-xl md:text-2xl font-semibold mt-8 mb-1"
          >
            SURAT PERJANJIAN SEWA ELEKTRONIK
          </h1>
          <p className="text-center text-sm text-black/60 mb-8">
            Nomor: {order.ticketCode}
          </p>

          <p className="text-sm leading-relaxed mb-6">
            Pada hari ini, perjanjian sewa elektronik dibuat dan disepakati oleh
            dan antara:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-xs uppercase tracking-wide text-black/50 mb-1">
                Pihak Pertama
              </p>
              <p className="font-semibold">Rent It Campus Hub</p>
              <p className="text-sm text-black/70 leading-relaxed">
                Diwakili oleh Admin Hub Rent It Campus
                <br />
                Jl. Kampus Raya No. 1, Student Center Lt. 2
                <br />
                Jakarta, Indonesia
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-black/50 mb-1">
                Pihak Kedua
              </p>
              <p className="font-semibold">{order.userName}</p>
              <p className="text-sm text-black/70 leading-relaxed">
                NIM {order.userNim}
                <br />
                {order.faculty}
                <br />
                {order.userEmail}
              </p>
            </div>
          </div>

          <Section title="Pasal 1 — Objek Sewa">
            <table className="w-full text-sm border-collapse">
              <tbody>
                <Row label="Nama Barang" value={order.item.name} />
                <Row label="Kategori" value={order.item.category} />
                <Row label="Nomor Seri" value={order.serialNumber} />
                <Row label="Kondisi Awal" value="Baik, berfungsi normal" />
                <Row
                  label="Periode Sewa"
                  value={`${formatDate(order.startDate)} s/d ${formatDate(order.returnDate)}`}
                />
                <Row
                  label="Durasi"
                  value={`${order.duration} ${order.unit.toLowerCase()}`}
                />
                <Row label="Lokasi Pengambilan" value={order.pickupLocation} />
                <Row label="Status Tiket" value={getOrderStatus(order)} />
              </tbody>
            </table>
          </Section>

          <Section title="Pasal 2 — Biaya Sewa">
            <p className="text-sm leading-relaxed">
              Total biaya sewa yang wajib dibayarkan oleh Pihak Kedua adalah{' '}
              <span className="font-semibold">{formatIDR(order.total)}</span>,
              dibayarkan sebelum unit diserahkan. Biaya tersebut mencakup sewa
              unit, pemeriksaan teknis, dan perlindungan kerusakan pemakaian
              normal.
            </p>
          </Section>

          <Section title="Pasal 3 — Ketepatan Waktu">
            <p className="text-sm leading-relaxed mb-2">
              Pihak Kedua wajib mengembalikan unit paling lambat pada{' '}
              <span className="font-semibold">{formatDate(order.returnDate)}</span>{' '}
              ke hub pengambilan. Keterlambatan dikenakan denda:
            </p>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
              <li>
                20% dari harga sewa harian per jam keterlambatan untuk laptop dan
                proyektor.
              </li>
              <li>
                25% dari harga sewa harian per jam keterlambatan untuk kamera dan
                drone.
              </li>
              <li>
                Denda dihitung maksimal 3 hari sewa. Melebihi itu, unit dianggap
                hilang dan diproses sesuai kebijakan kampus.
              </li>
            </ul>
          </Section>

          <Section title="Pasal 4 — Kerusakan">
            <p className="text-sm leading-relaxed">
              Kerusakan ringan akibat pemakaian normal ditanggung sepenuhnya oleh
              Pihak Pertama. Pihak Kedua dikenakan biaya perbaikan apabila
              kerusakan terjadi karena kelalaian, antara lain cairan masuk,
              benturan keras, penggunaan di luar peruntukan, atau kehilangan
              aksesori. Besaran biaya mengikuti nota servis resmi.
            </p>
          </Section>

          <Section title="Pasal 5 — Garansi Perbaikan">
            <p className="text-sm leading-relaxed">
              Setiap unit telah melewati pemeriksaan fungsi sebelum diserahkan.
              Apabila terjadi kerusakan teknis bukan akibat kelalaian Pihak Kedua,
              Pihak Pertama menyediakan unit pengganti atau perbaikan gratis
              dalam 1x24 jam pada hari kerja.
            </p>
          </Section>

          <Section title="Pasal 6 — Penutup">
            <p className="text-sm leading-relaxed">
              Perjanjian ini dibuat secara elektronik dan sah tanpa tanda tangan
              basah. Dengan menekan tombol konfirmasi pada aplikasi, Pihak Kedua
              dianggap telah membaca, memahami, dan menyetujui seluruh ketentuan
              dalam dokumen ini.
            </p>
          </Section>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-black/60 mb-14">Pihak Kedua,</p>
              <p
                className="text-2xl"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic' }}
              >
                {order.userName}
              </p>
              <div className="border-t border-black/30 mt-2 pt-1">
                <p className="text-sm font-medium">{order.userName}</p>
                <p className="text-xs text-black/60">NIM {order.userNim}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-black/60 mb-6">Pihak Pertama,</p>
              <div className="inline-flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-black/70 text-center rotate-[-6deg] mb-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-black/60">
                  Rent It Campus
                </span>
                <span className="text-lg font-semibold tracking-wider">SAH</span>
                <span className="text-[10px] text-black/60">
                  {formatDate(order.startDate)}
                </span>
              </div>
              <div className="border-t border-black/30 mt-2 pt-1">
                <p className="text-sm font-medium">Admin Hub Rent It Campus</p>
                <p className="text-xs text-black/60">Stempel konfirmasi otomatis</p>
              </div>
            </div>
          </div>

          <footer className="mt-10 border-t border-black/20 pt-4 text-[11px] text-black/50 leading-relaxed">
            Dokumen ini dihasilkan otomatis oleh sistem Rent It Campus pada{' '}
            {issuedAt}. Keaslian dapat diverifikasi dengan memindai kode tiket{' '}
            {order.ticketCode} di hub kampus.
          </footer>
        </article>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h2 className="text-sm font-semibold mb-2">{title}</h2>
      {children}
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-black/10 last:border-0">
      <th className="text-left font-normal text-black/50 py-1.5 pr-4 w-44 align-top">
        {label}
      </th>
      <td className="py-1.5">{value}</td>
    </tr>
  )
}
