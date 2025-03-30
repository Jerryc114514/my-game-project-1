"use client"

import { useLanguage } from "./language-context"

export default function LanguageSelector() {
  const { currentLang, setLanguage } = useLanguage()

  return (
    <div className="absolute top-4 right-4 z-10">
      <select
        value={currentLang}
        onChange={(e) => setLanguage(e.target.value as "en" | "zh")}
        className="bg-black/50 text-white border border-gray-600 rounded px-2 py-1"
      >
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>
    </div>
  )
}

