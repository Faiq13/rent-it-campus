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
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: 'calc(100vh - 96px)' }}>
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop"
          >
            <source 
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4" 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
          
          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col items-start justify-start h-full p-12 pt-36">
            <h1 
              className="text-black text-5xl md:text-6xl font-medium leading-tight max-w-xl mb-4"
              style={{ letterSpacing: '-0.04em' }}
            >
              High-End Tech<br/>
              For Campus Life
            </h1>
            
            <p 
              className="text-black/70 text-base md:text-lg max-w-md mb-8 leading-relaxed"
              style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
            >
              Affordable, flexible electronics rental for students. Laptops, cameras, projectors, and gaming gear delivered straight to your campus hub.
            </p>
            
            <button onClick={onExplore} className="pill-button">
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