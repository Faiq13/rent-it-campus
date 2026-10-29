export type GearCategory = 'Laptop' | 'Kamera' | 'Proyektor' | 'Gaming'

export type CategoryFilter = 'Semua' | GearCategory

export interface GearItem {
  id: string
  name: string
  category: GearCategory
  description: string
  specs: string[]
  image: string
  pricePerDay: number
  pricePerWeek: number
  available: boolean
}

export const CATEGORIES: CategoryFilter[] = [
  'Semua',
  'Laptop',
  'Kamera',
  'Proyektor',
  'Gaming',
]

export const gearItems: GearItem[] = [
  {
    id: 'macbook-pro-m2',
    name: 'MacBook Pro M2',
    category: 'Laptop',
    description:
      'Laptop 14 inci dengan chip M2 untuk editing, coding, dan tugas akhir yang berat.',
    specs: ['14" Liquid Retina', '16GB RAM', '512GB SSD'],
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
    pricePerDay: 75000,
    pricePerWeek: 420000,
    available: true,
  },
  {
    id: 'asus-rog-zephyrus',
    name: 'ASUS ROG Zephyrus G14',
    category: 'Laptop',
    description:
      'Laptop gaming ringan dengan RTX 4060, pas untuk render 3D dan turnamen kampus.',
    specs: ['Ryzen 9', 'RTX 4060', '1TB SSD'],
    image:
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop',
    pricePerDay: 90000,
    pricePerWeek: 500000,
    available: true,
  },
  {
    id: 'sony-alpha-a7-iii',
    name: 'Sony Alpha A7 III',
    category: 'Kamera',
    description:
      'Full-frame mirrorless untuk dokumentasi acara, film pendek, dan konten kampus.',
    specs: ['24.2MP Full-Frame', '4K Video', 'Lensa 28-70mm'],
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
    pricePerDay: 120000,
    pricePerWeek: 700000,
    available: true,
  },
  {
    id: 'canon-eos-r50',
    name: 'Canon EOS R50',
    category: 'Kamera',
    description:
      'Kamera mirrorless ringkas dengan autofokus cepat, cocok untuk vlog dan liputan.',
    specs: ['24.2MP APS-C', '4K30', 'Lensa Kit 18-45mm'],
    image:
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=800&auto=format&fit=crop',
    pricePerDay: 85000,
    pricePerWeek: 480000,
    available: false,
  },
  {
    id: 'epson-eb-x51',
    name: 'Epson EB-X51',
    category: 'Proyektor',
    description:
      'Proyektor 3LCD 3800 lumens untuk presentasi kelas, seminar, dan nobar organisasi.',
    specs: ['3800 Lumens', 'XGA 1024x768', 'HDMI + VGA'],
    image:
      'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=800&auto=format&fit=crop',
    pricePerDay: 50000,
    pricePerWeek: 280000,
    available: true,
  },
  {
    id: 'playstation-5',
    name: 'PlayStation 5',
    category: 'Gaming',
    description:
      'Konsol next-gen dengan dua controller untuk malam game bareng di sekretariat.',
    specs: ['Disc Edition', '2x DualSense', '3 Game Populer'],
    image:
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop',
    pricePerDay: 60000,
    pricePerWeek: 350000,
    available: true,
  },
  {
    id: 'ipad-air-m1',
    name: 'iPad Air M1',
    category: 'Laptop',
    description:
      'Tablet ringan untuk catatan digital, sketsa, dan presentasi tanpa bawa laptop.',
    specs: ['10.9" Liquid Retina', 'M1', 'Apple Pencil Included'],
    image:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop',
    pricePerDay: 45000,
    pricePerWeek: 260000,
    available: true,
  },
  {
    id: 'dji-mini-3-pro',
    name: 'DJI Mini 3 Pro',
    category: 'Kamera',
    description:
      'Drone 249 gram dengan 4K HDR untuk sinematografi kampus dan dokumentasi lapangan.',
    specs: ['4K/60fps', '34 Min Flight', 'Under 250g'],
    image:
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop',
    pricePerDay: 90000,
    pricePerWeek: 520000,
    available: true,
  },
]

export const formatIDR = (value: number): string =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
