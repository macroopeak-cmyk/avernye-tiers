"use client"

import { Player, calculatePlayerPoints, INITIAL_PLAYERS, getStaffRoleBadge } from "@/lib/tiers-data"
import { X, Trophy, ExternalLink } from "lucide-react"
import { RankBadge, TierChip, getTierItems, getTitleInfo, skinOf } from "./mc-ui"

interface PlayerModalProps {
  player: Player | null
  isOpen?: boolean
  onClose: () => void
}

// 🎨 Кастомные анимированные градиенты для ников
const CUSTOM_NAME_GRADIENTS: Record<string, string> = {
  "Marlowww": "bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500 bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text",
  "ItzRealZevs": "bg-gradient-to-r from-red-600 via-rose-500 to-red-900 bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text",
  "Rivise": "bg-gradient-to-r from-red-500 via-rose-400 to-pink-600 bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text",
  "Ekho017": "bg-gradient-to-r from-purple-500 via-fuchsia-400 to-pink-400 bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text",
}

const REGION_NAMES: Record<string, string> = {
  EU: "Europe",
  NA: "North America",
  CIS: "CIS",
  AS: "Asia",
  ME: "Middle East",
}

export function PlayerModal({ player, isOpen = true, onClose }: PlayerModalProps) {
  if (!isOpen || !player) return null

  const points = calculatePlayerPoints(player.tiers)
  const title = getTitleInfo(points)
  const roleBadge = getStaffRoleBadge(player.staffRole)
  const items = getTierItems(player.tiers)

  const sorted = [...INITIAL_PLAYERS].sort((a, b) => calculatePlayerPoints(b.tiers) - calculatePlayerPoints(a.tiers))
  const playerRank = sorted.findIndex((p) => p.id === player.id) + 1

  const nameStyle = CUSTOM_NAME_GRADIENTS[player.username] || "text-[#dfe5ee]"
  const nameMc = `https://namemc.com/profile/${player.username}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient { animation: gradientMove 4s ease infinite; }
      `}</style>

      <div onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" />

      <div className="relative z-10 w-full max-w-[460px] max-h-[92vh] overflow-y-auto overflow-x-hidden bg-[#121926] border border-[#1c2638] rounded-2xl px-8 py-8 shadow-2xl text-white flex flex-col items-center [&>*]:shrink-0 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#1b2435] hover:bg-[#243049] text-zinc-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Аватар */}
        <div className="relative w-[100px] h-[100px] min-h-[100px] rounded-full bg-[#1a2232] border-2 border-[#e8b830] overflow-hidden flex items-end justify-center">
          <img
            src={skinOf(player, 120)}
            alt={player.username}
            className="h-[110px] object-contain translate-y-1"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = "https://visage.surgeplay.com/bust/120/MHF_Steve"
            }}
          />
        </div>

        <h2 className={`text-[30px] leading-tight font-bold mt-3 ${nameStyle}`}>{player.username}</h2>

        {roleBadge && (
          <span className={`mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${roleBadge.color}`}>{roleBadge.label}</span>
        )}

        <div className={`mt-3 flex items-center gap-2 px-4 py-1.5 rounded-full ${title.pill}`}>
          <img src={title.icon} alt="" className="w-[22px] h-[22px] object-contain" />
          <span className="text-[15px] font-semibold">{title.name}</span>
        </div>

        <div className="mt-4 text-[17px] font-bold text-[#8b97ab]">{REGION_NAMES[player.region] || player.region}</div>

        <div className="mt-3 flex items-center gap-2">
          <a
            href={`https://namemc.com/search?q=${player.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1b2435] hover:bg-[#243049] transition text-xs font-medium text-zinc-300"
          >
            <span className="w-5 h-5 rounded-[5px] bg-black border border-zinc-600 flex items-center justify-center text-[11px] font-black text-white leading-none">n</span>
            <span>NameMC</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
          <a
            href={nameMc}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1b2435] hover:bg-[#243049] transition text-xs font-medium text-zinc-300"
          >
            <span>View full profile</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
        </div>

        {/* POSITION */}
        <div className="w-full mt-6">
          <div className="text-[17px] text-[#9aa6b8] font-medium mb-2">POSITION</div>
          <div className="flex items-stretch h-[46px] rounded-[10px] bg-[#0e1520] border border-[#1a2333]">
            <RankBadge rank={playerRank} size="xs" />
            <div className="flex items-center gap-2 pl-3">
              <Trophy className="w-5 h-5 text-[#f59e0b] fill-[#f59e0b]" />
              <span className="text-[19px] font-extrabold text-white tracking-wide">OVERALL</span>
              <span className="text-sm text-[#7d8aa0]">({points} points)</span>
            </div>
          </div>
        </div>

        {/* TIERS */}
        <div className="w-full mt-5">
          <div className="text-[17px] text-[#9aa6b8] font-medium mb-2">TIERS</div>
          <div className="rounded-[10px] bg-[#0e1520] border border-[#1a2333] px-3 pt-4 pb-3 flex flex-wrap gap-x-2 gap-y-4">
            {items.map((item) => (
              <TierChip key={item.mode} item={item} />
            ))}
            {items.length === 0 && <span className="text-sm text-zinc-500">No tiers yet</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
