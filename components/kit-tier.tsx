"use client"

import React, { useState } from "react"
import { INITIAL_PLAYERS, Player, TierEntry, TierStatus } from "@/lib/tiers-data"
import { PlayerAvatar } from "./player-avatar"
import { PlayerModal } from "./player-modal"

const TIERS_ORDER = ["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5"]

interface KitTierProps {
  selectedKit: string
}

interface NormalizedTierItem {
  player: Player
  tier: string
  status: TierStatus
  peak?: string
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

  const normalizeEntry = (entry: TierEntry): { tier: string; status: TierStatus; peak?: string } => {
    if (typeof entry === "string") {
      return { tier: entry, status: "Active" }
    }
    return {
      tier: entry.tier,
      status: entry.status || "Active",
      peak: entry.peak,
    }
  }

  const columnsData: Record<string, NormalizedTierItem[]> = {
    "Tier 1": [],
    "Tier 2": [],
    "Tier 3": [],
    "Tier 4": [],
    "Tier 5": [],
  }

  const normalizedSelectedKit = selectedKit.toLowerCase().trim()
  let hasActiveHT1 = false // Флаг: нашли ли мы уже единственного действующего HT1

  INITIAL_PLAYERS.forEach((player) => {
    // Исключаем забаненных игроков из списка
    if (player.banned || !player.tiers) return

    const matchingKey = Object.keys(player.tiers).find(
      (key) => key.toLowerCase().trim() === normalizedSelectedKit
    )

    const rawEntry = matchingKey ? player.tiers[matchingKey] : undefined
    if (!rawEntry) return

    const { tier, status, peak } = normalizeEntry(rawEntry)

    // Не показываем непротестированных в таблице тиров
    if (status === "Untested" || !tier) return

    const upperTier = tier.toUpperCase().trim()
    const isHT1 = upperTier === "HT1"

    // Проверка на единственного действующего HT1:
    if (isHT1 && status === "Active") {
      if (hasActiveHT1) {
        // Если действующий HT1 уже есть в списке, второго активного HT1 пропускаем
        return
      }
      hasActiveHT1 = true
    }

    const category = getTierCategory(tier)
    if (category && columnsData[category]) {
      columnsData[category].push({ player, tier, status, peak })
    }
  })

  // Сортировка внутри каждой колонки:
  // 1. Действующий HT1 всегда самый первый
  // 2. Затем остальные HT (Active выше Retired/Inactive)
  // 3. Затем LT
  Object.keys(columnsData).forEach((tierName) => {
    columnsData[tierName].sort((a, b) => {
      const aUpper = a.tier.toUpperCase()
      const bUpper = b.tier.toUpperCase()

      // Действующий HT1 всегда на самом верху
      const aIsChamp = aUpper === "HT1" && a.status === "Active"
      const bIsChamp = bUpper === "HT1" && b.status === "Active"
      if (aIsChamp && !bIsChamp) return -1
      if (!aIsChamp && bIsChamp) return 1

      // HT выше LT
      const aIsHt = aUpper.startsWith("HT")
      const bIsHt = bUpper.startsWith("HT")
      if (aIsHt && !bIsHt) return -1
      if (!aIsHt && bIsHt) return 1

      // Active выше Retired / Inactive / Sub-Tier
      const aIsActive = a.status === "Active"
      const bIsActive = b.status === "Active"
      if (aIsActive && !bIsActive) return -1
      if (!aIsActive && bIsActive) return 1

      return 0
    })
  })

  const getStatusBadge = (status: TierStatus) => {
    switch (status) {
      case "Retired":
        return (
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30">
            Retired
          </span>
        )
      case "Inactive":
        return (
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30">
            Inactive
          </span>
        )
      case "Sub-Tier":
        return (
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
            Sub-Tier
          </span>
        )
      case "Active":
      default:
        return null // Стандартный активный статус не засоряет карточку, но можно добавить зеленую точку при желании
    }
  }

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
          } else if (tierName === "Tier 5") {
            headerBg = "bg-[#161a23]/80 border-slate-800 text-slate-400"
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
                      ;(e.target as HTMLElement).style.display = "none"
                    }}
                  />
                )}
                <span>{tierName}</span>
              </div>

              {/* Список игроков */}
              <div className="p-3 flex flex-col gap-2.5">
                {playersInTier.length > 0 ? (
                  playersInTier.map(({ player, tier, status, peak }) => {
                    const upperTier = tier.toUpperCase()
                    const isHt = upperTier.startsWith("HT")
                    const isActiveChamp = upperTier === "HT1" && status === "Active"
                    const isMuted = status === "Retired" || status === "Inactive"

                    return (
                      <div
                        key={player.id}
                        onClick={() => setSelectedPlayer(player)}
                        className={`transition-all duration-300 hover:scale-[1.02] border rounded-lg p-2.5 flex items-center justify-between cursor-pointer group shadow-sm ${
                          isActiveChamp
                            ? "bg-gradient-to-r from-amber-950/50 via-[#1f2430] to-[#1a202c] border-amber-500/50 shadow-amber-500/10"
                            : isMuted
                            ? "bg-[#161b24]/70 hover:bg-[#1e2430] border-zinc-800/50 opacity-85"
                            : "bg-[#1a202c] hover:bg-[#222836] border-zinc-800/60"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <PlayerAvatar username={player.skinUsername || player.username} />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`font-semibold text-sm truncate ${
                                  isActiveChamp
                                    ? "text-amber-300"
                                    : isMuted
                                    ? "text-zinc-400 group-hover:text-zinc-200"
                                    : "text-zinc-200 group-hover:text-white"
                                }`}
                              >
                                {player.username}
                              </span>
                              {status === "Active" && (
                                <span
                                  title="Active"
                                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.7)]"
                                />
                              )}
                            </div>

                            <div className="text-[10px] text-zinc-500 uppercase tracking-wider flex flex-wrap items-center gap-1.5 mt-0.5">
                              <span>{player.region}</span>
                              <span>•</span>
                              <span
                                className={`font-bold px-1.5 py-0.5 rounded text-[9px] ${
                                  isHt
                                    ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                    : "bg-zinc-800 text-zinc-400 border border-zinc-700/50"
                                }`}
                              >
                                {tier}
                              </span>

                              {getStatusBadge(status)}

                              {peak && (
                                <span className="text-[9px] font-semibold text-zinc-400 bg-black/40 px-1.5 py-0.5 rounded border border-zinc-800">
                                  Peak: <span className="text-amber-300">{peak}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
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
        <PlayerModal player={selectedPlayer} isOpen={!!selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
    </div>
  )
}
