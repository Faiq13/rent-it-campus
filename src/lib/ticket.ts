import type { DurationUnit, OrderStatus, RentalOrder } from '../types'

const pad = (value: number): string => String(value).padStart(2, '0')

export function todayISO(): string {
  const now = new Date()
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

/**
 * Ticket format: RIC-[YYYYMMDD]-[4 alphanumeric uppercase]
 * Example: RIC-20261029-8A3F
 */
export function generateTicketCode(existing: string[] = []): string {
  const now = new Date()
  const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = new Uint8Array(4)

  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(bytes)
    } else {
      for (let i = 0; i < bytes.length; i += 1) {
        bytes[i] = Math.floor(Math.random() * 256)
      }
    }

    let suffix = ''
    for (const byte of bytes) suffix += alphabet[byte % alphabet.length]

    const code = `RIC-${date}-${suffix}`
    if (!existing.includes(code)) return code
  }

  return `RIC-${date}-${Math.floor(1000 + Math.random() * 9000)}`
}

const serialPrefix: Record<string, string> = {
  Laptop: 'LPT',
  Kamera: 'CAM',
  Proyektor: 'PRJ',
  Gaming: 'GAM',
}

export function generateSerialNumber(category: string): string {
  const prefix = serialPrefix[category] ?? 'DEV'
  const digits = Math.floor(100000 + Math.random() * 900000)
  return `SN-${prefix}-${digits}`
}

export function computeReturnDate(
  startDate: string,
  duration: number,
  unit: DurationUnit,
): string {
  const date = new Date(`${startDate}T00:00:00`)
  if (Number.isNaN(date.getTime())) return startDate
  const days = unit === 'Hari' ? duration : duration * 7
  date.setDate(date.getDate() + days)
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function formatDate(iso: string): string {
  if (!iso) return '-'
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function getOrderStatus(order: RentalOrder): OrderStatus {
  const today = todayISO()
  if (today < order.startDate) return 'Menunggu Pengambilan'
  if (today === order.startDate) return 'Siap Diambil'
  if (today <= order.returnDate) return 'Sedang Dipakai'
  return 'Selesai'
}

export function hubForFaculty(faculty: string): string {
  const value = faculty.toLowerCase()
  if (value.includes('komputer') || value.includes('informatika')) {
    return 'Hub Fakultas Ilmu Komputer · Gedung C Lt. 3'
  }
  if (value.includes('teknik')) {
    return 'Hub Fakultas Teknik · Gedung A Lt. 1'
  }
  if (value.includes('ekonomi') || value.includes('bisnis')) {
    return 'Hub Perpustakaan Pusat · Lantai Ground'
  }
  if (value.includes('desain') || value.includes('seni')) {
    return 'Hub Student Center · Gedung Organisasi Lt. 2'
  }
  return 'Hub Perpustakaan Pusat · Lantai Ground'
}
