import React, { useMemo, useState } from 'react'
import {
  X,
  CalendarDays,
  User,
  GraduationCap,
  MapPin,
  Clock,
  CheckCircle2,
} from 'lucide-react'
import { formatIDR, type GearItem } from '../data/gear'
import type { DurationUnit, PickupMethod, RentalOrder, User as AppUser } from '../types'
import {
  computeReturnDate,
  formatDate,
  generateSerialNumber,
  generateTicketCode,
  hubForFaculty,
  todayISO,
} from '../lib/ticket'
import { useModalBehavior } from '../hooks/useModalBehavior'

interface BookingModalProps {
  item: GearItem
  user: AppUser
  existingCodes: string[]
  onClose: () => void
  onConfirm: (order: RentalOrder) => void
}

export function BookingModal({
  item,
  user,
  existingCodes,
  onClose,
  onConfirm,
}: BookingModalProps) {
  useModalBehavior(onClose)

  const [name, setName] = useState(user.name)
  const [identity, setIdentity] = useState(`${user.nim} / ${user.faculty}`)
  const [startDate, setStartDate] = useState(todayISO())
  const [duration, setDuration] = useState(1)
  const [unit, setUnit] = useState<DurationUnit>('Hari')
  const [pickup, setPickup] = useState<PickupMethod>('Hub Kampus')
  const [agreed, setAgreed] = useState(false)

  const safeDuration = Math.max(1, Number.isFinite(duration) ? duration : 1)

  const total = useMemo(
    () =>
      unit === 'Hari'
        ? item.pricePerDay * safeDuration
        : item.pricePerWeek * safeDuration,
    [unit, safeDuration, item.pricePerDay, item.pricePerWeek],
  )

  const returnDate = useMemo(
    () => computeReturnDate(startDate, safeDuration, unit),
    [startDate, safeDuration, unit],
  )

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!name.trim() || !identity.trim() || !startDate || !agreed) return

    const [nimPart, facultyPart] = identity.split('/').map((part) => part.trim())
    const nim = nimPart || user.nim
    const faculty = facultyPart || user.faculty

    const order: RentalOrder = {
      id: `ord_${Date.now().toString(36)}`,
      ticketCode: generateTicketCode(existingCodes),
      serialNumber: generateSerialNumber(item.category),
      item,
      userName: name.trim(),
      userNim: nim,
      userEmail: user.email,
      faculty,
      startDate,
      duration: safeDuration,
      unit,
      returnDate,
      pickup,
      pickupLocation:
        pickup === 'Hub Kampus'
          ? hubForFaculty(faculty)
          : `Antar ke ${faculty} · area kampus utama`,
      total,
      createdAt: new Date().toISOString(),
    }

    onConfirm(order)
  }

  const inputClass =
    'w-full rounded-xl bg-white border border-black/10 px-4 py-2.5 text-base text-black placeholder:text-black/40 outline-none focus:border-black/40 transition-colors'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-[#F5F5F5] p-6 md:p-8 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Tutup form pemesanan"
          className="absolute right-4 top-4 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-black hover:bg-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <p className="text-black/50 text-sm mb-1">Form Pemesanan</p>
        <h3
          id="booking-title"
          className="text-black text-2xl md:text-3xl font-medium leading-tight mb-1 pr-8"
          style={{ letterSpacing: '-0.02em' }}
        >
          {item.name}
        </h3>
        <p className="text-black/60 text-sm mb-6">
          {formatIDR(item.pricePerDay)}/hari · {formatIDR(item.pricePerWeek)}/minggu
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="flex items-center gap-2 text-black text-sm font-medium mb-1.5">
              <User className="w-4 h-4" /> Nama Mahasiswa
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label="Nama mahasiswa"
              placeholder="Nama lengkap"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="flex items-center gap-2 text-black text-sm font-medium mb-1.5">
              <GraduationCap className="w-4 h-4" /> NIM / Fakultas
            </span>
            <input
              type="text"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              required
              aria-label="NIM atau fakultas"
              placeholder="Contoh: 21081010001 / Teknik Informatika"
              className={inputClass}
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="flex items-center gap-2 text-black text-sm font-medium mb-1.5">
                <CalendarDays className="w-4 h-4" /> Tanggal Mulai
              </span>
              <input
                type="date"
                value={startDate}
                min={todayISO()}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className={inputClass}
              />
            </label>

            <div>
              <span className="flex items-center gap-2 text-black text-sm font-medium mb-1.5">
                <Clock className="w-4 h-4" /> Durasi
              </span>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  required
                  aria-label="Jumlah durasi"
                  className="w-20 rounded-xl bg-white border border-black/10 px-3 py-2.5 text-base text-black outline-none focus:border-black/40 transition-colors"
                />
                <div className="flex flex-1 rounded-xl bg-white border border-black/10 p-1">
                  {(['Hari', 'Minggu'] as DurationUnit[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setUnit(option)}
                      aria-pressed={unit === option}
                      className={
                        'flex-1 rounded-lg py-1.5 text-sm font-medium transition-colors ' +
                        (unit === option
                          ? 'bg-black text-white'
                          : 'text-black/60 hover:text-black')
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="flex items-center gap-2 text-black text-sm font-medium mb-1.5">
              <MapPin className="w-4 h-4" /> Metode Pengambilan
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(['Hub Kampus', 'Antar ke Fakultas'] as PickupMethod[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPickup(option)}
                  aria-pressed={pickup === option}
                  className={
                    'rounded-xl border px-4 py-2.5 text-sm font-medium text-left transition-colors ' +
                    (pickup === option
                      ? 'border-black bg-black text-white'
                      : 'border-black/10 bg-white text-black/70 hover:text-black')
                  }
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="text-black/40 text-xs mt-1.5">
              {pickup === 'Hub Kampus'
                ? `Lokasi: ${hubForFaculty(user.faculty)}`
                : `Diantar ke ${user.faculty} · gratis area kampus utama`}
            </p>
          </div>

          <div className="rounded-xl bg-[#1E1B2E] p-5 text-white">
            <div className="flex items-center justify-between text-sm text-white/60 mb-2">
              <span>
                {safeDuration} {unit.toLowerCase()} · {pickup}
              </span>
              <span>{item.category}</span>
            </div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-white/80 text-sm">Total sewa</span>
              <span className="text-2xl font-medium">{formatIDR(total)}</span>
            </div>
            <p className="text-white/50 text-xs">
              {formatDate(startDate)} → {formatDate(returnDate)}
            </p>
          </div>

          <label className="flex items-start gap-3 rounded-xl bg-white border border-black/10 p-4 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 accent-black"
            />
            <span className="text-sm text-black/70 leading-relaxed">
              Saya menyetujui syarat dan ketentuan sewa, kebijakan denda
              keterlambatan, serta tanggung jawab kerusakan yang tercantum dalam
              kontrak digital Rent It Campus.
            </span>
          </label>

          <button
            type="submit"
            disabled={!agreed}
            className={
              'w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-medium transition-colors duration-200 ' +
              (agreed
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-black/10 text-black/40 cursor-not-allowed')
            }
          >
            <CheckCircle2 className="w-5 h-5" />
            Konfirmasi Sewa
          </button>
        </form>
      </div>
    </div>
  )
}
