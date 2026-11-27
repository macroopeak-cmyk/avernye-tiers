"use client"

import React, { useState } from "react"
import { ChevronUp, ChevronsUp } from "lucide-react"
import { INITIAL_PLAYERS, Player, TierStatus, normalizeTierEntry } from "@/lib/tiers-data"
import { PlayerAvatar } from "./player-avatar"
import { PlayerModal } from "./player-modal"
import { regionStyle } from "./mc-ui"

const TIERS_ORDER = ["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5"]

const HEADERS: Record<string, { bg: string; text: string; icon?: string }> = {
  "Tier 1": { bg: "bg-[#4a3b17]", text: "text-[#f5b73b]", icon: "/tier_1.svg" },
  "Tier 2": { bg: "bg-[#2d3441]", text: "text-[#c4ccd8]", icon: "/tier_2.svg" },
  "Tier 3": { bg: "bg-[#3b2a1c]", text: "text-[#d9803a]", icon: "/tier_3.svg" },
  "Tier 4": { bg: "bg-[#131a26]", text: "text-[#aeb7c5]" },
  "Tier 5": { bg: "bg-[#131a26]", text: "text-[#aeb7c5]" },
}

interface KitTierProps {
  selectedKit: string
}

interface Item {
  player: Player
  tier: string
  status: TierStatus
  peak?: string
}

const categoryOf = (tier: string) => {
  const s = String(tier).toLowerCase()
  for (const n of ["1", "2", "3", "4", "5"]) if (s.includes(n)) return `Tier ${n}`
  return null
}

export default function KitTier({ selectedKit }: KitTierProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  const columns: Record<string, Item[]> = { "Tier 1": [], "Tier 2": [], "Tier 3": [], "Tier 4": [], "Tier 5": [] }
  const kit = selectedKit.toLowerCase().trim()
  let hasActiveHT1 = false

  INITIAL_PLAYERS.forEach((player) => {
    if (player.banned || !player.tiers) return
    const key = Object.keys(player.tiers).find((k) => k.toLowerCase().trim() === kit)
    const raw = key ? player.tiers[key] : undefined
    if (!raw) return

    const { tier, status, peak } = normalizeTierEntry(raw)
    if (status === "Untested" || !tier) return

    if (tier.toUpperCase().trim() === "HT1" && status === "Active") {
      if (hasActiveHT1) return
      hasActiveHT1 = true
    }

    const cat = categoryOf(tier)
    if (cat) columns[cat].push({ player, tier, status, peak })
  })

  // Сортировка: действующий HT1 → HT → LT, Active выше Retired/Inactive
  Object.values(columns).forEach((list) =>
    list.sort((a, b) => {
      const rank = (i: Item) => {
        const ht = i.tier.toUpperCase().startsWith("HT") ? 0 : 1
        const act = i.status === "Active" ? 0 : 1
        return ht * 2 + act
      }
      return rank(a) - rank(b)
    })
  )

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
        {TIERS_ORDER.map((tierName) => {
          const list = columns[tierName]
          const h = HEADERS[tierName]

          return (
            <div key={tierName} className="flex flex-col">
              <div className={`h-[50px] rounded-t-xl flex items-center justify-center gap-2 text-[22px] font-bold ${h.bg} ${h.text}`}>
                {h.icon && (
                  <img
                    src={h.icon}
                    alt=""
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      ;(e.target as HTMLElement).style.display = "none"
                    }}
                  />
                )}
                <span>{tierName}</span>
              </div>

              <div className="flex flex-col gap-[2px] mt-[2px]">
                {list.map(({ player, tier, status, peak }) => {
                  const isHt = tier.toUpperCase().startsWith("HT")
                  const muted = status === "Retired" || status === "Inactive"
                  const region = regionStyle(player.region)
                  const Chev = isHt ? ChevronsUp : ChevronUp
                  const hint = [status !== "Active" ? status : null, tier, peak ? `Peak ${peak}` : null].filter(Boolean).join(" · ")

                  return (
                    <div
                      key={player.id}
                      title={hint}
                      onClick={() => setSelectedPlayer(player)}
                      className={`group relative flex items-center h-[34px] border-l-2 ${region.border} cursor-pointer transition-colors ${
                        muted ? "bg-[#151d2b] hover:bg-[#1d2738]" : "bg-[#1b2537] hover:bg-[#26324a]"
                      }`}
                    >
                      <span className={`hidden group-hover:flex items-center self-stretch px-1.5 text-[12px] font-extrabold ${region.tag}`}>
                        {player.region}
                      </span>
                      <div className="pl-2 shrink-0">
                        <PlayerAvatar username={player.skinUsername || player.username} />
                      </div>
                      <span className={`ml-2 flex-1 min-w-0 truncate text-[14px] ${muted ? "text-[#aab3c2]" : "text-[#e8ecf3]"}`}>
                        {player.username}
                      </span>
                      <Chev className={`w-[18px] h-[18px] mr-2 shrink-0 ${isHt && !muted ? "text-[#8da2c9]" : "text-[#55637c]"}`} />
                    </div>
                  )
                })}
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
