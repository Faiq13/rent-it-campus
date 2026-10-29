import React, { useMemo } from 'react'
import { X, FileText, Ticket, ClipboardList, ArrowRight } from 'lucide-react'
import { formatIDR } from '../data/gear'
import type { RentalOrder, User } from '../types'
import { formatDate, getOrderStatus } from '../lib/ticket'
import { useModalBehavior } from '../hooks/useModalBehavior'

interface MyRentalsModalProps {
  user: User
  orders: RentalOrder[]
  onClose: () => void
  onOpenTicket: (order: RentalOrder) => void
  onOpenAgreement: (order: RentalOrder) => void
  onOpenCatalog: () => void
}

const statusTone: Record<string, string> = {
  'Menunggu Pengambilan': 'bg-amber-50 text-amber-700',
  'Siap Diambil': 'bg-emerald-50 text-emerald-700',
  'Sedang Dipakai': 'bg-blue-50 text-blue-700',
  Selesai: 'bg-black/5 text-black/50',
}

export function MyRentalsModal({
  user,
  orders,
  onClose,
  onOpenTicket,
  onOpenAgreement,
  onOpenCatalog,
}: MyRentalsModalProps) {
  useModalBehavior(onClose)

  const myOrders = useMemo(
    () =>
      orders
        .filter((order) => order.userNim === user.nim)
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    [orders, user.nim],
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="my-rentals-title"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#F5F5F5] p-6 md:p-8 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Tutup daftar sewa"
          className="absolute right-4 top-4 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-black hover:bg-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start justify-between gap-4 mb-6 pr-8">
          <div>
            <p className="text-black/50 text-sm mb-1">Sewa Saya</p>
            <h3
              id="my-rentals-title"
              className="text-black text-2xl md:text-3xl font-medium leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              {user.name.split(' ')[0]}, ini daftar sewamu.
            </h3>
            <p className="text-black/50 text-sm mt-1">
              {user.nim} · {user.faculty}
            </p>
          </div>
        </div>

        {myOrders.length === 0 ? (
          <div className="rounded-2xl bg-white border border-black/10 p-10 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center text-black/40 mb-4">
              <ClipboardList className="w-6 h-6" />
            </div>
            <p className="text-black text-lg font-medium mb-1">Belum ada pesanan</p>
            <p className="text-black/50 text-sm mb-6">
              Sewa laptop, kamera, atau proyektor pertamamu lewat katalog.
            </p>
            <button
              onClick={onOpenCatalog}
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
            >
              Jelajahi Katalog <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {myOrders.map((order) => {
              const status = getOrderStatus(order)
              return (
                <article
                  key={order.id}
                  className="rounded-2xl bg-white border border-black/10 p-5"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="font-mono text-xs text-black/50 mb-1">
                        {order.ticketCode}
                      </p>
                      <h4 className="text-black text-lg font-medium leading-snug">
                        {order.item.name}
                      </h4>
                      <p className="text-black/50 text-sm">
                        {formatDate(order.startDate)} → {formatDate(order.returnDate)}
                      </p>
                    </div>
                    <span
                      className={
                        'shrink-0 rounded-full px-3 py-1 text-xs font-medium ' +
                        (statusTone[status] ?? 'bg-black/5 text-black/50')
                      }
                    >
                      {status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-black/60 mb-4">
                    <span>{order.pickupLocation}</span>
                    <span className="text-black font-medium">
                      {formatIDR(order.total)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onOpenTicket(order)}
                      className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                    >
                      <Ticket className="w-4 h-4" />
                      Lihat Tiket
                    </button>
                    <button
                      onClick={() => onOpenAgreement(order)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#F5F5F5] border border-black/10 px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Unduh Kontrak
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
