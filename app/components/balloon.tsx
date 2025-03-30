"use client"

import { useState } from "react"

interface BalloonProps {
  id: number
  x: number
  y: number
  size: number
  color: string
  onPop: (id: number) => void
}

export default function Balloon({ id, x, y, size, color, onPop }: BalloonProps) {
  const [popped, setPopped] = useState(false)

  const handleClick = () => {
    if (popped) return

    setPopped(true)
    // Small delay for pop animation
    setTimeout(() => {
      onPop(id)
    }, 100)
  }

  if (popped) {
    return null
  }

  return (
    <div
      className="absolute cursor-pointer transition-transform hover:scale-110"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      onClick={handleClick}
    >
      <svg viewBox="0 0 100 120" fill={color} className="w-full h-full">
        <path d="M50,0 C22.4,0 0,22.4 0,50 C0,77.6 22.4,100 50,100 C77.6,100 100,77.6 100,50 C100,22.4 77.6,0 50,0 Z" />
        <path d="M50,100 L45,120 L55,120 Z" fill={color} />
      </svg>
    </div>
  )
}

