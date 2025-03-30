// app/components/ui/card.tsx
import React from "react"

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded shadow p-4">{children}</div>
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="border-b pb-2 mb-2">{children}</div>
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold">{children}</h2>
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="mb-2">{children}</div>
}

export function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="pt-2 border-t mt-2">{children}</div>
}
