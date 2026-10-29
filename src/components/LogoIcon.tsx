import React from 'react'

export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 128 32 C 74.98 32 32 74.98 32 128 L 32 192 C 32 209.67 46.33 224 64 224 L 192 224 C 209.67 224 224 209.67 224 192 L 224 128 C 224 74.98 181.02 32 128 32 Z M 128 80 C 154.51 80 176 101.49 176 128 L 80 128 C 80 101.49 101.49 80 128 80 Z"
        fill="currentColor"
      />
    </svg>
  )
}