"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "./language-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface UserNameFormProps {
  onStartGame: (username: string) => void
}

export default function UserNameForm({ onStartGame }: UserNameFormProps) {
  const [username, setUsername] = useState("")
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (typeof onStartGame === "function") {
      onStartGame(username)
    } else {
      console.error("onStartGame is not a function", onStartGame)
    }
  }

  return (
    <div className="space-y-4">
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
      <Button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
        {t("startButton")}
      </Button>
    </div>
  )
}

