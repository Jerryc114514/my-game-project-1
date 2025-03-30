"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "./language-context"
import type { Difficulty } from "@/app/page"
import LanguageSelector from "./language-selector"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface GameMenuProps {
  onStart: (username: string) => void
  difficulty: Difficulty
  onDifficultyChange: (difficulty: Difficulty) => void
}

interface DifficultyOption {
  value: Difficulty
  label: string
  description: string
}

export default function GameMenu({ onStart, difficulty, onDifficultyChange }: GameMenuProps) {
  const { t } = useLanguage()
  const [username, setUsername] = useState("")

  const difficultyOptions: DifficultyOption[] = [
    {
      value: "easy",
      label: t("easy"),
      description: t("easyDesc"),
    },
    {
      value: "medium",
      label: t("medium"),
      description: t("mediumDesc"),
    },
    {
      value: "hard",
      label: t("hard"),
      description: t("hardDesc"),
    },
    {
      value: "extreme",
      label: t("extreme"),
      description: t("extremeDesc"),
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onStart(username)
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <LanguageSelector />

      <Card className="w-full max-w-md bg-black/70 text-white border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-3xl">{t("gameTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-lg">
                {t("usernameLabel")}
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-lg">{t("difficultyTitle")}</label>
              <div className="grid grid-cols-2 gap-3">
                {difficultyOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`p-3 rounded-lg border-2 transition-all ${
                      difficulty === option.value
                        ? "border-blue-500 bg-blue-500/30"
                        : "border-gray-700 bg-gray-800/50 hover:bg-gray-700/50"
                    }`}
                    onClick={() => onDifficultyChange(option.value)}
                  >
                    <div className="font-bold text-lg">{option.label}</div>
                    <div className="text-xs text-gray-300">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                {t("startButton")}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-gray-400">
          <p>{t("instructions")}</p>
        </CardFooter>
      </Card>
    </div>
  )
}

