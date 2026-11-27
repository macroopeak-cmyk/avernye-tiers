"use client"

import { Player, TierEntry, TierStatus, normalizeTierEntry, getTierPoints, formatTierDisplay } from "@/lib/tiers-data"
import { getModeIcon } from "@/lib/mode-icons"

/* ---------- Цвета ---------- */

export function tierPalette(tier: string) {
  const t = String(tier).toUpperCase()
  if (t.includes("1")) return { text: "text-[#f5c542]", ring: "border-[#f5c542]/70", pill: "bg-[#4d3d14] text-[#f5c542]" }
  if (t.includes("2")) return { text: "text-[#dbe2ec]", ring: "border-[#cbd5e1]/60", pill: "bg-[#3a4352] text-[#e2e8f0]" }
  if (t.includes("3")) return { text: "text-[#e0883a]", ring: "border-[#e0883a]/70", pill: "bg-[#4a2c16] text-[#e0883a]" }
  if (t.includes("4")) return { text: "text-[#9aa7ba]", ring: "border-[#64748b]/60", pill: "bg-[#2a3341] text-[#9aa7ba]" }
  return { text: "text-[#728096]", ring: "border-[#475569]/60", pill: "bg-[#222a37] text-[#728096]" }
}

export function regionStyle(region?: string) {
  switch (String(region || "").toUpperCase()) {
    case "NA": return { box: "bg-[#4a1b27] text-[#f0506e]", border: "border-l-[#e11d48]", tag: "bg-[#e11d48]/30 text-[#fb7185]" }
    case "EU": return { box: "bg-[#14391f] text-[#4ade80]", border: "border-l-[#22c55e]", tag: "bg-[#22c55e]/25 text-[#4ade80]" }
    case "AS": return { box: "bg-[#35214f] text-[#c084fc]", border: "border-l-[#a855f7]", tag: "bg-[#a855f7]/25 text-[#c084fc]" }
    case "CIS": return { box: "bg-[#12344a] text-[#38bdf8]", border: "border-l-[#0ea5e9]", tag: "bg-[#0ea5e9]/25 text-[#38bdf8]" }
    case "ME": return { box: "bg-[#4a3512] text-[#fbbf24]", border: "border-l-[#f59e0b]", tag: "bg-[#f59e0b]/25 text-[#fbbf24]" }
    default: return { box: "bg-[#222a37] text-[#9aa7ba]", border: "border-l-[#475569]", tag: "bg-[#475569]/30 text-[#9aa7ba]" }
  }
}

export function getTitleInfo(points: number) {
  if (points >= 400) return { name: "Combat Grandmaster", icon: "/combat_grandmaster.webp", pill: "bg-[#4a3f17] text-[#f7d54a]" }
  if (points >= 250) return { name: "Combat Master", icon: "/combat_master.webp", pill: "bg-[#4a3f17] text-[#f7d54a]" }
  if (points >= 100) return { name: "Combat Ace", icon: "/combat_ace.webp", pill: "bg-[#4a1f2c] text-[#fb7185]" }
  if (points >= 50) return { name: "Combat Specialist", icon: "/combat_specialist.svg", pill: "bg-[#33284f] text-[#c4b5fd]" }
  if (points >= 20) return { name: "Combat Cadet", icon: "/combat_cadet.svg", pill: "bg-[#33284f] text-[#c4b5fd]" }
  if (points >= 10) return { name: "Combat Novice", icon: "/combat_novice.svg", pill: "bg-[#33284f] text-[#c4b5fd]" }
  return { name: "Rookie", icon: "/rookie.svg", pill: "bg-[#2a3341] text-[#a1a1aa]" }
}

/* ---------- Данные ---------- */

export interface TierItem {
  mode: string
  tier: string
  status: TierStatus
  peak?: string
  points: number
}

/** Retired сначала, затем по очкам (как на MCTiers) */
export function getTierItems(tiers: Record<string, TierEntry> | undefined): TierItem[] {
  return Object.entries(tiers || {})
    .map(([mode, entry]) => {
      const d = normalizeTierEntry(entry)
      return { mode, tier: d.tier, status: d.status, peak: d.peak, points: getTierPoints(d.tier || "") }
    })
    .filter((i) => i.tier && i.status !== "Untested")
    .sort((a, b) => {
      const ar = a.status === "Retired" ? 1 : 0
      const br = b.status === "Retired" ? 1 : 0
      if (ar !== br) return br - ar
      return b.points - a.points
    })
}

export function skinOf(p: Player, size = 100) {
  return `https://visage.surgeplay.com/bust/${size}/${p.skinUsername || p.username}`
}

/* ---------- Кружок режима + тир ---------- */

export function TierChip({ item }: { item: TierItem }) {
  const { mode, tier, status, peak, points } = item
  const retired = status === "Retired"
  const p = tierPalette(tier)
  const icon = getModeIcon(mode)
  const label = formatTierDisplay(tier)

  return (
    <div className="relative group/chip flex flex-col items-center gap-1 w-[38px] shrink-0 cursor-pointer">
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover/chip:flex flex-col items-center z-50 pointer-events-none">
        <div className="bg-[#080b11] border border-[#232c3c] rounded-lg px-3 py-1.5 text-center whitespace-nowrap shadow-2xl">
          <div className="text-[13px] font-bold text-white leading-tight">
            {retired ? "Retired " : status === "Inactive" ? "Inactive " : ""}
            {label}
          </div>
          {peak && peak.toUpperCase() !== tier.toUpperCase() && (
            <div className="text-[10px] text-zinc-400">Peak: <span className="text-[#f5c542]">{peak}</span></div>
          )}
          <div className="text-[10px] text-zinc-500">{points} points</div>
        </div>
      </div>

      <div className={`w-[28px] h-[28px] rounded-full bg-[#0b111a] flex items-center justify-center ${retired ? `border-2 ${p.ring}` : ""}`}>
        {icon ? (
          <img src={icon} alt={mode} className="w-[16px] h-[16px] object-contain" />
        ) : (
          <span className="text-[8px] font-bold uppercase text-zinc-400">{mode.slice(0, 3)}</span>
        )}
      </div>
      <span
        className={`text-[11px] font-extrabold leading-none tracking-tight ${
          retired ? `px-1.5 py-[3px] rounded-full ${p.pill}` : p.text
        }`}
      >
        {label}
      </span>
    </div>
  )
}

/* ---------- Плашка места ---------- */

export function RankBadge({
  rank,
  skinUrl,
  onSkinError,
  size = "md",
}: {
  rank: number
  skinUrl?: string
  onSkinError?: () => void
  size?: "md" | "sm" | "xs"
}) {
  const bg =
    rank === 1
      ? "bg-[#f0b72f]"
      : rank === 2
      ? "bg-gradient-to-br from-[#a6b8bc] to-[#7d9197]"
      : rank === 3
      ? "bg-[#bf6a2b]"
      : "bg-gradient-to-r from-[#161e2c] to-[#243044]"

  const width = size === "md" ? "w-[148px]" : size === "sm" ? "w-[104px]" : "w-[78px]"
  const num = size === "xs" ? "text-[22px]" : size === "sm" ? "text-[26px]" : "text-[36px]"

  return (
    <div
      className={`relative shrink-0 self-stretch rounded-l-[10px] ${bg} ${width} flex items-center`}
      style={{ clipPath: "polygon(0 0, 100% 0, 93% 100%, 0 100%)" }}
    >
      <span className={`pl-4 ${num} font-black italic text-white leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]`}>
        {rank}.
      </span>
      {skinUrl && (
        <img
          src={skinUrl}
          alt=""
          onError={onSkinError}
          className="absolute right-2 bottom-0 h-[88%] max-h-[64px] object-contain select-none"
        />
      )}
    </div>
  )
}
