import React from 'react'
import { LogoIcon } from './LogoIcon'

interface FooterProps {
  onNavigate: (id: string) => void
}

const links = [
  { label: 'Catalog', id: 'catalog' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Categories', id: 'categories' },
  { label: 'Campus Hubs', id: 'campus-hubs' },
  { label: 'FAQ', id: 'faq' },
]

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#F5F5F5] px-6 pb-10 pt-4">
      <div className="max-w-[88rem] mx-auto border-t border-black/10 pt-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-center gap-3">
            <LogoIcon className="w-7 h-7 text-black" />
            <span className="text-2xl font-medium tracking-tight text-black">
              Rent It Campus
            </span>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="text-sm text-gray-700 hover:text-black font-medium transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-black/50">
          <p>© 2026 Rent It Campus — Platform Persewaan Elektronik & Tech Mahasiswa UIN Gusdur Pekalongan.</p>
          <p>Kampus 1 Panjang · Kampus 2 Kajen · Pekalongan</p>
        </div>
      </div>
    </footer>
  )
}
