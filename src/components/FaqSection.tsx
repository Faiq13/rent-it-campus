import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqEntry {
  question: string
  answer: string
}

const faqs: FaqEntry[] = [
  {
    question: 'Apakah ada jaminan atau deposit saat menyewa?',
    answer:
      'Ya. Untuk mahasiswa aktif, cukup menyerahkan KTM asli dan kartu identitas sebagai jaminan. Kami tidak meminta deposit uang, kecuali untuk unit drone dan kamera full-frame yang memerlukan deposit 30% dari total sewa.',
  },
  {
    question: 'Bagaimana kalau alat rusak saat dipakai?',
    answer:
      'Kerusakan ringan akibat pemakaian normal ditanggung penuh oleh Rent It Campus. Kamu hanya dikenakan biaya perbaikan jika kerusakan terjadi karena kelalaian, seperti cairan masuk, benturan keras, atau kehilangan aksesori.',
  },
  {
    question: 'Apa mekanisme denda keterlambatan pengembalian?',
    answer:
      'Keterlambatan dikenakan denda 20% dari harga sewa harian per jam keterlambatan untuk unit laptop dan proyektor, serta 25% untuk kamera dan drone. Denda dihitung maksimal 3 hari sewa, selebihnya unit dianggap hilang dan diproses sesuai kebijakan kampus.',
  },
  {
    question: 'Berapa lama proses persetujuan sewa?',
    answer:
      'Rata-rata 15 menit pada jam operasional. Setelah form dikonfirmasi, tim hub akan menghubungi kamu lewat WhatsApp untuk verifikasi KTM dan jadwal pengambilan.',
  },
  {
    question: 'Apakah bisa diantar langsung ke fakultas?',
    answer:
      'Bisa. Pilih metode "Antar ke Fakultas" pada form pemesanan. Pengantaran gratis untuk area kampus utama, dan dikenakan biaya Rp 10.000 untuk fakultas di luar ring 1.',
  },
  {
    question: 'Metode pembayaran apa saja yang diterima?',
    answer:
      'Transfer bank (BCA, Mandiri, BNI), QRIS, dan e-wallet (GoPay, OVO, DANA). Pembayaran dilakukan setelah form disetujui, sebelum unit diserahkan.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-8 bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-12">
        <div>
          <p className="text-black/60 text-sm mb-2">FAQ</p>
          <h2
            className="text-black text-4xl md:text-5xl font-medium leading-tight mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Pertanyaan yang sering muncul.
          </h2>
          <p className="text-black/60 text-base leading-relaxed max-w-sm">
            Belum ketemu jawabannya? Hubungi hub kampus terdekat atau tim
            support kami lewat WhatsApp.
          </p>
        </div>

        <div className="divide-y divide-black/10 border-y border-black/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.question}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-black text-base md:text-lg font-medium">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={
                      'w-5 h-5 shrink-0 text-black/60 transition-transform duration-300 ' +
                      (isOpen ? 'rotate-180' : '')
                    }
                  />
                </button>
                <div
                  className={
                    'grid transition-all duration-300 ease-out ' +
                    (isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')
                  }
                >
                  <div className="overflow-hidden">
                    <p className="text-black/60 text-base leading-relaxed pb-5 pr-10">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
