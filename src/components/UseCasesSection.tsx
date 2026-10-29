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
              Rent It Campus powers student organizations, video creators, research labs, and event hosts needing reliable tech hardware without buying.
            </p>
          </div>
          
          {/* Right column */}
          <div className="relative rounded-3xl overflow-hidden min-h-[720px]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop"
            >
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            
            {/* Overlay content */}
            <div className="relative z-10 p-10 md:p-12">
              <h3 
                className="text-4xl md:text-5xl font-medium leading-tight mb-5"
                style={{ letterSpacing: '-0.03em' }}
              >
                Campus Events & Projects
              </h3>
              
              <p className="text-black/70 text-base max-w-md mb-8 leading-relaxed">
                Power seminars, organization expos, and thesis presentations with high-lumen projectors, professional camera setups, and high-performance laptops.
              </p>
              
              <button onClick={onLearnMore} className="inline-flex items-center gap-3 group">
                <span className="text-black/80 font-medium">Learn more</span>
                <div className="w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center group-hover:bg-white transition-colors">
                  <ArrowRight className="w-4 h-4 text-black" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}