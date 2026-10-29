import React from 'react'
import { Laptop, Camera, Video, Gamepad2, ArrowUpRight } from 'lucide-react'
import type { GearCategory } from '../data/gear'

interface CategoriesSectionProps {
  onSelect: (category: GearCategory) => void
}

const categories: Array<{
  name: GearCategory
  blurb: string
  icon: typeof Laptop
  count: string
}> = [
  {
    name: 'Laptop',
    blurb: 'MacBook, ROG, iPad untuk tugas dan produksi.',
    icon: Laptop,
    count: '12 unit',
  },
  {
    name: 'Kamera',
    blurb: 'Mirrorless, drone, dan lensa untuk konten kampus.',
    icon: Camera,
    count: '9 unit',
  },
  {
    name: 'Proyektor',
    blurb: 'Proyektor terang untuk seminar dan nobar.',
    icon: Video,
    count: '6 unit',
  },
  {
    name: 'Gaming',
    blurb: 'Konsol dan aksesori untuk malam game bareng.',
    icon: Gamepad2,
    count: '5 unit',
  },
]

export function CategoriesSection({ onSelect }: CategoriesSectionProps) {
  return (
    <section id="categories" className="scroll-mt-8 bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-black/60 text-sm mb-2">Kategori</p>
            <h2
              className="text-black text-4xl md:text-5xl font-medium leading-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              Semua kebutuhan tech kampus.
            </h2>
          </div>
          <p className="text-black/60 text-base leading-relaxed max-w-sm">
            Pilih kategori untuk langsung memfilter katalog di bawahnya.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.name}
                onClick={() => onSelect(category.name)}
                className="group text-left rounded-2xl bg-white border border-black/5 p-7 min-h-56 flex flex-col justify-between transition-colors duration-200 hover:bg-[#1E1B2E]"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-full bg-[#F5F5F5] p-3 text-black transition-colors group-hover:bg-white/10 group-hover:text-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-black/30 transition-colors group-hover:text-white" />
                </div>
                <div>
                  <h3
                    className="text-black text-2xl font-medium mb-1 transition-colors group-hover:text-white"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {category.name}
                  </h3>
                  <p className="text-black/60 text-sm leading-relaxed mb-3 transition-colors group-hover:text-white/60">
                    {category.blurb}
                  </p>
                  <span className="text-black/40 text-xs transition-colors group-hover:text-white/40">
                    {category.count} tersedia
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
