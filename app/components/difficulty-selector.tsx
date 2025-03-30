"use client"

import type { Difficulty } from "@/app/page"

interface DifficultySelectorProps {
  difficulty: Difficulty
  onChange: (difficulty: Difficulty) => void
}

interface DifficultyOption {
  value: Difficulty
  label: string
  description: string
}

const difficultyOptions: DifficultyOption[] = [
  {
    value: "easy",
    label: "Easy",
    description: "Slower balloons, longer lifetime",
  },
  {
    value: "medium",
    label: "Medium",
    description: "Balanced difficulty",
  },
  {
    value: "hard",
    label: "Hard",
    description: "Faster balloons, shorter lifetime",
  },
  {
    value: "extreme",
    label: "Extreme",
    description: "Very fast, very short lifetime",
  },
]

export default function DifficultySelector({ difficulty, onChange }: DifficultySelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-lg">Select Difficulty:</label>
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
            onClick={() => onChange(option.value)}
          >
            <div className="font-bold text-lg">{option.label}</div>
            <div className="text-xs text-gray-300">{option.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

