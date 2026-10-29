import React from 'react'
import { ArrowRight } from 'lucide-react'

const brandItems = [
  { name: 'MacBook Pro', font: 'Georgia', weight: 700, tracking: '-0.02em', size: '15px' },
  { name: 'Sony Alpha', font: 'Arial', weight: 900, tracking: '0.08em', size: '13px' },
  { name: 'ASUS ROG', font: 'Trebuchet MS', weight: 600, tracking: '0.01em', size: '15px', italic: true },
  { name: 'Epson Projector', font: 'Courier New', weight: 700, tracking: '0.12em', size: '13px' },
  { name: 'iPad Air', font: 'Palatino', weight: 400, tracking: '-0.01em', size: '16px' },
  { name: 'PlayStation 5', font: 'Impact', weight: 400, tracking: '0.04em', size: '14px' },
  { name: 'DJI Drones', font: 'Verdana', weight: 700, tracking: '-0.03em', size: '13px' }
]

interface HeroSectionProps {
  onExplore: () => void
}

export function HeroSection({ onExplore }: HeroSectionProps) {
  return (
    <section className="flex-1 px-6 pt-20 pb-6 flex items-end">
      <div className="max-w-[88rem] mx-auto w-full">
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#F5F5F5] border border-black/10 shadow-sm" style={{ height: 'calc(100vh - 96px)' }}>
          {/* Background Visual / Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-85"
            poster="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop"
          >
            <source 
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F5]/95 via-[#F5F5F5]/80 to-transparent pointer-events-none" />
          
          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col items-start justify-start h-full p-12 pt-36">
            <span className="inline-block px-3.5 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider bg-black text-white rounded-full shadow-sm">
              UIN K.H. Abdurrahman Wahid Pekalongan
            </span>

            <h1 
              className="text-black text-5xl md:text-6xl font-medium leading-tight max-w-xl mb-4"
              style={{ letterSpacing: '-0.04em' }}
            >
              High-End Tech<br/>
              Untuk Kuliah & Organisasi
            </h1>
            
            <p 
              className="text-black/75 text-base md:text-lg max-w-md mb-8 leading-relaxed"
              style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
            >
              Sewa laptop, kamera, proyektor, dan perangkat kreatif khusus mahasiswa UIN Gusdur. Ambil langsung di hub kampus atau antar ke fakultas.
            </p>
            
            <button onClick={onExplore} className="pill-button shadow-md">
              Explore Catalog
              <div className="bg-white rounded-full p-2">
                <ArrowRight className="w-5 h-5 text-black" />
              </div>
            </button>
            
            <BrandMarquee />
          </div>
        </div>
      </div>
    </section>
  )
}

function BrandMarquee() {
  return (
    <div className="mt-24 w-full max-w-md overflow-hidden">
      <style>
        {`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        `}
      </style>
      <div className="marquee-track">
        {brandItems.concat(brandItems).map((item, index) => (
          <div 
            key={`${item.name}-${index}`} 
            className="mx-7 shrink-0 text-black/60 whitespace-nowrap"
            style={{ 
              fontFamily: item.font,
              fontWeight: item.weight,
              letterSpacing: item.tracking,
              fontSize: item.size,
              fontStyle: item.italic ? 'italic' : 'normal'
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}