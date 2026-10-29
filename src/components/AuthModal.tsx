import React, { useState } from 'react'
import { X, LogIn, UserPlus, Mail, Lock, User as UserIcon, GraduationCap } from 'lucide-react'
import { loginAccount, registerAccount } from '../lib/storage'
import { useModalBehavior } from '../hooks/useModalBehavior'
import type { User } from '../types'

type Tab = 'login' | 'register'

interface AuthModalProps {
  onClose: () => void
  onAuthenticated: (user: User) => void
  initialTab?: Tab
}

const FACULTIES = [
  'Fakultas Sains dan Teknologi (FST)',
  'Fakultas Tarbiyah dan Ilmu Keguruan (FTIK)',
  'Fakultas Ekonomi dan Bisnis Islam (FEBI)',
  'Fakultas Syariah (FASYA)',
  'Fakultas Ushuluddin, Adab, dan Dakwah (FUAD)',
  'Pascasarjana',
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function AuthModal({ onClose, onAuthenticated, initialTab = 'login' }: AuthModalProps) {
  useModalBehavior(onClose)

  const [tab, setTab] = useState<Tab>(initialTab)
  const [error, setError] = useState('')

  const [identifier, setIdentifier] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [name, setName] = useState('')
  const [nim, setNim] = useState('')
  const [email, setEmail] = useState('')
  const [faculty, setFaculty] = useState(FACULTIES[1])
  const [registerPassword, setRegisterPassword] = useState('')

  const switchTab = (next: Tab) => {
    setTab(next)
    setError('')
  }

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    const result = loginAccount(identifier, loginPassword)
    if (!result.ok) {
      setError(result.error)
      return
    }
    onAuthenticated(result.user)
  }

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (!name.trim()) return setError('Nama lengkap wajib diisi.')
    if (!nim.trim()) return setError('NIM wajib diisi.')
    if (!emailPattern.test(email.trim())) {
      return setError('Email kampus tidak valid. Contoh: nama@student.ac.id')
    }
    if (registerPassword.length < 6) {
      return setError('Password minimal 6 karakter.')
    }

    const result = registerAccount({
      name,
      nim,
      email,
      faculty,
      password: registerPassword,
    })
    if (!result.ok) {
      setError(result.error)
      return
    }
    onAuthenticated(result.user)
  }

  const inputClass =
    'w-full rounded-xl bg-white border border-black/10 px-4 py-2.5 text-base text-black placeholder:text-black/40 outline-none focus:border-black/40 transition-colors'

  return (
    <div
      className="fixed inset-0 z-[55] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl bg-[#F5F5F5] p-6 md:p-8 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Tutup formulir masuk"
          className="absolute right-4 top-4 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-black hover:bg-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <p className="text-black/50 text-sm mb-1">Akun Rent It Campus</p>
        <h3
          id="auth-title"
          className="text-black text-2xl md:text-3xl font-medium leading-tight mb-6 pr-8"
          style={{ letterSpacing: '-0.02em' }}
        >
          {tab === 'login' ? 'Masuk ke akunmu.' : 'Buat akun mahasiswa.'}
        </h3>

        <div className="flex rounded-full bg-white p-1 mb-6">
          {(['login', 'register'] as Tab[]).map((option) => (
            <button
              key={option}
              onClick={() => switchTab(option)}
              aria-pressed={tab === option}
              className={
                'flex-1 rounded-full py-2 text-sm font-medium transition-colors ' +
                (tab === option ? 'bg-black text-white' : 'text-black/60 hover:text-black')
              }
            >
              {option === 'login' ? 'Login' : 'Register'}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="flex items-center gap-2 text-black text-sm font-medium mb-1.5">
                <Mail className="w-4 h-4" /> Email Kampus / NIM
              </span>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                aria-label="Email kampus atau NIM"
                placeholder="nama@student.ac.id atau 21081010001"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="flex items-center gap-2 text-black text-sm font-medium mb-1.5">
                <Lock className="w-4 h-4" /> Password
              </span>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                aria-label="Password"
                placeholder="Password akun"
                className={inputClass}
              />
            </label>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-base font-medium text-white hover:bg-gray-800 transition-colors duration-200"
            >
              <LogIn className="w-5 h-5" /> Masuk
            </button>

            <p className="text-black/50 text-sm text-center">
              Belum punya akun?{' '}
              <button
                type="button"
                onClick={() => switchTab('register')}
                className="text-black font-medium underline underline-offset-2"
              >
                Daftar sekarang
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <label className="block">
              <span className="flex items-center gap-2 text-black text-sm font-medium mb-1.5">
                <UserIcon className="w-4 h-4" /> Nama Lengkap
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-label="Nama lengkap"
                placeholder="Nama sesuai KTM"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="flex items-center gap-2 text-black text-sm font-medium mb-1.5">
                <GraduationCap className="w-4 h-4" /> NIM
              </span>
              <input
                type="text"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                required
                aria-label="NIM"
                placeholder="Contoh: 21081010001"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="flex items-center gap-2 text-black text-sm font-medium mb-1.5">
                <Mail className="w-4 h-4" /> Email Student / Kampus
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email kampus"
                placeholder="nama@student.ac.id"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="block text-black text-sm font-medium mb-1.5">Fakultas</span>
              <select
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                aria-label="Fakultas"
                className={inputClass}
              >
                {FACULTIES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="flex items-center gap-2 text-black text-sm font-medium mb-1.5">
                <Lock className="w-4 h-4" /> Password
              </span>
              <input
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
                minLength={6}
                aria-label="Password baru"
                placeholder="Minimal 6 karakter"
                className={inputClass}
              />
            </label>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-base font-medium text-white hover:bg-gray-800 transition-colors duration-200"
            >
              <UserPlus className="w-5 h-5" /> Daftar & Masuk
            </button>

            <p className="text-black/50 text-sm text-center">
              Sudah punya akun?{' '}
              <button
                type="button"
                onClick={() => switchTab('login')}
                className="text-black font-medium underline underline-offset-2"
              >
                Masuk di sini
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
