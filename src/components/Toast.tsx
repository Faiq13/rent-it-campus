import React from 'react'
import { CheckCircle2 } from 'lucide-react'

interface ToastProps {
  message: string
  title?: string
}

export function Toast({ message, title = 'Berhasil' }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] max-w-sm">
      <style>
        {`
        @keyframes toast-in {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .toast-card {
          animation: toast-in 0.3s ease-out;
        }
        `}
      </style>
      <div className="toast-card flex items-start gap-3 rounded-2xl bg-[#1E1B2E] px-5 py-4 text-white shadow-2xl">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-white/60 text-sm mt-0.5">{message}</p>
        </div>
      </div>
    </div>
  )
}
