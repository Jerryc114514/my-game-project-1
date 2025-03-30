"use client"

import { useState, useEffect } from "react"

interface DebugOverlayProps {
  isLocked: boolean
  balloonCount: number
}

export default function DebugOverlay({ isLocked, balloonCount }: DebugOverlayProps) {
  const [fps, setFps] = useState(0)
  const [lastClick, setLastClick] = useState(0)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()

    const updateFps = () => {
      const now = performance.now()
      frameCount++

      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)))
        frameCount = 0
        lastTime = now
      }

      requestAnimationFrame(updateFps)
    }

    const handleClick = () => {
      setLastClick(Date.now())
    }

    window.addEventListener("click", handleClick)
    const animationId = requestAnimationFrame(updateFps)

    return () => {
      window.removeEventListener("click", handleClick)
      cancelAnimationFrame(animationId)
    }
  }, [])

  if (!import.meta.env.DEV) return null

  return (
    <div className="absolute bottom-0 left-0 bg-black/70 text-white p-2 font-mono text-xs">
      <div>FPS: {fps}</div>
      <div>Pointer Lock: {isLocked ? "Yes" : "No"}</div>
      <div>Balloons: {balloonCount}</div>
      <div>
        Last Click: {Date.now() - lastClick < 1000 ? "Just now" : `${Math.floor((Date.now() - lastClick) / 1000)}s ago`}
      </div>
    </div>
  )
}

