"use client"

import { useState } from "react"
import { LanguageProvider } from "@/components/language-context"
import GameMenu from "@/components/game-menu"
import Game from "@/components/game"
import GameOver from "@/components/game-over"

export type Difficulty = "easy" | "medium" | "hard" | "extreme"
export type GameState = "menu" | "playing" | "gameOver"

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("menu")
  const [difficulty, setDifficulty] = useState<Difficulty>("medium")
  const [username, setUsername] = useState("Player")
  const [score, setScore] = useState(0)

  const handleStartGame = (name: string) => {
    setUsername(name || "Player")
    setScore(0)
    setGameState("playing")
  }

  const handleGameOver = (finalScore: number) => {
    setScore(finalScore)
    setGameState("gameOver")
  }

  const handleBackToMenu = () => {
    setGameState("menu")
  }

  return (
    <LanguageProvider>
      <main className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-blue-900 to-black">
        {gameState === "menu" && (
          <GameMenu onStart={handleStartGame} difficulty={difficulty} onDifficultyChange={setDifficulty} />
        )}

        {gameState === "playing" && <Game username={username} difficulty={difficulty} onGameOver={handleGameOver} />}

        {gameState === "gameOver" && (
          <GameOver
            score={score}
            username={username}
            onRestart={() => handleStartGame(username)}
            onMenu={handleBackToMenu}
          />
        )}
      </main>
    </LanguageProvider>
  )
}

