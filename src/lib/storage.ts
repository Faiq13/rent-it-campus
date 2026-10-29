import type { RentalOrder, StoredUser, User } from '../types'

const SESSION_KEY = 'ric_session'
const USERS_KEY = 'ric_users'
const ORDERS_KEY = 'ric_orders'

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be unavailable (private mode). The app still works in memory.
  }
}

function remove(key: string): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(key)
  } catch {
    // ignore
  }
}

function toUser(stored: StoredUser): User {
  return {
    id: stored.id,
    nim: stored.nim,
    name: stored.name,
    email: stored.email,
    faculty: stored.faculty,
  }
}

export function loadSession(): User | null {
  return read<User | null>(SESSION_KEY, null)
}

export function saveSession(user: User | null): void {
  if (user) write(SESSION_KEY, user)
  else remove(SESSION_KEY)
}

export function loadOrders(): RentalOrder[] {
  return read<RentalOrder[]>(ORDERS_KEY, [])
}

export function saveOrders(orders: RentalOrder[]): void {
  write(ORDERS_KEY, orders)
}

interface RegisterInput {
  nim: string
  name: string
  email: string
  faculty: string
  password: string
}

type AuthResult =
  | { ok: true; user: User }
  | { ok: false; error: string }

export function registerAccount(input: RegisterInput): AuthResult {
  const users = read<StoredUser[]>(USERS_KEY, [])
  const email = input.email.trim().toLowerCase()
  const nim = input.nim.trim()

  if (users.some((u) => u.email.toLowerCase() === email)) {
    return { ok: false, error: 'Email sudah terdaftar. Gunakan email lain.' }
  }
  if (users.some((u) => u.nim === nim)) {
    return { ok: false, error: 'NIM sudah terdaftar. Silakan masuk.' }
  }

  const stored: StoredUser = {
    id: `usr_${Date.now().toString(36)}`,
    nim,
    name: input.name.trim(),
    email,
    faculty: input.faculty,
    password: input.password,
  }

  write(USERS_KEY, [...users, stored])
  const user = toUser(stored)
  write(SESSION_KEY, user)
  return { ok: true, user }
}

export function loginAccount(identifier: string, password: string): AuthResult {
  const users = read<StoredUser[]>(USERS_KEY, [])
  const id = identifier.trim().toLowerCase()

  const found = users.find(
    (u) => u.email.toLowerCase() === id || u.nim.toLowerCase() === id,
  )
  if (!found) {
    return {
      ok: false,
      error: 'Akun tidak ditemukan. Daftar dulu di tab Register.',
    }
  }
  if (found.password !== password) {
    return { ok: false, error: 'Password salah. Coba lagi.' }
  }

  const user = toUser(found)
  write(SESSION_KEY, user)
  return { ok: true, user }
}
