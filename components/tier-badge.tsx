import React from "react"
import { formatTierDisplay, getTierPoints } from "@/lib/tiers-data"

export function TierBadge({ tier, size = "md" }: { tier?: any; size?: string }) {
  if (!tier || typeof tier !== "string") {
    return <span className="text-slate-600 font-mono">-</span>
  }

  const rawTier = tier.trim()
  const displayVal = formatTierDisplay(rawTier)
  const points = getTierPoints(rawTier)
  const t = rawTier.toUpperCase()
  
  // Настройка цветов и иконок под каждый тир как на скриншоте
  let bgClass = "bg-slate-800/40 text-slate-400 border-slate-700/50"
  let cupIcon = ""

  if (t.includes("1")) {
    bgClass = "bg-amber-950/40 text-amber-400 border-amber-600/50"
    cupIcon = "/tier_1.svg"
  } else if (t.includes("2")) {
    bgClass = "bg-slate-800/60 text-slate-300 border-slate-700"
    cupIcon = "/tier_2.svg"
  } else if (t.includes("3")) {
    bgClass = "bg-amber-900/30 text-amber-600 border-amber-800/40"
    cupIcon = "/tier_3.svg"
  } else if (t.includes("4")) {
    bgClass = "bg-slate-900/60 text-slate-400 border-slate-800"
    cupIcon = "" // Если для 4/5 нет иконки кубка, можно оставить пусто или добавить
  } else if (t.includes("5")) {
    bgClass = "bg-slate-900/60 text-slate-500 border-slate-800"
    cupIcon = ""
  }

  const tooltipText = `${displayVal} — ${points} points`

  return (
    <span 
      onClick={() => console.log("Tier clicked:", rawTier, "Points:", points)}
      title={tooltipText}
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-xl border cursor-pointer transition-transform hover:scale-105 ${bgClass}`}
    >
      {cupIcon && (
        <img 
          src={cupIcon} 
          alt="" 
          className="w-3.5 h-3.5 object-contain"
          onError={(e) => {
            ;(e.target as HTMLElement).style.display = 'none'
          }}
        />
      )}
      <span>{displayVal}</span>
    </span>
  )
}