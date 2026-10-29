import React from 'react'
import { ArrowRight } from 'lucide-react'

interface UseCasesSectionProps {
  onLearnMore: () => void
}

export function UseCasesSection({ onLearnMore }: UseCasesSectionProps) {
  return (
    <section className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left column */}
          <div className="md:pr-12 md:pt-2">
            <div className="text-black/60 text-sm mb-2">
              Rent It Campus in Action
            </div>
            <h2 
              className="text-5xl md:text-6xl font-medium leading-none mb-6"
              style={{ letterSpacing: '-0.04em' }}
            >
              Use modes
            </h2>
            <p className="text-black/60 text-base leading-relaxed max-w-sm">
              Rent It Campus mendukung kegiatan BEM, UKM, pembuatan konten kreatif mahasiswa, dan pameran teknologi UIN Gusdur Pekalongan.
            </p>
          </div>
          
          {/* Right column */}
          <div className="relative rounded-3xl overflow-hidden min-h-[720px] bg-black/5 border border-black/10">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop"
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Overlay content */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-10 md:p-12 text-white">
              <h3 
                className="text-4xl md:text-5xl font-medium leading-tight mb-3"
                style={{ letterSpacing: '-0.03em' }}
              >
                Kegiatan & Pameran Kampus
              </h3>
              
              <p className="text-white/80 text-base max-w-md mb-8 leading-relaxed">
                Sukseskan seminar fakultas, expo organisasi mahasiswa, sidang skripsi, dan produksi video kreatif dengan proyektor terang serta kamera profesional.
              </p>
              
              <button onClick={onLearnMore} className="inline-flex items-center gap-3 group">
                <span className="text-white font-medium">Learn more</span>
                <div className="w-9 h-9 rounded-full bg-white/25 backdrop-blur flex items-center justify-center group-hover:bg-white/40 transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}