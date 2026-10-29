import React from 'react'
import { MapPin, Clock, ArrowRight } from 'lucide-react'

interface CampusHubsSectionProps {
  onOpenCatalog: () => void
}

const hubs = [
  {
    name: 'Hub Fakultas Teknik',
    building: 'Gedung A, Lantai 1',
    hours: '08.00 - 20.00',
    stock: 'Laptop, kamera, proyektor',
  },
  {
    name: 'Hub Perpustakaan Pusat',
    building: 'Lantai Ground, dekat lobi',
    hours: '08.00 - 18.00',
    stock: 'Laptop, iPad, proyektor',
  },
  {
    name: 'Hub Student Center',
    building: 'Gedung Organisasi, Lantai 2',
    hours: '09.00 - 21.00',
    stock: 'Gaming, kamera, drone',
  },
  {
    name: 'Hub Fakultas Ilmu Komputer',
    building: 'Gedung C, Lantai 3',
    hours: '08.00 - 19.00',
    stock: 'Laptop, proyektor, kamera',
  },
]

export function CampusHubsSection({ onOpenCatalog }: CampusHubsSectionProps) {
  return (
    <section id="campus-hubs" className="scroll-mt-8 bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-black/60 text-sm mb-2">Campus Hubs</p>
            <h2
              className="text-black text-4xl md:text-5xl font-medium leading-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              Ambil di titik terdekat.
            </h2>
          </div>
          <button
            onClick={onOpenCatalog}
            className="inline-flex items-center gap-2 self-start md:self-auto rounded-full bg-black text-white px-6 py-3 text-base font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            Lihat Katalog
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {hubs.map((hub) => (
            <div
              key={hub.name}
              className="rounded-2xl bg-white border border-black/5 p-7 flex flex-col justify-between min-h-44"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3
                    className="text-black text-xl font-medium mb-1"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {hub.name}
                  </h3>
                  <p className="text-black/50 text-sm">{hub.building}</p>
                </div>
                <div className="rounded-full bg-[#F5F5F5] p-3 text-black">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-black/60">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {hub.hours}
                </span>
                <span>{hub.stock}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
