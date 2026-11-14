"use client"

import { useState, useEffect, KeyboardEvent } from "react"
import { INITIAL_PLAYERS, calculatePlayerPoints, getPlayerTitle, RankedPlayer, Player } from "@/lib/tiers-data"
import { RankingTable } from "@/components/ranking-table"
import KitTier from "@/components/kit-tier"
import { PlayerModal } from "@/components/player-modal"
import { PlayerBody } from "@/components/player-body"
import { 
  Info, X, Palette, Search, 
  Home as HomeIcon, Trophy, Disc, ChevronDown, ExternalLink, Server, Calendar, ArrowRight, Check
} from "lucide-react"

// Полные переводы для всех языков
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
    heroDesc: "IncTiers is a Minecraft PvP tier list. Players are tested in eight gamemodes, placed in tiers from Tier 1 to Tier 5, and ranked on one overall leaderboard.",
    viewRankings: "View rankings",
    getTierTested: "Get tier tested",
    topPlayers: "TOP PLAYERS",
    fullLeaderboard: "Full leaderboard",
    online: "Online",
    gamemodes: "Gamemodes",
    getTierTestedTitle: "Get tier tested",
    getTierTestedDesc: "Tier tests happen in-game on IncorrectSMP.play.ski. Queue for a gamemode, fight one of our testers and get your tier.",
    tiersAndPoints: "Tiers and points",
    tiersAndPointsDesc: "Each gamemode ranks players in five tiers, split into High and Low.",
    titles: "Titles",
    titlesDesc: "Your title follows your total points across every gamemode.",
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
    heroDesc: "IncTiers ведёт тир-лист по Minecraft PvP. Игроков тестируют в режимах, распределяют по тирам от 1 до 5 и выстраивают в одном общем рейтинге.",
    viewRankings: "Смотреть рейтинги",
    getTierTested: "Пройди тир-тест",
    topPlayers: "ТОП ИГРОКОВ",
    fullLeaderboard: "Полный рейтинг",
    online: "Онлайн",
    gamemodes: "Режимы",
    getTierTestedTitle: "Пройди тир-тест",
    getTierTestedDesc: "Тир-тесты проходят прямо в игре на IncorrectSMP.play.ski. Встань в очередь на режим, сразись с одним из тестеров и получи свой тир.",
    tiersAndPoints: "Тиры и очки",
    tiersAndPointsDesc: "В каждом режиме пять тиров, и каждый делится на High (высокий) и Low (низкий). Тиры приносят очки, а очки определяют твое место в рейтинге.",
    titles: "Титулы",
    titlesDesc: "Твой титул зависит от суммы очков во всех режимах.",
    upcomingEvents: "Ближайшие ивенты",
    allEvents: "Все ивенты",
    serverAddress: "АДРЕС СЕРВЕРА",
    javaEdition: "JAVA ИЗДАНИЕ",
    bedrockEdition: "BEDROCK ИЗДАНИЕ",
    copied: "Скопировано!",
    copyIp: "IP сервера",
  },
  Español: {
    home: "Inicio",
    rankings: "Clasificación",
    discords: "Discords",
    serverIp: "IP del Servidor",
    events: "Eventos",
    searchPlaceholder: "Buscar jugador...",
    information: "Información",
    heroTitle: "La lista de niveles de PvP de Minecraft",
    heroDesc: "IncTiers es una lista de niveles de PvP en Minecraft. Los jugadores son evaluados en ocho modos de juego, colocados en niveles del 1 al 5.",
    viewRankings: "Ver clasificación",
    getTierTested: "Obtener nivel",
    topPlayers: "MEJORES JUGADORES",
    fullLeaderboard: "Tabla completa",
    online: "En línea",
    gamemodes: "Modos de juego",
    getTierTestedTitle: "Obtener prueba de nivel",
    getTierTestedDesc: "Las pruebas ocurren en IncorrectSMP.play.ski.",
    tiersAndPoints: "Niveles y puntos",
    tiersAndPointsDesc: "Cada modo clasifica a los jugadores en cinco niveles.",
    titles: "Títulos",
    titlesDesc: "Tu título sigue tus puntos totales.",
    upcomingEvents: "Próximos eventos",
    allEvents: "Todos los eventos",
    serverAddress: "DIRECCIÓN DEL SERVIDOR",
    javaEdition: "EDICIÓN JAVA",
    bedrockEdition: "EDICIÓN BEDROCK",
    copied: "¡Copiado!",
    copyIp: "Copiar IP",
  },
  Português: {
    home: "Início",
    rankings: "Classificação",
    discords: "Discords",
    serverIp: "IP do Servidor",
    events: "Eventos",
    searchPlaceholder: "Pesquisar jogador...",
    information: "Informações",
    heroTitle: "A Tier List de PvP do Minecraft",
    heroDesc: "IncTiers é uma tier list de PvP do Minecraft. Jogadores são testados em oito modos.",
    viewRankings: "Ver rankings",
    getTierTested: "Ser testado",
    topPlayers: "MELHORES JOGADORES",
    fullLeaderboard: "Leaderboard completa",
    online: "Online",
    gamemodes: "Modos de jogo",
    getTierTestedTitle: "Fazer teste de tier",
    getTierTestedDesc: "Testes acontecem em IncorrectSMP.play.ski.",
    tiersAndPoints: "Tiers e pontos",
    tiersAndPointsDesc: "Cada modo classifica em cinco tiers.",
    titles: "Títulos",
    titlesDesc: "Seu título acompanha seus pontos totais.",
    upcomingEvents: "Próximos eventos",
    allEvents: "Todos os eventos",
    serverAddress: "ENDEREÇO DO SERVIDOR",
    javaEdition: "EDIÇÃO JAVA",
    bedrockEdition: "EDIÇÃO BEDROCK",
    copied: "Copiado!",
    copyIp: "Copiar IP",
  },
  Français: {
    home: "Accueil",
    rankings: "Classements",
    discords: "Discords",
    serverIp: "IP du serveur",
    events: "Événements",
    searchPlaceholder: "Rechercher un joueur...",
    information: "Information",
    heroTitle: "La Tier List PvP Minecraft",
    heroDesc: "IncTiers est une tier list PvP Minecraft. Les joueurs sont testés dans huit modes.",
    viewRankings: "Voir les classements",
    getTierTested: "Passer un test",
    topPlayers: "MEILLEURS JOUEURS",
    fullLeaderboard: "Classement complet",
    online: "En ligne",
    gamemodes: "Modes de jeu",
    getTierTestedTitle: "Passer un test de tier",
    getTierTestedDesc: "Les tests ont lieu sur IncorrectSMP.play.ski.",
    tiersAndPoints: "Tiers et points",
    tiersAndPointsDesc: "Chaque mode classe les joueurs en cinq tiers.",
    titles: "Titres",
    titlesDesc: "Votre titre dépend de vos points totaux.",
    upcomingEvents: "Événements à venir",
    allEvents: "Tous les événements",
    serverAddress: "ADRESSE DU SERVEUR",
    javaEdition: "ÉDITION JAVA",
    bedrockEdition: "ÉDITION BEDROCK",
    copied: "Copié !",
    copyIp: "Copier l'IP",
  },
  Deutsch: {
    home: "Startseite",
    rankings: "Rangliste",
    discords: "Discords",
    serverIp: "Server-IP",
    events: "Events",
    searchPlaceholder: "Spieler suchen...",
    information: "Informationen",
    heroTitle: "Die Minecraft PvP Tier List",
    heroDesc: "IncTiers ist eine Minecraft PvP Tier List.",
    viewRankings: "Rangliste ansehen",
    getTierTested: "Testen lassen",
    topPlayers: "TOP-SPIELER",
    fullLeaderboard: "Komplette Bestenliste",
    online: "Online",
    gamemodes: "Spielmodi",
    getTierTestedTitle: "Tier-Test machen",
    getTierTestedDesc: "Tests finden auf IncorrectSMP.play.ski statt.",
    tiersAndPoints: "Tiers und Punkte",
    tiersAndPointsDesc: "Jeder Modus ordnet Spieler in fünf Tiers ein.",
    titles: "Titel",
    titlesDesc: "Dein Titel basiert auf deinen Gesamtpunkten.",
    upcomingEvents: "Kommende Events",
    allEvents: "Alle Events",
    serverAddress: "SERVER-ADRESSE",
    javaEdition: "JAVA EDITION",
    bedrockEdition: "BEDROCK EDITION",
    copied: "Kopiert!",
    copyIp: "Server-IP kopieren",
  },
  Polski: {
    home: "Strona główna",
    rankings: "Rankingi",
    discords: "Discords",
    serverIp: "IP serwera",
    events: "Wydarzenia",
    searchPlaceholder: "Szukaj gracza...",
    information: "Informacje",
    heroTitle: "Lista poziomów PvP w Minecraft",
    heroDesc: "IncTiers to lista poziomów PvP w Minecraft.",
    viewRankings: "Zobacz rankingi",
    getTierTested: "Zdobądź poziom",
    topPlayers: "NAJLEPSI GRACZE",
    fullLeaderboard: "Pełny ranking",
    online: "Online",
    gamemodes: "Tryby gry",
    getTierTestedTitle: "Przetestuj swój poziom",
    getTierTestedDesc: "Testy odbywają się na IncorrectSMP.play.ski.",
    tiersAndPoints: "Poziomy i punkty",
    tiersAndPointsDesc: "Każdy tryb dzieli graczy na pięć poziomów.",
    titles: "Tytuły",
    titlesDesc: "Twój tytuł zależy od łącznej liczby punktów.",
    upcomingEvents: "Nadchodzące wydarzenia",
    allEvents: "Wszystkie wydarzenia",
    serverAddress: "ADRES SERWERA",
    javaEdition: "WERSJA JAVA",
    bedrockEdition: "WERSJA BEDROCK",
    copied: "Skopiowano!",
    copyIp: "Kopiuj IP",
  },
  Italiano: {
    home: "Home",
    rankings: "Classifiche",
    discords: "Discords",
    serverIp: "IP Server",
    events: "Eventi",
    searchPlaceholder: "Cerca giocatore...",
    information: "Informazioni",
    heroTitle: "La Tier List PvP di Minecraft",
    heroDesc: "IncTiers è una tier list PvP di Minecraft.",
    viewRankings: "Vedi classifiche",
    getTierTested: "Ottieni tier",
    topPlayers: "MIGLIORI GIOCATORI",
    fullLeaderboard: "Classifica completa",
    online: "Online",
    gamemodes: "Modalità di gioco",
    getTierTestedTitle: "Ottieni un test",
    getTierTestedDesc: "I test avvengono su IncorrectSMP.play.ski.",
    tiersAndPoints: "Tier e punti",
    tiersAndPointsDesc: "Ogni modalità classifica in cinque tier.",
    titles: "Titoli",
    titlesDesc: "Il tuo titolo dipende dai punti totali.",
    upcomingEvents: "Prossimi eventi",
    allEvents: "Tutti gli eventi",
    serverAddress: "INDIRIZZO SERVER",
    javaEdition: "EDIZIONE JAVA",
    bedrockEdition: "EDIZIONE BEDROCK",
    copied: "Copiato!",
    copyIp: "Copia IP",
  },
  Nederlands: {
    home: "Home",
    rankings: "Ranglijst",
    discords: "Discords",
    serverIp: "Server IP",
    events: "Evenementen",
    searchPlaceholder: "Zoek speler...",
    information: "Informatie",
    heroTitle: "De Minecraft PvP Tierlijst",
    heroDesc: "IncTiers is een Minecraft PvP tierlijst.",
    viewRankings: "Bekijk ranglijst",
    getTierTested: "Test aanvragen",
    topPlayers: "TOPSPELERS",
    fullLeaderboard: "Volledige leaderboard",
    online: "Online",
    gamemodes: "Spelmodi",
    getTierTestedTitle: "Word getest",
    getTierTestedDesc: "Tests vinden plaats op IncorrectSMP.play.ski.",
    tiersAndPoints: "Tiers en punten",
    tiersAndPointsDesc: "Elke modus rangschikt in vijf tiers.",
    titles: "Titels",
    titlesDesc: "Je titel volgt je totale punten.",
    upcomingEvents: "Aankomende evenementen",
    allEvents: "Alle evenementen",
    serverAddress: "SERVERADRES",
    javaEdition: "JAVA EDITIE",
    bedrockEdition: "BEDROCK EDITIE",
    copied: "Gekopieerd!",
    copyIp: "Kopieer IP",
  },
  Türkçe: {
    home: "Ana Sayfa",
    rankings: "Sıralama",
    discords: "Discordlar",
    serverIp: "Sunucu IP",
    events: "Etkinlikler",
    searchPlaceholder: "Oyuncu ara...",
    information: "Bilgi",
    heroTitle: "Minecraft PvP Seviye Listesi",
    heroDesc: "IncTiers bir Minecraft PvP tier listesidir.",
    viewRankings: "Sıralamaları gör",
    getTierTested: "Test ol",
    topPlayers: "EN İYİ OYUNCULAR",
    fullLeaderboard: "Tam sıralama",
    online: "Çevrimiçi",
    gamemodes: "Oyun Modları",
    getTierTestedTitle: "Seviye testi ol",
    getTierTestedDesc: "Testler IncorrectSMP.play.ski üzerinde yapılır.",
    tiersAndPoints: "Seviyeler и Puanlar",
    tiersAndPointsDesc: "Her mod oyuncuları beş seviyeye ayırır.",
    titles: "Unvanlar",
    titlesDesc: "Unvanınız toplam puanınıza göre belirlenir.",
    upcomingEvents: "Yaklaşan etkinlikler",
    allEvents: "Tüm etkinlikler",
    serverAddress: "SUNUCU ADRESİ",
    javaEdition: "JAVA SÜRÜMÜ",
    bedrockEdition: "BEDROCK SÜRÜMÜ",
    copied: "Kopyalandı!",
    copyIp: "IP'yi Kopyala",
  },
  Čeština: {
    home: "Domů",
    rankings: "Žebříček",
    discords: "Discords",
    serverIp: "IP serveru",
    events: "Události",
    searchPlaceholder: "Hledat hráče...",
    information: "Informace",
    heroTitle: "Minecraft PvP Tier List",
    heroDesc: "IncTiers je Minecraft PvP tier list.",
    viewRankings: "Zobrazit žebříček",
    getTierTested: "Získat tier",
    topPlayers: "NEJLEPŠÍ HRÁČI",
    fullLeaderboard: "Celý žebříček",
    online: "Online",
    gamemodes: "Herní módy",
    getTierTestedTitle: "Získat tier test",
    getTierTestedDesc: "Testy probíhají na IncorrectSMP.play.ski.",
    tiersAndPoints: "Tiers a body",
    tiersAndPointsDesc: "Každý mód řadí hráče do pěti tierů.",
    titles: "Tituly",
    titlesDesc: "Tvůj titul závisí na celkových bodech.",
    upcomingEvents: "Nadcházející události",
    allEvents: "Všechny události",
    serverAddress: "ADRESA SERVERU",
    javaEdition: "JAVA EDICE",
    bedrockEdition: "BEDROCK EDICE",
    copied: "Zkopírováno!",
    copyIp: "Kopírovat IP",
  },
  Svenska: {
    home: "Hem",
    rankings: "Ranking",
    discords: "Discords",
    serverIp: "Server-IP",
    events: "Evenemang",
    searchPlaceholder: "Sök spelare...",
    information: "Information",
    heroTitle: "Minecraft PvP Tier List",
    heroDesc: "IncTiers är en Minecraft PvP tier list.",
    viewRankings: "Visa ranking",
    getTierTested: "Testa tier",
    topPlayers: "TOPPSPELARE",
    fullLeaderboard: "Fullständig ranking",
    online: "Online",
    gamemodes: "Spellägen",
    getTierTestedTitle: "Få tier-test",
    getTierTestedDesc: "Tester sker på IncorrectSMP.play.ski.",
    tiersAndPoints: "Tiers och poäng",
    tiersAndPointsDesc: "Varje läge rankar spelare i fem tiers.",
    titles: "Titlar",
    titlesDesc: "Din titel beror på dina totala poäng.",
    upcomingEvents: "Kommende evenemang",
    allEvents: "Alla evenemang",
    serverAddress: "SERVERADRESS",
    javaEdition: "JAVA-UTGÅVA",
    bedrockEdition: "BEDROCK-UTGÅVA",
    copied: "Kopierad!",
    copyIp: "Kopiera IP",
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

  const t = (key: string) => {
    return translations[currentLang]?.[key] || translations["English"][key] || key
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("combat_tiers_theme") as "dark" | "midnight" | "sinus" | "light"
    if (savedTheme) setTheme(savedTheme)
    const savedLang = localStorage.getItem("Incorrect_lang")
    if (savedLang && translations[savedLang]) setCurrentLang(savedLang)
  }, [])

  const changeTheme = (newTheme: "dark" | "midnight" | "sinus" | "light") => {
    setTheme(newTheme)
    localStorage.setItem("combat_tiers_theme", newTheme)
    setIsThemeOpen(false)
  }

  const changeLanguage = (langName: string) => {
    setCurrentLang(langName)
    localStorage.setItem("Incorrect_lang", langName)
    setIsLangMenuOpen(false)
  }

  // Расчет очков и ранжирование игроков
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
    navigator.clipboard.writeText("IncorrectSMP.play.ski")
    setCopiedIp(true)
    setTimeout(() => setCopiedIp(false), 2000)
  }

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

  const modeIconMap: Record<string, string> = {
    Vanilla: "/vanilla.svg",
    UHC: "/uhc.svg",
    Pot: "/pot.svg",
    NethOP: "/nethop.svg",
    SMP: "/smp.svg",
    Sword: "/sword.svg",
    Axe: "/axe.svg",
    Mace: "/mace.svg",
  }

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
      
      {/* Верхняя панель */}
      <header className={`w-full max-w-[1720px] flex items-center justify-between ${themeStyles.cardBg} border ${themeStyles.border} px-8 py-4 rounded-2xl shadow-xl mb-8 relative`}>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("home")}>
            <img src="/logo.png" alt="IncTiers Logo" className="h-10 w-auto object-contain scale-105" />
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
                    <span className="font-medium"></span>
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
          {/* Выбор языка */}
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
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Левый блок с описанием и кнопками */}
            <div className={`lg:col-span-5 ${themeStyles.cardBg} border ${themeStyles.border} p-10 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden`}>
              <div>
                <img src="/logo.png" alt="IncTiers Logo" className="h-14 w-auto object-contain mb-6" />
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
                  className="flex items-center gap-2 bg-[#f4f4f5] hover:bg-white text-black font-bold px-5 py-3 rounded-xl transition text-xs cursor-pointer shadow-md"
                >
                  <span>{t("viewRankings")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={copyServerIp}
                  className="flex items-center gap-2 bg-[#181d28] hover:bg-[#202736] text-white font-medium px-5 py-3 rounded-xl transition text-xs border border-zinc-700/80 cursor-pointer"
                >
                  <span>{t("getTierTested")}</span>
                </button>
              </div>
            </div>

            {/* Правый блок: ТОП ИГРОКОВ */}
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
                {rankedPlayers.slice(0, 3).map((player) => {
                  const rankBg = player.rank === 1 
                    ? "bg-gradient-to-r from-[#eab308] to-[#f59e0b] text-black shadow-lg shadow-amber-500/20" 
                    : player.rank === 2 
                    ? "bg-gradient-to-r from-[#cbd5e1] to-[#94a3b8] text-black" 
                    : "bg-gradient-to-r from-[#d97706] to-[#b45309] text-white"

                  const playerTitleInfo = getPlayerTitle(player.points, player.tiers)

                  return (
                    <div 
                      key={player.id}
                      onClick={() => setSelectedPlayer(player)}
                      className="bg-[#121620] hover:bg-[#181e2b] border border-zinc-800/80 hover:border-amber-500/40 p-3 px-4 rounded-2xl flex items-center justify-between cursor-pointer transition relative overflow-hidden"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-32 h-14 rounded-xl flex items-center justify-between px-3.5 font-black text-lg italic skew-x-[-12deg] ${rankBg} relative overflow-hidden shrink-0 shadow-md`}>
                          <span className="skew-x-[12deg] z-10">{player.rank}.</span>
                          <div className="absolute right-1 -bottom-1 h-16 w-12 skew-x-[12deg] flex items-end justify-center overflow-hidden pointer-events-none">
                            <PlayerBody 
                              username={player.username} 
                              skinUsername={player.skinUsername} 
                              height={60} 
                              className="transform translate-y-1 scale-125"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-white text-base tracking-wide">{player.username}</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 mt-0.5">
                            <span className="inline-block w-2 h-2 rotate-45 bg-amber-500 rounded-sm"></span>
                            <span className="text-amber-300 font-semibold">{playerTitleInfo.title}</span>
                            <span className="text-zinc-500">({player.points} points)</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="hidden xl:flex items-center gap-1.5 bg-[#0b0e14] border border-zinc-800/80 p-1.5 px-2 rounded-xl">
                          {Object.entries(player.tiers).slice(0, 8).map(([kitName, tierVal], idx) => {
                            const iconUrl = modeIconMap[kitName] || "/overall.svg"
                            const rawTier = typeof tierVal === 'string' ? tierVal : (tierVal as any)?.tier || ""
                            const isHt = rawTier.toUpperCase().startsWith("HT")
                            return (
                              <div key={idx} className="flex flex-col items-center justify-center bg-[#151a26] border border-zinc-800 px-2 py-1 rounded-lg shrink-0 gap-0.5">
                                <img src={iconUrl} alt={kitName} className="w-3.5 h-3.5 object-contain opacity-80" />
                                <span className={`text-[10px] font-black ${isHt ? "text-amber-400" : "text-zinc-400"}`}>{rawTier}</span>
                              </div>
                            )
                          })}
                        </div>

                        <div className={`px-3 py-1 rounded-lg text-xs font-black tracking-wider ${
                          player.region === "NA" ? "bg-rose-500/20 text-rose-500 border border-rose-500/30" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        }`}>
                          {player.region}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Информационные карточки: Тиры/Очки и Титулы с иконками */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Карточка: Тиры и очки */}
            <div className={`${themeStyles.cardBg} border ${themeStyles.border} p-6 rounded-3xl shadow-xl flex flex-col justify-between`}>
              <div>
                <div className="text-lg font-bold text-white mb-1">{t("tiersAndPoints")}</div>
                <p className="text-xs text-zinc-400 mb-6">{t("tiersAndPointsDesc")}</p>
              </div>

              <div className="space-y-3">
                {[
                  { tier: "Тир 1", icon: "/tier_1.svg", points: "HT1 · 60 очк.", lt: "LT1 · 45 очк.", bg: "bg-amber-950/40 border-amber-900/50" },
                  { tier: "Тир 2", icon: "/tier_2.svg", points: "HT2 · 30 очк.", lt: "LT2 · 20 очк.", bg: "bg-black/30 border-zinc-800" },
                  { tier: "Тир 3", icon: "/tier_3.svg", points: "HT3 · 10 очк.", lt: "LT3 · 8 очк.", bg: "bg-amber-900/20 border-amber-900/30" },
                  { tier: "Тир 4", icon: "", points: "HT4 · 4 очк.", lt: "LT4 · 3 очк.", bg: "bg-black/30 border-zinc-800" },
                  { tier: "Тир 5", icon: "", points: "HT5 · 2 очк.", lt: "LT5 · 1 очк.", bg: "bg-black/30 border-zinc-800" },
                ].map((item, idx) => (
                  <div key={idx} className={`p-3.5 rounded-2xl border ${item.bg} flex items-center justify-between`}>
                    <div className="flex items-center gap-2.5">
                      {item.icon ? (
                        <img src={item.icon} alt={item.tier} className="w-5 h-5 object-contain" />
                      ) : (
                        <div className="w-5 h-5 flex items-center justify-center font-bold text-xs text-zinc-400">#</div>
                      )}
                      <span className="font-bold text-white text-xs">{item.tier}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-semibold bg-black/40 px-2.5 py-1 rounded-lg text-amber-400 border border-white/5">{item.points}</span>
                      <span className="text-[10px] font-semibold bg-black/40 px-2.5 py-1 rounded-lg text-zinc-300 border border-white/5">{item.lt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Карточка: Титулы */}
            <div className={`${themeStyles.cardBg} border ${themeStyles.border} p-6 rounded-3xl shadow-xl flex flex-col justify-between`}>
              <div>
                <div className="text-lg font-bold text-white mb-1">{t("titles")}</div>
                <p className="text-xs text-zinc-400 mb-6">{t("titlesDesc")}</p>
              </div>

              <div className="space-y-3">
                {[
                  { title: "Combat Grandmaster", icon: "/combat_grandmaster.webp", req: "400+ очков", color: "text-amber-400" },
                  { title: "Combat Master", icon: "/combat_master.webp", req: "250+ очков", color: "text-amber-400" },
                  { title: "Combat Ace", icon: "/combat_ace.webp", req: "100+ очков", color: "text-rose-400" },
                  { title: "Combat Specialist", icon: "/combat_specialist.svg", req: "50+ очков", color: "text-purple-300" },
                  { title: "Combat Cadet", icon: "/combat_cadet.svg", req: "20+ очков", color: "text-purple-300" },
                  { title: "Rookie", icon: "/rookie.svg", req: "Меньше 10 очков", color: "text-zinc-400" },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl border border-zinc-800/80 bg-black/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={item.icon} alt={item.title} className="w-5 h-5 object-contain" />
                      <span className={`font-bold text-xs ${item.color}`}>{item.title}</span>
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">{item.req}</span>
                  </div>
                ))}
              </div>
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
            <h1 className="text-4xl font-black text-white mb-4">IncTiers Server IP</h1>
            <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
              IP-адрес сервера IncTiers — <span className="text-white font-bold">IncorrectSMP.play.ski</span>.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={copyServerIp}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3.5 rounded-xl transition text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>{copiedIp ? t("copied") : "IncorrectSMP.play.ski"}</span>
              <Server className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ВКЛАДКА: EVENTS */}
      {activeTab === "events" && (
        <div className={`w-full max-w-[1720px] ${themeStyles.cardBg} border ${themeStyles.border} p-10 rounded-3xl shadow-xl flex flex-col gap-6`}>
          <div>
            <div className="text-amber-500 font-bold text-xs uppercase tracking-wider mb-2">Tournaments & Battles</div>
            <h1 className="text-4xl font-black text-white mb-2">{t("upcomingEvents")}</h1>
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
            <div className="text-lg font-bold text-white mb-4">Information</div>
          </div>
        </div>
      )}
    </main>
  )
}
