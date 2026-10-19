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

// Словарь переводов для интерфейса
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
    topPlayers: "Top players",
    fullLeaderboard: "Full leaderboard",
    online: "Online",
    gamemodes: "Gamemodes",
    getTierTestedTitle: "Get tier tested",
    getTierTestedDesc: "Tier tests happen in-game on mctiers.network. Queue for a gamemode, fight one of our testers and get your tier.",
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
    heroTitle: "Список тиров PvP Minecraft",
    heroDesc: "AvernyeTiers — это список тиров PvP в Minecraft. Игроки тестируются в восьми режимах, распределяются по тирам от Tier 1 до Tier 5 и ранжируются в общей таблице лидеров.",
    viewRankings: "Смотреть рейтинги",
    getTierTested: "Пройти тест",
    topPlayers: "Топ игроков",
    fullLeaderboard: "Вся таблица лидеров",
    online: "Онлайн",
    gamemodes: "Игровые режимы",
    getTierTestedTitle: "Пройти проверку тира",
    getTierTestedDesc: "Тестирование тиров проходит прямо в игре на mctiers.network. Встаньте в очередь режима, сразитесь с тестером и получите свой тир.",
    tiersAndPoints: "Тиры и очки",
    tiersAndPointsDesc: "Каждый режим ранжирует игроков по пяти тирам, разделенным на High и Low.",
    titles: "Титулы",
    titlesDesc: "Ваш титул зависит от общего количества очков во всех режимах.",
    faqTitle: "Часто задаваемые вопросы",
    faqDesc: "Быстрые ответы о тирах, тестах, очках и сервере AvernyeTiers.",
    upcomingEvents: "Ближайшие ивенты",
    allEvents: "Все ивенты",
    serverAddress: "АДРЕС СЕРВЕРА",
    javaEdition: "JAVA ИЗДАНИЕ",
    bedrockEdition: "BEDROCK ИЗДАНИЕ",
    copied: "Скопировано!",
    copyIp: "Копировать IP",
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
    heroDesc: "AvernyeTiers es una lista de niveles de PvP en Minecraft. Los jugadores son evaluados en ocho modos de juego, colocados en niveles del 1 al 5.",
    viewRankings: "Ver clasificación",
    getTierTested: "Obtener nivel",
    topPlayers: "Mejores jugadores",
    fullLeaderboard: "Tabla completa",
    online: "En línea",
    gamemodes: "Modos de juego",
    getTierTestedTitle: "Obtener prueba de nivel",
    getTierTestedDesc: "Las pruebas ocurren en mctiers.network.",
    tiersAndPoints: "Niveles y puntos",
    tiersAndPointsDesc: "Cada modo clasifica a los jugadores en cinco niveles.",
    titles: "Títulos",
    titlesDesc: "Tu título sigue tus puntos totales.",
    faqTitle: "Preguntas frecuentes",
    faqDesc: "Respuestas rápidas sobre niveles y pruebas.",
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
    heroDesc: "AvernyeTiers é uma tier list de PvP do Minecraft. Jogadores são testados em oito modos.",
    viewRankings: "Ver rankings",
    getTierTested: "Ser testado",
    topPlayers: "Melhores jogadores",
    fullLeaderboard: "Leaderboard completa",
    online: "Online",
    gamemodes: "Modos de jogo",
    getTierTestedTitle: "Fazer teste de tier",
    getTierTestedDesc: "Testes acontecem em mctiers.network.",
    tiersAndPoints: "Tiers e pontos",
    tiersAndPointsDesc: "Cada modo classifica em cinco tiers.",
    titles: "Títulos",
    titlesDesc: "Seu título acompanha seus pontos totais.",
    faqTitle: "Perguntas frequentes",
    faqDesc: "Respostas rápidas sobre tiers e testes.",
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
    heroDesc: "AvernyeTiers est une tier list PvP Minecraft. Les joueurs sont testés dans huit modes.",
    viewRankings: "Voir les classements",
    getTierTested: "Passer un test",
    topPlayers: "Meilleurs joueurs",
    fullLeaderboard: "Classement complet",
    online: "En ligne",
    gamemodes: "Modes de jeu",
    getTierTestedTitle: "Passer un test de tier",
    getTierTestedDesc: "Les tests ont lieu sur mctiers.network.",
    tiersAndPoints: "Tiers et points",
    tiersAndPointsDesc: "Chaque mode classe les joueurs en cinq tiers.",
    titles: "Titres",
    titlesDesc: "Votre titre dépend de vos points totaux.",
    faqTitle: "Foire aux questions",
    faqDesc: "Réponses rapides sur les tiers.",
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
    heroDesc: "AvernyeTiers ist eine Minecraft PvP Tier List.",
    viewRankings: "Rangliste ansehen",
    getTierTested: "Testen lassen",
    topPlayers: "Top-Spieler",
    fullLeaderboard: "Komplette Bestenliste",
    online: "Online",
    gamemodes: "Spielmodi",
    getTierTestedTitle: "Tier-Test machen",
    getTierTestedDesc: "Tests finden auf mctiers.network statt.",
    tiersAndPoints: "Tiers und Punkte",
    tiersAndPointsDesc: "Jeder Modus ordnet Spieler in fünf Tiers ein.",
    titles: "Titel",
    titlesDesc: "Dein Titel basiert auf deinen Gesamtpunkten.",
    faqTitle: "Häufig gestellte Fragen",
    faqDesc: "Schnelle Antworten zu Tiers.",
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
    heroDesc: "AvernyeTiers to lista poziomów PvP w Minecraft.",
    viewRankings: "Zobacz rankingi",
    getTierTested: "Zdobądź poziom",
    topPlayers: "Najlepsi gracze",
    fullLeaderboard: "Pełny ranking",
    online: "Online",
    gamemodes: "Tryby gry",
    getTierTestedTitle: "Przetestuj swój poziom",
    getTierTestedDesc: "Testy odbywają się na mctiers.network.",
    tiersAndPoints: "Poziomy i punkty",
    tiersAndPointsDesc: "Każdy tryb dzieli graczy na pięć poziomów.",
    titles: "Tytuły",
    titlesDesc: "Twój tytuł zależy od łącznej liczby punktów.",
    faqTitle: "Często zadawane pytania",
    faqDesc: "Szybkie odpowiedzi dotyczące poziomów.",
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
    heroDesc: "AvernyeTiers è una tier list PvP di Minecraft.",
    viewRankings: "Vedi classifiche",
    getTierTested: "Ottieni tier",
    topPlayers: "Migliori giocatori",
    fullLeaderboard: "Classifica completa",
    online: "Online",
    gamemodes: "Modalità di gioco",
    getTierTestedTitle: "Ottieni un test",
    getTierTestedDesc: "I test avvengono su mctiers.network.",
    tiersAndPoints: "Tier e punti",
    tiersAndPointsDesc: "Ogni modalità classifica in cinque tier.",
    titles: "Titoli",
    titlesDesc: "Il tuo titolo dipende dai punti totali.",
    faqTitle: "Domande frequenti",
    faqDesc: "Risposte rapide sui tier.",
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
    heroDesc: "AvernyeTiers is een Minecraft PvP tierlijst.",
    viewRankings: "Bekijk ranglijst",
    getTierTested: "Test aanvragen",
    topPlayers: "Topspelers",
    fullLeaderboard: "Volledige leaderboard",
    online: "Online",
    gamemodes: "Spelmodi",
    getTierTestedTitle: "Word getest",
    getTierTestedDesc: "Tests vinden plaats op mctiers.network.",
    tiersAndPoints: "Tiers en punten",
    tiersAndPointsDesc: "Elke modus rangschikt in vijf tiers.",
    titles: "Titels",
    titlesDesc: "Je titel volgt je totale punten.",
    faqTitle: "Veelgestelde vragen",
    faqDesc: "Snelle antwoorden over tiers.",
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
    heroDesc: "AvernyeTiers bir Minecraft PvP tier listesidir.",
    viewRankings: "Sıralamaları gör",
    getTierTested: "Test ol",
    topPlayers: "En İyi Oyuncular",
    fullLeaderboard: "Tam sıralama",
    online: "Çevrimiçi",
    gamemodes: "Oyun Modları",
    getTierTestedTitle: "Seviye testi ol",
    getTierTestedDesc: "Testler mctiers.network üzerinde yapılır.",
    tiersAndPoints: "Seviyeler ve Puanlar",
    tiersAndPointsDesc: "Her mod oyuncuları beş seviyeye ayırır.",
    titles: "Unvanlar",
    titlesDesc: "Unvanınız toplam puanınıza göre belirlenir.",
    faqTitle: "Sıkça Sorulan Sorular",
    faqDesc: "Seviyeler hakkında hızlı yanıtlar.",
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
    heroDesc: "AvernyeTiers je Minecraft PvP tier list.",
    viewRankings: "Zobrazit žebříček",
    getTierTested: "Získat tier",
    topPlayers: "Nejlepší hráči",
    fullLeaderboard: "Celý žebříček",
    online: "Online",
    gamemodes: "Herní módy",
    getTierTestedTitle: "Získat tier test",
    getTierTestedDesc: "Testy probíhají na mctiers.network.",
    tiersAndPoints: "Tiers a body",
    tiersAndPointsDesc: "Každý mód řadí hráče do pěti tierů.",
    titles: "Tituly",
    titlesDesc: "Tvůj titul závisí na celkových bodech.",
    faqTitle: "Často kladené otázky",
    faqDesc: "Rychlé odpovědi o tierech.",
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
    heroDesc: "AvernyeTiers är en Minecraft PvP tier list.",
    viewRankings: "Visa ranking",
    getTierTested: "Testa tier",
    topPlayers: "Toppspelare",
    fullLeaderboard: "Fullständig ranking",
    online: "Online",
    gamemodes: "Spellägen",
    getTierTestedTitle: "Få tier-test",
    getTierTestedDesc: "Tester sker på mctiers.network.",
    tiersAndPoints: "Tiers och poäng",
    tiersAndPointsDesc: "Varje läge rankar spelare i fem tiers.",
    titles: "Titlar",
    titlesDesc: "Din titel beror på dina totala poäng.",
    faqTitle: "Vanliga frågor",
    faqDesc: "Snabba svar om tiers.",
    upcomingEvents: "Kommende evenemang",
    allEvents: "Alla evenemang",
    serverAddress: "SERVERADRESS",
    javaEdition: "JAVA-UTGÅVA",
    bedrockEdition: "BEDROCK-UTGÅVA",
    copied: "Kopierad!",
    copyIp: "Kopiera IP",
  }
}

// Список языков со смайликами-флагами
const languages = [
  { name: "English", flag: "🇺🇸" },
  { name: "Español", flag: "🇪🇸" },
  { name: "Português", flag: "🇧🇷" },
  { name: "Français", flag: "🇫🇷" },
  { name: "Deutsch", flag: "🇩🇪" },
  { name: "Polski", flag: "🇵🇱" },
  { name: "Italiano", flag: "🇮🇹" },
  { name: "Nederlands", flag: "🇳🇱" },
  { name: "Русский", flag: "🇷🇺" },
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
  
  const [currentLang, setCurrentLang] = useState<string>("English")
  const [isLangMenuOpen, setIsLangMenuOpen] = useState<boolean>(false)

  const [theme, setTheme] = useState<"dark" | "midnight" | "sinus" | "light">("dark")
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const t = (key: string) => {
    return translations[currentLang]?.[key] || translations["English"][key] || key
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("combat_tiers_theme") as "dark" | "midnight" | "sinus" | "light"
    if (savedTheme) {
      setTheme(savedTheme)
    }
    const savedLang = localStorage.getItem("avernye_lang")
    if (savedLang && translations[savedLang]) {
      setCurrentLang(savedLang)
    }
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
    navigator.clipboard.writeText("mctiers.network")
    setCopiedIp(true)
    setTimeout(() => setCopiedIp(false), 2000)
  }

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

  const activeLangFlag = languages.find(l => l.name === currentLang)?.flag || "🇺🇸"

  return (
    <main className={`min-h-screen ${themeStyles.bg} ${themeStyles.textColor} flex flex-col items-center py-6 px-6 relative transition-colors duration-300 w-full`}>
      
      {/* Плавная, нежная и крупная верхняя менюшка */}
      <header className={`w-full max-w-[1720px] flex items-center justify-between ${themeStyles.cardBg} border ${themeStyles.border} px-8 py-5 rounded-3xl shadow-xl mb-8 relative backdrop-blur-md`}>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 cursor-pointer transition hover:opacity-90" onClick={() => setActiveTab("home")}>
            <img src="/logo.png" alt="AvernyeTiers Logo" className="h-11 w-auto object-contain scale-105" />
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm text-zinc-300 font-medium">
            <button 
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl transition-all cursor-pointer ${
                activeTab === "home" 
                  ? "bg-zinc-800/80 text-white font-semibold shadow-sm border border-zinc-700/50" 
                  : "hover:bg-zinc-800/40 hover:text-zinc-100"
              }`}
            >
              <HomeIcon className="w-4 h-4 text-zinc-400" />
              <span>{t("home")}</span>
            </button>

            <button 
              onClick={() => setActiveTab("rankings")}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl transition-all cursor-pointer ${
                activeTab === "rankings" 
                  ? "bg-zinc-800/80 text-white font-semibold shadow-sm border border-zinc-700/50" 
                  : "hover:bg-zinc-800/40 hover:text-zinc-100"
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{t("rankings")}</span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsDiscordMenuOpen(!isDiscordMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl hover:bg-zinc-800/40 hover:text-zinc-100 transition-all cursor-pointer"
              >
                <Disc className="w-4 h-4 text-zinc-400" />
                <span>{t("discords")}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>
              {isDiscordMenuOpen && (
                <div className={`absolute left-0 top-full mt-2 w-56 ${themeStyles.cardBg} border ${themeStyles.border} rounded-2xl shadow-2xl overflow-hidden z-50 p-2 flex flex-col gap-1 text-left`}>
                  <a 
                    href="https://discord.gg/Y8e2REfz3A" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs hover:bg-zinc-800/80 text-zinc-300 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <span className="font-medium">STiers</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </a>
                  <a 
                    href="https://discord.gg/YFXEmEC8y2" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs hover:bg-zinc-800/80 text-zinc-300 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <span className="font-medium">Avernye</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </a>
                </div>
              )}
            </div>

            <button 
              onClick={() => setActiveTab("server-ip")}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl transition-all cursor-pointer ${
                activeTab === "server-ip" 
                  ? "bg-zinc-800/80 text-white font-semibold shadow-sm border border-zinc-700/50" 
                  : "hover:bg-zinc-800/40 hover:text-zinc-100"
              }`}
            >
              <Server className="w-4 h-4 text-zinc-400" />
              <span>{t("serverIp")}</span>
            </button>

            <button 
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl transition-all cursor-pointer ${
                activeTab === "events" 
                  ? "bg-zinc-800/80 text-white font-semibold shadow-sm border border-zinc-700/50" 
                  : "hover:bg-zinc-800/40 hover:text-zinc-100"
              }`}
            >
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span>{t("events")}</span>
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          
          {/* Меню выбора языка со стильной сеткой как на скриншоте */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 px-3.5 py-2.5 rounded-2xl text-sm text-zinc-200 cursor-pointer transition shadow-sm"
            >
              <span className="text-lg">{activeLangFlag}</span>
            </button>

            {isLangMenuOpen && (
              <div className={`absolute right-0 top-full mt-3 w-80 ${themeStyles.cardBg} border ${themeStyles.border} rounded-3xl shadow-2xl overflow-hidden z-50 p-4 grid grid-cols-2 gap-2`}>
                <div className="col-span-2 text-[11px] font-bold text-zinc-400 uppercase px-2 pb-1 tracking-wider">
                  Язык
                </div>
                {languages.map((lang) => {
                  const isSelected = currentLang === lang.name
                  return (
                    <button
                      key={lang.name}
                      onClick={() => changeLanguage(lang.name)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium cursor-pointer transition ${
                        isSelected 
                          ? "bg-zinc-800 text-white border border-zinc-700 shadow-md ring-1 ring-amber-500/20" 
                          : "hover:bg-zinc-800/50 text-zinc-300 hover:text-white border border-transparent"
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="truncate">{lang.name}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="w-72 relative">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 w-4 h-4 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (errorText) setErrorText("")
                }}
                onKeyDown={handleKeyDown}
                className={`w-full ${theme === "light" ? "bg-zinc-100" : "bg-black/30"} border ${themeStyles.border} rounded-2xl pl-10 pr-10 py-2.5 text-xs placeholder-zinc-400 focus:outline-none ${themeStyles.accentInput} transition-colors shadow-inner`}
              />
              <span className="absolute right-3 text-[10px] text-zinc-500 border border-zinc-700/50 px-1.5 py-0.5 rounded">/</span>
            </div>
            {errorText && (
              <span className="absolute -bottom-5 left-1 text-[11px] text-red-400 font-medium">
                {errorText}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className={`p-2.5 rounded-2xl ${theme === "light" ? "bg-zinc-100 hover:bg-zinc-200" : "bg-black/30 hover:bg-zinc-800/60"} border ${themeStyles.border} text-xs transition-colors cursor-pointer relative shadow-sm`}
              title="Тема"
            >
              <Palette className="w-4 h-4 text-amber-400" />
              {isThemeOpen && (
                <div className={`absolute right-0 top-full mt-2 w-36 ${themeStyles.cardBg} border ${themeStyles.border} rounded-2xl shadow-xl overflow-hidden z-50 p-1 flex flex-col gap-1 text-left`}>
                  <button onClick={() => changeTheme("dark")} className="w-full px-3 py-2 rounded-xl text-xs hover:bg-zinc-800/60 cursor-pointer">Dark</button>
                  <button onClick={() => changeTheme("midnight")} className="w-full px-3 py-2 rounded-xl text-xs hover:bg-zinc-800/60 cursor-pointer">Midnight</button>
                  <button onClick={() => changeTheme("sinus")} className="w-full px-3 py-2 rounded-xl text-xs hover:bg-zinc-800/60 cursor-pointer">Sinus</button>
                  <button onClick={() => changeTheme("light")} className="w-full px-3 py-2 rounded-xl text-xs hover:bg-zinc-800/60 cursor-pointer">Light ☀️</button>
                </div>
              )}
            </button>

            <button
              onClick={() => setIsInfoOpen(true)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl ${theme === "light" ? "bg-zinc-100 hover:bg-zinc-200" : "bg-black/30 hover:bg-zinc-800/60"} border ${themeStyles.border} text-xs font-semibold transition-colors cursor-pointer shadow-sm`}
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
            <div className={`lg:col-span-5 ${themeStyles.cardBg} border ${themeStyles.border} p-10 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden`}>
              <div>
                <img src="/logo.png" alt="AvernyeTiers Logo" className="h-14 w-auto object-contain mb-6" />
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
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3.5 rounded-2xl transition shadow-lg shadow-amber-500/20 text-xs cursor-pointer"
                >
                  <span>{t("viewRankings")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={copyServerIp}
                  className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-6 py-3.5 rounded-2xl transition text-xs border border-zinc-700 cursor-pointer shadow-sm"
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
                    className="bg-black/30 hover:bg-black/50 border border-zinc-800/80 hover:border-amber-500/40 p-4 rounded-2xl flex items-center justify-between cursor-pointer transition shadow-sm"
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
                    <div className="text-xs font-bold px-3 py-1 rounded-xl bg-zinc-800 text-zinc-300 shadow-sm">
                      {player.region}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`w-full ${themeStyles.cardBg} border ${themeStyles.border} p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4`}>
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">{t("online")}</span>
                  <span className="text-xs text-zinc-500">• 2,583 / 10,000 players online</span>
                </div>
                <div className="text-base font-extrabold text-white mt-0.5">mctiers.network</div>
              </div>
            </div>
            <button 
              onClick={copyServerIp}
              className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold px-6 py-3.5 rounded-2xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>{copiedIp ? t("copied") : t("copyIp")}</span>
              <Server className="w-4 h-4" />
            </button>
          </div>

          <div>
            <div className="text-lg font-bold text-white mb-4">{t("gamemodes")}</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {modes.filter(m => m.id !== "overall").map((mode) => (
                <div 
                  key={mode.id}
                  onClick={() => {
                    setSelectedMode(mode.id)
                    setActiveTab("rankings")
                  }}
                  className={`border ${themeStyles.border} hover:border-amber-500/50 p-5 rounded-3xl flex flex-col items-center justify-center gap-3 cursor-pointer transition group bg-black/20 hover:bg-black/40 shadow-sm`}
                >
                  <img src={mode.icon} alt={mode.label} className="w-9 h-9 object-contain group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-zinc-300 group-hover:text-amber-400 transition-colors">{mode.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${themeStyles.cardBg} border ${themeStyles.border} p-8 rounded-3xl shadow-xl`}>
            <div className="text-2xl font-black text-white mb-2">{t("getTierTestedTitle")}</div>
            <p className="text-xs text-zinc-400 mb-8">
              {t("getTierTestedDesc")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { step: "1", title: "Join server", desc: "Join mctiers.network on Java or Bedrock." },
                { step: "2", title: "Type /tiertest", desc: "Choose the gamemode you want to be tested in." },
                { step: "3", title: "Pick region", desc: "Join that gamemode's testing queue." },
                { step: "4", title: "Private arena", desc: "When a tester is free, you're moved to a private arena." },
                { step: "5", title: "Get ranked", desc: "Fight your tester and earn your profile tier." },
              ].map((s, idx) => (
                <div key={idx} className="bg-black/30 border border-zinc-800/80 p-5 rounded-2xl flex flex-col justify-between shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/20 mb-3">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${themeStyles.cardBg} border ${themeStyles.border} p-6 rounded-3xl shadow-xl`}>
              <div className="text-lg font-bold text-white mb-1">{t("tiersAndPoints")}</div>
              <p className="text-xs text-zinc-400 mb-6">{t("tiersAndPointsDesc")}</p>
              
              <div className="space-y-3">
                {[
                  { tier: "Tier 1", points: "HT1 · 60 pts", lt: "LT1 · 45 pts", bg: "bg-amber-950/40 border-amber-900/50" },
                  { tier: "Tier 2", points: "HT2 · 30 pts", lt: "LT2 · 20 pts", bg: "bg-zinc-900 border-zinc-800" },
                  { tier: "Tier 3", points: "HT3 · 10 pts", lt: "LT3 · 6 pts", bg: "bg-amber-900/20 border-amber-900/30" },
                  { tier: "Tier 4", points: "HT4 · 4 pts", lt: "LT4 · 3 pts", bg: "bg-black/30 border-zinc-800" },
                  { tier: "Tier 5", points: "HT5 · 2 pts", lt: "LT5 · 1 pt", bg: "bg-black/30 border-zinc-800" },
                ].map((tItem, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border ${tItem.bg} flex items-center justify-between shadow-sm`}>
                    <span className="font-bold text-white text-xs">{tItem.tier}</span>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-semibold bg-black/40 px-2.5 py-1 rounded-xl text-amber-400 border border-white/5">{tItem.points}</span>
                      <span className="text-[10px] font-semibold bg-black/40 px-2.5 py-1 rounded-xl text-zinc-300 border border-white/5">{tItem.lt}</span>
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
                  { title: "Combat Grandmaster", req: "400+ points", color: "text-amber-400" },
                  { title: "Combat Master", req: "250+ points", color: "text-amber-400" },
                  { title: "Combat Ace", req: "100+ points", color: "text-rose-400" },
                  { title: "Combat Specialist", req: "50+ points", color: "text-purple-300" },
                  { title: "Combat Cadet", req: "20+ points", color: "text-purple-300" },
                  { title: "Rookie", req: "Under 10 points", color: "text-zinc-400" },
                ].map((ti, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-zinc-800/80 bg-black/30 flex items-center justify-between shadow-sm">
                    <span className={`font-bold text-xs ${ti.color}`}>{ti.title}</span>
                    <span className="text-xs text-zinc-400 font-medium">{ti.req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
                { date: "OCT 23", title: "Sword FFA Night", desc: "Up to 100 players, one arena and Sword kits only. Last player standing wins the round." },
                { date: "NOV 1", title: "Mace Halloween Bash", desc: "A Halloween-themed Mace bracket on a spooky arena. Double elimination, so everyone..." },
                { date: "NOV 7", title: "UHC Duos Showdown", desc: "Grab a partner for 2v2 UHC. 32 teams, best-of-3 matches, single elimination." },
              ].map((ev, idx) => (
                <div key={idx} className={`${themeStyles.cardBg} border ${themeStyles.border} p-6 rounded-3xl flex flex-col justify-between gap-6 shadow-sm`}>
                  <div>
                    <div className="text-xs font-black text-amber-500 mb-2">{ev.date}</div>
                    <div className="text-base font-bold text-white mb-2">{ev.title}</div>
                    <div className="text-xs text-zinc-400 leading-relaxed">{ev.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${themeStyles.cardBg} border ${themeStyles.border} p-8 rounded-3xl shadow-xl`}>
            <div className="text-2xl font-black text-white mb-1">{t("faqTitle")}</div>
            <p className="text-xs text-zinc-400 mb-6">{t("faqDesc")}</p>

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
                <div key={idx} className="border border-zinc-800 rounded-2xl overflow-hidden bg-black/20 shadow-sm">
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
        <div className={`w-full max-w-[1720px] ${themeStyles.cardBg} border ${themeStyles.border} rounded-3xl shadow-xl overflow-hidden mb-3`}>
          <div className="p-3 pb-2 border-b border-zinc-800/50">
            <div className="flex items-end gap-1.5 overflow-x-auto scrollbar-none pt-2">
              {modes.map((mode) => {
                const isActive = selectedMode === mode.id

                return (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    title={mode.label}
                    className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3.5 px-3 transition-all duration-150 cursor-pointer shrink-0 border-x border-t ${
                      isActive
                        ? "bg-[#161f30] border-amber-500/80 text-white shadow-sm ring-1 ring-amber-500/30 rounded-t-2xl -mt-2 pt-6"
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

          <div className="p-4 pt-4">
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
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3.5 rounded-2xl transition text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>{copiedIp ? t("copied") : "mctiers.network"}</span>
              <Server className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <div className="bg-black/30 border border-zinc-800 p-6 rounded-2xl shadow-sm">
              <div className="text-xs text-zinc-500 font-semibold mb-1">{t("serverAddress")}</div>
              <div className="text-white font-bold text-base">mctiers.network</div>
            </div>
            <div className="bg-black/30 border border-zinc-800 p-6 rounded-2xl shadow-sm">
              <div className="text-xs text-zinc-500 font-semibold mb-1">{t("javaEdition")}</div>
              <div className="text-white font-bold text-base">1.21 - 26.3</div>
            </div>
            <div className="bg-black/30 border border-zinc-800 p-6 rounded-2xl shadow-sm">
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
            <p className="text-zinc-400 text-sm">Participate in community tournaments and win exclusive points.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[
              { date: "OCT 23", title: "Sword FFA Night", desc: "Up to 100 players, one arena and Sword kits only. Last player standing wins." },
              { date: "NOV 1", title: "Mace Halloween Bash", desc: "A Halloween-themed Mace bracket on a spooky arena. Double elimination." },
              { date: "NOV 7", title: "UHC Duos Showdown", desc: "Grab a partner for 2v2 UHC. 32 teams, best-of-3 matches." },
            ].map((ev, idx) => (
              <div key={idx} className="bg-black/30 border border-zinc-800 hover:border-amber-500/40 p-6 rounded-2xl flex flex-col justify-between gap-6 transition shadow-sm">
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
          <div className={`${themeStyles.cardBg} border ${themeStyles.border} rounded-3xl w-full max-w-lg p-6 relative shadow-2xl`}>
            <button onClick={() => setIsInfoOpen(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-zinc-900/80 p-2 rounded-xl border border-zinc-800 cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            <div className={`flex ${themeStyles.bg} p-1.5 rounded-2xl border ${themeStyles.border} mb-4`}>
              <button 
                onClick={() => setInfoTab("titles")} 
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${infoTab === "titles" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-white"}`}
              >
                Титулы
              </button>
              <button 
                onClick={() => setInfoTab("points")} 
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${infoTab === "points" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-white"}`}
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
                  <div className={`flex items-start gap-3 p-3.5 rounded-2xl border ${themeStyles.border} bg-black/20`}>
                    <img src="/combat_grandmaster.webp" alt="Combat Grandmaster" className="w-8 h-8 object-contain shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-amber-400 text-sm">Combat Grandmaster</div>
                      <div className="text-xs text-zinc-400 mt-0.5">Получено 400+ общих очков.</div>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3.5 rounded-2xl border ${themeStyles.border} bg-black/20`}>
                    <img src="/combat_grandmaster.webp" alt="Combat Master" className="w-8 h-8 object-contain shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-amber-400 text-sm">Combat Master</div>
                      <div className="text-xs text-zinc-400 mt-0.5">Получено 250+ общих очков.</div>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3.5 rounded-2xl border ${themeStyles.border} bg-black/20`}>
                    <img src="/combat_ace.webp" alt="Combat Ace" className="w-8 h-8 object-contain shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-rose-400 text-sm">Combat Ace</div>
                      <div className="text-xs text-zinc-400 mt-0.5">Получено 100+ общих очков.</div>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3.5 rounded-2xl border ${themeStyles.border} bg-black/20`}>
                    <img src="/combat_specialist.svg" alt="Combat Specialist" className="w-8 h-8 object-contain shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-purple-300 text-sm">Combat Specialist</div>
                      <div className="text-xs text-zinc-400 mt-0.5">Получено 50+ общих очков.</div>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3.5 rounded-2xl border ${themeStyles.border} bg-black/20`}>
                    <img src="/combat_cadet.svg" alt="Combat Cadet" className="w-8 h-8 object-contain shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-purple-300 text-sm">Combat Cadet</div>
                      <div className="text-xs text-zinc-400 mt-0.5">Получено 20+ общих очков.</div>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3.5 rounded-2xl border ${themeStyles.border} bg-black/20`}>
                    <img src="/combat_novice.svg" alt="Combat Novice" className="w-8 h-8 object-contain shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-purple-300 text-sm">Combat Novice</div>
                      <div className="text-xs text-zinc-400 mt-0.5">Получено 10+ общих очков.</div>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3.5 rounded-2xl border ${themeStyles.border} bg-black/20`}>
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
                      <div className="bg-black/30 border border-zinc-800 rounded-2xl p-3 flex items-center gap-2">
                        <span className="text-amber-500">▲</span> <strong className="text-amber-400">60 Points</strong>
                      </div>
                      <div className="bg-black/30 border border-zinc-800 rounded-2xl p-3 flex items-center gap-2">
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
                      <div className="bg-black/30 border border-zinc-800 rounded-2xl p-3 flex items-center gap-2">
                        <span className="text-zinc-400">▲</span> <strong className="text-zinc-300">30 Points</strong>
                      </div>
                      <div className="bg-black/30 border border-zinc-800 rounded-2xl p-3 flex items-center gap-2">
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
                      <div className="bg-black/30 border border-zinc-800 rounded-2xl p-3 flex items-center gap-2">
                        <span className="text-amber-600">▲</span> <strong className="text-amber-600">10 Points</strong>
                      </div>
                      <div className="bg-black/30 border border-zinc-800 rounded-2xl p-3 flex items-center gap-2">
                        <span className="text-amber-600">▲</span> <strong className="text-amber-600">6 Points</strong>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="font-bold text-zinc-300 mb-2">Tier 4</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-black/30 border border-zinc-800 rounded-2xl p-3 flex items-center gap-2">
                        <span className="text-zinc-400">▲</span> <strong className="text-zinc-300">4 Points</strong>
                      </div>
                      <div className="bg-black/30 border border-zinc-800 rounded-2xl p-3 flex items-center gap-2">
                        <span className="text-zinc-400">▲</span> <strong className="text-zinc-300">3 Points</strong>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="font-bold text-zinc-300 mb-2">Tier 5</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-black/30 border border-zinc-800 rounded-2xl p-3 flex items-center gap-2">
                        <span className="text-zinc-400">▲</span> <strong className="text-zinc-300">2 Points</strong>
                      </div>
                      <div className="bg-black/30 border border-zinc-800 rounded-2xl p-3 flex items-center gap-2">
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
