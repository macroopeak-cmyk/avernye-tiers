"use client"

import { useState, useEffect, KeyboardEvent } from "react"
import { INITIAL_PLAYERS, calculatePlayerPoints, RankedPlayer, Player } from "@/lib/tiers-data"
import { RankingTable } from "@/components/ranking-table"
import KitTier from "@/components/kit-tier"
import { PlayerModal } from "@/components/player-modal"
import { 
  Info, X, Palette, Search, 
  Home as HomeIcon, Trophy, Disc, FileText, ChevronDown, ExternalLink 
} from "lucide-react"

export default function Home() {
  const [selectedMode, setSelectedMode] = useState<string>("overall")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [errorText, setErrorText] = useState<string>("")
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false)
  const [isDiscordMenuOpen, setIsDiscordMenuOpen] = useState<boolean>(false)
  const [infoTab, setInfoTab] = useState<"titles" | "points">("titles")
  
  const [theme, setTheme] = useState<"dark" | "midnight" | "sinus" | "light">("dark")
  const [isThemeOpen, setIsThemeOpen] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("combat_tiers_theme") as "dark" | "midnight" | "sinus" | "light"
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const changeTheme = (newTheme: "dark" | "midnight" | "sinus" | "light") => {
    setTheme(newTheme)
    localStorage.setItem("combat_tiers_theme", newTheme)
    setIsThemeOpen(false)
  }

  const sortedRawPlayers = [...INITIAL_PLAYERS].map((player) => ({
    ...player,
    points: calculatePlayerPoints(player.tiers),
  })).sort((a, b) => b.points - a.points)

  const rankedPlayers: RankedPlayer[] = sortedRawPlayers.map((player, index) => ({
    ...player,
    rank: index + 1,
  }))

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const trimmedQuery = searchQuery.trim()
      const foundPlayer = rankedPlayers.find(
        (p) => p.username.toLowerCase() === trimmedQuery.toLowerCase()
      )

      if (foundPlayer) {
        setSelectedPlayer(foundPlayer)
        setErrorText("")
        setSearchQuery("")
      } else {
        setErrorText("Игрок не найден")
        setSelectedPlayer(null)
      }
    }
  }

  const modes = [
    { id: "overall", label: "Overall", icon: "/overall.svg" },
    { id: "LTMs", label: "LTMs", icon: "/ltm's.svg" },
    { id: "Vanilla", label: "Vanilla", icon: "/vanilla.svg" },
    { id: "UHC", label: "UHC", icon: "/uhc.svg" },
    { id: "Pot", label: "Pot", icon: "/pot.svg" },
    { id: "NethOP", label: "NethOP", icon: "/smp.svg" },
    { id: "NethPot", label: "NethPot", icon: "/nethop.svg" },
    { id: "SMP", label: "SMP", icon: "/smp2.png" },
    { id: "Sword", label: "Sword", icon: "/sword.svg" },
    { id: "Axe", label: "Axe", icon: "/axe.svg" },
    { id: "Mace", label: "Mace", icon: "/mace.svg" },
    { id: "Cart", label: "Cart", icon: "/minecart-e4204998.svg" },
    { id: "Spear", label: "Spear", icon: "/spearmace.png" },
  ]

  const themeStyles = {
    dark: {
      bg: "bg-[#0b0e14]",
      textColor: "text-white",
      cardBg: "bg-[#10141d]",
      border: "border-zinc-800/80",
      accentInput: "focus:border-amber-500",
    },
    midnight: {
      bg: "bg-[#000000]",
      textColor: "text-white",
      cardBg: "bg-[#080808]",
      border: "border-zinc-900",
      accentInput: "focus:border-zinc-500",
    },
    sinus: {
      bg: "bg-[#060f0b]",
      textColor: "text-white",
      cardBg: "bg-[#0d1a14]",
      border: "border-emerald-950",
      accentInput: "focus:border-emerald-500",
    },
    light: {
      bg: "bg-[#f4f6f9]",
      textColor: "text-zinc-900",
      cardBg: "bg-white",
      border: "border-zinc-200",
      accentInput: "focus:border-blue-500",
    },
  }[theme]

  return (
    <main className={`min-h-screen ${themeStyles.bg} ${themeStyles.textColor} flex flex-col items-center py-4 px-6 relative transition-colors duration-300 w-full`}>
      
      {/* Шапка сайта */}
      <header className={`w-full max-w-[1720px] flex items-center justify-between ${themeStyles.cardBg} border ${themeStyles.border} px-8 py-5 rounded-2xl shadow-lg mb-20`}>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="/logo.png" alt="SinusTiers" className="h-11 w-auto object-contain scale-105" />
          </div>

          <nav className="hidden md:flex items-center gap-7 text-xs text-zinc-400 font-medium">
            <a href="#" className="flex items-center gap-2 hover:text-zinc-200 transition-colors">
              <HomeIcon className="w-4 h-4 text-zinc-500" />
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-zinc-200 transition-colors">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Rankings</span>
            </a>
            
            <div className="relative">
              <button 
                onClick={() => setIsDiscordMenuOpen(!isDiscordMenuOpen)}
                className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors cursor-pointer"
              >
                <Disc className="w-4 h-4 text-zinc-500" />
                <span>Discords</span>
                <ChevronDown className="w-3 h-3 text-zinc-500" />
              </button>
              {isDiscordMenuOpen && (
                <div className={`absolute left-0 top-full mt-2 w-56 ${themeStyles.cardBg} border ${themeStyles.border} rounded-xl shadow-xl overflow-hidden z-50 p-1.5 flex flex-col gap-1 text-left`}>
                  <a 
                    href="https://discord.gg/Y8e2REfz3A" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full px-3 py-2 rounded-lg text-xs hover:bg-zinc-800/60 text-zinc-300 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <span className="font-medium">STiers</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </a>
                  <a 
                    href="https://discord.gg/YFXEmEC8y2" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full px-3 py-2 rounded-lg text-xs hover:bg-zinc-800/60 text-zinc-300 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <span className="font-medium">Avernye</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </a>
                </div>
              )}
            </div>

            <a href="#" className="flex items-center gap-2 hover:text-zinc-200 transition-colors">
              <FileText className="w-4 h-4 text-zinc-500" />
              <span>API Docs</span>
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-72 relative">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search player..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (errorText) setErrorText("")
                }}
                onKeyDown={handleKeyDown}
                className={`w-full ${theme === "light" ? "bg-zinc-100" : "bg-black/30"} border ${themeStyles.border} rounded-xl pl-9 pr-9 py-2 text-xs placeholder-zinc-500 focus:outline-none ${themeStyles.accentInput} transition-colors`}
              />
              <span className="absolute right-3 text-[10px] text-zinc-500 border border-zinc-700/50 px-1.5 py-0.5 rounded">/</span>
            </div>
            {errorText && (
              <span className="absolute -bottom-4 left-1 text-[10px] text-red-400 font-medium">
                {errorText}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className={`p-2 rounded-xl ${theme === "light" ? "bg-zinc-100 hover:bg-zinc-200" : "bg-black/30 hover:bg-zinc-800/60"} border ${themeStyles.border} text-xs transition-colors cursor-pointer relative`}
              title="Тема"
            >
              <Palette className="w-4 h-4 text-amber-400" />
              {isThemeOpen && (
                <div className={`absolute right-0 top-full mt-2 w-36 ${themeStyles.cardBg} border ${themeStyles.border} rounded-xl shadow-xl overflow-hidden z-50 p-1 flex flex-col gap-1 text-left`}>
                  <button onClick={() => changeTheme("dark")} className="w-full px-2 py-1.5 rounded text-[11px] hover:bg-zinc-800/60 cursor-pointer">Dark</button>
                  <button onClick={() => changeTheme("midnight")} className="w-full px-2 py-1.5 rounded text-[11px] hover:bg-zinc-800/60 cursor-pointer">Midnight</button>
                  <button onClick={() => changeTheme("sinus")} className="w-full px-2 py-1.5 rounded text-[11px] hover:bg-zinc-800/60 cursor-pointer">Sinus</button>
                  <button onClick={() => changeTheme("light")} className="w-full px-2 py-1.5 rounded text-[11px] hover:bg-zinc-800/60 cursor-pointer">Light ☀️</button>
                </div>
              )}
            </button>

            <button
              onClick={() => setIsInfoOpen(true)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme === "light" ? "bg-zinc-100 hover:bg-zinc-200" : "bg-black/30 hover:bg-zinc-800/60"} border ${themeStyles.border} text-xs font-medium transition-colors cursor-pointer`}
            >
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Information</span>
            </button>
          </div>
        </div>
      </header>

      {/* Основной объединенный блок с индивидуальными полукруглыми кончиками у каждого кита */}
      <div className={`w-full max-w-[1720px] ${themeStyles.cardBg} border ${themeStyles.border} rounded-2xl shadow-xl overflow-hidden mb-3`}>
        
        {/* Панель выбора режимов */}
        <div className="p-3 pb-2 border-b border-zinc-800/50">
          <div className="flex items-end gap-1.5 overflow-x-auto scrollbar-none pt-2">
            {modes.map((mode) => {
              const isActive = selectedMode === mode.id

              return (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  title={mode.label}
                  className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 px-3 transition-all duration-150 cursor-pointer shrink-0 border-x border-t ${
                    isActive
                      ? "bg-[#161f30] border-amber-500/80 text-white shadow-sm ring-1 ring-amber-500/30 rounded-t-2xl -mt-2 pt-5"
                      : "border-transparent hover:bg-zinc-800/40 text-zinc-400 hover:text-zinc-200 rounded-t-xl"
                  }`}
                >
                  <img 
                    src={mode.icon} 
                    alt={mode.label} 
                    className={`w-5 h-5 object-contain ${isActive ? "opacity-100 filter drop-shadow(0 0 5px rgba(245,158,11,0.5))" : "opacity-50"}`} 
                  />
                  <span className={`text-[11px] font-medium tracking-wide ${isActive ? "text-amber-400 font-bold" : ""}`}>
                    {mode.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Содержимое таблицы / китов */}
        <div className="p-3 pt-4">
          {selectedMode === "overall" ? (
            <RankingTable players={rankedPlayers} selectedMode={selectedMode} />
          ) : (
            <KitTier selectedKit={selectedMode} />
          )}
        </div>
      </div>

      <PlayerModal player={selectedPlayer} isOpen={!!selectedPlayer} onClose={() => setSelectedPlayer(null)} />

      {/* Модальное окно Инфо */}
      {isInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className={`${themeStyles.cardBg} border ${themeStyles.border} rounded-2xl w-full max-w-lg p-6 relative shadow-2xl`}>
            <button onClick={() => setIsInfoOpen(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-zinc-900/80 p-1.5 rounded-lg border border-zinc-800 cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            <div className={`flex ${themeStyles.bg} p-1.5 rounded-xl border ${themeStyles.border} mb-4`}>
              <button 
                onClick={() => setInfoTab("titles")} 
                className={`flex-1 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${infoTab === "titles" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"}`}
              >
                Титулы
              </button>
              <button 
                onClick={() => setInfoTab("points")} 
                className={`flex-1 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${infoTab === "points" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"}`}
              >
                Очки
              </button>
            </div>

            {infoTab === "titles" ? (
              <div className="space-y-4">
                <div className="text-sm font-bold text-zinc-200 mb-2">
                  Как получить <span className="underline decoration-zinc-500 cursor-pointer">наградные титулы</span>
                </div>

                <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
                  <div className={`flex items-start gap-3 p-3 rounded-xl border ${themeStyles.border} bg-black/20`}>
                    <img src="/combat_grandmaster.webp" alt="Combat Grandmaster" className="w-8 h-8 object-contain shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-amber-400 text-sm">Combat Grandmaster</div>
                      <div className="text-xs text-zinc-400 mt-0.5">Получено 400+ общих очков.</div>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3 rounded-xl border ${themeStyles.border} bg-black/20`}>
                    <img src="/combat_grandmaster.webp" alt="Combat Master" className="w-8 h-8 object-contain shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-amber-400 text-sm">Combat Master</div>
                      <div className="text-xs text-zinc-400 mt-0.5">Получено 250+ общих очков.</div>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3 rounded-xl border ${themeStyles.border} bg-black/20`}>
                    <img src="/combat_ace.webp" alt="Combat Ace" className="w-8 h-8 object-contain shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-rose-400 text-sm">Combat Ace</div>
                      <div className="text-xs text-zinc-400 mt-0.5">Получено 100+ общих очков.</div>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3 rounded-xl border ${themeStyles.border} bg-black/20`}>
                    <img src="/combat_specialist.svg" alt="Combat Specialist" className="w-8 h-8 object-contain shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-purple-300 text-sm">Combat Specialist</div>
                      <div className="text-xs text-zinc-400 mt-0.5">Получено 50+ общих очков.</div>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3 rounded-xl border ${themeStyles.border} bg-black/20`}>
                    <img src="/combat_cadet.svg" alt="Combat Cadet" className="w-8 h-8 object-contain shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-purple-300 text-sm">Combat Cadet</div>
                      <div className="text-xs text-zinc-400 mt-0.5">Получено 20+ общих очков.</div>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3 rounded-xl border ${themeStyles.border} bg-black/20`}>
                    <img src="/combat_novice.svg" alt="Combat Novice" className="w-8 h-8 object-contain shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-purple-300 text-sm">Combat Novice</div>
                      <div className="text-xs text-zinc-400 mt-0.5">Получено 10+ общих очков.</div>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3 rounded-xl border ${themeStyles.border} bg-black/20`}>
                    <img src="/rookie.svg" alt="Rookie" className="w-8 h-8 object-contain shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-zinc-300 text-sm">Rookie</div>
                      <div className="text-xs text-zinc-400 mt-0.5">Начальный ранг для игроков с количеством очков менее 10.</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm font-bold text-zinc-200 mb-3">
                  Как рассчитываются <span className="underline decoration-zinc-500 cursor-pointer">очки рейтинга</span>
                </div>

                <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1 text-xs">
                  <div>
                    <div className="flex items-center gap-2 text-amber-500 font-bold mb-2">
                      <img src="/tier_1.svg" alt="Tier 1" className="w-5 h-5 object-contain" />
                      <span>Tier 1</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-black/30 border border-zinc-800 rounded-xl p-2.5 flex items-center gap-2">
                        <span className="text-amber-500">▲</span> <strong className="text-amber-400">60 Points</strong>
                      </div>
                      <div className="bg-black/30 border border-zinc-800 rounded-xl p-2.5 flex items-center gap-2">
                        <span className="text-amber-500">▲</span> <strong className="text-amber-400">45 Points</strong>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-zinc-300 font-bold mb-2">
                      <img src="/tier_2.svg" alt="Tier 2" className="w-5 h-5 object-contain" />
                      <span>Tier 2</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-black/30 border border-zinc-800 rounded-xl p-2.5 flex items-center gap-2">
                        <span className="text-zinc-400">▲</span> <strong className="text-zinc-300">30 Points</strong>
                      </div>
                      <div className="bg-black/30 border border-zinc-800 rounded-xl p-2.5 flex items-center gap-2">
                        <span className="text-zinc-400">▲</span> <strong className="text-zinc-300">20 Points</strong>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-amber-600 font-bold mb-2">
                      <img src="/tier_3.svg" alt="Tier 3" className="w-5 h-5 object-contain" />
                      <span>Tier 3</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-black/30 border border-zinc-800 rounded-xl p-2.5 flex items-center gap-2">
                        <span className="text-amber-600">▲</span> <strong className="text-amber-600">10 Points</strong>
                      </div>
                      <div className="bg-black/30 border border-zinc-800 rounded-xl p-2.5 flex items-center gap-2">
                        <span className="text-amber-600">▲</span> <strong className="text-amber-600">6 Points</strong>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="font-bold text-zinc-300 mb-2">Tier 4</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-black/30 border border-zinc-800 rounded-xl p-2.5 flex items-center gap-2">
                        <span className="text-zinc-400">▲</span> <strong className="text-zinc-300">4 Points</strong>
                      </div>
                      <div className="bg-black/30 border border-zinc-800 rounded-xl p-2.5 flex items-center gap-2">
                        <span className="text-zinc-400">▲</span> <strong className="text-zinc-300">3 Points</strong>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="font-bold text-zinc-300 mb-2">Tier 5</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-black/30 border border-zinc-800 rounded-xl p-2.5 flex items-center gap-2">
                        <span className="text-zinc-400">▲</span> <strong className="text-zinc-300">2 Points</strong>
                      </div>
                      <div className="bg-black/30 border border-zinc-800 rounded-xl p-2.5 flex items-center gap-2">
                        <span className="text-zinc-400">▲</span> <strong className="text-zinc-300">1 Point</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}