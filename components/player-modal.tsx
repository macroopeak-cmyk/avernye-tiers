"use client"

import { useState } from "react"
import { Player, calculatePlayerPoints, getPlayerTitle, INITIAL_PLAYERS, getStaffRoleBadge } from "@/lib/tiers-data"
import { X, Trophy, ExternalLink } from "lucide-react"

interface PlayerModalProps {
  player: Player | null
  isOpen?: boolean
  onClose: () => void
}

const MODE_ICONS: Record<string, string> = {
  Vanilla: "/vanilla.svg",
  UHC: "/uhc.svg",
  Pot: "/pot.svg",
  NethOP: "/smp.svg",
  NethPot: "/nethop.svg",
  SMP: "/smp2.png",
  Sword: "/sword.svg",
  Axe: "/axe.svg",
  Mace: "/mace.svg",
  Cart: "/minecart-e4204998.svg",
  SpearMace: "/spearmace.png",
  Spear: "/spearmace.png",
}

// 🎨 Кастомные анимированные градиенты для ников
const CUSTOM_NAME_GRADIENTS: Record<string, string> = {
  "Marlowww": "bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500 bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text",
  "ItzRealZevs": "bg-gradient-to-r from-red-600 via-rose-500 to-red-900 bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text",
  "Rivise": "bg-gradient-to-r from-red-500 via-rose-400 to-pink-600 bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text",
  "Ekho017": "bg-gradient-to-r from-purple-500 via-fuchsia-400 to-pink-400 bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text",
}

// Функция для подсчета очков за конкретный тир (можешь настроить под свою логику)
const getTierPoints = (tier: string) => {
  switch (tier) {
    case "HT1": return 60
    case "LT1": return 45
    case "HT2": return 35
    case "LT2": return 25
    case "HT3": return 20
    case "LT3": return 15
    case "HT4": return 10
    case "LT4": return 5
    default: return 0
  }
}

export function PlayerModal({ player, isOpen = true, onClose }: PlayerModalProps) {
  if (!isOpen || !player) return null

  const points = calculatePlayerPoints(player.tiers)
  const titleInfo = getPlayerTitle(points)
  const roleBadge = getStaffRoleBadge(player.staffRole)

  const sortedPlayers = [...INITIAL_PLAYERS].sort((a, b) => {
    return calculatePlayerPoints(b.tiers) - calculatePlayerPoints(a.tiers)
  })
  const playerRank = sortedPlayers.findIndex((p) => p.id === player.id) + 1

  const skinUrl = `https://visage.surgeplay.com/bust/120/${player.username}`

  const getRankBadgeInfo = (totalPoints: number) => {
    if (totalPoints >= 400) return { icon: "/combat_grandmaster.webp", name: titleInfo.title, color: "text-amber-400" }
    if (totalPoints >= 250) return { icon: "/combat_grandmaster.webp", name: titleInfo.title, color: "text-amber-400" }
    if (totalPoints >= 100) return { icon: "/combat_ace.webp", name: titleInfo.title, color: "text-rose-400"  }
    if (totalPoints >= 50) return { icon: "/combat_specialist.svg", name: titleInfo.title, color: "text-purple-300" }
    if (totalPoints >= 20) return { icon: "/combat_cadet.svg", name: titleInfo.title, color: "text-purple-300" }
    if (totalPoints >= 10) return { icon: "/combat_novice.svg", name: titleInfo.title, color: "text-purple-300" }
    return { icon: "/rookie.svg", name: titleInfo.title, color: "text-zinc-300" }
  }

  const rankBadge = getRankBadgeInfo(points)
  const nameStyle = CUSTOM_NAME_GRADIENTS[player.username] || "text-white"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradientMove 4s ease infinite;
        }
      `}</style>

      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      />

      <div className="relative w-full max-w-[420px] bg-[#0b0e14] border border-zinc-800/80 rounded-2xl p-6 shadow-2xl text-white z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer border border-zinc-800"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Аватарка */}
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-[#12161f] border-2 border-amber-400/80 shadow-lg mb-3 select-none overflow-hidden">
          <img
            src={skinUrl}
            alt={player.username}
            className="h-28 object-contain drop-shadow-xl translate-y-1"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = "https://visage.surgeplay.com/bust/120/MHF_Steve"
            }}
          />
        </div>

        {/* Ник */}
        <h2 className={`text-2xl font-black mb-1.5 ${nameStyle}`}>
          {player.username}
        </h2>

        {roleBadge && (
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold mb-2 ${roleBadge.color}`}>
            {roleBadge.label}
          </span>
        )}

        {/* Плашка титула */}
        <div className="flex items-center gap-1.5 bg-[#161a23] border border-amber-500/30 px-3 py-1 rounded-full mb-1.5 shadow-sm">
          <img src={rankBadge.icon} alt="Rank Icon" className="w-4 h-4 object-contain" />
          <span className="text-xs font-bold text-amber-300">
            {rankBadge.name}
          </span>
        </div>

        {/* Регион */}
        <div className="text-xs text-zinc-500 font-semibold tracking-wide mb-2.5">
          {player.region === "EU" ? "Europe" : "North America"}
        </div>

        {/* Кнопка NameMC */}
        <a
          href={`https://namemc.com/search?q=${player.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#181c27] hover:bg-[#202533] border border-zinc-800 transition text-xs font-medium text-zinc-300 hover:text-white mb-5 cursor-pointer shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-zinc-400 inline-block"></span>
          <span>NameMC</span>
          <ExternalLink className="w-3 h-3 text-zinc-400" />
        </a>

        {/* Секция POSITION */}
        <div className="w-full mb-4">
          <div className="text-[11px] font-bold text-zinc-400 tracking-wider mb-1.5">POSITION</div>
          <div className="flex items-center bg-gradient-to-r from-amber-500/20 via-[#161a23] to-[#161a23] border border-amber-500/40 rounded-xl p-2.5 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500"></div>
            <div className="flex items-center gap-3 pl-2">
              <span className="text-lg font-black italic text-amber-400">#{playerRank}.</span>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-extrabold tracking-wider text-white uppercase">OVERALL</span>
              </div>
            </div>
            <div className="ml-auto text-xs font-bold text-zinc-400">
              ({points} points)
            </div>
          </div>
        </div>

        {/* Секция TIERS с Tooltip-менюшками при наведении */}
        <div className="w-full">
          <div className="text-[11px] font-bold text-zinc-400 tracking-wider mb-1.5">TIERS</div>
          <div className="bg-[#12161f] border border-zinc-800/80 rounded-2xl p-3 grid grid-cols-5 gap-2">
            {Object.entries(player.tiers).map(([mode, tier]) => {
              const isHt = tier.startsWith("HT")
              const iconPath = MODE_ICONS[mode] || MODE_ICONS[mode.toLowerCase()] || MODE_ICONS[Object.keys(MODE_ICONS).find(k => k.toLowerCase() === mode.toLowerCase()) || ""]
              const tierPoints = getTierPoints(tier)

              return (
                <div key={mode} className="relative group/tier flex flex-col items-center justify-center">
                  {/* Всплывающее меню (Tooltip) при наведении */}
                  <div className="absolute bottom-full mb-2 hidden group-hover/tier:flex flex-col items-center z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                    <div className="bg-[#0b0e14] border border-zinc-700/80 text-white px-3 py-1.5 rounded-xl shadow-2xl text-center whitespace-nowrap">
                      <div className="text-xs font-bold tracking-wide">
                        Retired <span className={isHt ? "text-amber-400" : "text-purple-400"}>{tier}</span>
                      </div>
                      <div className="text-[10px] text-zinc-400 font-medium">
                        {tierPoints} points
                      </div>
                    </div>
                    {/* Стрелочка тултипа */}
                    <div className="w-2 h-2 bg-[#0b0e14] border-r border-b border-zinc-700/80 rotate-45 -mt-1"></div>
                  </div>

                  {/* Карточка тира */}
                  <div className="w-full bg-[#181c27] hover:bg-[#202533] border border-zinc-800/60 transition rounded-xl p-1.5 flex flex-col items-center justify-center gap-1 cursor-pointer">
                    {iconPath ? (
                      <img src={iconPath} alt={mode} className="w-4 h-4 object-contain" />
                    ) : (
                      <div className="w-4 h-4 bg-zinc-800 rounded-sm" />
                    )}
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded ${
                      isHt 
                        ? "bg-amber-500/15 text-amber-400 border border-amber-500/30" 
                        : "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                    }`}>
                      {tier}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}