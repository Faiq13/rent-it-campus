import React from 'react'

function hashString(value: string): number {
  let hash = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

const CELLS = 21

function isFinderZone(row: number, col: number): boolean {
  return (
    (row < 7 && col < 7) ||
    (row < 7 && col >= CELLS - 7) ||
    (row >= CELLS - 7 && col < 7)
  )
}

function isFinderOn(row: number, col: number): boolean {
  let localRow = row
  let localCol = col
  if (row >= CELLS - 7) localRow = row - (CELLS - 7)
  if (col >= CELLS - 7) localCol = col - (CELLS - 7)

  const border =
    localRow === 0 ||
    localRow === 6 ||
    localCol === 0 ||
    localCol === 6
  const center =
    localRow >= 2 && localRow <= 4 && localCol >= 2 && localCol <= 4
  return border || center
}

interface QrDummyProps {
  value: string
  size?: number
}

/**
 * Deterministic decorative QR-style code. It is a visual placeholder for
 * hub scanning, not a scannable QR payload.
 */
export function QrDummy({ value, size = 132 }: QrDummyProps) {
  let state = hashString(value) || 1
  const next = (): number => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    return state / 4294967296
  }

  const cells: Array<{ row: number; col: number }> = []
  for (let row = 0; row < CELLS; row += 1) {
    for (let col = 0; col < CELLS; col += 1) {
      if (isFinderZone(row, col)) {
        if (isFinderOn(row, col)) cells.push({ row, col })
        continue
      }
      if (next() > 0.52) cells.push({ row, col })
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${CELLS} ${CELLS}`}
      role="img"
      aria-label={`Kode QR pengambilan ${value}`}
      shapeRendering="crispEdges"
      className="rounded-md bg-white"
    >
      <rect width={CELLS} height={CELLS} fill="#ffffff" />
      {cells.map((cell) => (
        <rect
          key={`${cell.row}-${cell.col}`}
          x={cell.col}
          y={cell.row}
          width={1}
          height={1}
          fill="#000000"
        />
      ))}
    </svg>
  )
}

interface BarcodeDummyProps {
  value: string
  height?: number
}

export function BarcodeDummy({ value, height = 44 }: BarcodeDummyProps) {
  const chars = value.replace(/[^A-Za-z0-9]/g, '') || 'RIC'
  const bars: Array<{ x: number; width: number }> = []
  let cursor = 0

  for (let i = 0; i < chars.length * 2; i += 1) {
    const code = chars.charCodeAt(i % chars.length)
    const width = ((code >> (i % 5)) & 3) + 1
    const gap = ((code >> (i % 3)) & 1) + 1
    bars.push({ x: cursor, width })
    cursor += width + gap
  }

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${cursor} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`Barcode tiket ${value}`}
      className="bg-white"
    >
      <rect width={cursor} height={height} fill="#ffffff" />
      {bars.map((bar, index) => (
        <rect
          key={index}
          x={bar.x}
          y={0}
          width={bar.width}
          height={height}
          fill="#000000"
        />
      ))}
    </svg>
  )
}
