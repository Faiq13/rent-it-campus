import React from 'react'
import { LogIn, LogOut, ClipboardList } from 'lucide-react'
import { LogoIcon } from './LogoIcon'
import type { User } from '../types'

const navLinks = [
  { label: 'Catalog', id: 'catalog' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Categories', id: 'categories' },
  { label: 'Campus Hubs', id: 'campus-hubs' },
  { label: 'FAQ', id: 'faq' },
]

interface NavbarProps {
  user: User | null
  onNavigate: (id: string) => void
  onOpenCatalog: () => void
  onLogin: () => void
  onMyRentals: () => void
  onLogout: () => void
}

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function Navbar({
  user,
  onNavigate,
  onOpenCatalog,
  onLogin,
  onMyRentals,
  onLogout,
}: NavbarProps) {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-5">
      <div className="max-w-[88rem] mx-auto">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <button
            onClick={() => onNavigate('top')}
            className="flex items-center gap-3 shrink-0"
            aria-label="Kembali ke atas"
          >
            <LogoIcon className="w-7 h-7 text-black" />
            <span className="text-2xl font-medium tracking-tight text-black">
              Rent It Campus
            </span>
          </button>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.label} onClick={() => onNavigate(link.id)} className="nav-link">
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: Auth + Rent Gear */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <>
                <button
                  onClick={onMyRentals}
                  className="flex items-center gap-2 rounded-full border border-black/15 bg-white/70 py-1.5 pl-1.5 pr-3 hover:bg-white transition-colors"
                  aria-label="Buka Sewa Saya"
                >
                  <span className="w-7 h-7 rounded-full bg-black text-white text-xs font-medium flex items-center justify-center">
                    {initials(user.name)}
                  </span>
                  <span className="hidden sm:inline text-sm font-medium text-black">
                    Sewa Saya
                  </span>
                  <ClipboardList className="w-4 h-4 text-black/50 sm:hidden" />
                </button>
                <button
                  onClick={onLogout}
                  aria-label="Keluar dari akun"
                  title="Keluar"
                  className="w-9 h-9 rounded-full border border-black/15 bg-white/70 flex items-center justify-center text-black/70 hover:text-black hover:bg-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={onLogin}
                className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white/70 px-4 sm:px-6 py-2.5 text-sm sm:text-base font-medium text-black hover:bg-white transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Masuk
              </button>
            )}

            <button onClick={onOpenCatalog} className="pill-button whitespace-nowrap">
              Rent Gear
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
