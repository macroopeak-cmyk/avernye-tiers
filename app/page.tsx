"use client"

import { useState, useEffect, KeyboardEvent } from "react"
import { INITIAL_PLAYERS, calculatePlayerPoints, RankedPlayer, Player } from "@/lib/tiers-data"
import { RankingTable } from "@/components/ranking-table"
import KitTier from "@/components/kit-tier"
import { PlayerModal } from "@/components/player-modal"
import { 
  Info, X, Palette, Search, 
  Home as HomeIcon, Trophy, Disc, ChevronDown, ExternalLink, Server, Calendar, ArrowRight, Plus, Minus, Check
} from "lucide-react"

// Полные переводы для интерфейса
const translations: Record<string, Record<string, string>> = {
  English: {
    home: "Home",
    rankings: "Rankings",
    discords: "Discords",
    serverIp: "Server IP",
    events: "Events",
    searchPlaceholder: "Search player...",
    information: "Information",
    heroTitle: "The Minecraft PvP Tier List",
    heroDesc: "AvernyeTiers is a Minecraft PvP tier list. Players are tested in eight gamemodes, placed in tiers from Tier 1 to Tier 5, and ranked on one overall leaderboard.",
    viewRankings: "View rankings",
    getTierTested: "Get tier tested",
    topPlayers: "TOP PLAYERS",
    fullLeaderboard: "Full leaderboard",
    online: "Online",
    gamemodes: "Gamemodes",
    getTierTestedTitle: "Get tier tested",
    getTierTestedDesc: "Tier tests happen in-game on avernye.wellduck.org. Queue for a gamemode, fight one of our testers and get your tier.",
    tiersAndPoints: "Tiers and points",
    tiersAndPointsDesc: "Each gamemode ranks players in five tiers, split into High and Low.",
    titles: "Titles",
    titlesDesc: "Your title follows your total points across every gamemode.",
    faqTitle: "Frequently asked questions",
    faqDesc: "Quick answers about tiers, tier tests, points and the AvernyeTiers server.",
    upcomingEvents: "Upcoming events",
    allEvents: "All events",
    serverAddress: "SERVER ADDRESS",
    javaEdition: "JAVA EDITION",
    bedrockEdition: "BEDROCK EDITION",
    copied: "Copied!",
    copyIp: "Copy Server IP",
  },
  Русский: {
    home: "Главная",
    rankings: "Рейтинги",
    discords: "Дискорды",
    serverIp: "IP сервера",
    events: "Ивенты",
    searchPlaceholder: "Поиск игрока...",
    information: "Информация",
    heroTitle: "Тир-лист Minecraft PvP",
    heroDesc: "AvernyeTiers ведёт тир-лист по Minecraft PvP. Игроков тестируют в восьми режимах, распределяют по тирам от 1 до 5 и выстраивают в одном общем рейтинге.",
    viewRankings: "Смотреть рейтинги",
    getTierTested: "Пройди тир-тест",
    topPlayers: "ТОП ИГРОКОВ",
    fullLeaderboard: "Полный рейтинг",
    online: "Онлайн",
    gamemodes: "Режимы",
    getTierTestedTitle: "Пройди тир-тест",
    getTierTestedDesc: "Тир-тесты проходят прямо в игре на avernye.wellduck.org. Встань в очередь на режим, сразись с одним из наших тестеров и получи свой тир.",
    tiersAndPoints: "Тиры и очки",
    tiersAndPointsDesc: "В каждом режиме пять тиров, и каждый делится на High (высокий) и Low (низкий). Тиры приносят очки, а очки определяют твое место в общем рейтинге.",
    titles: "Титулы",
    titlesDesc: "Твой титул зависит от суммы очков во всех режимах.",
    faqTitle: "Часто задаваемые вопросы",
    faqDesc: "Быстрые ответы о тирах, тестах, очках и сервере AvernyeTiers.",
    upcomingEvents: "Ближайшие ивенты",
    allEvents: "Все ивенты",
    serverAddress: "АДРЕС СЕРВЕРА",
    javaEdition: "JAVA ИЗДАНИЕ",
    bedrockEdition: "BEDROCK ИЗДАНИЕ",
    copied: "Скопировано!",
    copyIp: "IP сервера",
  }
}

const languages = [
  { name: "English", flag: "🇺🇸" },
  { name: "Русский", flag: "🇷🇺" },
  { name: "Español", flag: "🇪🇸" },
  { name: "Português", flag: "🇧🇷" },
  { name: "Français", flag: "🇫🇷" },
  { name: "Deutsch", flag: "🇩🇪" },
  { name: "Polski", flag: "🇵🇱" },
  { name: "Italiano", flag: "🇮🇹" },
  { name: "Nederlands", flag: "🇳🇱" },
  { name: "Türkçe", flag: "🇹🇷" },
  { name: "Čeština", flag: "🇨🇿" },
  { name: "Svenska", flag: "🇸🇪" },
]

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
  
  const [currentLang, setCurrentLang] = useState<string>("Русский")
  const [isLangMenuOpen, setIsLangMenuOpen] = useState<boolean>(false)

  const [theme, setTheme] = useState<"dark" | "midnight" | "sinus" | "light">("dark")
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const t = (key: string) => {
    return translations[currentLang]?.[key] || translations["English"][key] || key
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("combat_tiers_theme") as "dark" | "midnight" | "sinus" | "light"
    if (savedTheme) setTheme(savedTheme)
    const savedLang = localStorage.getItem("avernye_lang")
    if (savedLang && translations[savedLang]) setCurrentLang(savedLang)
  }, [])

  const changeTheme = (newTheme: "dark" | "midnight" | "sinus" | "light") => {
    setTheme(newTheme)
    localStorage.setItem("combat_tiers_theme", newTheme)
    setIsThemeOpen(false)
  }

  const changeLanguage = (langName: string) => {
    setCurrentLang(langName)
    localStorage.setItem("avernye_lang", langName)
    setIsLangMenuOpen(false)
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
    navigator.clipboard.writeText("avernye.wellduck.org")
    setCopiedIp(true)
    setTimeout(() => setCopiedIp(false), 2000)
  }

  // Режимы с правильными иконками из доступных файлов
  const modes = [
    { id: "overall", label: "Overall", icon: "/overall.svg" },
    { id: "Vanilla", label: "Vanilla", icon: "/vanilla.svg" },
    { id: "UHC", label: "UHC", icon: "/uhc.svg" },
    { id: "Pot", label: "Pot", icon: "/pot.svg" },
    { id: "NethOP", label: "NethOP", icon: "/nethop.svg" },
    { id: "SMP", label: "SMP", icon: "/smp.svg" },
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

  const activeLangFlag = languages.find(l => l.name === currentLang)?.flag || "🇷🇺"

  return (
    <main className={`min-h-screen ${themeStyles.bg} ${themeStyles.textColor} flex flex-col items-center py-6 px-6 relative transition-colors duration-300 w-full`}>
      
      {/* Верхняя панель точь-в-точь как на скриншоте 2 */}
      <header className={`w-full max-w-[1720px] flex items-center justify-between ${themeStyles.cardBg} border ${themeStyles.border} px-8 py-4 rounded-2xl shadow-xl mb-8 relative`}>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("home")}>
            <img src="/logo.png" alt="AvernyeTiers Logo" className="h-10 w-auto object-contain scale-105" />
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs text-zinc-300 font-medium">
            <button 
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer ${activeTab === "home" ? "bg-zinc-800/80 text-white font-bold" : "hover:text-white"}`}
            >
              <HomeIcon className="w-4 h-4 text-zinc-400" />
              <span>{t("home")}</span>
            </button>

            <button 
              onClick={() => setActiveTab("rankings")}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer ${activeTab === "rankings" ? "bg-zinc-800/80 text-white font-bold" : "hover:text-white"}`}
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>{t("rankings")}</span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsDiscordMenuOpen(!isDiscordMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:text-white transition-all cursor-pointer"
              >
                <Disc className="w-4 h-4 text-zinc-400" />
                <span>{t("discords")}</span>
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </button>
              {isDiscordMenuOpen && (
                <div className={`absolute left-0 top-full mt-2 w-56 ${themeStyles.cardBg} border ${themeStyles.border} rounded-xl shadow-xl overflow-hidden z-50 p-1.5 flex flex-col gap-1 text-left`}>
                  <a href="https://discord.gg/Y8e2REfz3A" target="_blank" rel="noreferrer" className="w-full px-3 py-2 rounded-lg text-xs hover:bg-zinc-800/60 text-zinc-300 hover:text-white flex items-center justify-between transition-colors">
                    <span className="font-medium">STiers</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </a>
                  <a href="https://discord.gg/YFXEmEC8y2" target="_blank" rel="noreferrer" className="w-full px-3 py-2 rounded-lg text-xs hover:bg-zinc-800/60 text-zinc-300 hover:text-white flex items-center justify-between transition-colors">
                    <span className="font-medium">Avernye</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </a>
                </div>
              )}
            </div>

            <button 
              onClick={() => setActiveTab("server-ip")}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer ${activeTab === "server-ip" ? "bg-zinc-800/80 text-white font-bold" : "hover:text-white"}`}
            >
              <Server className="w-4 h-4 text-zinc-400" />
              <span>{t("serverIp")}</span>
            </button>

            <button 
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer ${activeTab === "events" ? "bg-zinc-800/80 text-white font-bold" : "hover:text-white"}`}
            >
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span>{t("events")}</span>
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          
          {/* Выбор языка слева от поиска */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-200 cursor-pointer transition"
            >
              <span className="text-base">{activeLangFlag}</span>
            </button>

            {isLangMenuOpen && (
              <div className={`absolute right-0 top-full mt-2 w-72 ${themeStyles.cardBg} border ${themeStyles.border} rounded-2xl shadow-2xl overflow-hidden z-50 p-3 grid grid-cols-2 gap-1.5`}>
                <div className="col-span-2 text-[10px] font-bold text-zinc-500 uppercase px-2 pb-1 tracking-wider">
                  Язык / Language
                </div>
                {languages.map((lang) => {
                  const isSelected = currentLang === lang.name
                  return (
                    <button
                      key={lang.name}
                      onClick={() => changeLanguage(lang.name)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition ${
                        isSelected ? "bg-zinc-800 text-white border border-zinc-700 shadow-sm" : "hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="w-64 relative">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
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
            {errorText && <span className="absolute -bottom-4 left-1 text-[10px] text-red-400 font-medium">{errorText}</span>}
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
              <span>{t("information")}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ВКЛАДКА: HOME */}
      {activeTab === "home" && (
        <div className="w-full max-w-[1720px] flex flex-col gap-8">
          
          {/* Скриншоты 3, 4: Герой и топ игроков с китами */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className={`lg:col-span-5 ${themeStyles.cardBg} border ${themeStyles.border} p-10 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden`}>
              <div>
                <img src="/logo.png" alt="Logo" className="h-14 w-auto object-contain mb-6" />
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-4 text-white">
                  {t("heroTitle")}
                </h1>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  {t("heroDesc")}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setActiveTab("rankings")}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-5 py-3 rounded-xl transition shadow-lg shadow-amber-500/20 text-xs cursor-pointer"
                >
                  <span>{t("viewRankings")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={copyServerIp}
                  className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-5 py-3 rounded-xl transition text-xs border border-zinc-700 cursor-pointer"
                >
                  <span>{t("getTierTested")}</span>
                </button>
              </div>
            </div>

            <div className={`lg:col-span-7 ${themeStyles.cardBg} border ${themeStyles.border} p-6 rounded-3xl shadow-xl flex flex-col gap-4`}>
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-500 tracking-wider uppercase">
                  <Trophy className="w-4 h-4" />
                  <span>{t("topPlayers")}</span>
                </div>
                <button 
                  onClick={() => setActiveTab("rankings")}
                  className="text-xs text-zinc-400 hover:text-white transition flex items-center gap-1 cursor-pointer font-medium"
                >
                  <span>{t("fullLeaderboard")}</span>
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
                          {player.staffRole || "Combat Master"} ({player.points} очк.)
                        </div>
                        {/* Маленькие иконки китов под именем как на скриншоте 3 */}
                        <div className="flex items-center gap-1.5 mt-1.5">
                          {modes.filter(m => m.id !== "overall").slice(0, 7).map((m, idx) => (
                            <span key={idx} className="flex items-center gap-0.5 bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded text-[9px] text-amber-400 font-bold">
                              <img src={m.icon} alt={m.label} className="w-2.5 h-2.5 object-contain" />
                              <span>HT1</span>
                            </span>
                          ))}
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

          {/* Статус сервера (Скриншот 5) */}
          <div className={`w-full ${themeStyles.cardBg} border ${themeStyles.border} p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4`}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">{t("online")}</span>
                  <span className="text-xs text-zinc-500">• 2,583 / 10,000 players online</span>
                </div>
                <div className="text-base font-extrabold text-white mt-0.5">avernye.wellduck.org</div>
              </div>
            </div>
            <button 
              onClick={copyServerIp}
              className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold px-5 py-3 rounded-xl transition cursor-pointer flex items-center gap-2"
            >
              <span>{copiedIp ? t("copied") : t("copyIp")}</span>
              <Server className="w-4 h-4" />
            </button>
          </div>

          {/* Режимы (Скриншот 5) */}
          <div>
            <div className="text-lg font-bold text-white mb-4">{t("gamemodes")}</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
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

          {/* 5 Шагов тир-теста (Скриншот 5, 6) */}
          <div className={`${themeStyles.cardBg} border ${themeStyles.border} p-8 rounded-3xl shadow-xl`}>
            <div className="text-2xl font-black text-white mb-2">{t("getTierTestedTitle")}</div>
            <p className="text-xs text-zinc-400 mb-8">{t("getTierTestedDesc")}</p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { step: "1", title: "Заходи на avernye.wellduck.org", desc: "с Java (1.21 - 26.3) или Bedrock." },
                { step: "2", title: "Введи /tiertest", desc: "и выбери режим, в котором хочешь пройти тест." },
                { step: "3", title: "Выбери свой регион", desc: "чтобы встать в очередь на тест по этому режиму." },
                { step: "4", title: "Приватная арена", desc: "Когда тестер из твоего региона освободится, тебя перенесёт на приватную арену с официальным китом." },
                { step: "5", title: "Сразись с тестером", desc: "После теста новый тир появится в твоём профиле AvernyeTiers." },
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

          {/* Тиры и очки / Титулы (Скриншот 6) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${themeStyles.cardBg} border ${themeStyles.border} p-6 rounded-3xl shadow-xl`}>
              <div className="text-lg font-bold text-white mb-1">{t("tiersAndPoints")}</div>
              <p className="text-xs text-zinc-400 mb-6">{t("tiersAndPointsDesc")}</p>
              
              <div className="space-y-3">
                {[
                  { tier: "Тир 1", points: "HT1 · 60 очк.", lt: "LT1 · 45 очк.", bg: "bg-amber-950/40 border-amber-900/50" },
                  { tier: "Тир 2", points: "HT2 · 30 очк.", lt: "LT2 · 20 очк.", bg: "bg-zinc-900 border-zinc-800" },
                  { tier: "Тир 3", points: "HT3 · 10 очк.", lt: "LT3 · 6 очк.", bg: "bg-amber-900/20 border-amber-900/30" },
                  { tier: "Тир 4", points: "HT4 · 4 очк.", lt: "LT4 · 3 очк.", bg: "bg-black/30 border-zinc-800" },
                  { tier: "Тир 5", points: "HT5 · 2 очк.", lt: "LT5 · 1 очк.", bg: "bg-black/30 border-zinc-800" },
                ].map((tItem, idx) => (
                  <div key={idx} className={`p-3.5 rounded-2xl border ${tItem.bg} flex items-center justify-between`}>
                    <span className="font-bold text-white text-xs">{tItem.tier}</span>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-semibold bg-black/40 px-2 py-1 rounded-lg text-amber-400 border border-white/5">{tItem.points}</span>
                      <span className="text-[10px] font-semibold bg-black/40 px-2 py-1 rounded-lg text-zinc-300 border border-white/5">{tItem.lt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${themeStyles.cardBg} border ${themeStyles.border} p-6 rounded-3xl shadow-xl`}>
              <div className="text-lg font-bold text-white mb-1">{t("titles")}</div>
              <p className="text-xs text-zinc-400 mb-6">{t("titlesDesc")}</p>

              <div className="space-y-3">
                {[
                  { title: "Combat Grandmaster", req: "400+ очков", color: "text-amber-400" },
                  { title: "Combat Master", req: "250+ очков", color: "text-amber-400" },
                  { title: "Combat Ace", req: "100+ очков", color: "text-rose-400" },
                  { title: "Combat Specialist", req: "50+ очков", color: "text-purple-300" },
                  { title: "Combat Cadet", req: "20+ очков", color: "text-purple-300" },
                  { title: "Rookie", req: "Меньше 10 очков", color: "text-zinc-400" },
                ].map((ti, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl border border-zinc-800/80 bg-black/30 flex items-center justify-between">
                    <span className={`font-bold text-xs ${ti.color}`}>{ti.title}</span>
                    <span className="text-xs text-zinc-400 font-medium">{ti.req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ближайшие ивенты */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold text-white">{t("upcomingEvents")}</div>
              <button onClick={() => setActiveTab("events")} className="text-xs text-zinc-400 hover:text-white transition flex items-center gap-1 cursor-pointer">
                <span>{t("allEvents")}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { date: "ОКТ.", title: "Sword FFA Night", desc: "До 100 игроков, одна арена и киты только с мечом. Последний выживший побеждает." },
                { date: "НОЯБ.", title: "Mace Halloween Bash", desc: "Хэллоуинский турнир с булавой на жуткой арене. Двойное выбывание." },
                { date: "НОЯБ.", title: "UHC Duos Showdown", desc: "Найдите напарника для 2v2 UHC. 32 команды, матчи до двух побед." },
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
                      isActive ? "bg-[#161f30] border-amber-500/80 text-white shadow-sm ring-1 ring-amber-500/30 rounded-t-2xl -mt-2 pt-5" : "border-transparent hover:bg-zinc-800/40 text-zinc-400 hover:text-zinc-200 rounded-t-xl"
                    }`}
                  >
                    <img src={mode.icon} alt={mode.label} className={`w-5 h-5 object-contain ${isActive ? "opacity-100 filter drop-shadow(0 0 5px rgba(245,158,11,0.5))" : "opacity-50"}`} />
                    <span className={`text-[11px] font-medium tracking-wide ${isActive ? "text-amber-400 font-bold" : ""}`}>{mode.label}</span>
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
            <h1 className="text-4xl font-black text-white mb-4">avernye.wellduck.org Server IP</h1>
            <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
              IP-адрес сервера AvernyeTiers — <span className="text-white font-bold">avernye.wellduck.org</span>. Игроки Java могут зайти с версий 1.21 - 26.3, а Bedrock игроки через порт 19132.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={copyServerIp}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3.5 rounded-xl transition text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>{copiedIp ? t("copied") : "avernye.wellduck.org"}</span>
              <Server className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <div className="bg-black/30 border border-zinc-800 p-6 rounded-2xl">
              <div className="text-xs text-zinc-500 font-semibold mb-1">{t("serverAddress")}</div>
              <div className="text-white font-bold text-base">avernye.wellduck.org</div>
            </div>
            <div className="bg-black/30 border border-zinc-800 p-6 rounded-2xl">
              <div className="text-xs text-zinc-500 font-semibold mb-1">{t("javaEdition")}</div>
              <div className="text-white font-bold text-base">1.21 - 26.3</div>
            </div>
            <div className="bg-black/30 border border-zinc-800 p-6 rounded-2xl">
              <div className="text-xs text-zinc-500 font-semibold mb-1">{t("bedrockEdition")}</div>
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
            <h1 className="text-4xl font-black text-white mb-2">{t("upcomingEvents")}</h1>
            <p className="text-zinc-400 text-sm">Участвуйте в турнирах сообщества и зарабатывайте эксклюзивные очки.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[
              { date: "ОКТ.", title: "Sword FFA Night", desc: "До 100 игроков, одна арена и киты только с мечом." },
              { date: "НОЯБ.", title: "Mace Halloween Bash", desc: "Хэллоуинский турнир с булавой на жуткой арене." },
              { date: "НОЯБ.", title: "UHC Duos Showdown", desc: "Командный турнир 2v2 UHC. Матчи до двух побед." },
            ].map((ev, idx) => (
              <div key={idx} className="bg-black/30 border border-zinc-800 hover:border-amber-500/40 p-6 rounded-2xl flex flex-col justify-between gap-6 transition">
                <div>
                  <div className="text-xs font-black text-amber-500 mb-2">{ev.date}</div>
                  <div className="text-lg font-bold text-white mb-2">{ev.title}</div>
                  <div className="text-xs text-zinc-400 leading-relaxed">{ev.desc}</div>
                </div>
                <div className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                  <span>Регистрация скоро</span>
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
              <button onClick={() => setInfoTab("titles")} className={`flex-1 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${infoTab === "titles" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"}`}>Титулы</button>
              <button onClick={() => setInfoTab("points")} className={`flex-1 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${infoTab === "points" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"}`}>Очки</button>
            </div>

            {infoTab === "titles" ? (
              <div className="space-y-4">
                <div className="text-sm font-bold text-zinc-200 mb-2">Как получить наградные титулы</div>
                <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
                  <div className={`flex items-start gap-3 p-3 rounded-xl border ${themeStyles.border} bg-black/20`}>
                    <img src="/combat_grandmaster.webp" alt="Grandmaster" className="w-8 h-8 object-contain shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-amber-400 text-sm">Combat Grandmaster</div>
                      <div className="text-xs text-zinc-400 mt-0.5">400+ общих очков.</div>
                    </div>
                  </div>
                  <div className={`flex items-start gap-3 p-3 rounded-xl border ${themeStyles.border} bg-black/20`}>
                    <img src="/combat_ace.webp" alt="Ace" className="w-8 h-8 object-contain shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-rose-400 text-sm">Combat Ace</div>
                      <div className="text-xs text-zinc-400 mt-0.5">100+ общих очков.</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm font-bold text-zinc-200 mb-3">Как рассчитываются очки рейтинга</div>
                <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1 text-xs text-zinc-400">
                  <p>Каждый тир в режимах дает определенное количество очков, которые суммируются в общий рейтинг игрока.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
