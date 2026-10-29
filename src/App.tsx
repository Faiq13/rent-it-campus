import React, { useEffect, useMemo, useState } from 'react'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { InfoSection } from './components/InfoSection'
import { BackedBySection } from './components/BackedBySection'
import { CategoriesSection } from './components/CategoriesSection'
import { CatalogSection } from './components/CatalogSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { UseCasesSection } from './components/UseCasesSection'
import { CampusHubsSection } from './components/CampusHubsSection'
import { FaqSection } from './components/FaqSection'
import { Footer } from './components/Footer'
import { BookingModal } from './components/BookingModal'
import { AuthModal } from './components/AuthModal'
import { OrderTicketModal } from './components/OrderTicketModal'
import { AgreementModal } from './components/AgreementModal'
import { MyRentalsModal } from './components/MyRentalsModal'
import { Toast } from './components/Toast'
import { loadOrders, loadSession, saveOrders, saveSession } from './lib/storage'
import type { CategoryFilter, GearCategory, GearItem } from './data/gear'
import type { RentalOrder, User } from './types'
import './index.css'

interface ToastState {
  id: number
  title: string
  message: string
}

export default function App() {
  const [user, setUser] = useState<User | null>(() => loadSession())
  const [orders, setOrders] = useState<RentalOrder[]>(() => loadOrders())

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('Semua')
  const [authOpen, setAuthOpen] = useState(false)
  const [pendingItem, setPendingItem] = useState<GearItem | null>(null)
  const [bookingItem, setBookingItem] = useState<GearItem | null>(null)
  const [ticketOrder, setTicketOrder] = useState<RentalOrder | null>(null)
  const [agreementOrder, setAgreementOrder] = useState<RentalOrder | null>(null)
  const [myRentalsOpen, setMyRentalsOpen] = useState(false)
  const [toast, setToast] = useState<ToastState | null>(null)

  useEffect(() => {
    saveSession(user)
  }, [user])

  useEffect(() => {
    saveOrders(orders)
  }, [orders])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 4500)
    return () => clearTimeout(timer)
  }, [toast])

  const existingCodes = useMemo(
    () => orders.map((order) => order.ticketCode),
    [orders],
  )

  const showToast = (title: string, message: string) => {
    setToast({ id: Date.now(), title, message })
  }

  const scrollTo = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const openCatalog = (category?: CategoryFilter) => {
    if (category) setActiveCategory(category)
    requestAnimationFrame(() => scrollTo('catalog'))
  }

  const handleCategorySelect = (category: GearCategory) => {
    setActiveCategory(category)
    requestAnimationFrame(() => scrollTo('catalog'))
  }

  const handleRent = (item: GearItem) => {
    if (!user) {
      setPendingItem(item)
      setAuthOpen(true)
      return
    }
    setBookingItem(item)
  }

  const handleAuthenticated = (nextUser: User) => {
    setUser(nextUser)
    setAuthOpen(false)
    showToast('Berhasil masuk', `Selamat datang, ${nextUser.name.split(' ')[0]}.`)

    if (pendingItem) {
      setBookingItem(pendingItem)
      setPendingItem(null)
    }
  }

  const handleCloseAuth = () => {
    setAuthOpen(false)
    setPendingItem(null)
  }

  const handleLogout = () => {
    setUser(null)
    setMyRentalsOpen(false)
    setTicketOrder(null)
    setAgreementOrder(null)
    setBookingItem(null)
    setPendingItem(null)
    showToast('Berhasil keluar', 'Sesi akunmu sudah diakhiri.')
  }

  const handleOpenMyRentals = () => {
    if (!user) {
      setAuthOpen(true)
      return
    }
    setMyRentalsOpen(true)
  }

  const handleConfirmOrder = (order: RentalOrder) => {
    setOrders((previous) => [order, ...previous])
    setBookingItem(null)
    setTicketOrder(order)
  }

  const handleViewMyRentalsFromTicket = () => {
    setTicketOrder(null)
    setMyRentalsOpen(true)
  }

  const handleOpenCatalogFromModal = () => {
    setMyRentalsOpen(false)
    openCatalog()
  }

  const modalOpen =
    authOpen ||
    myRentalsOpen ||
    Boolean(bookingItem) ||
    Boolean(ticketOrder) ||
    Boolean(agreementOrder)

  return (
    <main className="flex flex-col bg-[#F5F5F5] min-h-screen">
      <div id="top" className="h-screen flex flex-col overflow-hidden">
        {!modalOpen && (
          <Navbar
            user={user}
            onNavigate={scrollTo}
            onOpenCatalog={() => openCatalog()}
            onLogin={() => setAuthOpen(true)}
            onMyRentals={handleOpenMyRentals}
            onLogout={handleLogout}
          />
        )}
        <HeroSection onExplore={() => openCatalog()} />
      </div>

      <InfoSection onDiscover={() => openCatalog()} />
      <BackedBySection />
      <CategoriesSection onSelect={handleCategorySelect} />
      <CatalogSection
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onRent={handleRent}
      />
      <HowItWorksSection />
      <UseCasesSection onLearnMore={() => openCatalog()} />
      <CampusHubsSection onOpenCatalog={() => openCatalog()} />
      <FaqSection />
      <Footer onNavigate={scrollTo} />

      {authOpen && (
        <AuthModal
          onClose={handleCloseAuth}
          onAuthenticated={handleAuthenticated}
        />
      )}

      {myRentalsOpen && user && !ticketOrder && !agreementOrder && (
        <MyRentalsModal
          user={user}
          orders={orders}
          onClose={() => setMyRentalsOpen(false)}
          onOpenTicket={(order) => {
            setMyRentalsOpen(false)
            setTicketOrder(order)
          }}
          onOpenAgreement={(order) => {
            setAgreementOrder(order)
          }}
          onOpenCatalog={handleOpenCatalogFromModal}
        />
      )}

      {ticketOrder && !agreementOrder && (
        <OrderTicketModal
          order={ticketOrder}
          onClose={() => setTicketOrder(null)}
          onOpenAgreement={(order) => setAgreementOrder(order)}
          onViewMyRentals={handleViewMyRentalsFromTicket}
        />
      )}

      {agreementOrder && (
        <AgreementModal
          order={agreementOrder}
          onClose={() => setAgreementOrder(null)}
        />
      )}

      {bookingItem && user && (
        <BookingModal
          item={bookingItem}
          user={user}
          existingCodes={existingCodes}
          onClose={() => setBookingItem(null)}
          onConfirm={handleConfirmOrder}
        />
      )}

      {toast && <Toast key={toast.id} title={toast.title} message={toast.message} />}
    </main>
  )
}
