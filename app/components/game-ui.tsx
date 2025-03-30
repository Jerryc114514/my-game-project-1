"use client"

interface GameUIProps {
  score: number
  timeLeft: number
  username: string
  isLocked: boolean
}

export default function GameUI({ score, timeLeft, username, isLocked }: GameUIProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Score display */}
      <div className="absolute top-5 left-5 bg-black/50 p-2 rounded text-white text-xl">Score: {score}</div>

      {/* Timer display */}
      <div className="absolute top-5 right-5 bg-black/50 p-2 rounded text-white text-xl">Time: {timeLeft}s</div>

      {/* Username display */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/50 p-2 rounded text-white text-xl">
        {username}
      </div>

      {/* Crosshair (only when pointer is locked) */}
      {isLocked && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="2" fill="white" />
            <line x1="12" y1="5" x2="12" y2="9" stroke="white" strokeWidth="2" />
            <line x1="12" y1="15" x2="12" y2="19" stroke="white" strokeWidth="2" />
            <line x1="5" y1="12" x2="9" y2="12" stroke="white" strokeWidth="2" />
            <line x1="15" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      )}

      {/* Instructions overlay (only when not locked) */}
      {!isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 pointer-events-auto cursor-pointer">
          <div className="text-white text-center p-8 rounded bg-gray-800/50 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Click to Start</h2>
            <p className="mb-4">Move your mouse to aim and click to shoot balloons.</p>
            <p className="text-sm">Press ESC to pause the game.</p>
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Start Game
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

