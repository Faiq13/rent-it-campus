import { useEffect, useRef } from 'react'

/**
 * Tracks open modals so Escape only closes the topmost one.
 */
const modalStack: symbol[] = []

/**
 * Locks background scroll while a modal is open and closes it on Escape.
 */
export function useModalBehavior(onClose: () => void): void {
  const id = useRef(Symbol('modal'))

  useEffect(() => {
    const key = id.current
    modalStack.push(key)
    return () => {
      const index = modalStack.indexOf(key)
      if (index >= 0) modalStack.splice(index, 1)
    }
  }, [])

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (modalStack[modalStack.length - 1] !== id.current) return
      onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
}
