"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define language texts
export const texts = {
  en: {
    gameTitle: "Balloon Popper",
    usernameLabel: "Enter Username (optional):",
    startButton: "Start Game",
    difficultyTitle: "Select Difficulty:",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    extreme: "Extreme",
    easyDesc: "Larger balloons, slower disappearance",
    mediumDesc: "Medium-sized balloons",
    hardDesc: "Smaller balloons, faster disappearance",
    extremeDesc: "Tiny balloons, very fast disappearance",
    score: "Score:",
    time: "Time:",
    gameOver: "Game Over!",
    finalScore: "Final Score:",
    playAgain: "Play Again",
    backToMenu: "Back to Menu",
    clickToStart: "Click to start popping balloons!",
    instructions: "Pop as many balloons as you can in 20 seconds!",
  },
  zh: {
    gameTitle: "气球爆破手",
    usernameLabel: "输入用户名（可选）：",
    startButton: "开始游戏",
    difficultyTitle: "选择难度：",
    easy: "简单",
    medium: "中等",
    hard: "困难",
    extreme: "极限",
    easyDesc: "气球较大，消失较慢",
    mediumDesc: "中等大小的气球",
    hardDesc: "气球较小，消失较快",
    extremeDesc: "极小气球，消失非常快",
    score: "得分：",
    time: "时间：",
    gameOver: "游戏结束！",
    finalScore: "最终得分：",
    playAgain: "再玩一次",
    backToMenu: "返回菜单",
    clickToStart: "点击开始爆破气球！",
    instructions: "在20秒内尽可能多地爆破气球！",
  },
}

type Language = "en" | "zh"
type LanguageContextType = {
  currentLang: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof texts.en) => string
}

// Create context with default values
const defaultContextValue: LanguageContextType = {
  currentLang: "en",
  setLanguage: () => {},
  t: (key) => texts.en[key],
}

const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>("en")

  const setLanguage = (lang: Language) => {
    setCurrentLang(lang)
  }

  const t = (key: keyof typeof texts.en) => {
    return texts[currentLang][key]
  }

  return <LanguageContext.Provider value={{ currentLang, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}

