import React, { useMemo, useState } from 'react'
import { Search, CheckCircle2, XCircle, ArrowRight } from 'lucide-react'
import {
  CATEGORIES,
  formatIDR,
  gearItems,
  type CategoryFilter,
  type GearItem,
} from '../data/gear'

interface CatalogSectionProps {
  activeCategory: CategoryFilter
  onCategoryChange: (category: CategoryFilter) => void
  onRent: (item: GearItem) => void
}

export function CatalogSection({
  activeCategory,
  onCategoryChange,
  onRent,
}: CatalogSectionProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return gearItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'Semua' || item.category === activeCategory
      const matchesQuery =
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  return (
    <section id="catalog" className="scroll-mt-8 bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10">
          <div>
            <p className="text-black/60 text-sm mb-2">Katalog Elektronik</p>
            <h2
              className="text-black text-4xl md:text-5xl font-medium leading-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              Pilih gear, sewa, langsung pakai.
            </h2>
          </div>
          <p className="text-black/60 text-base leading-relaxed max-w-sm">
            Harga transparan per hari dan per minggu. Semua unit sudah dicek
            tim teknis sebelum diserahkan.
          </p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-8">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Cari alat di katalog"
              placeholder="Cari laptop, kamera, proyektor..."
              className="w-full bg-white border border-black/10 rounded-full pl-11 pr-5 py-3 text-base text-black placeholder:text-black/40 outline-none focus:border-black/40 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
            {CATEGORIES.map((category) => {
              const isActive = category === activeCategory
              return (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  aria-pressed={isActive}
                  className={
                    'px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 ' +
                    (isActive
                      ? 'bg-black text-white'
                      : 'bg-white text-black/70 hover:text-black border border-black/10')
                  }
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        <p className="text-black/50 text-sm mb-6">
          {filtered.length} alat ditemukan
          {activeCategory !== 'Semua' ? ` di kategori ${activeCategory}` : ''}
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-black/10 bg-white/60 p-12 text-center">
            <p className="text-black text-lg font-medium mb-1">
              Tidak ada alat yang cocok
            </p>
            <p className="text-black/60 text-base">
              Coba kata kunci lain atau pilih kategori Semua.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col rounded-2xl bg-white border border-black/5 overflow-hidden transition-shadow duration-200 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]"
              >
                <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <span
                    className={
                      'absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium backdrop-blur ' +
                      (item.available
                        ? 'bg-white/85 text-emerald-700'
                        : 'bg-white/85 text-red-600')
                    }
                  >
                    {item.available ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5" />
                    )}
                    {item.available ? 'Tersedia' : 'Sedang disewa'}
                  </span>
                  <span className="absolute top-3 right-3 rounded-full bg-black/70 text-white px-3 py-1 text-xs font-medium">
                    {item.category}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <h3
                    className="text-black text-xl font-medium leading-snug mb-2"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-black/60 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {item.specs.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-full bg-[#F5F5F5] px-3 py-1 text-xs text-black/60"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-black text-lg font-medium">
                          {formatIDR(item.pricePerDay)}
                        </span>
                        <span className="text-black/50 text-sm"> /hari</span>
                      </div>
                      <span className="text-black/50 text-sm">
                        {formatIDR(item.pricePerWeek)} /minggu
                      </span>
                    </div>

                    <button
                      onClick={() => onRent(item)}
                      disabled={!item.available}
                      className={
                        'w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-medium transition-colors duration-200 ' +
                        (item.available
                          ? 'bg-black text-white hover:bg-gray-800'
                          : 'bg-black/10 text-black/40 cursor-not-allowed')
                      }
                    >
                      {item.available ? 'Sewa Sekarang' : 'Tidak tersedia'}
                      {item.available && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
