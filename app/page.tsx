"use client"

import { useState, useEffect, KeyboardEvent, ReactNode } from "react"
import { INITIAL_PLAYERS, calculatePlayerPoints, getPlayerTitle, RankedPlayer, Player } from "@/lib/tiers-data"
import { RankingTable } from "@/components/ranking-table"
import KitTier from "@/components/kit-tier"
import { PlayerModal } from "@/components/player-modal"
import {
  Info, X, Search, Home as HomeIcon, Trophy, Gamepad2, ChevronDown, ExternalLink,
  Server, Calendar, ArrowRight, Check, Copy, Plus, ChevronsUp, ChevronUp, Gem
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
    tiersAndPointsDesc: "Each gamemode ranks players in five tiers, split into High and Low. Your tiers earn points, and points decide your place on the overall leaderboard.",
    titles: "Titles",
    titlesDesc: "Your title follows your total points across every gamemode.",
    upcomingEvents: "Upcoming events",
    allEvents: "All events",
    serverAddress: "SERVER ADDRESS",
    javaEdition: "JAVA EDITION",
    bedrockEdition: "BEDROCK EDITION",
    copied: "Copied!",
    copyIp: "Copy Server IP",
    overallTitle: "Overall Minecraft PvP Rankings",
    playersRanked: "players ranked by points across 8 gamemodes",
    tierRange: "Ranked players, from HT1 to LT5",
    serverIpLabel: "SERVER IP",
    playersOnline: "players online",
    offline: "Offline",
    ltmTitle: "Limited-Time Modes",
    ltmComing: "Limited-Time Modes are coming!",
    ltmDesc: "We're working on implementing LTMs, which will include team-based leaderboards for various kit events - however, a few other things will take priority :)",
    learnMore: "Learn more",
    pts: "pts",
    pointsWord: "points",
    under: "Under",
    explore: "Explore",
    guides: "Guides",
    footerDesc: "The Minecraft PvP tier list. Rankings, tier tests and events for Java and Bedrock players.",
    step1Pre: "Join",
    step1Post: "on Java (1.21 - 26.3) or Bedrock.",
    step2Pre: "Type",
    step2Post: "and choose the gamemode you want to be tested in.",
    step3: "Pick your region to join that gamemode's testing queue.",
    step4: "When a tester in your region is free, you're moved to a private arena with the official kit.",
    step5: "Fight your tester. Your new tier is added to your profile after the test.",
    faqTitle: "Frequently asked questions",
    faqDesc: "Quick answers about tiers, tier tests, points and the server.",
    faq1q: "What is IncTiers?",
    faq1a: "IncTiers is a Minecraft PvP tier list. It ranks players in eight gamemodes (Vanilla/Crystal PvP, UHC, Pot, NethOP, SMP, Sword, Axe and Mace) from High Tier 1 to Low Tier 5, and combines those tiers into one overall leaderboard.",
    faq2q: "What do HT1, LT1 and the other tiers mean?",
    faq2a: "Each gamemode has five tiers, and Tier 1 is the best. Every tier is split into High (HT) and Low (LT), so HT1 is the highest rank a player can hold and LT5 the lowest. The full order is HT1, LT1, HT2, LT2 and so on down to LT5.",
    faq3q: "How do I get tier tested?",
    faq3a: "Join the server, type /tiertest, choose a gamemode and your region, then fight a tester in a private arena. Your new tier is added to your profile after the test.",
    faq4q: "How is the overall leaderboard calculated?",
    faq4a: "Every tier is worth points (HT1 = 60, LT1 = 45, HT2 = 30 ... LT5 = 1). Points from all gamemodes are added up and decide your place on the overall leaderboard.",
    faq5q: "What are titles like Combat Master?",
    faq5a: "Titles follow your total points across every gamemode, from Rookie (under 10 points) up to Combat Grandmaster (400+ points).",
    faq6q: "What does a retired tier mean?",
    faq6a: "A retired tier means the player no longer competes in that gamemode. The tier stays on their profile but is marked as retired.",
    faq7q: "How do I look up a player's tiers?",
    faq7a: "Type the exact username into the search box at the top of the page and press Enter to open the player's profile.",
    faq8q: "What is the IncTiers server IP?",
    faq8a: "The server IP is IncorrectSMP.play.ski. It works on Java (1.21 - 26.3) and Bedrock.",
    faq9q: "Does IncTiers run events?",
    faq9a: "Yes. Check the Events page for upcoming tournaments, ladder nights and team clashes.",
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
    overallTitle: "Общий рейтинг Minecraft PvP",
    playersRanked: "игроков в рейтинге по очкам в 8 режимах",
    tierRange: "Игроки в рейтинге: от HT1 до LT5",
    serverIpLabel: "IP СЕРВЕРА",
    playersOnline: "игроков онлайн",
    offline: "Оффлайн",
    ltmTitle: "Ограниченные режимы",
    ltmComing: "Ограниченные режимы скоро появятся!",
    ltmDesc: "Мы работаем над LTM — командными рейтингами для разных кит-ивентов, но сначала займёмся другими задачами :)",
    learnMore: "Подробнее",
    pts: "оч.",
    pointsWord: "очков",
    under: "Меньше",
    explore: "Разделы",
    guides: "Гайды",
    footerDesc: "Тир-лист Minecraft PvP. Рейтинги, тир-тесты и ивенты для игроков на Java и Bedrock.",
    step1Pre: "Зайди на",
    step1Post: "через Java (1.21 - 26.3) или Bedrock.",
    step2Pre: "Введи",
    step2Post: "и выбери режим, в котором хочешь пройти тест.",
    step3: "Выбери свой регион, чтобы встать в очередь на тест в этом режиме.",
    step4: "Когда тестер из твоего региона освободится, тебя переместят на приватную арену с официальным китом.",
    step5: "Сразись с тестером. Новый тир появится в твоём профиле после теста.",
    faqTitle: "Частые вопросы",
    faqDesc: "Короткие ответы про тиры, тир-тесты, очки и сервер.",
    faq1q: "Что такое IncTiers?",
    faq1a: "IncTiers — тир-лист по Minecraft PvP. Он ранжирует игроков в восьми режимах (Vanilla/Crystal PvP, UHC, Pot, NethOP, SMP, Sword, Axe и Mace) от High Tier 1 до Low Tier 5 и объединяет тиры в один общий рейтинг.",
    faq2q: "Что значат HT1, LT1 и другие тиры?",
    faq2a: "В каждом режиме пять тиров, Tier 1 — лучший. Каждый тир делится на High (HT) и Low (LT): HT1 — высший ранг, LT5 — низший. Полный порядок: HT1, LT1, HT2, LT2 и так далее до LT5.",
    faq3q: "Как пройти тир-тест?",
    faq3a: "Зайди на сервер, введи /tiertest, выбери режим и регион, затем сразись с тестером на приватной арене. Новый тир появится в профиле после теста.",
    faq4q: "Как считается общий рейтинг?",
    faq4a: "Каждый тир даёт очки (HT1 = 60, LT1 = 45, HT2 = 30 ... LT5 = 1). Очки со всех режимов суммируются и определяют место в общем рейтинге.",
    faq5q: "Что за титулы вроде Combat Master?",
    faq5a: "Титул зависит от суммы очков во всех режимах: от Rookie (меньше 10 очков) до Combat Grandmaster (400+ очков).",
    faq6q: "Что значит retired-тир?",
    faq6a: "Retired-тир означает, что игрок больше не соревнуется в этом режиме. Тир остаётся в профиле, но помечается как retired.",
    faq7q: "Как найти тиры игрока?",
    faq7a: "Введи точный ник в поиск вверху страницы и нажми Enter — откроется профиль игрока.",
    faq8q: "Какой IP у сервера IncTiers?",
    faq8a: "IP сервера — IncorrectSMP.play.ski. Подходит для Java (1.21 - 26.3) и Bedrock.",
    faq9q: "Проводит ли IncTiers ивенты?",
    faq9a: "Да. Загляни на страницу Ивентов: там турниры, ladder-ночи и командные бои.",
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
    tiersAndPoints: "Seviyeler ve Puanlar",
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

const SERVER_IP = "IncorrectSMP.play.ski"
const DISCORD_URL = "https://discord.gg/Y8e2REfz3A"
const VERSIONS = "Java 1.21 - 26.3 · Bedrock"

type TabId = "home" | "rankings" | "server-ip" | "events"

// Режимы (вкладки рейтингов). title — заголовок как на скриншотах
const MODES = [
  { id: "overall", label: "Overall", icon: "/overall.svg", title: "" },
  { id: "LTMs", label: "LTMs", icon: "/ltm's.svg", title: "" },
  { id: "Vanilla", label: "Vanilla", icon: "/vanilla.svg", title: "Vanilla (Crystal PvP) Tier List" },
  { id: "UHC", label: "UHC", icon: "/uhc.svg", title: "Minecraft UHC Tier List" },
  { id: "Pot", label: "Pot", icon: "/pot.svg", title: "Minecraft Pot PvP Tier List" },
  { id: "NethOP", label: "NethOP", icon: "/nethop.svg", title: "NethOP (Netherite OP) Tier List" },
  { id: "SMP", label: "SMP", icon: "/smp.svg", title: "Minecraft SMP PvP Tier List" },
  { id: "Sword", label: "Sword", icon: "/sword.svg", title: "Minecraft Sword PvP Tier List" },
  { id: "Axe", label: "Axe", icon: "/axe.svg", title: "Minecraft Axe PvP Tier List" },
  { id: "Mace", label: "Mace", icon: "/mace.svg", title: "Minecraft Mace PvP Tier List" },
]

const GAMEMODE_IDS = ["Vanilla", "UHC", "Pot", "NethOP", "SMP", "Sword", "Axe", "Mace"]
const FOOTER_COL_1 = ["overall", "UHC", "NethOP", "Sword", "Mace"]
const FOOTER_COL_2 = ["Vanilla", "Pot", "SMP", "Axe"]

const TIER_ROWS = [
  { name: "Tier 1", ht: 60, lt: 45, row: "bg-amber-900/25 text-amber-400", trophy: "text-amber-400" },
  { name: "Tier 2", ht: 30, lt: 20, row: "bg-zinc-600/20 text-zinc-300", trophy: "text-zinc-300" },
  { name: "Tier 3", ht: 10, lt: 6, row: "bg-orange-900/25 text-orange-400", trophy: "text-orange-400" },
  { name: "Tier 4", ht: 4, lt: 3, row: "bg-[#121823] text-zinc-300", trophy: "" },
  { name: "Tier 5", ht: 2, lt: 1, row: "bg-[#121823] text-zinc-300", trophy: "" },
]

const TITLE_ROWS = [
  { name: "Combat Grandmaster", min: 400, color: "#fcd34d", width: 100 },
  { name: "Combat Master", min: 250, color: "#fcd34d", width: 80 },
  { name: "Combat Ace", min: 100, color: "#fb7185", width: 50 },
  { name: "Combat Specialist", min: 50, color: "#c4b5fd", width: 33 },
  { name: "Combat Cadet", min: 20, color: "#c4b5fd", width: 22 },
  { name: "Combat Novice", min: 10, color: "#c4b5fd", width: 12 },
  { name: "Rookie", min: 0, color: "#a1a1aa", width: 5 },
]

// Ивенты (меняй даты/текст здесь). Время старта — UTC.
const EVENTS = [
  {
    month: "NOV", day: 14, weekday: "Sat", mode: "Every gamemode", icon: "/overall.svg", format: "1v1", region: "All regions",
    title: "Open Testing Weekend",
    desc: "Extra testers online all weekend in every gamemode, so tier test queues move much faster.",
    time: "05:00 PM", startsAt: Date.UTC(2026, 10, 14, 17, 0), durationH: 48,
  },
  {
    month: "NOV", day: 21, weekday: "Sat", mode: "Pot", icon: "/pot.svg", format: "1v1", region: "NA",
    title: "Pot PvP Ladder Night",
    desc: "Two hours of Pot PvP on a live ladder. Win to climb, lose to drop, and finish as high as you can.",
    time: "06:00 AM", startsAt: Date.UTC(2026, 10, 21, 6, 0), durationH: 2,
  },
  {
    month: "DEC", day: 5, weekday: "Sat", mode: "NethOP", icon: "/nethop.svg", format: "4v4", region: "EU",
    title: "NethOP Team Clash",
    desc: "16 teams of four in full Netherite OP gear. Best-of-5 team fights, single elimination.",
    time: "11:00 PM", startsAt: Date.UTC(2026, 11, 5, 23, 0), durationH: 4,
  },
]

const FAQ_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Общие классы (цвета со скриншотов)
const CARD = "bg-[#0f151e] border border-[#171f2b]"
const SOFT = "bg-[#121823] border border-[#1b2433]"

function DiscordIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("rankings")
  const [selectedMode, setSelectedMode] = useState<string>("overall")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [errorText, setErrorText] = useState<string>("")
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false)
  const [isDiscordMenuOpen, setIsDiscordMenuOpen] = useState<boolean>(false)
  const [copiedIp, setCopiedIp] = useState<boolean>(false)
  const [openFaq, setOpenFaq] = useState<number | null>(1)
  const [now, setNow] = useState<number | null>(null)
  const [status, setStatus] = useState<{ online: boolean; players?: number; max?: number } | null>(null)

  const [currentLang, setCurrentLang] = useState<string>("Русский")
  const [isLangMenuOpen, setIsLangMenuOpen] = useState<boolean>(false)

  const t = (key: string) => {
    return translations[currentLang]?.[key] || translations["English"][key] || key
  }

  useEffect(() => {
    const savedLang = localStorage.getItem("Incorrect_lang")
    if (savedLang && translations[savedLang]) setCurrentLang(savedLang)
  }, [])

  // Время для обратного отсчёта ивентов
  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 60_000)
    return () => clearInterval(id)
  }, [])

  // Онлайн сервера
  useEffect(() => {
    let cancelled = false
    fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return
        setStatus({ online: !!d.online, players: d.players?.online, max: d.players?.max })
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

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
    navigator.clipboard.writeText(SERVER_IP)
    setCopiedIp(true)
    setTimeout(() => setCopiedIp(false), 2000)
  }

  const goTo = (tab: TabId, mode?: string) => {
    setActiveTab(tab)
    if (mode) setSelectedMode(mode)
    setIsDiscordMenuOpen(false)
    setIsLangMenuOpen(false)
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToTierTest = () => {
    document.getElementById("tier-test")?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  const modeById = (id: string) => MODES.find((m) => m.id === id)
  const activeLangFlag = languages.find((l) => l.name === currentLang)?.flag || "🇷🇺"

  const eventStatus = (startsAt: number, durationH: number) => {
    if (now === null) return null
    const end = startsAt + durationH * 3600_000
    if (now >= startsAt && now < end) return { live: true, text: "Live now" }
    if (now >= end) return { live: false, text: "Ended" }
    const diff = startsAt - now
    const d = Math.floor(diff / 86_400_000)
    const h = Math.floor((diff % 86_400_000) / 3_600_000)
    return { live: false, text: d > 0 ? `Starts in ${d}d ${h}h` : `Starts in ${h}h ${Math.floor((diff % 3_600_000) / 60_000)}m` }
  }

  // ---------- Переиспользуемые куски ----------

  const IpPill = ({ small = false }: { small?: boolean }) => (
    <div className={`flex items-center gap-2 bg-[#161d2a] border border-[#1f293a] rounded-lg ${small ? "px-2 py-1 text-[11px]" : "px-3.5 py-2.5 text-sm"} font-bold text-white w-fit`}>
      <span>{SERVER_IP}</span>
      <button onClick={copyServerIp} className="text-zinc-400 hover:text-white cursor-pointer" aria-label="Copy IP">
        {copiedIp ? <Check className={small ? "w-3 h-3" : "w-4 h-4"} /> : <Copy className={small ? "w-3 h-3" : "w-4 h-4"} />}
      </button>
    </div>
  )

  const ServerBadge = () => (
    <div className="flex items-center gap-2.5">
      <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
        <Trophy className="w-6 h-6 text-amber-400" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-[9px] tracking-wider text-zinc-400 uppercase leading-none">{t("serverIpLabel")}</div>
        <div className="flex items-center gap-1.5">
          <IpPill small />
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="w-6 h-6 rounded-md bg-[#2f5bff] hover:bg-[#4a70ff] flex items-center justify-center text-white transition">
            <DiscordIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )

  const CardHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-extrabold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-[11px] text-zinc-400 mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={() => setIsInfoOpen(true)}
          className="flex items-center gap-2 bg-[#1a2230] hover:bg-[#222c3e] text-white text-xs font-medium px-3.5 py-2 rounded-lg transition cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{t("information")}</span>
        </button>
        <ServerBadge />
      </div>
    </div>
  )

  const PageHeading = ({ children, action }: { children: ReactNode; action?: ReactNode }) => (
    <div className="flex items-end justify-between">
      <h2 className="text-xl font-extrabold text-white tracking-tight">{children}</h2>
      {action}
    </div>
  )

  const EventCard = ({ ev }: { ev: (typeof EVENTS)[number] }) => {
    const st = eventStatus(ev.startsAt, ev.durationH)
    return (
      <button
        onClick={() => goTo("events")}
        className={`${CARD} rounded-2xl flex overflow-hidden text-left hover:border-[#243045] transition cursor-pointer`}
      >
        <div className="w-[86px] shrink-0 bg-[#0b1018] flex flex-col items-center justify-center py-4">
          <span className="text-[10px] font-bold text-amber-400 tracking-wider">{ev.month}</span>
          <span className="text-3xl font-extrabold text-white leading-tight">{ev.day}</span>
          <span className="text-[10px] text-zinc-400">{ev.weekday}</span>
        </div>
        <div className="p-4 flex flex-col gap-1.5 min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-300">
            <img src={ev.icon} alt="" className="w-3.5 h-3.5 object-contain" />
            <span>{ev.mode}</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400">{ev.format}</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400">{ev.region}</span>
          </div>
          <div className="text-[15px] font-bold text-white">{ev.title}</div>
          <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">{ev.desc}</p>
          <div className="flex items-center gap-2 text-[11px] mt-1">
            <span className="font-bold text-white">{ev.time}</span>
            {st && <span className={st.live ? "text-emerald-400 font-semibold" : "text-zinc-400"}>{st.text}</span>}
          </div>
        </div>
      </button>
    )
  }

  const MaxW = "mx-auto w-full max-w-[1280px] px-[30px]"

  return (
    <main className="min-h-screen bg-[#0d121a] text-white flex flex-col w-full">
      <div className={`${MaxW} pt-6 flex flex-col gap-8`}>

        {/* ===== ШАПКА ===== */}
        <header className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-4 bg-[#0f141c] border border-[#171f2b] rounded-2xl px-4 py-3 relative z-40">
          <button onClick={() => goTo("home")} className="flex items-center cursor-pointer w-fit">
            <img src="/logo.png" alt="IncTiers Logo" className="h-9 w-auto object-contain" />
          </button>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => goTo("home")}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition cursor-pointer ${activeTab === "home" ? "text-white" : "text-zinc-400 hover:text-white"}`}
            >
              <HomeIcon className="w-[18px] h-[18px]" />
              <span>{t("home")}</span>
            </button>
            <button
              onClick={() => goTo("rankings")}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition cursor-pointer ${activeTab === "rankings" ? "text-white" : "text-zinc-400 hover:text-white"}`}
            >
              <Trophy className="w-[18px] h-[18px]" />
              <span>{t("rankings")}</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setIsDiscordMenuOpen(!isDiscordMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-400 hover:text-white transition cursor-pointer"
              >
                <Gamepad2 className="w-[18px] h-[18px]" />
                <span>{t("discords")}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {isDiscordMenuOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-[#0f141c] border border-[#171f2b] rounded-xl shadow-xl overflow-hidden z-50 p-1.5 flex flex-col gap-1 text-left">
                  <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="w-full px-3 py-2 rounded-lg text-xs hover:bg-zinc-800/60 text-zinc-300 hover:text-white flex items-center justify-between transition-colors">
                    <span className="font-medium">STiers</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </a>
                </div>
              )}
            </div>

            <button
              onClick={() => goTo("server-ip")}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition cursor-pointer ${activeTab === "server-ip" ? "text-white" : "text-zinc-400 hover:text-white"}`}
            >
              <Server className="w-[18px] h-[18px]" />
              <span>{t("serverIp")}</span>
            </button>
            <button
              onClick={() => goTo("events")}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition cursor-pointer ${activeTab === "events" ? "text-white" : "text-zinc-400 hover:text-white"}`}
            >
              <Calendar className="w-[18px] h-[18px]" />
              <span>{t("events")}</span>
            </button>
          </nav>

          <div className="flex items-center justify-end gap-3">
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="text-lg leading-none cursor-pointer hover:scale-110 transition"
                aria-label="Language"
              >
                {activeLangFlag}
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 bg-[#0f141c] border border-[#171f2b] rounded-2xl shadow-2xl overflow-hidden z-50 p-3 grid grid-cols-2 gap-1.5">
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
                          isSelected ? "bg-zinc-800 text-white border border-zinc-700" : "hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200 border border-transparent"
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

            <div className="relative w-40 sm:w-[247px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (errorText) setErrorText("")
                }}
                onKeyDown={handleKeyDown}
                className="w-full bg-[#171d29] border border-transparent focus:border-amber-500/60 rounded-2xl pl-9 pr-9 py-2.5 text-xs placeholder-zinc-500 focus:outline-none transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-400 bg-[#0f141c] px-1.5 py-0.5 rounded">/</span>
              {errorText && <span className="absolute -bottom-5 left-1 text-[10px] text-red-400 font-medium">{errorText}</span>}
            </div>
          </div>
        </header>

        {/* ===== HOME ===== */}
        {activeTab === "home" && (
          <div className="flex flex-col gap-12">
            {/* Hero + Top players */}
            <section className={`${CARD} rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2`}>
              <div className="p-10 flex flex-col justify-center gap-6 bg-gradient-to-br from-[#121923] to-[#0f151e]">
                <img src="/logo.png" alt="IncTiers Logo" className="h-20 w-auto object-contain self-start" />
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight mb-3">{t("heroTitle")}</h2>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-md">{t("heroDesc")}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => goTo("rankings", "overall")}
                    className="flex items-center gap-2 bg-[#f4f4f5] hover:bg-white text-black font-bold px-5 py-3 rounded-xl transition text-xs cursor-pointer"
                  >
                    <span>{t("viewRankings")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={scrollToTierTest}
                    className="bg-[#1a2230] hover:bg-[#222c3e] text-white font-semibold px-5 py-3 rounded-xl transition text-xs cursor-pointer"
                  >
                    {t("getTierTested")}
                  </button>
                </div>
              </div>

              <div className="p-6 lg:border-l border-[#171f2b] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-zinc-300">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t("topPlayers")}</span>
                  </div>
                  <button onClick={() => goTo("rankings", "overall")} className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer transition">
                    {t("fullLeaderboard")} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <RankingTable players={rankedPlayers.slice(0, 3)} selectedMode="overall" />
              </div>
            </section>

            {/* Server bar */}
            <section className={`${CARD} rounded-2xl px-6 py-4 flex flex-wrap items-center gap-x-8 gap-y-3`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-[9px] tracking-wider text-zinc-400 uppercase leading-none">{t("serverIpLabel")}</div>
                  <IpPill />
                </div>
              </div>
              <div className="flex flex-col gap-0.5 text-xs">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <span className={`w-2 h-2 rounded-full ${status ? (status.online ? "bg-emerald-500" : "bg-red-500") : "bg-zinc-600"}`} />
                  {status ? (status.online ? t("online") : t("offline")) : "…"}
                </div>
                {status?.online && status.players !== undefined && (
                  <div className="text-zinc-400 text-[11px]">
                    {status.players.toLocaleString()} / {(status.max ?? 0).toLocaleString()} {t("playersOnline")}
                  </div>
                )}
              </div>
              <div className="text-[11px] text-zinc-400">{VERSIONS}</div>
              <button onClick={() => goTo("server-ip")} className="ml-auto text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer transition">
                {t("serverIp")} <ArrowRight className="w-3 h-3" />
              </button>
            </section>

            {/* Gamemodes */}
            <section className="flex flex-col gap-5">
              <PageHeading>{t("gamemodes")}</PageHeading>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {GAMEMODE_IDS.map((id) => {
                  const m = modeById(id)!
                  return (
                    <button
                      key={id}
                      onClick={() => goTo("rankings", id)}
                      className={`${CARD} rounded-2xl py-5 flex flex-col items-center gap-3 hover:border-[#2a3750] hover:-translate-y-0.5 transition cursor-pointer`}
                    >
                      <div className="w-14 h-14 rounded-xl bg-[#0b1018] border border-[#171f2b] flex items-center justify-center">
                        <img src={m.icon} alt={m.label} className="w-8 h-8 object-contain" />
                      </div>
                      <span className="text-xs font-bold text-zinc-200">{m.label}</span>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Get tier tested */}
            <section id="tier-test" className={`${CARD} rounded-3xl p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 bg-gradient-to-br from-[#101722] to-[#14161b]`}>
              <div className="flex flex-col justify-center gap-4">
                <h2 className="text-2xl font-extrabold">{t("getTierTestedTitle")}</h2>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">{t("getTierTestedDesc")}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <IpPill />
                  <button onClick={() => setIsInfoOpen(true)} className="flex items-center gap-1.5 bg-[#1a2230] hover:bg-[#222c3e] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition cursor-pointer">
                    {t("learnMore")} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <ol className="flex flex-col">
                {[1, 2, 3, 4, 5].map((n) => (
                  <li key={n} className="relative flex items-center gap-4 pb-5 last:pb-0 min-h-[52px]">
                    {n < 5 && <span className="absolute left-[17px] top-9 bottom-0 w-px bg-zinc-700/60" />}
                    <span className={`z-10 w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${n === 5 ? "bg-amber-500/15 text-amber-400 border border-amber-500/70" : "bg-[#1a2230] text-white"}`}>
                      {n}
                    </span>
                    <p className="text-[13px] text-zinc-300">
                      {n === 1 && (<>{t("step1Pre")} <b className="text-white">{SERVER_IP}</b> {t("step1Post")}</>)}
                      {n === 2 && (<>{t("step2Pre")} <b className="text-white">/tiertest</b> {t("step2Post")}</>)}
                      {n === 3 && t("step3")}
                      {n === 4 && t("step4")}
                      {n === 5 && t("step5")}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            {/* Tiers and points + Titles */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`${CARD} rounded-3xl p-6 flex flex-col gap-4`}>
                <div>
                  <h3 className="text-lg font-extrabold">{t("tiersAndPoints")}</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{t("tiersAndPointsDesc")}</p>
                </div>
                <div className="flex flex-col gap-2">
                  {TIER_ROWS.map((row, i) => (
                    <div key={row.name} className={`flex items-center justify-between rounded-lg px-4 py-3 ${row.row}`}>
                      <div className="flex items-center gap-2 text-sm font-bold">
                        {row.trophy ? <Trophy className={`w-4 h-4 ${row.trophy}`} /> : <span className="w-4" />}
                        <span>{row.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold">
                        <span className="flex items-center gap-1 bg-black/30 rounded-full px-2.5 py-1">
                          <ChevronsUp className="w-3 h-3" /> HT{i + 1} · {row.ht} {t("pts")}
                        </span>
                        <span className="flex items-center gap-1 bg-black/30 rounded-full px-2.5 py-1">
                          <ChevronUp className="w-3 h-3" /> LT{i + 1} · {row.lt} {t("pts")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${CARD} rounded-3xl p-6 flex flex-col gap-4`}>
                <div>
                  <h3 className="text-lg font-extrabold">{t("titles")}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{t("titlesDesc")}</p>
                </div>
                <div className="flex flex-col gap-3.5">
                  {TITLE_ROWS.map((row) => (
                    <div key={row.name} className="flex items-start gap-3">
                      <Gem className="w-5 h-5 mt-0.5 shrink-0" style={{ color: row.color }} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold" style={{ color: row.color }}>{row.name}</span>
                          <span className="text-zinc-400 text-[11px]">
                            {row.min === 0 ? `${t("under")} 10 ${t("pointsWord")}` : `${row.min}+ ${t("pointsWord")}`}
                          </span>
                        </div>
                        <div className="h-1 bg-zinc-800 rounded-full mt-1.5 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${row.width}%`, backgroundColor: row.color }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Upcoming events */}
            <section className="flex flex-col gap-5">
              <PageHeading
                action={
                  <button onClick={() => goTo("events")} className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer transition">
                    {t("allEvents")} <ArrowRight className="w-3 h-3" />
                  </button>
                }
              >
                {t("upcomingEvents")}
              </PageHeading>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {EVENTS.map((ev) => <EventCard key={ev.title} ev={ev} />)}
              </div>
            </section>

            {/* FAQ */}
            <section className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight">{t("faqTitle")}</h2>
                <p className="text-xs text-zinc-400 mt-1">{t("faqDesc")}</p>
              </div>
              <div className={`${CARD} rounded-2xl overflow-hidden divide-y divide-[#171f2b]`}>
                {FAQ_KEYS.map((n) => {
                  const open = openFaq === n
                  return (
                    <div key={n} className={`relative ${open ? "bg-[#121923]" : ""}`}>
                      {open && <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-amber-400" />}
                      <button
                        onClick={() => setOpenFaq(open ? null : n)}
                        className="w-full flex items-center gap-4 px-6 py-5 text-left cursor-pointer"
                      >
                        <span className={`text-[11px] font-semibold w-5 ${open ? "text-amber-400" : "text-zinc-500"}`}>{String(n).padStart(2, "0")}</span>
                        <span className="flex-1 text-sm font-semibold text-white">{t(`faq${n}q`)}</span>
                        <span className={`w-7 h-7 rounded-md flex items-center justify-center ${open ? "bg-amber-500/15 text-amber-400" : "bg-[#1a2230] text-zinc-300"}`}>
                          {open ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </span>
                      </button>
                      {open && (
                        <div className="px-6 pb-6 pl-[68px] max-w-3xl">
                          <p className="text-[13px] text-zinc-400 leading-relaxed">{t(`faq${n}a`)}</p>
                          <button onClick={() => setIsInfoOpen(true)} className="mt-3 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer">
                            {t("learnMore")} <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          </div>
        )}

        {/* ===== RANKINGS ===== */}
        {activeTab === "rankings" && (
          <div className="flex flex-col">
            {/* Вкладки режимов */}
            <div className="flex items-end gap-0.5 overflow-x-auto scrollbar-none relative z-10">
              {MODES.map((mode) => {
                const isActive = selectedMode === mode.id
                return (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`w-[100px] shrink-0 flex flex-col items-center gap-1.5 pt-3 pb-2.5 rounded-t-2xl border border-b-0 transition cursor-pointer ${
                      isActive
                        ? "bg-[#0f151e] border-[#171f2b] text-white border-b-2 border-b-white"
                        : "bg-[#0c1119] border-[#141b26] text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <img src={mode.icon} alt={mode.label} className={`w-6 h-6 object-contain ${isActive ? "" : "opacity-50"}`} />
                    <span className="text-xs font-bold">{mode.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Контент режима */}
            <div className={`${CARD} rounded-3xl rounded-tl-none p-6 -mt-px`}>
              {selectedMode === "overall" && (
                <>
                  <CardHeader
                    title={t("overallTitle")}
                    subtitle={`${rankedPlayers.length.toLocaleString()} ${t("playersRanked")}`}
                  />
                  <RankingTable players={rankedPlayers} selectedMode={selectedMode} />
                </>
              )}

              {selectedMode === "LTMs" && (
                <>
                  <CardHeader title={t("ltmTitle")} />
                  <div className="py-8 text-center flex flex-col items-center gap-3">
                    <h2 className="text-xl font-bold text-white">{t("ltmComing")}</h2>
                    <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">{t("ltmDesc")}</p>
                  </div>
                  <div className="h-16" />
                </>
              )}

              {selectedMode !== "overall" && selectedMode !== "LTMs" && (
                <>
                  <CardHeader title={modeById(selectedMode)?.title || selectedMode} subtitle={t("tierRange")} />
                  <KitTier selectedKit={selectedMode} />
                </>
              )}
            </div>
          </div>
        )}

{/* ===== SERVER IP ===== */}
        {activeTab === "server-ip" && (
          <div className="flex flex-col gap-10 pb-4">
            {/* Верхний баннер с IP и статусом сервера */}
            <section className={`${CARD} rounded-3xl p-8 md:p-10 bg-gradient-to-br from-[#131924] via-[#0f151e] to-[#0f151e] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8`}>
              <div className="flex flex-col gap-5 max-w-xl">
                <div className="flex items-center gap-2.5 text-[11px] font-bold tracking-widest text-amber-400 uppercase">
                  <span className="w-4 h-[2px] bg-amber-400 inline-block" />
                  <span>MINECRAFT SERVER</span>
                </div>
                <h1 className="text-4xl md:text-[42px] font-extrabold text-white tracking-tight leading-none">
                  IncTiers Server IP
                </h1>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  The IncTiers Minecraft server IP is <span className="text-white font-bold">{SERVER_IP}</span>. Java players can join on any version from 1.21 - 26.3, and Bedrock players can join on port 19132.
                </p>
                <div className="pt-1">
                  <IpPill />
                </div>
              </div>

              {/* Правая карточка SERVER STATUS */}
              <div className="bg-[#0b1018] border border-[#171f2b] rounded-2xl px-6 py-5 flex items-center gap-5 w-full lg:w-auto lg:min-w-[340px]">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/15 flex items-center justify-center shrink-0">
                  <Trophy className="w-9 h-9 text-amber-400" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                    SERVER STATUS
                  </div>
                  <div className="flex items-center gap-2 text-lg font-extrabold text-white">
                    <span className={`w-2.5 h-2.5 rounded-full ${status ? (status.online ? "bg-emerald-500" : "bg-red-500") : "bg-emerald-500"}`} />
                    <span>{status ? (status.online ? t("online") : t("offline")) : t("online")}</span>
                  </div>
                  <div className="text-xs text-zinc-400">
                    {status?.online && status.players !== undefined
                      ? `${status.players.toLocaleString()} / ${(status.max ?? 10000).toLocaleString()} ${t("playersOnline")}`
                      : `2,583 / 10,000 ${t("playersOnline")}`}
                  </div>
                </div>
              </div>
            </section>

            {/* 4 карточки характеристик */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`${CARD} rounded-2xl px-6 py-5 flex flex-col gap-1.5`}>
                <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                  {t("serverAddress")}
                </span>
                <span className="text-base font-extrabold text-white">{SERVER_IP}</span>
              </div>
              <div className={`${CARD} rounded-2xl px-6 py-5 flex flex-col gap-1.5`}>
                <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                  {t("javaEdition")}
                </span>
                <span className="text-base font-extrabold text-white">1.21 - 26.3</span>
              </div>
              <div className={`${CARD} rounded-2xl px-6 py-5 flex flex-col gap-1.5`}>
                <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                  {t("bedrockEdition")}
                </span>
                <span className="text-base font-extrabold text-white">Port 19132</span>
              </div>
              <div className={`${CARD} rounded-2xl px-6 py-5 flex flex-col gap-1.5`}>
                <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                  TIER TESTS
                </span>
                <span className="text-base font-extrabold text-white">/tiertest</span>
              </div>
            </section>

            {/* Инструкции: How to join */}
            <section className="flex flex-col gap-5">
              <PageHeading>How to join the IncTiers server</PageHeading>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Java Edition */}
                <div className={`${CARD} rounded-2xl p-7 flex flex-col gap-5`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#161d2a] border border-[#1f293a] flex items-center justify-center">
                      <img src="/vanilla.svg" alt="Java" className="w-5 h-5 object-contain" />
                    </div>
                    <h3 className="text-base font-extrabold text-white">Java Edition</h3>
                  </div>
                  <ol className="flex flex-col gap-3.5 text-[13px] text-zinc-400">
                    <li className="flex items-center gap-3.5">
                      <span className="w-6 h-6 rounded-md bg-[#1a2230] text-zinc-200 font-bold text-xs flex items-center justify-center shrink-0">1</span>
                      <span>Open Minecraft: Java Edition (any version from 1.21 - 26.3).</span>
                    </li>
                    <li className="flex items-center gap-3.5">
                      <span className="w-6 h-6 rounded-md bg-[#1a2230] text-zinc-200 font-bold text-xs flex items-center justify-center shrink-0">2</span>
                      <span>Click Multiplayer, then Add Server.</span>
                    </li>
                    <li className="flex items-center gap-3.5">
                      <span className="w-6 h-6 rounded-md bg-[#1a2230] text-zinc-200 font-bold text-xs flex items-center justify-center shrink-0">3</span>
                      <span>Enter <b className="text-white">{SERVER_IP}</b> as the Server Address and click Done.</span>
                    </li>
                    <li className="flex items-center gap-3.5">
                      <span className="w-6 h-6 rounded-md bg-[#1a2230] text-zinc-200 font-bold text-xs flex items-center justify-center shrink-0">4</span>
                      <span>Select IncTiers in the server list and click Join Server.</span>
                    </li>
                  </ol>
                </div>

                {/* Bedrock Edition */}
                <div className={`${CARD} rounded-2xl p-7 flex flex-col gap-5`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#161d2a] border border-[#1f293a] flex items-center justify-center">
                      <img src="/smp.svg" alt="Bedrock" className="w-5 h-5 object-contain" />
                    </div>
                    <h3 className="text-base font-extrabold text-white">Bedrock Edition</h3>
                  </div>
                  <ol className="flex flex-col gap-3.5 text-[13px] text-zinc-400">
                    <li className="flex items-center gap-3.5">
                      <span className="w-6 h-6 rounded-md bg-[#1a2230] text-zinc-200 font-bold text-xs flex items-center justify-center shrink-0">1</span>
                      <span>Open Minecraft: Bedrock Edition and go to Play, then Servers.</span>
                    </li>
                    <li className="flex items-center gap-3.5">
                      <span className="w-6 h-6 rounded-md bg-[#1a2230] text-zinc-200 font-bold text-xs flex items-center justify-center shrink-0">2</span>
                      <span>Scroll down and tap Add Server.</span>
                    </li>
                    <li className="flex items-center gap-3.5">
                      <span className="w-6 h-6 rounded-md bg-[#1a2230] text-zinc-200 font-bold text-xs flex items-center justify-center shrink-0">3</span>
                      <span>Enter <b className="text-white">{SERVER_IP}</b> as the Server Address and <b className="text-white">19132</b> as the Port.</span>
                    </li>
                    <li className="flex items-center gap-3.5">
                      <span className="w-6 h-6 rounded-md bg-[#1a2230] text-zinc-200 font-bold text-xs flex items-center justify-center shrink-0">4</span>
                      <span>Save, then tap IncTiers in your server list to join.</span>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Аккордеон Server questions */}
            <section className="flex flex-col items-center gap-6 pt-2">
              <h2 className="text-xl font-extrabold text-white tracking-tight text-center">
                Server questions
              </h2>

              <div className={`${CARD} w-full max-w-[760px] rounded-2xl overflow-hidden divide-y divide-[#171f2b]`}>
                {[
                  {
                    q: "What is the IncTiers server IP?",
                    a: `The server IP is ${SERVER_IP}. Java Edition uses the default port 25565, so you don't need to add a port. On Bedrock Edition, use port 19132.`,
                  },
                  {
                    q: "Which Minecraft versions can join?",
                    a: "Java Edition players can join on any version from 1.21 - 26.3. Bedrock players should use an up-to-date version of Bedrock Edition.",
                  },
                  {
                    q: "Can I join from Bedrock Edition?",
                    a: `Yes. Bedrock players on Windows, phones and tablets can join at ${SERVER_IP} on port 19132, and they don't need a Java account.`,
                  },
                  {
                    q: "Can I join on Xbox, PlayStation or Switch?",
                    a: "Consoles don't let you add custom servers directly, so the easiest way to play on Bedrock is from Windows, a phone or a tablet.",
                  },
                  {
                    q: "Why can't I connect?",
                    a: `Check that you typed ${SERVER_IP} correctly and, on Bedrock, that the port is 19132. If the status on this page shows the server as offline, try again later.`,
                  },
                ].map((item, idx) => {
                  const n = idx + 1
                  const open = openFaq === n
                  return (
                    <div
                      key={n}
                      className={`relative transition-colors ${
                        open ? "bg-gradient-to-r from-[#1c1a15] via-[#141922] to-[#121822]" : ""
                      }`}
                    >
                      {open && <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-amber-400" />}
                      <button
                        onClick={() => setOpenFaq(open ? null : n)}
                        className="w-full flex items-center gap-4 px-6 py-5 text-left cursor-pointer"
                      >
                        <span className={`text-[11px] font-semibold w-5 ${open ? "text-amber-400" : "text-zinc-500"}`}>
                          {String(n).padStart(2, "0")}
                        </span>
<span className="flex-1 text-sm font-bold text-white">{item.q}</span>
                        <span
                          className={`w-7 h-7 rounded-md flex items-center justify-center transition ${
                            open ? "bg-amber-500/20 text-amber-400" : "bg-[#1a2230] text-zinc-400 hover:text-white"
                          }`}
                        >
                          {open ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </span>
                      </button>
                      {open && (
                        <div className="px-6 pb-6 pl-[60px] pr-12">
                          <p className="text-[13px] text-zinc-400 leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <button
                onClick={() => goTo("rankings", "overall")}
                className="mt-2 flex items-center gap-2 bg-[#f4f4f5] hover:bg-white text-black font-bold px-6 py-3.5 rounded-xl transition text-xs cursor-pointer shadow-lg"
              >
                <span>Explore the rankings</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </section>
          </div>
        )}

        {/* ===== EVENTS ===== */}
        {activeTab === "events" && (
          <div className="flex flex-col gap-6 pb-4">
            <PageHeading>{t("upcomingEvents")}</PageHeading>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {EVENTS.map((ev) => <EventCard key={ev.title} ev={ev} />)}
            </div>
          </div>
        )}

        {/* ===== FOOTER ===== */}
        <footer className={`${CARD} rounded-2xl px-8 py-8 mb-8 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8`}>
          <div className="flex flex-col gap-3">
            <img src="/logo.png" alt="IncTiers Logo" className="h-9 w-auto object-contain self-start" />
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">{t("footerDesc")}</p>
          </div>
          <div className="flex flex-col gap-2 text-xs">
            {FOOTER_COL_1.map((id) => (
              <button key={id} onClick={() => goTo("rankings", id)} className="text-left text-zinc-400 hover:text-white transition cursor-pointer">
                {modeById(id)?.label || id}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-xs">
            {FOOTER_COL_2.map((id) => (
              <button key={id} onClick={() => goTo("rankings", id)} className="text-left text-zinc-400 hover:text-white transition cursor-pointer">
                {modeById(id)?.label || id}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <button onClick={() => goTo("server-ip")} className="text-left text-zinc-400 hover:text-white transition cursor-pointer">{t("serverIp")}</button>
            <button onClick={() => goTo("events")} className="text-left text-zinc-400 hover:text-white transition cursor-pointer">{t("events")}</button>
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition">Discord</a>
          </div>
        </footer>
      </div>

      {/* ===== INFORMATION MODAL ===== */}
      {isInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsInfoOpen(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto bg-[#0b0e14] border border-zinc-800/80 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setIsInfoOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer border border-zinc-800"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-extrabold mb-1">{t("tiersAndPoints")}</h3>
            <p className="text-xs text-zinc-400 mb-4">{t("tiersAndPointsDesc")}</p>
            <div className="flex flex-col gap-2 mb-6">
              {TIER_ROWS.map((row) => (
                <div key={row.name} className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-bold ${row.row}`}>
                  <span>{row.name}</span>
                  <span>HT {row.ht} · LT {row.lt}</span>
                </div>
              ))}
            </div>
            <h3 className="text-lg font-extrabold mb-1">{t("titles")}</h3>
            <p className="text-xs text-zinc-400 mb-4">{t("titlesDesc")}</p>
            <div className="flex flex-col gap-2">
              {TITLE_ROWS.map((row) => (
                <div key={row.name} className="flex items-center justify-between text-xs">
                  <span className="font-bold" style={{ color: row.color }}>{row.name}</span>
                  <span className="text-zinc-400">{row.min}+</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} isOpen={!!selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
    </main>
  )
}
