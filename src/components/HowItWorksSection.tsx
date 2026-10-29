import React from 'react'
import { Search, ClipboardCheck, PackageCheck } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Pilih alat',
    body: 'Telusuri katalog, cek ketersediaan, dan bandingkan harga harian atau mingguan.',
  },
  {
    icon: ClipboardCheck,
    title: 'Isi form sewa',
    body: 'Lengkapi data mahasiswa, tanggal mulai, durasi, dan metode pengambilan.',
  },
  {
    icon: PackageCheck,
    title: 'Ambil atau diantar',
    body: 'Verifikasi KTM di hub kampus, atau tunggu unit diantar ke fakultasmu.',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-8 bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-black/60 text-sm mb-2">How It Works</p>
            <h2
              className="text-black text-4xl md:text-5xl font-medium leading-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              Sewa dalam tiga langkah.
            </h2>
          </div>
          <p className="text-black/60 text-base leading-relaxed max-w-sm">
            Dari pilih unit sampai barang di tangan, rata-rata kurang dari 30
            menit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className="rounded-2xl bg-white border border-black/5 p-7 min-h-64 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-[#F5F5F5] p-3 text-black">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-black/20 text-4xl font-medium">
                    0{index + 1}
                  </span>
                </div>
                <div>
                  <h3
                    className="text-black text-2xl font-medium mb-2"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-black/60 text-base leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
