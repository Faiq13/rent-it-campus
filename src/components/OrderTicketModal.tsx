import React from 'react'
import {
  X,
  CheckCircle2,
  FileText,
  ClipboardList,
  CalendarDays,
  MapPin,
  Package,
  Truck,
} from 'lucide-react'
import { formatIDR } from '../data/gear'
import type { RentalOrder } from '../types'
import { formatDate, getOrderStatus } from '../lib/ticket'
import { useModalBehavior } from '../hooks/useModalBehavior'
import { BarcodeDummy, QrDummy } from './TicketCode'

interface OrderTicketModalProps {
  order: RentalOrder
  onClose: () => void
  onOpenAgreement: (order: RentalOrder) => void
  onViewMyRentals: () => void
}

export function OrderTicketModal({
  order,
  onClose,
  onOpenAgreement,
  onViewMyRentals,
}: OrderTicketModalProps) {
  useModalBehavior(onClose)

  const status = getOrderStatus(order)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-title"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#F5F5F5] p-6 md:p-8 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Tutup tiket pesanan"
          className="absolute right-4 top-4 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-black hover:bg-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3 mb-5 pr-8">
          <div className="rounded-full bg-emerald-100 p-2 text-emerald-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-black/50 text-sm">Pemesanan berhasil</p>
            <h3
              id="ticket-title"
              className="text-black text-2xl md:text-3xl font-medium leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Tiket pesananmu terbit.
            </h3>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-black/10 overflow-hidden">
          <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-dashed border-black/15">
            <div>
              <p className="text-black/40 text-xs uppercase tracking-wide mb-1">
                {order.item.category}
              </p>
              <h4 className="text-black text-lg font-medium leading-snug">
                {order.item.name}
              </h4>
              <p className="text-black/50 text-sm mt-0.5">SN {order.serialNumber}</p>
            </div>
            <span className="shrink-0 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-medium">
              {status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1.3fr_0.7fr]">
            <div className="px-6 py-5 space-y-2.5 sm:border-r border-black/10">
              <div className="rounded-xl bg-[#F5F5F5] px-4 py-3">
                <p className="text-black/40 text-[10px] uppercase tracking-[0.18em] mb-0.5">
                  Kode Tiket
                </p>
                <p className="text-black text-xl font-medium tracking-[0.06em] font-mono break-all">
                  {order.ticketCode}
                </p>
              </div>

              <DetailRow
                icon={<CalendarDays className="w-4 h-4" />}
                label="Tanggal sewa"
                value={`${formatDate(order.startDate)} → ${formatDate(order.returnDate)}`}
              />
              <DetailRow
                icon={<Package className="w-4 h-4" />}
                label="Durasi"
                value={`${order.duration} ${order.unit.toLowerCase()}`}
              />
              <DetailRow
                icon={<MapPin className="w-4 h-4" />}
                label="Lokasi"
                value={order.pickupLocation}
              />
              <DetailRow
                icon={<Truck className="w-4 h-4" />}
                label="Metode"
                value={order.pickup}
              />

              <div className="flex items-center justify-between pt-3 border-t border-black/10">
                <span className="text-black/60 text-sm">Total biaya</span>
                <span className="text-black text-lg font-medium">
                  {formatIDR(order.total)}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center px-6 py-5 bg-[#FAFAFA]">
              <QrDummy value={order.ticketCode} size={124} />
              <p className="text-black/40 text-[11px] mt-2 text-center">
                Tunjukkan QR ini saat pengambilan
              </p>
              <div className="mt-3 w-full">
                <BarcodeDummy value={order.ticketCode} height={36} />
                <p className="text-center text-black/50 text-[10px] tracking-[0.22em] font-mono mt-1">
                  {order.ticketCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => onOpenAgreement(order)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors duration-200"
          >
            <FileText className="w-4 h-4" />
            Unduh Kontrak (PDF/Cetak)
          </button>
          <button
            onClick={onViewMyRentals}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-black/15 px-5 py-3 text-sm font-medium text-black hover:bg-gray-100 transition-colors duration-200"
          >
            <ClipboardList className="w-4 h-4" />
            Lihat Sewa Saya
          </button>
        </div>

        <p className="text-black/40 text-xs text-center mt-3">
          Simpan kode tiket ini. Verifikasi KTM diperlukan saat pengambilan.
        </p>
      </div>
    </div>
  )
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="flex items-center gap-2 text-black/50 shrink-0">
        {icon}
        {label}
      </span>
      <span className="text-black text-right leading-snug">{value}</span>
    </div>
  )
}
