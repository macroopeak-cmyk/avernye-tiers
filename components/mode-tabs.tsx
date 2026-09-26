"use client"

import { Trophy } from "lucide-react"

interface ModeTabsProps {
  selectedMode?: string
  onSelectMode?: (mode: string) => void
}

const MODES = ["Overall", "Vanilla", "UHC", "Pot", "NethOP", "SMP", "Sword", "Axe", "Mace", "Spear", "Cart"]

// Маппинг иконок для каждого режима
const MODE_ICONS: Record<string, string> = {
  Vanilla: "/vanilla.svg",
  UHC: "/uhc.svg",
  Pot: "/pot.svg",
  NethOP: "/nethop.svg",
  NethPot: "/nethop.svg",
  SMP: "/smp2.png", // <--- Ссылается на твой файл со щитом в папке public
  Sword: "/sword.svg",
  Axe: "/axe.svg",
  Mace: "/mace.svg",
  Spear: "/spear.svg",
  Cart: "/cart.svg",
}

export function ModeTabs({ selectedMode = "Overall", onSelectMode }: ModeTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {MODES.map((mode) => {
        const isActive = (selectedMode || "").toLowerCase() === mode.toLowerCase()
        const iconPath = MODE_ICONS[mode]

        return (
          <button
            key={mode}
            onClick={() => onSelectMode && onSelectMode(mode)}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
              isActive
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                : "bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800"
            }`}
          >
            {mode === "Overall" ? (
              <Trophy className={`w-4 h-4 ${isActive ? "text-black" : "text-amber-400"}`} />
            ) : iconPath ? (
              <img 
                src={iconPath} 
                alt={mode} 
                className="w-4 h-4 object-contain" 
                onError={(e) => {
                  // Если файл иконки не найден, скрываем картинку, чтобы не ломать верстку
                  ;(e.target as HTMLElement).style.display = 'none'
                }}
              />
            ) : null}
            <span>{mode}</span>
          </button>
        )
      })}
    </div>
  )
}