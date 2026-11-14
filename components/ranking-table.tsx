"use client"

import { useState } from "react"
import { RankedPlayer, Mode, Player, formatTierDisplay } from "@/lib/tiers-data"
import { PlayerModal } from "./player-modal"
import { Trophy, Info, Server, Copy, Check, Disc } from "lucide-react"

interface RankingTableProps {
  players: RankedPlayer[]
  selectedMode: Mode | "overall" | string
}

const MODE_ICONS: Record<string, string> = {
  "LTMs": "/ltm's.svg",
  "Vanilla": "/vanilla.svg",
  "UHC": "/uhc.svg",
  "Pot": "/pot.svg",
  "NethOP": "/smp.svg",
  "NethPot": "/nethop.svg",
  "SMP": "/smp2.png",
  "Sword": "/sword.svg",
  "Axe": "/axe.svg",
  "Mace": "/mace.svg",
  "Cart": "/minecart-e4204998.svg",
  "Spear": "/spearmace.png",
  "ltms": "/ltm's.svg",
  "vanilla": "/vanilla.svg",
  "uhc": "/uhc.svg",
  "pot": "/pot.svg",
  "nethop": "/smp.svg",
  "nethpot": "/nethop.svg",
  "smp": "/smp2.png",
  "sword": "/sword.svg",
  "axe": "/axe.svg",
  "mace": "/mace.svg",
  "cart": "/minecart-e4204998.svg",
  "spear": "/spearmace.png",
  "swo": "/sword.svg",
  "van": "/vanilla.svg",
  "net": "/nethop.svg",
  "car": "/minecart-e4204998.svg",
  "spe": "/spearmace.png"
}

export function RankingTable({ players, selectedMode }: RankingTableProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [skinErrors, setSkinErrors] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState(false)
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  const copyIp = () => {
    navigator.clipboard.writeText("IncorrectSMP.play.ski")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getPlayerTitleInfo = (points: number) => {
    if (points >= 400) return { name: "Combat Grandmaster", icon: "/combat_grandmaster.webp" }
    if (points >= 250) return { name: "Combat Master", icon: "/combat_master.webp" }
    if (points >= 100) return { name: "Combat Ace", icon: "/combat_ace.webp" }
    if (points >= 50) return { name: "Combat Specialist", icon: "/combat_specialist.svg" }
    if (points >= 20) return { name: "Combat Cadet", icon: "/combat_cadet.svg" }
    if (points >= 10) return { name: "Combat Novice", icon: "/combat_novice.svg" }
    return { name: "Rookie", icon: "/rookie.svg" }
  }

  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bg: "bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 text-black border-yellow-300 shadow-[0_0_15px_rgba(252,211,77,0.4)]",
          numberText: "text-black",
        }
      case 2:
        return {
          bg: "bg-gradient-to-r from-slate-100 via-slate-300 to-zinc-300 text-black border-slate-200 shadow-[0_0_15px_rgba(226,232,240,0.4)]",
          numberText: "text-black",
        }
      case 3:
        return {
          bg: "bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-900 text-white border-amber-500 shadow-[0_0_15px_rgba(217,119,6,0.4)]",
          numberText: "text-white",
        }
      default:
        return {
          bg: "bg-[#181d28] text-zinc-300 border-zinc-700/50",
          numberText: "text-zinc-200",
        }
    }
  }

  const getRegionBadgeStyle = (region: string) => {
    switch (region?.toUpperCase()) {
      case "NA": return "bg-rose-500/20 text-rose-500 border border-rose-500/30"
      case "EU": return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      case "ME": return "bg-amber-500/20 text-amber-400 border border-amber-500/30"
      case "AS": return "bg-purple-500/20 text-purple-400 border border-purple-500/30"
      default: return "bg-zinc-800 text-zinc-300 border border-zinc-700"
    }
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <style jsx global>{`
        @keyframes shine-sweep {
          0% {
            transform: translateX(-150%) skewX(-20deg);
          }
          100% {
            transform: translateX(250%) skewX(-20deg);
          }
        }
        .animate-full-shine {
          animation: shine-sweep 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Шапка таблицы Rankings как на скриншоте */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-2">
        <div>
          <h1 className="text-2xl font-black text-white">Overall Minecraft PvP Rankings</h1>
          <p className="text-xs text-zinc-400 mt-1">
            {players.length} players ranked by points across 8 gamemodes
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsInfoOpen(true)}
            className="flex items-center gap-2 bg-[#10141d] hover:bg-[#181e2b] border border-zinc-800 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-300 shadow-sm transition cursor-pointer"
          >
            <Info className="w-4 h-4 text-cyan-400" />
            <span>Information</span>
          </button>

          <div className="flex items-center gap-3 bg-[#10141d] border border-zinc-800 px-4 py-2.5 rounded-xl text-xs shadow-sm">
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500 font-bold uppercase text-[10px]">Server IP</span>
              <span className="text-white font-bold">IncorrectSMP.play.ski</span>
            </div>
            <button 
              onClick={copyIp}
              className="text-zinc-400 hover:text-white transition cursor-pointer p-1"
              title="Копировать IP"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <a href="https://discord.gg/Y8e2REfz3A" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-indigo-400 transition ml-1">
              <Disc className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full hidden md:flex items-center justify-between px-6 py-1 text-xs font-bold tracking-wider text-zinc-500 uppercase select-none">
        <div className="flex items-center gap-4">
          <span className="min-w-[40px] text-left">#</span>
          <span className="ml-[110px]">Player</span>
        </div>
        <div className="flex items-center gap-16">
          <span>Region</span>
          <span className="mr-8">Tiers</span>
        </div>
      </div>

      {players.map((player, index) => {
        const rank = index + 1
        const style = getRankBadgeStyle(rank)
        const titleInfo = getPlayerTitleInfo(player.points)
        
        const hasError = skinErrors[player.id]
        const skinUrl = hasError
          ? "https://visage.surgeplay.com/bust/70/MHF_Steve"
          : `https://visage.surgeplay.com/bust/70/${player.username}`

        return (
          <div
            key={player.id}
            onClick={() => setSelectedPlayer(player)}
            className="relative rounded-2xl border border-zinc-700/60 bg-gradient-to-r from-[#1b2230] via-[#141a26] to-[#0e131d] shadow-xl transition-all duration-200 hover:scale-[1.01] hover:border-zinc-500 cursor-pointer flex items-center justify-between px-5 py-3.5 overflow-hidden"
          >
            <div className="flex items-center gap-5 z-10">
              <div 
                className={`relative overflow-hidden flex items-center gap-3.5 px-3.5 py-2 border rounded-xl md:rounded-2xl ${style.bg}`}
                style={{ clipPath: rank <= 3 ? "polygon(0 0, 90% 0, 100% 100%, 0% 100%)" : "none" }}
              >
                {rank <= 3 && (
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute -inset-y-4 w-12 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-full-shine" />
                  </div>
                )}

                <span className={`relative z-10 text-2xl md:text-3xl font-black italic tracking-wider ${style.numberText} min-w-[34px] text-center drop-shadow-sm`}>
                  {rank}.
                </span>

                <div className="relative z-10 h-12 md:h-14 w-12 md:w-14 flex items-end justify-center flex-shrink-0 select-none overflow-hidden">
                  <img
                    src={skinUrl}
                    alt={player.username}
                    className="h-full object-contain drop-shadow-lg"
                    onError={() => {
                      setSkinErrors((prev) => ({ ...prev, [player.id]: true }))
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg md:text-xl font-extrabold text-white tracking-wide">
                    {player.username}
                  </span>
                  {rank === 1 && <Trophy className="w-4 h-4 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
                  <img src={titleInfo.icon} alt="" className="w-4 h-4 object-contain shrink-0" />
                  <span>{titleInfo.name}</span>
                  <span className="opacity-75">({player.points} points)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 z-10">
              <div className={`px-3.5 py-1 rounded-lg text-xs font-black tracking-wider ${getRegionBadgeStyle(player.region)}`}>
                {player.region || "EU"}
              </div>

              <div 
                className="hidden sm:flex items-center gap-1.5 bg-black/30 p-2 rounded-xl border border-white/10 max-w-[480px] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {player.tiers && Object.entries(player.tiers).map(([modeKey, tierData]) => {
                  const rawTier = typeof tierData === 'string' ? tierData : (tierData as any)?.tier || (tierData as any)?.value || ""
                  const displayTier = formatTierDisplay(rawTier)
                  const t = rawTier.toUpperCase()

                  const tierObj = typeof tierData === 'object' && tierData !== null ? (tierData as any) : {}
                  const modePoints = tierObj.points || tierObj.score || 0
                  const isRetired = tierObj.retired === true || tierObj.isRetired === true || tierObj.status === 'retired' || tierObj.is_retired === true
                  const rawPeak = tierObj.peak || tierObj.peakTier || tierObj.maxTier || null
                  const peakTier = rawPeak ? formatTierDisplay(rawPeak) : null

                  let textColor = "text-amber-300"
                  let cupIcon = "/tier_1.svg"

                  if (t.includes("1")) {
                    textColor = "text-amber-400"
                    cupIcon = "/tier_1.svg"
                  } else if (t.includes("2")) {
                    textColor = "text-slate-300"
                    cupIcon = "/tier_2.svg"
                  } else if (t.includes("3")) {
                    textColor = "text-amber-600"
                    cupIcon = "/tier_3.svg"
                  } else if (t.includes("4")) {
                    textColor = "text-slate-400"
                    cupIcon = "/tier_4.svg"
                  } else if (t.includes("5")) {
                    textColor = "text-slate-500"
                    cupIcon = "/tier_5.svg"
                  }

                  const modeIcon = MODE_ICONS[modeKey] || MODE_ICONS[modeKey.toLowerCase()]

                  return (
                    <div 
                      key={modeKey} 
                      className="relative group flex flex-col items-center px-2 py-1 bg-black/30 rounded-lg min-w-[44px] shrink-0 cursor-pointer hover:bg-black/50 transition-colors"
                    >
                      <div className="absolute bottom-full mb-1.5 hidden group-hover:flex flex-col items-center z-50 pointer-events-none">
                        <div className="px-2.5 py-1 text-xs font-bold text-amber-300 bg-[#12161f] border border-zinc-700/80 rounded-md shadow-xl whitespace-nowrap tracking-wide flex items-center gap-1.5">
                          {isRetired && <span className="text-red-400 font-semibold">[Retired]</span>}
                          {peakTier && <span className="text-zinc-400 font-normal">Peak: {peakTier}</span>}
                          {modePoints > 0 && <span className="text-zinc-400 font-normal">({modePoints} pts)</span>}
                          {!isRetired && !peakTier && modePoints === 0 && <span>{displayTier}</span>}
                        </div>
                        <div className="w-1.5 h-1.5 bg-[#12161f] border-r border-b border-zinc-700/80 transform rotate-45 -mt-1"></div>
                      </div>

                      {modeIcon ? (
                        <img src={modeIcon} alt={modeKey} className="w-4 h-4 object-contain opacity-80" />
                      ) : (
                        <span className="text-[10px] uppercase font-bold tracking-tight text-zinc-400">
                          {modeKey.slice(0, 3)}
                        </span>
                      )}
                      
                      <div className="flex items-center gap-1 mt-0.5">
                        <img 
                          src={cupIcon} 
                          alt="" 
                          className="w-3 h-3 object-contain"
                          onError={(e) => {
                            ;(e.target as HTMLElement).style.display = 'none'
                          }}
                        />
                        <span className={`text-xs font-black drop-shadow ${textColor}`}>
                          {displayTier}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}

      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} isOpen={!!selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
    </div>
  )
}
