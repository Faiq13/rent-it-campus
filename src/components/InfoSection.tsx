import React from 'react'
import { ArrowRight } from 'lucide-react'

interface InfoSectionProps {
  onDiscover: () => void
}

export function InfoSection({ onDiscover }: InfoSectionProps) {
  return (
    <section className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        {/* Row 1: 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          {/* Left: Title */}
          <div>
            <h2 
              className="text-black text-4xl md:text-5xl font-medium leading-tight mb-8"
              style={{ letterSpacing: '-0.03em' }}
            >
              Meet Rent It Campus.
            </h2>
            <button onClick={onDiscover} className="pill-button">
              Discover Categories
              <div className="bg-white rounded-full p-2">
                <ArrowRight className="w-5 h-5 text-black" />
              </div>
            </button>
          </div>
          
          {/* Right: Description */}
          <div>
            <p className="text-black/70 text-2xl md:text-3xl leading-relaxed">
              Rent It Campus is an on-demand hardware rental platform enabling students, campus organizers, and creators to access premium electronics without heavy upfront costs.
            </p>
          </div>
        </div>
        
        {/* Row 2: 4-col card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Student-Friendly Pricing */}
          <div className="rounded-2xl overflow-hidden bg-white border border-black/10 col-span-1 sm:col-span-2 lg:col-span-2 min-h-80 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-black">
            <div className="p-7 min-h-80 flex flex-col justify-between">
              <div>
                <h3 className="text-black text-2xl font-medium leading-snug mb-2" style={{ letterSpacing: '-0.02em' }}>
                  Student-Friendly Pricing
                </h3>
              </div>
              <div>
                <p className="text-black/70 text-base max-w-xs leading-relaxed">
                  Flexible daily, weekly, or semester-long rentals tailored for student budgets and thesis deadlines UIN Gusdur.
                </p>
              </div>
            </div>
          </div>
          
          {/* Card 2: Zero Repair & Maintenance */}
          <div className="rounded-2xl bg-white border border-black/10 p-7 min-h-80 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-black">
            <h3 className="text-black text-2xl font-medium leading-snug mb-2" style={{ letterSpacing: '-0.02em' }}>
              Zero Repair<br />& Maintenance.
            </h3>
            <p className="text-black/60 text-base max-w-xs leading-relaxed">
              Full coverage included. Kami merawat dan melindungi perangkat sehingga Anda bisa fokus kuliah.
            </p>
          </div>
          
          {/* Card 3: Instant Campus Delivery */}
          <div className="rounded-2xl bg-white border border-black/10 p-7 min-h-80 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-black">
            <h3 className="text-black text-2xl font-medium leading-snug mb-2" style={{ letterSpacing: '-0.02em' }}>
              Instant Campus<br />Delivery.
            </h3>
            <p className="text-black/60 text-base max-w-xs leading-relaxed">
              Ambil langsung di hub Kampus 1 Panjang, Kampus 2 Kajen, atau diantar ke fakultas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}