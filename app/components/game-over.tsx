"use client"

import { useLanguage } from "./language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface GameOverProps {
  score: number
  username: string
  onRestart: () => void
  onMenu: () => void
}

export default function GameOver({ score, username, onRestart, onMenu }: GameOverProps) {
  const { t } = useLanguage()

  // Function to get a message based on score
  const getScoreMessage = () => {
    if (score === 0) return "Better luck next time!"
    if (score < 5) return "Good effort!"
    if (score < 15) return "Nice shooting!"
    if (score < 30) return "Great job!"
    return "Amazing skills!"
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-4">
      <Card className="w-full max-w-md bg-black/70 text-white border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-3xl">{t("gameOver")}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <h2 className="text-2xl mb-2">{username}</h2>
          <div className="text-5xl font-bold my-6">
            {t("finalScore")} {score}
          </div>
          <p className="text-xl mb-6">{getScoreMessage()}</p>

          <div className="flex flex-col gap-3 mt-6">
            <Button onClick={onRestart} className="bg-blue-600 hover:bg-blue-700 text-lg py-6">
              {t("playAgain")}
            </Button>
            <Button onClick={onMenu} variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              {t("backToMenu")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

