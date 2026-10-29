import type { GearItem } from './data/gear'

export type DurationUnit = 'Hari' | 'Minggu'

export type PickupMethod = 'Hub Kampus' | 'Antar ke Fakultas'

export interface User {
  id: string
  nim: string
  name: string
  email: string
  faculty: string
}

export interface StoredUser extends User {
  password: string
}

export type OrderStatus =
  | 'Menunggu Pengambilan'
  | 'Siap Diambil'
  | 'Sedang Dipakai'
  | 'Selesai'

export interface RentalOrder {
  id: string
  ticketCode: string
  serialNumber: string
  item: GearItem
  userName: string
  userNim: string
  userEmail: string
  faculty: string
  startDate: string
  duration: number
  unit: DurationUnit
  returnDate: string
  pickup: PickupMethod
  pickupLocation: string
  total: number
  createdAt: string
}
