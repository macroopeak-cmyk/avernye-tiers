"use client"

import { useState, useEffect, KeyboardEvent } from "react"
import { INITIAL_PLAYERS, calculatePlayerPoints, RankedPlayer, Player } from "@/lib/tiers-data"
import { RankingTable } from "@/components/ranking-table"
import KitTier from "@/components/kit-tier"
import { PlayerModal } from "@/components/player-modal"
import { 
  Info, X, Palette, Search, 
  Home as HomeIcon, Trophy, Disc, FileText, ChevronDown, ExternalLink, Server, Globe, Calendar, ArrowRight, Plus, Minus
} from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "rankings" | "server-ip" | "events">("home")
  const [selectedMode, setSelectedMode] = useState<string>("overall")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [errorText, setErrorText] = useState<string>("")
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false)
  const [isDiscordMenuOpen, setIsDiscordMenuOpen] = useState<boolean>(false)
  const [infoTab, setInfoTab] = useState<"titles" | "points">("titles")
  const [copiedIp, setCopiedIp] = useState<boolean>(false)
  
  const [theme, setTheme] = useState<"dark" | "midnight" | "sinus" | "light">("dark")
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  
  // Состояние для аккордеона FAQ (всего 9 вопросов как на оригинале)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

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

  const copyServerIp = () => {
    navigator.clipboard.writeText("mctiers.network")
    setCopiedIp(true)
    setTimeout(() => setCopiedIp(false), 2000)
  }

  // Строго актуальные режимы как на оригинале
  const modes = [
    { id: "overall", label: "Overall", icon: "/overall.svg" },
    { id: "LTMs", label: "LTMs", icon: "/ltm's.svg" },
    { id: "Vanilla", label: "Vanilla", icon: "/vanilla.svg" },
    { id: "UHC", label: "UHC", icon: "/uhc.svg" },
    { id: "Pot", label: "Pot", icon: "/pot.svg" },
    { id: "NethOP", label: "NethOP", icon: "/smp.svg" },
    { id: "SMP", label: "SMP", icon: "/smp2.png" },
    { id: "Sword", label: "Sword", icon: "/sword.svg" },
    { id: "Axe", label: "Axe", icon: "/axe.svg" },
    { id: "Mace", label: "Mace", icon: "/mace.svg" },
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
      <header className={`w-full max-w-[1720px] flex items-center justify-between ${themeStyles.cardBg} border ${themeStyles.border} px-8 py-4 rounded-2xl shadow-lg mb-8`}>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("home")}>
            <img src="/logo.png" alt="AvernyeTiers Logo" className="h-10 w-auto object-contain scale-105" />
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs text-zinc-400 font-medium">
            <button 
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-2 transition-colors cursor-pointer ${activeTab === "home" ? "text-white font-bold" : "hover:text-zinc-200"}`}
            >
              <HomeIcon className="w-4 h-4 text-zinc-500" />
              <span>Home</span>
            </button>

            <button 
              onClick={() => setActiveTab("rankings")}
              className={`flex items-center gap-2 transition-colors cursor-pointer ${activeTab === "rankings" ? "text-white font-bold" : "hover:text-zinc-200"}`}
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Rankings</span>
            </button>
            
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

            <button 
              onClick={() => setActiveTab("server-ip")}
              className={`flex items-center gap-2 transition-colors cursor-pointer ${activeTab === "server-ip" ? "text-white font-bold" : "hover:text-zinc-200"}`}
            >
              <Server className="w-4 h-4 text-zinc-500" />
              <span>Server IP</span>
            </button>

            <button 
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-2 transition-colors cursor-pointer ${activeTab === "events" ? "text-white font-bold" : "hover:text-zinc-200"}`}
            >
              <Calendar className="w-4 h-4 text-zinc-500" />
              <span>Events</span>
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs text-zinc-400">
            <span className="text-base">🇺🇸</span>
          </div>

          <div className="w-64 relative">
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

      {/* ВКЛАДКА: HOME */}
      {activeTab === "home" && (
        <div className="w-full max-w-[1720px] flex flex-col gap-8">
          
          {/* Верхний блок: Описание проекта и Топ-3 игрока */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className={`lg:col-span-5 ${themeStyles.cardBg} border ${themeStyles.border} p-10 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden`}>
              <div>
                <img src="/logo.png" alt="AvernyeTiers Logo" className="h-14 w-auto object-contain mb-6" />
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-4 text-white">
                  The Minecraft PvP Tier List
                </h1>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  AvernyeTiers is a Minecraft PvP tier list. Players are tested in eight gamemodes, placed in tiers from Tier 1 to Tier 5, and ranked on one overall leaderboard.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setActiveTab("rankings")}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-5 py-3 rounded-xl transition shadow-lg shadow-amber-500/20 text-xs cursor-pointer"
                >
                  <span>View rankings</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={copyServerIp}
                  className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-5 py-3 rounded-xl transition text-xs border border-zinc-700 cursor-pointer"
                >
                  <span>Get tier tested</span>
                </button>
              </div>
            </div>

            <div className={`lg:col-span-7 ${themeStyles.cardBg} border ${themeStyles.border} p-6 rounded-3xl shadow-xl flex flex-col gap-4`}>
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-500 tracking-wider uppercase">
                  <Trophy className="w-4 h-4" />
                  <span>Top Players</span>
                </div>
                <button 
                  onClick={() => setActiveTab("rankings")}
                  className="text-xs text-zinc-400 hover:text-white transition flex items-center gap-1 cursor-pointer font-medium"
                >
                  <span>Full leaderboard</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {rankedPlayers.slice(0, 3).map((player) => (
                  <div 
                    key={player.id}
                    onClick={() => setSelectedPlayer(player)}
                    className="bg-black/30 hover:bg-black/50 border border-zinc-800/80 hover:border-amber-500/40 p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm ${
                        player.rank === 1 ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30" :
                        player.rank === 2 ? "bg-zinc-300 text-black" : "bg-amber-700 text-white"
                      }`}>
                        {player.rank}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center">
                        <img src={`https://minotar.net/avatar/${player.username}/100.png`} alt={player.username} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{player.username}</div>
                        <div className="text-[11px] text-amber-400/90 font-medium">
                          {player.staffRole || "Combat Master"} ({player.points} points)
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-bold px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300">
                      {player.region}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Статус сервера */}
          <div className={`w-full ${themeStyles.cardBg} border ${themeStyles.border} p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4`}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Online</span>
                  <span className="text-xs text-zinc-500">• 2,583 / 10,000 players online</span>
                </div>
                <div className="text-base font-extrabold text-white mt-0.5">mctiers.network</div>
              </div>
            </div>
            <button 
              onClick={copyServerIp}
              className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold px-5 py-3 rounded-xl transition cursor-pointer flex items-center gap-2"
            >
              <span>{copiedIp ? "IP Copied!" : "Copy Server IP"}</span>
              <Server className="w-4 h-4" />
            </button>
          </div>

          {/* Сетка игровых режимов */}
          <div>
            <div className="text-lg font-bold text-white mb-4">Gamemodes</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {modes.filter(m => m.id !== "overall").map((mode) => (
                <div 
                  key={mode.id}
                  onClick={() => {
                    setSelectedMode(mode.id)
                    setActiveTab("rankings")
                  }}
                  className={`border ${themeStyles.border} hover:border-amber-500/50 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition group bg-black/20 hover:bg-black/40`}
                >
                  <img src={mode.icon} alt={mode.label} className="w-8 h-8 object-contain group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-zinc-300 group-hover:text-amber-400 transition-colors">{mode.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Инструкция получения тира (Get tier tested) из 5 шагов */}
          <div className={`${themeStyles.cardBg} border ${themeStyles.border} p-8 rounded-3xl shadow-xl`}>
            <div className="text-2xl font-black text-white mb-2">Get tier tested</div>
            <p className="text-xs text-zinc-400 mb-8">
              Tier tests happen in-game on <span className="text-white font-semibold">mctiers.network</span>. Queue for a gamemode, fight one of our testers and get your tier.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { step: "1", title: "Join server", desc: "Join mctiers.network on Java or Bedrock." },
                { step: "2", title: "Type /tiertest", desc: "Choose the gamemode you want to be tested in." },
                { step: "3", title: "Pick region", desc: "Join that gamemode's testing queue." },
                { step: "4", title: "Private arena", desc: "When a tester is free, you're moved to a private arena." },
                { step: "5", title: "Get ranked", desc: "Fight your tester and earn your profile tier." },
              ].map((s, idx) => (
                <div key={idx} className="bg-black/30 border border-zinc-800/80 p-4 rounded-2xl flex flex-col justify-between">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/20 mb-3">
                    {s.step}
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs mb-1">{s.title}</div>
                    <div className="text-[11px] text-zinc-400 leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tiers, Points and Titles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${themeStyles.cardBg} border ${themeStyles.border} p-6 rounded-3xl shadow-xl`}>
              <div className="text-lg font-bold text-white mb-1">Tiers and points</div>
              <p className="text-xs text-zinc-400 mb-6">Each gamemode ranks players in five tiers, split into High and Low.</p>
              
              <div className="space-y-3">
                {[
                  { tier: "Tier 1", points: "HT1 · 60 pts", lt: "LT1 · 45 pts", bg: "bg-amber-950/40 border-amber-900/50" },
                  { tier: "Tier 2", points: "HT2 · 30 pts", lt: "LT2 · 20 pts", bg: "bg-zinc-900 border-zinc-800" },
                  { tier: "Tier 3", points: "HT3 · 10 pts", lt: "LT3 · 6 pts", bg: "bg-amber-900/20 border-amber-900/30" },
                  { tier: "Tier 4", points: "HT4 · 4 pts", lt: "LT4 · 3 pts", bg: "bg-black/30 border-zinc-800" },
                  { tier: "Tier 5", points: "HT5 · 2 pts", lt: "LT5 · 1 pt", bg: "bg-black/30 border-zinc-800" },
                ].map((t, idx) => (
                  <div key={idx} className={`p-3.5 rounded-2xl border ${t.bg} flex items-center justify-between`}>
                    <span className="font-bold text-white text-xs">{t.tier}</span>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-semibold bg-black/40 px-2 py-1 rounded-lg text-amber-400 border border-white/5">{t.points}</span>
                      <span className="text-[10px] font-semibold bg-black/40 px-2 py-1 rounded-lg text-zinc-300 border border-white/5">{t.lt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${themeStyles.cardBg} border ${themeStyles.border} p-6 rounded-3xl shadow-xl`}>
              <div className="text-lg font-bold text-white mb-1">Titles</div>
              <p className="text-xs text-zinc-400 mb-6">Your title follows your total points across every gamemode.</p>

              <div className="space-y-3">
                {[
                  { title: "Combat Grandmaster", req: "400+ points", color: "text-amber-400" },
                  { title: "Combat Master", req: "250+ points", color: "text-amber-400" },
                  { title: "Combat Ace", req: "100+ points", color: "text-rose-400" },
                  { title: "Combat Specialist", req: "50+ points", color: "text-purple-300" },
                  { title: "Combat Cadet", req: "20+ points", color: "text-purple-300" },
                  { title: "Rookie", req: "Under 10 points", color: "text-zinc-400" },
                ].map((ti, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl border border-zinc-800/80 bg-black/30 flex items-center justify-between">
                    <span className={`font-bold text-xs ${ti.color}`}>{ti.title}</span>
                    <span className="text-xs text-zinc-400 font-medium">{ti.req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Блок Upcoming events */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold text-white">Upcoming events</div>
              <button onClick={() => setActiveTab("events")} className="text-xs text-zinc-400 hover:text-white transition flex items-center gap-1 cursor-pointer">
                <span>All events</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { date: "OCT 23", title: "Sword FFA Night", desc: "Up to 100 players, one arena and Sword kits only. Last player standing wins the round." },
                { date: "NOV 1", title: "Mace Halloween Bash", desc: "A Halloween-themed Mace bracket on a spooky arena. Double elimination, so everyone..." },
                { date: "NOV 7", title: "UHC Duos Showdown", desc: "Grab a partner for 2v2 UHC. 32 teams, best-of-3 matches, single elimination." },
              ].map((ev, idx) => (
                <div key={idx} className={`${themeStyles.cardBg} border ${themeStyles.border} p-6 rounded-3xl flex flex-col justify-between gap-6`}>
                  <div>
                    <div className="text-xs font-black text-amber-500 mb-2">{ev.date}</div>
                    <div className="text-base font-bold text-white mb-2">{ev.title}</div>
                    <div className="text-xs text-zinc-400 leading-relaxed">{ev.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Секция (9 вопросов как в оригинале) */}
          <div className={`${themeStyles.cardBg} border ${themeStyles.border} p-8 rounded-3xl shadow-xl`}>
            <div className="text-2xl font-black text-white mb-1">Frequently asked questions</div>
            <p className="text-xs text-zinc-400 mb-6">Quick answers about tiers, tier tests, points and the AvernyeTiers server.</p>

            <div className="space-y-3">
              {[
                { q: "What is AvernyeTiers?", a: "AvernyeTiers is a Minecraft PvP tier list. It ranks players in eight gamemodes (Vanilla/Crystal PvP, UHC, Pot, NethOP, SMP, Sword, Axe and Mace) from High Tier 1 to Low Tier 5, and combines those tiers into one overall leaderboard." },
                { q: "What do HT1, LT1 and the other tiers mean?", a: "Tiers range from 1 to 5, split into High (HT) and Low (LT). HT1 is the highest and most elite tier possible in a gamemode." },
                { q: "How do I get tier tested?", a: "Join our server mctiers.network, type /tiertest in chat, choose your preferred gamemode and queue up to fight a tester." },
                { q: "How is the overall leaderboard calculated?", a: "Every tier you hold in individual gamemodes awards points. The sum of all your points determines your position on the overall leaderboard." },
                { q: "What are titles like Combat Master?", a: "Titles are prestigious ranks automatically assigned to your profile based on your cumulative total points." },
                { q: "What does a retired tier mean?", a: "Retired tiers represent legacy achievements or inactive historical ranks that no longer actively modify current seasonal points." },
                { q: "How do I look up a player's tiers?", a: "Use the search bar at the top of the page to type a player's username and view their full profile modal." },
                { q: "What is the AvernyeTiers server IP?", a: "The server IP is mctiers.network for Java version 1.21 - 26.3 and Bedrock port 19132." },
                { q: "Does AvernyeTiers run events?", a: "Yes! We regularly host community-wide tournaments, FFA nights, and special seasonal brackets." }
              ].map((faq, idx) => (
                <div key={idx} className="border border-zinc-800 rounded-2xl overflow-hidden bg-black/20">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between font-bold text-xs text-white hover:bg-zinc-800/40 transition cursor-pointer"
                  >
                    <span>0{idx + 1}. {faq.q}</span>
                    {openFaq === idx ? <Minus className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-zinc-500" />}
                  </button>
                  {openFaq === idx && (
                    <div className="p-4 pt-0 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ВКЛАДКА: RANKINGS */}
      {activeTab === "rankings" && (
        <div className={`w-full max-w-[1720px] ${themeStyles.cardBg} border ${themeStyles.border} rounded-2xl shadow-xl overflow-hidden mb-3`}>
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

          <div className="p-3 pt-4">
            {selectedMode === "overall" ? (
              <RankingTable players={rankedPlayers} selectedMode={selectedMode} />
            ) : (
              <KitTier selectedKit={selectedMode} />
            )}
          </div>
        </div>
      )}

      {/* ВКЛАДКА: SERVER IP */}
      {activeTab === "server-ip" && (
        <div className={`w-full max-w-[1720px] ${themeStyles.cardBg} border ${themeStyles.border} p-10 rounded-3xl shadow-xl flex flex-col gap-8`}>
          <div>
            <div className="text-amber-500 font-bold text-xs uppercase tracking-wider mb-2">Minecraft Server</div>
            <h1 className="text-4xl font-black text-white mb-4">AvernyeTiers Server IP</h1>
            <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
              The AvernyeTiers Minecraft server IP is <span className="text-white font-bold">mctiers.network</span>. Java players can join on any version from 1.21 - 26.3, and Bedrock players can join on port 19132.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={copyServerIp}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3.5 rounded-xl transition text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>{copiedIp ? "Copied!" : "mctiers.network"}</span>
              <Server className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <div className="bg-black/30 border border-zinc-800 p-6 rounded-2xl">
              <div className="text-xs text-zinc-500 font-semibold mb-1">SERVER ADDRESS</div>
              <div className="text-white font-bold text-base">mctiers.network</div>
            </div>
            <div className="bg-black/30 border border-zinc-800 p-6 rounded-2xl">
              <div className="text-xs text-zinc-500 font-semibold mb-1">JAVA EDITION</div>
              <div className="text-white font-bold text-base">1.21 - 26.3</div>
            </div>
            <div className="bg-black/30 border border-zinc-800 p-6 rounded-2xl">
              <div className="text-xs text-zinc-500 font-semibold mb-1">BEDROCK EDITION</div>
              <div className="text-white font-bold text-base">Port 19132</div>
            </div>
          </div>
        </div>
      )}

      {/* ВКЛАДКА: EVENTS */}
      {activeTab === "events" && (
        <div className={`w-full max-w-[1720px] ${themeStyles.cardBg} border ${themeStyles.border} p-10 rounded-3xl shadow-xl flex flex-col gap-6`}>
          <div>
            <div className="text-amber-500 font-bold text-xs uppercase tracking-wider mb-2">Tournaments & Battles</div>
            <h1 className="text-4xl font-black text-white mb-2">Upcoming Events</h1>
            <p className="text-zinc-400 text-sm">Participate in community tournaments and win exclusive points.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[
              { date: "OCT 23", title: "Sword FFA Night", desc: "Up to 100 players, one arena and Sword kits only. Last player standing wins." },
              { date: "NOV 1", title: "Mace Halloween Bash", desc: "A Halloween-themed Mace bracket on a spooky arena. Double elimination." },
              { date: "NOV 7", title: "UHC Duos Showdown", desc: "Grab a partner for 2v2 UHC. 32 teams, best-of-3 matches." },
            ].map((ev, idx) => (
              <div key={idx} className="bg-black/30 border border-zinc-800 hover:border-amber-500/40 p-6 rounded-2xl flex flex-col justify-between gap-6 transition">
                <div>
                  <div className="text-xs font-black text-amber-500 mb-2">{ev.date}</div>
                  <div className="text-lg font-bold text-white mb-2">{ev.title}</div>
                  <div className="text-xs text-zinc-400 leading-relaxed">{ev.desc}</div>
                </div>
                <div className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                  <span>Register soon</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <PlayerModal player={selectedPlayer} isOpen={!!selectedPlayer} onClose={() => setSelectedPlayer(null)} />

      {/* Модальное окно Information */}
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
