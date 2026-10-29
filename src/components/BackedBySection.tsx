import React from 'react'

const backers = [
  { name: 'Faculty of Science & Tech', font: 'Times New Roman', weight: 400, tracking: '0.02em', size: '14px' },
  { name: 'Apple Education', font: 'Arial Black', weight: 900, tracking: '0.08em', size: '16px' },
  { name: 'Sony Indonesia', font: 'Impact', weight: 700, tracking: '0.05em', size: '18px' },
  { name: 'Campus Student Executive', font: 'Georgia', weight: 600, tracking: '-0.02em', size: '17px' },
  { name: 'ASUS Campus', font: 'Helvetica', weight: 700, tracking: '-0.01em', size: '15px' },
  { name: 'Logitech', font: 'Verdana', weight: 700, tracking: '0.06em', size: '14px', uppercase: true },
  { name: 'Epson Official', font: 'Courier New', weight: 700, tracking: '0.18em', size: '14px' },
  { name: 'Canon Indonesia', font: 'Palatino', weight: 500, tracking: '0.03em', size: '15px' }
]

export function BackedBySection() {
  return (
    <section className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
          {/* Left Column: Description */}
          <div className="col-span-1">
            <p className="text-black/70 text-base leading-relaxed">
              Supported by leading faculties,<br/>
              student unions, and tech brands.
            </p>
          </div>
          
          {/* Right Column: Marquee */}
          <div className="col-span-3">
            <BackersMarquee />
          </div>
        </div>
      </div>
    </section>
  )
}

function BackersMarquee() {
  return (
    <div className="w-full overflow-hidden">
      <style>
        {`
        @keyframes backers-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .backers-track {
          display: flex;
          width: max-content;
          animation: backers-marquee 30s linear infinite;
        }
        `}
      </style>
      <div className="backers-track">
        {backers.concat(backers).map((item, index) => (
          <div 
            key={`${item.name}-${index}`} 
            className="mx-10 shrink-0 text-black/50 whitespace-nowrap"
            style={{ 
              fontFamily: item.font,
              fontWeight: item.weight,
              letterSpacing: item.tracking,
              fontSize: item.size,
              textTransform: item.uppercase ? 'uppercase' : 'none'
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}