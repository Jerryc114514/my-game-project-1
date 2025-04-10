"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "./language-context"
import type { Difficulty } from "@/page"
import Balloon from "./balloon"

interface GameProps {
  username: string
  difficulty: Difficulty
  onGameOver: (score: number) => void
}

// Difficulty settings
const difficultySettings = {
  easy: {
    balloonCount: 5,
    minSize: 60,
    maxSize: 100,
    lifetime: 5000,
  },
  medium: {
    balloonCount: 8,
    minSize: 40,
    maxSize: 80,
    lifetime: 4000,
  },
  hard: {
    balloonCount: 12,
    minSize: 30,
    maxSize: 60,
    lifetime: 3000,
  },
  extreme: {
    balloonCount: 15,
    minSize: 20,
    maxSize: 40,
    lifetime: 2000,
  },
}

// Generate random position within the container
const getRandomPosition = (containerWidth: number, containerHeight: number, balloonSize: number) => {
  return {
    x: Math.random() * (containerWidth - balloonSize),
    y: Math.random() * (containerHeight - balloonSize),
  }
}

// Generate random color
const getRandomColor = () => {
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ff8800", "#ff0088"]
  return colors[Math.floor(Math.random() * colors.length)]
}

interface BalloonData {
  id: number
  x: number
  y: number
  size: number
  color: string
  createdAt: number
}

export default function Game({ username, difficulty, onGameOver }: GameProps) {
  const { t } = useLanguage()
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(20) // 20 seconds game time
  const [balloons, setBalloons] = useState<BalloonData[]>([])
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [nextId, setNextId] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const settings = difficultySettings[difficulty]
  const gameActive = useRef(true)

  // 使用 ref 存储 onGameOver，确保引用稳定
  const onGameOverRef = useRef(onGameOver)
  useEffect(() => {
    onGameOverRef.current = onGameOver
  }, [onGameOver])

  // Initialize container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }
    }
  
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  // Game timer - 依赖数组为空，不会因 score 变化而重启
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          gameActive.current = false
          setTimeout(() => onGameOverRef.current(score), 1000)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  
    return () => clearInterval(timer)
  }, [])

  // Spawn balloons
  useEffect(() => {
    if (!containerSize.width || !containerSize.height) return
  
    const spawnBalloon = () => {
      if (!gameActive.current) return
  
      if (balloons.length < settings.balloonCount) {
        const size = Math.floor(Math.random() * (settings.maxSize - settings.minSize + 1)) + settings.minSize
        const { x, y } = getRandomPosition(containerSize.width, containerSize.height, size)
  
        const newBalloon: BalloonData = {
          id: nextId,
          x,
          y,
          size,
          color: getRandomColor(),
          createdAt: Date.now(),
        }
  
        setBalloons((prev) => [...prev, newBalloon])
        setNextId((prev) => prev + 1)
      }
    }
  
    const spawnInterval = setInterval(spawnBalloon, 500)
    return () => clearInterval(spawnInterval)
  }, [balloons.length, containerSize, nextId, settings])
  
  // Remove expired balloons
  useEffect(() => {
    const checkExpired = setInterval(() => {
      const now = Date.now()
      setBalloons((prev) => prev.filter((balloon) => now - balloon.createdAt < settings.lifetime))
    }, 100)
  
    return () => clearInterval(checkExpired)
  }, [settings.lifetime])
  
  // Handle balloon pop
  const handleBalloonPop = (id: number) => {
    setBalloons((prev) => prev.filter((balloon) => balloon.id !== id))
    setScore((prev) => prev + 1)
  }
  
  return (
    <div className="relative w-full h-screen overflow-hidden" ref={containerRef}>
      {/* Score and timer display */}
      <div className="absolute top-4 left-4 bg-black/50 p-2 rounded text-white text-xl z-10">
        {t("score")} {score}
      </div>
  
      <div className="absolute top-4 right-4 bg-black/50 p-2 rounded text-white text-xl z-10">
        {t("time")} {timeLeft}s
      </div>
  
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 p-2 rounded text-white text-xl z-10">
        {username}
      </div>
  
      {/* Balloons */}
      {balloons.map((balloon) => (
        <Balloon
          key={balloon.id}
          id={balloon.id}
          x={balloon.x}
          y={balloon.y}
          size={balloon.size}
          color={balloon.color}
          onPop={handleBalloonPop}
        />
      ))}
    </div>
  )
}
