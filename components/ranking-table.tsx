"use client"

import { useState } from "react"
import { RankedPlayer, Mode, Player } from "@/lib/tiers-data"
import { PlayerModal } from "./player-modal"
import { RankBadge, TierChip, getTierItems, getTitleInfo, regionStyle, skinOf } from "./mc-ui"

interface RankingTableProps {
  players: RankedPlayer[]
  selectedMode: Mode | "overall" | string
  compact?: boolean // для маленьких блоков (Home): без колонки тиров
}

export function RankingTable({ players, compact = false }: RankingTableProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [skinErrors, setSkinErrors] = useState<Record<string, boolean>>({})

  return (
    <div className="w-full flex flex-col gap-2">
      {!compact && (
        <div className="hidden md:grid grid-cols-[1fr_auto_auto] px-4 pb-1 text-[11px] font-bold tracking-[0.2em] text-zinc-600 uppercase select-none">
          <div className="flex gap-16">
            <span>#</span>
            <span>Player</span>
          </div>
          <span className="w-[66px] text-center">Region</span>
          <span className="w-[352px] text-center">Tiers</span>
        </div>
      )}

      {players.map((player, index) => {
        const rank = index + 1
        const title = getTitleInfo(player.points)
        const region = regionStyle(player.region)
        const items = getTierItems(player.tiers)
        const skinUrl = skinErrors[player.id]
          ? "https://visage.surgeplay.com/bust/100/MHF_Steve"
          : skinOf(player, 100)

        return (
          <div
            key={player.id}
            onClick={() => setSelectedPlayer(player)}
            className="group relative flex items-stretch min-h-[70px] rounded-[10px] bg-[#131b28] border border-[#1a2333] hover:border-[#2b3a54] transition-colors cursor-pointer"
          >
            <RankBadge
              rank={rank}
              skinUrl={skinUrl}
              size={compact ? "sm" : "md"}
              onSkinError={() => setSkinErrors((p) => ({ ...p, [player.id]: true }))}
            />

            <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5 pl-4 pr-3 py-2">
              <span className="text-[20px] leading-tight font-semibold text-[#e3e8f0] truncate">{player.username}</span>
              <div className="flex items-center gap-1.5 text-[13px] text-[#c5cddb] min-w-0">
                <img src={title.icon} alt="" className="w-[18px] h-[18px] object-contain shrink-0" />
                <span className="truncate">{title.name}</span>
                <span className="text-[#5d6a80] whitespace-nowrap">({player.points} points)</span>
              </div>
            </div>

            <div className="flex items-center justify-center w-[66px] shrink-0 bg-[#0f1621]">
              <span className={`min-w-[38px] text-center px-1.5 py-2 rounded-md text-[15px] font-extrabold ${region.box}`}>
                {player.region || "EU"}
              </span>
            </div>

            {!compact && (
              <div className="hidden md:flex items-center justify-center gap-1.5 w-[352px] shrink-0 px-3 bg-[#101824] rounded-r-[10px]">
                {items.map((item) => (
                  <TierChip key={item.mode} item={item} />
                ))}
              </div>
            )}
          </div>
        )
      })}

      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} isOpen={!!selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
    </div>
  )
}
