"use client"

import React, { useState } from "react"
import { INITIAL_PLAYERS, Player } from "@/lib/tiers-data"
import { PlayerAvatar } from "./player-avatar"
import { PlayerModal } from "./player-modal"

const TIERS_ORDER = ["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5"]

interface KitTierProps {
  selectedKit: string
}

export default function KitTier({ selectedKit }: KitTierProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  const getTierCategory = (tierStr: string) => {
    const cleanStr = String(tierStr).toLowerCase()
    if (cleanStr.includes("1")) return "Tier 1"
    if (cleanStr.includes("2")) return "Tier 2"
    if (cleanStr.includes("3")) return "Tier 3"
    if (cleanStr.includes("4")) return "Tier 4"
    if (cleanStr.includes("5")) return "Tier 5"
    return null
  }

  const columnsData: Record<string, { player: Player; tier: string }[]> = {
    "Tier 1": [],
    "Tier 2": [],
    "Tier 3": [],
    "Tier 4": [],
    "Tier 5": [],
  }

  // Нормализуем выбранный кит для надежного поиска (регистр и пробелы не важны)
  const normalizedSelectedKit = selectedKit.toLowerCase().trim()

  INITIAL_PLAYERS.forEach((player) => {
    if (!player.tiers) return

    // Ищем ключ в объекте tiers независимо от регистра (например, "Spear", "SPEAR", "spear")
    const matchingKey = Object.keys(player.tiers).find(
      (key) => key.toLowerCase().trim() === normalizedSelectedKit
    )

    const playerTierForKit = matchingKey ? player.tiers[matchingKey] : undefined

    if (playerTierForKit) {
      const category = getTierCategory(playerTierForKit)
      if (category && columnsData[category]) {
        columnsData[category].push({ player, tier: playerTierForKit })
      }
    }
  })

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
        {TIERS_ORDER.map((tierName) => {
          const playersInTier = columnsData[tierName] || []

          let headerBg = "bg-[#181d28] border-zinc-800 text-zinc-400"
          let cupIcon = ""

          if (tierName === "Tier 1") {
            headerBg = "bg-[#292215]/80 border-amber-900/60 text-amber-400"
            cupIcon = "/tier_1.svg"
          } else if (tierName === "Tier 2") {
            headerBg = "bg-[#1d222b]/80 border-slate-700/60 text-slate-300"
            cupIcon = "/tier_2.svg"
          } else if (tierName === "Tier 3") {
            headerBg = "bg-[#281b15]/80 border-amber-900/40 text-amber-600"
            cupIcon = "/tier_3.svg"
          } else if (tierName === "Tier 4") {
            headerBg = "bg-[#181c25]/80 border-slate-800 text-slate-400"
            cupIcon = ""
          } else if (tierName === "Tier 5") {
            headerBg = "bg-[#161a23]/80 border-slate-800 text-slate-400"
            cupIcon = ""
          }

          return (
            <div
              key={tierName}
              className="bg-[#12161f] border border-zinc-800/80 rounded-xl overflow-hidden flex flex-col shadow-md"
            >
              {/* Шапка тира */}
              <div className={`py-3.5 px-4 border-b text-center font-bold tracking-wide flex items-center justify-center gap-2 ${headerBg}`}>
                {cupIcon && (
                  <img 
                    src={cupIcon} 
                    alt="" 
                    className="w-4 h-4 object-contain"
                    onError={(e) => {
                      ;(e.target as HTMLElement).style.display = 'none'
                    }}
                  />
                )}
                <span>{tierName}</span>
              </div>

              {/* Список игроков */}
              <div className="p-3 flex flex-col gap-2.5">
                {playersInTier.length > 0 ? (
                  playersInTier.map(({ player, tier }) => (
                    <div
                      key={player.id}
                      onClick={() => setSelectedPlayer(player)}
                      className="bg-[#1a202c] hover:bg-[#222836] transition-all duration-300 hover:scale-105 border border-zinc-800/60 rounded-lg p-2.5 flex items-center justify-between cursor-pointer group shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <PlayerAvatar username={player.username} />
                        <div>
                          <div className="font-semibold text-sm text-zinc-200 group-hover:text-white">
                            {player.username}
                          </div>
                          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                            {player.region} • <span className="text-purple-400 font-medium">{tier}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-zinc-600 text-sm italic">
                    Нет игроков
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
    </div>
  )
}