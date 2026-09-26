"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function PlayerBody({
  username,
  skinUsername,
  height = 72,
  className,
}: {
  username: string
  skinUsername?: string
  height?: number
  className?: string
}) {
  const [errored, setErrored] = useState(false)

  // Жестко приоритезируем skinUsername
  const targetSkin = skinUsername || username

  // Используем проверенный сервис visage.surgeplay.com для полного тела
  const src = `https://visage.surgeplay.com/full/${Math.round(height * 2)}/${encodeURIComponent(targetSkin)}`
  const fallback = `https://visage.surgeplay.com/full/${Math.round(height * 2)}/MHF_Steve`

  return (
    <img
      src={errored ? fallback : src}
      alt={`${username} Minecraft body render`}
      loading="lazy"
      onError={() => setErrored(true)}
      className={cn("select-none object-contain", className)}
      style={{ height, width: "auto", imageRendering: "pixelated" }}
      crossOrigin="anonymous"
    />
  )
}