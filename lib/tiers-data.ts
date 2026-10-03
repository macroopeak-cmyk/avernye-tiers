export type Mode = string

export type StaffRole = "Owner" | "Co-Owner" | "Admin" | "Moder" | "Tester"

export interface Player {
  id: number
  username: string
  skinUsername?: string
  region: "EU" | "NA" | "CIS" | "AS"
  tiers: Record<string, string>
  staffRole?: StaffRole
}

export interface RankedPlayer {
  id: number
  username: string
  skinUsername?: string
  region: "EU" | "NA" | "CIS" | "AS"
  tiers: Record<string, string>
  points: number
  rank: number
  staffRole?: StaffRole
}

export const INITIAL_PLAYERS: Player[] = [
  {
    id: 1,
    username: "ItzRealZevs",
    region: "EU",
    tiers: { 
      Sword: "HT3", 
      Vanilla: "HT1", 
      UHC: "HT2", 
      Axe: "HT2", 
      NethOP: "HT1", 
      Pot: "HT1", 
      SMP: "HT1", 
      NethPot: "HT1", 
      Mace: "LT2" 
    },
  },
  {
    id: 2,
    username: "x_q",
    region: "EU",
    tiers: { Sword: "HT3", Vanilla: "HT3", UHC: "HT4", SMP: "HT5" },
  },
  {
    id: 3,
    username: "Stqfe",
    region: "EU",
    tiers: { Sword: "HT3", Vanilla: "HT2", UHC: "HT4", SMP: "HT5" },
  },
  {
    id: 4,
    username: "vlad_pvp",
    region: "NA",
    tiers: { Sword: "HT2", Vanilla: "HT4", UHC: "HT4", SMP: "HT5" },
  },
  {
    id: 5,
    username: "Novawwww",
    skinUsername: "Marlowww", // Скин будет браться у Marlowww
    region: "EU",
    tiers: { Sword: "LT1", Vanilla: "HT1", UHC: "LT1", Axe: "LT1", NethOP: "HT1", Pot: "HT1", SMP: "HT4", NethPot: "LT1", Mace: "LT1" },
  },
  {
    id: 6,
    username: "FrostByte",
    skinUsername: "Swight", // Скин будет браться у Swight
    region: "NA",
    tiers: { Sword: "HT1", Vanilla: "HT3", UHC: "HT3", Axe: "HT1", NethOP: "HT4", Pot: "HT2", SMP: "HT3", NethPot: "HT3", Mace: "HT4" },
  },
  {
    id: 7,
    username: "ShadowMC",
    region: "EU",
    tiers: { Sword: "HT3", Vanilla: "HT3", UHC: "HT3", SMP: "HT5" },
  },
  {
    id: 1849,
    username: "Mayowl1234561111",
    region: "EU",
    tiers: { Sword: "HT4",Vanilla: "LT5" },
  },
  {
    id: 8,
    username: "Nexos",
    region: "NA",
    tiers: { Sword: "HT4", Vanilla: "HT4", UHC: "HT2", Axe: "HT4", NethOP: "HT3", Pot: "HT4", SMP: "HT3", NethPot: "HT4", Mace: "HT2" },
  },
  {
    id: 9,
    username: "BlazeFire",
    region: "EU",
    tiers: { Sword: "HT2", Vanilla: "HT4", UHC: "HT4", Axe: "HT3", NethOP: "HT5", Pot: "HT3", SMP: "HT5", NethPot: "HT3", Mace: "HT5" },
  },
  {
    id: 10,
    username: "Zenith",
    region: "NA",
    tiers: { Sword: "HT5", Vanilla: "HT5", UHC: "HT3", Axe: "HT5", NethOP: "HT4", Pot: "HT5", SMP: "HT4", NethPot: "HT5", Mace: "HT4" },
  },
  {
    id: 42,
    username: "rdfe",
    region: "EU",
    tiers: { Vanilla: "HT5", SMP: "HT5", Sword: "HT4", UHC: "HT5" },
  },
  {
    id: 70,
    username: "Gk_0",
    region: "EU",
    tiers: { Mace: "HT5", Vanilla: "LT3" },
  },
  {
    id: 71,
    username: "Kylaz",
    region: "EU",
    staffRole: "Tester",
    tiers: { Sword: "HT1", NethPot: "HT2", Vanilla: "HT3" },
  },
  {
    id: 72,
    username: "Rivise",
    region: "EU",
    staffRole: "Owner",
    tiers: { Vanilla: "LT4", Pot: "HT3", Axe: "HT4", NethOP: "LT2", UHC: "LT2", Sword: "LT3" },
  },
  {
    id: 73,
    username: "Satosh1a",
    region: "EU",
    staffRole: "Moder",
    tiers: { Sword: "HT2" },
  },
  {
    id: 105,
    username: "MrD3f4ult",
    region: "EU",
    staffRole: "Tester",
    tiers: { NethPot: "LT2", Mace: "LT3", Sword: "HT4", Vanilla: "HT2", Pot: "HT5", Axe: "HT4", NethOP: "LT3" },
  },
  {
    id: 106,
    username: "WhiteGolem",
    region: "EU",
    tiers: { Vanilla: "HT3" },
  },
  {
    id: 107,
    username: "rxvxn0",
    region: "EU",
    tiers: { Vanilla: "LT2", Sword: "HT1", Axe: "HT3", NethOP: "HT4" },
  },
  {
    id: 108,
    username: "Oneunubore",
    region: "EU",
    tiers: { Axe: "LT3", Sword: "LT3", Vanilla: "LT4", UHC: "HT4", Mace: "LT4", Spear: "HT4", Cart: "HT4", Pot: "HT4", NethPot: "HT4", },
  },
  {
    id: 109,
    username: "ChaosF1IIIeP",
    region: "EU",
    tiers: { },
  },
  {
    id: 111,
    username: "tuntutntun",
    region: "EU",
    tiers: { Vanilla: "HT5",Axe: "HT4",Sword: "HT5",NethPot: "LT3",Mace: "LT3", NethOP: "HT4",  },
    staffRole: "Tester",
  },
  {
    id: 112,
    username: "wreq",
    region: "EU",
    tiers: { Sword: "HT5" },
  },
  {
    id: 74,
    username: "NumaniaVSBG",
    region: "EU",
    tiers: { SMP: "HT3", Sword: "HT3", Vanilla: "HT4" },
  },
  {
    id: 75,
    username: "Snoopyk0909",
    region: "EU",
    tiers: { HT4: "HT4", Sword: "HT4" },
  },
  {
    id: 76,
    username: "danik228335",
    region: "EU",
    tiers: { UHC: "LT2", Mace: "HT4" },
  },
  {
    id: 76,
    username: "Ekho017",
    region: "EU",
    tiers: { Vanilla: "LT1", Sword: "HT4", NethPot: "LT3", Pot: "LT4"},
    staffRole: "Co-Owner",
  },
  {
    id: 77,
    username: "sadpigeone_",
    region: "EU",
    staffRole: "Co-Owner",
    tiers: {
      Cart: "LT3",
      Spear: "HT3",
      Vanilla: "HT4",
      UHC: "LT2",
      SMP: "LT2",
      Axe: "HT1",
      NethOP: "HT3",
      Mace: "LT5",
      Sword: "HT5",
      NethPot: "LT4",
      Pot: "LT3",
      OP: "HT3",
    },
  },
  {
    id: 78,
    username: "reastryy",
    region: "EU",
    tiers: {
      Cart: "LT3",
      Spear: "HT3",
      Vanilla: "HT3",
      UHC: "HT3",
      SMP: "HT3",
      Axe: "HT2",
      NethOP: "HT1",
      Mace: "HT3",
      Sword: "HT3",
      NethPot: "LT2",
      Pot: "HT3"
    },
  },
  {
    id: 79,
    username: "targetpvpzab",
    region: "EU",
    tiers: { HT4: "HT4", Vanilla: "HT4" },
  },
  {
    id: 80,
    username: "ZaberyKaSebe",
    region: "EU",
    staffRole: "Tester",
    tiers: {
      Vanilla: "HT4",
      UHC: "LT2",
      Pot: "LT3",
      NethOP: "HT3",
      NethPot: "HT3",
      SMP: "LT2",
      Sword: "HT4",
      Axe: "LT2",
      Mace: "LT2",
      Cart: "HT3",
      Spear: "HT3",
    },
  },
  {
    id: 81,
    username: "artemka12125",
    region: "EU",
    tiers: { HT3: "HT3", Mace: "HT3" },
  },
  {
    id: 82,
    username: "eraq016",
    region: "EU",
    staffRole: "Tester",
    tiers: { Sword: "HT3", Vanilla: "HT3" },
  },
  {
    id: 83,
    username: "hen9i",
    region: "EU",
    tiers: { Spear: "LT3" },
  },
  {
    id: 90,
    username: "PixelVortex",
    region: "EU",
    tiers: { Sword: "HT4", Vanilla: "HT4", UHC: "HT5" },
  },
  {
    id: 91,
    username: "SkyBreaker",
    region: "NA",
    tiers: { Axe: "HT4", SMP: "LT3", Pot: "HT5" },
  },
  {
    id: 92,
    username: "QuantumPvP",
    region: "EU",
    tiers: { Vanilla: "LT3", UHC: "LT4", Mace: "HT5" },
  },
  {
    id: 93,
    username: "ZenithLite",
    region: "NA",
    tiers: { Sword: "HT4", NethPot: "LT3" },
  },
  {
    id: 94,
    username: "AshRunner",
    region: "EU",
    tiers: { SMP: "HT4", Vanilla: "LT4", Pot: "HT5" },
  },
  {
    id: 95,
    username: "FrostStep",
    region: "NA",
    tiers: { UHC: "HT4", Axe: "LT4", Sword: "HT5" },
  },
  {
    id: 96,
    username: "ShadowDrift",
    region: "EU",
    tiers: { Vanilla: "HT4", Mace: "LT3", NethOP: "HT5" },
  },
  {
    id: 97,
    username: "EchoStrike",
    region: "NA",
    tiers: { Sword: "LT3", UHC: "LT3", Vanilla: "HT5" },
  },
  {
    id: 98,
    username: "NeonDash",
    region: "EU",
    tiers: { Pot: "HT4", SMP: "LT4", Axe: "HT5" },
  },
  {
    id: 99,
    username: "BlazeWalker",
    region: "NA",
    tiers: { Vanilla: "HT4", Sword: "LT4", NethPot: "HT5" },
  },
  {
    id: 100,
    username: "CometPvP",
    region: "EU",
    tiers: { UHC: "HT4", Mace: "LT4", SMP: "HT5" },
  },
  {
    id: 101,
    username: "VortexGuard",
    region: "NA",
    tiers: { Axe: "HT4", Vanilla: "LT3", Pot: "HT5" },
  },
  {
    id: 102,
    username: "TidalWave",
    region: "EU",
    tiers: { Sword: "LT3", UHC: "HT4", Vanilla: "HT5" },
  },
  {
    id: 103,
    username: "SolarKnight",
    region: "NA",
    tiers: { SMP: "HT4", NethOP: "LT4", Sword: "HT5" },
  },
  {
    id: 104,
    username: "RiftWalker",
    region: "EU",
    tiers: { Vanilla: "LT3", Axe: "LT3", Mace: "HT5" },
  },
  {
    id: 50,
    username: "SwiftStrike",
    region: "EU",
    tiers: { Sword: "HT2", Vanilla: "HT3", UHC: "HT4", SMP: "HT5" },
  },
  {
    id: 51,
    username: "PixelKnight",
    region: "NA",
    tiers: { Sword: "HT3", Vanilla: "HT2", Pot: "HT3", Axe: "HT5" },
  },
  {
    id: 52,
    username: "VoidWalker",
    region: "EU",
    tiers: { UHC: "HT2", NethOP: "HT3", SMP: "HT4", Vanilla: "HT5" },
  },
  {
    id: 53,
    username: "StormBringer",
    region: "NA",
    tiers: { Sword: "HT3", Pot: "HT2", Mace: "HT4", Axe: "HT4" },
  },
  {
    id: 54,
    username: "GhostRider",
    region: "EU",
    tiers: { Vanilla: "HT2", Sword: "HT3", NethPot: "HT3", SMP: "HT5" },
  },
  {
    id: 55,
    username: "LunarEclipse",
    region: "NA",
    tiers: { UHC: "HT3", Sword: "HT2", Axe: "HT3", Pot: "HT5" },
  },
  {
    id: 56,
    username: "ApexPredator",
    region: "EU",
    tiers: { Sword: "HT2", Vanilla: "HT4", NethOP: "HT3", Mace: "HT5" },
  },
  {
    id: 57,
    username: "Starlight",
    region: "NA",
    tiers: { Vanilla: "HT3", UHC: "HT2", SMP: "HT3", Axe: "HT5" },
  },
  {
    id: 58,
    username: "IronGuard",
    region: "EU",
    tiers: { Sword: "HT3", Axe: "HT2", Pot: "HT3", NethPot: "HT4" },
  },
  {
    id: 59,
    username: "SilentKill",
    region: "NA",
    tiers: { UHC: "HT3", Vanilla: "HT3", NethOP: "HT3", Sword: "HT4" },
  },
  {
    id: 60,
    username: "NeonBlade",
    region: "EU",
    tiers: { Sword: "HT2", SMP: "HT3", Axe: "HT3", Vanilla: "HT5" },
  },
  {
    id: 61,
    username: "EchoPvP",
    region: "NA",
    tiers: { Vanilla: "HT2", UHC: "HT3", Pot: "HT3", Mace: "HT5" },
  },
  {
    id: 62,
    username: "CrimsonWolf",
    region: "EU",
    tiers: { Sword: "HT3", NethOP: "HT2", SMP: "HT4", UHC: "HT5" },
  },
  {
    id: 63,
    username: "VortexMC",
    region: "NA",
    tiers: { Sword: "HT3", Vanilla: "HT3", Axe: "HT3", NethPot: "HT4" },
  },
  {
    id: 64,
    username: "SolarFlare",
    region: "EU",
    tiers: { UHC: "HT2", Sword: "HT3", Pot: "HT4", SMP: "HT5" },
  },
  {
    id: 65,
    username: "Titanium",
    region: "NA",
    tiers: { Vanilla: "HT3", Axe: "HT2", NethOP: "HT4", Mace: "HT4" },
  },
  {
    id: 66,
    username: "AquaMarine",
    region: "EU",
    tiers: { Sword: "HT3", UHC: "HT3", NethPot: "HT3", Vanilla: "HT4" },
  },
  {
    id: 67,
    username: "NightMare",
    region: "NA",
    tiers: { Sword: "HT2", Pot: "HT3", SMP: "HT3", Axe: "HT5" },
  },
  {
    id: 68,
    username: "Hyperion",
    region: "EU",
    tiers: { Vanilla: "HT2", NethOP: "HT3", UHC: "HT4", Mace: "HT5" },
  },
  {
    id: 69,
    username: "Blizzard",
    region: "NA",
    tiers: { Sword: "HT3", Axe: "HT3", NethPot: "HT3", SMP: "HT4" },
  },
  {
    id: 113,
    username: "MrBaron",
    region: "NA",
    tiers: { Sword: "HT5" },
  },
  {
    id: 114,
    username: "dulikemy",
    region: "NA",
    tiers: { Sword: "HT5", Mace: "LT4" },
  },
  {
    id: 201,
    username: "KiteRunner",
    region: "EU",
    tiers: { Sword: "HT3", Vanilla: "LT3" },
  },
  {
    id: 202,
    username: "AuraMaster",
    region: "NA",
    tiers: { UHC: "LT2", SMP: "HT5" },
  },
  {
    id: 203,
    username: "Zetox",
    region: "EU",
    tiers: { Axe: "HT3", Pot: "LT3" },
  },
  {
    id: 204,
    username: "Colds",
    region: "NA",
    tiers: { NethPot: "HT3", Vanilla: "HT5" },
  },
  {
    id: 205,
    username: "StrixPvP",
    region: "EU",
    tiers: { Sword: "LT2", UHC: "HT5" },
  },
  {
    id: 206,
    username: "Glitcher",
    region: "NA",
    tiers: { Vanilla: "HT3", Mace: "LT4" },
  },
  {
    id: 207,
    username: "Prism",
    region: "EU",
    tiers: { NethOP: "HT3", SMP: "HT5" },
  },
  {
    id: 208,
    username: "Wavelet",
    region: "NA",
    tiers: { Sword: "HT3", Axe: "LT4" },
  },
  {
    id: 209,
    username: "Breeze",
    region: "EU",
    tiers: { Pot: "HT3", Vanilla: "HT5" },
  },
  {
    id: 210,
    username: "Crux",
    region: "NA",
    tiers: { UHC: "HT3", NethPot: "LT4" },
  },
  {
    id: 211,
    username: "Fable",
    region: "EU",
    tiers: { Sword: "LT2", SMP: "LT3" },
  },
  {
    id: 212,
    username: "Zenon",
    region: "NA",
    tiers: { Axe: "HT3", Vanilla: "LT4" },
  },
  {
    id: 213,
    username: "Hollow",
    region: "EU",
    tiers: { NethOP: "LT2", Sword: "HT5" },
  },
  {
    id: 214,
    username: "Valiant",
    region: "NA",
    tiers: { UHC: "HT3", Pot: "HT5" },
  },
  {
    id: 215,
    username: "Drift",
    region: "EU",
    tiers: { Vanilla: "HT3", SMP: "HT5" },
  },
  {
    id: 216,
    username: "Saber",
    region: "NA",
    tiers: { Sword: "HT3", Mace: "HT5" },
  },
  {
    id: 217,
    username: "Kryptic",
    region: "EU",
    tiers: { Axe: "LT2", NethPot: "HT5" },
  },
  {
    id: 218,
    username: "Flint",
    region: "NA",
    tiers: { Pot: "HT3", UHC: "LT4" },
  },
  {
    id: 219,
    username: "Rogue",
    region: "EU",
    tiers: { NethOP: "HT3", Vanilla: "HT5" },
  },
  {
    id: 220,
    username: "Ashen",
    region: "NA",
    tiers: { Sword: "LT2", Axe: "HT5" },
  },
  { id: 301, username: "ShadowPvP", region: "CIS",
    tiers: { Vanilla: "HT2", UHC: "LT2", Pot: "HT3" }
  },
  { id: 302, username: "BlazeRider", region: "EU",
    tiers: { Vanilla: "HT2", UHC: "HT2" }
  },
  { id: 303, username: "FrostBite", region: "NA",
    tiers: { Pot: "HT2", NethOP: "LT2", Sword: "HT4" }
  },
  { id: 304, username: "NeonStrike", region: "CIS",
    tiers: { UHC: "HT2", NethPot: "HT3" }
  },
  { id: 305, username: "VortexMC2", region: "EU",
    tiers: { Vanilla: "LT2", Axe: "HT2" }
  },
  { id: 306, username: "StormBreaker", region: "CIS",
    tiers: { SMP: "HT1" }
  },
  { id: 307, username: "NightWolf", region: "AS",
    tiers: { Pot: "LT1", Mace: "HT3" }
  },
  { id: 308, username: "QuantumGamer", region: "EU",
    tiers: { NethOP: "HT2", Cart: "LT2" }
  },
  { id: 309, username: "ApexPredator2", region: "NA",
    tiers: { Spear: "HT1" }
  },
  { id: 310, username: "CyberKnight", region: "CIS",
    tiers: { Vanilla: "HT2", UHC: "HT3" }
  },
  { id: 311, username: "ZenithPvP", region: "EU",
    tiers: { Pot: "LT2", Sword: "LT2", Axe: "HT4" }
  },
  { id: 312, username: "TitaniumX", region: "CIS",
    tiers: { NethPot: "LT1", SMP: "HT4" }
  },
  { id: 313, username: "GhostRider2", region: "NA",
    tiers: { Vanilla: "HT3", UHC: "HT2", NethOP: "HT4" }
  },
  { id: 314, username: "Phoenix99", region: "AS",
    tiers: { Pot: "HT2", Mace: "LT2" }
  },
  { id: 315, username: "VoidWalker2", region: "EU",
    tiers: { Sword: "HT2", Spear: "HT3" }
  },
  { id: 316, username: "SolarFlare2", region: "CIS",
    tiers: { Vanilla: "HT2", Cart: "HT4" }
  },
  { id: 317, username: "EchoSniper", region: "NA",
    tiers: { UHC: "LT2", Axe: "HT2" }
  },
  { id: 318, username: "AlphaWolf", region: "CIS",
    tiers: { Pot: "LT1", SMP: "HT5" }
  },
  { id: 319, username: "BetaTester", region: "EU",
    tiers: { NethOP: "LT2", NethPot: "HT3" }
  },
  { id: 320, username: "GammaRay", region: "AS",
    tiers: { Vanilla: "HT2", Sword: "HT3" }
  },
  { id: 321, username: "DeltaForce", region: "CIS",
    tiers: { UHC: "HT2", Axe: "HT3" }
  },
  { id: 322, username: "OmegaStrik", region: "NA",
    tiers: { Pot: "LT2", Mace: "LT2" }
  },
  { id: 323, username: "SigmaMale", region: "EU",
    tiers: { NethOP: "HT2", Cart: "HT3" }
  },
  { id: 324, username: "KiraLight", region: "CIS",
    tiers: { Vanilla: "LT2", Spear: "LT2" }
  },
  { id: 325, username: "LelouchVi", region: "AS",
    tiers: { UHC: "HT1" }
  },
  { id: 326, username: "SaitamaOne", region: "CIS",
    tiers: { Pot: "LT1", Vanilla: "HT5" }
  },
  { id: 327, username: "GojoSatoru", region: "EU",
    tiers: { NethOP: "LT1", Sword: "HT5" }
  },
  { id: 328, username: "NarutoUzum", region: "NA",
    tiers: { NethPot: "HT2", Axe: "LT2" }
  },
  { id: 329, username: "SasukeUchiha", region: "CIS",
    tiers: { SMP: "LT1", Mace: "HT4" }
  },
  { id: 330, username: "KakashiHat", region: "AS",
    tiers: { Cart: "HT2", Spear: "LT2" }
  },
  { id: 331, username: "TanjiroKam", region: "EU",
    tiers: { Vanilla: "HT2", UHC: "HT3" }
  },
  { id: 332, username: "NezukoKam", region: "CIS",
    tiers: { Pot: "LT2", NethOP: "HT3" }
  },
  { id: 333, username: "ZenitsuAg", region: "NA",
    tiers: { NethPot: "HT2", Sword: "HT3" }
  },
  { id: 334, username: "InosukeHash", region: "CIS",
    tiers: { SMP: "LT2", Axe: "HT3" }
  },
  { id: 335, username: "AstaBlack", region: "EU",
    tiers: { Mace: "HT2", Cart: "HT3" }
  },
  { id: 336, username: "YunoGrin", region: "AS",
    tiers: { Spear: "LT1" }
  },
  { id: 337, username: "NoelleSilva", region: "CIS",
    tiers: { Vanilla: "HT2", Pot: "LT2" }
  },
  { id: 338, username: "LuffyMonkey", region: "NA",
    tiers: { UHC: "LT1", NethOP: "HT5" }
  },
  { id: 339, username: "ZoroRonoa", region: "CIS",
    tiers: { Sword: "LT1", Axe: "HT4" }
  },
  { id: 340, username: "SanjiVinsm", region: "EU",
    tiers: { NethPot: "HT2", SMP: "HT3" }
  },
  {
    id: 341,
    username: "riss",
    region: "EU",
    staffRole: "Tester",
    tiers: { Sword: "HT1", Pot: "HT3" }
  },
  {
    id: 411,
    username: "cherno",
    region: "EU",
    tiers: {
      Vanilla: "LT1",
      Sword: "HT1",
      Pot: "HT1",
    },
  },
  // --- 30 НОВЫХ ИГРОКОВ (все HT1 заменены на HT2) ---
  { id: 1001, username: "ApexOverlord", region: "EU", tiers: { Sword: "HT2", Vanilla: "HT2", UHC: "HT3" } },
  { id: 1002, username: "TitanStriker", region: "NA", tiers: { Vanilla: "HT2", Axe: "HT2", Pot: "HT3" } },
  { id: 1003, username: "VortexGod", region: "CIS", tiers: { NethOP: "HT2", UHC: "HT2", Sword: "HT4" } },
  { id: 1004, username: "EclipseLegend", region: "AS", tiers: { Pot: "HT2", SMP: "HT2", Vanilla: "HT4" } },
  { id: 1005, username: "NebulaKing", region: "EU", tiers: { Sword: "HT2", NethPot: "HT2", Axe: "HT3" } },
  { id: 1006, username: "SolsticeElite", region: "NA", tiers: { Vanilla: "HT2", Mace: "HT2", UHC: "HT4" } },
  { id: 1007, username: "PhantomLord", region: "CIS", tiers: { UHC: "HT2", NethOP: "HT2", Pot: "HT4" } },
  { id: 1008, username: "SpecterTitan", region: "EU", tiers: { Axe: "HT2", SMP: "HT2", Sword: "HT4" } },
  { id: 1009, username: "ZenithDemon", region: "AS", tiers: { Sword: "HT2", Vanilla: "HT2", NethPot: "HT3" } },
  { id: 1010, username: "QuantumGod", region: "NA", tiers: { Pot: "HT2", NethOP: "HT2", Vanilla: "HT4" } },
  { id: 1011, username: "StellarBeast", region: "EU", tiers: { UHC: "HT2", Axe: "HT2", SMP: "HT4" } },
  { id: 1012, username: "InfernalRuler", region: "CIS", tiers: { Sword: "HT2", SMP: "HT2", NethOP: "HT3" } },
  { id: 1013, username: "GlacierMaster", region: "NA", tiers: { Vanilla: "HT2", Pot: "HT2", Sword: "HT4" } },
  { id: 1014, username: "AbyssalLord", region: "EU", tiers: { NethPot: "HT2", UHC: "HT2", Axe: "HT3" } },
  { id: 1015, username: "VoidMonarch", region: "AS", tiers: { Mace: "HT2", Vanilla: "HT2", Pot: "HT4" } },
  { id: 1016, username: "CatalystPro", region: "CIS", tiers: { Sword: "HT2", NethOP: "HT2", UHC: "HT4" } },
  { id: 1017, username: "SupremacyX", region: "EU", tiers: { Pot: "HT2", Axe: "HT2", SMP: "HT4" } },
  { id: 1018, username: "RadiantHero", region: "NA", tiers: { Vanilla: "HT2", SMP: "HT2", Sword: "HT4" } },
  { id: 1019, username: "EtherealGod", region: "CIS", tiers: { UHC: "HT2", NethPot: "HT2", Vanilla: "HT3" } },
  { id: 1020, username: "DominatorPvP", region: "EU", tiers: { Sword: "HT2", Pot: "HT2", NethOP: "HT3" } },
  { id: 1021, username: "SeraphimKing", region: "AS", tiers: { Axe: "HT2", Vanilla: "HT2", UHC: "HT4" } },
  { id: 1022, username: "ValhallaGod", region: "NA", tiers: { NethOP: "HT2", SMP: "HT2", Pot: "HT4" } },
  { id: 1023, username: "RagnarokLord", region: "CIS", tiers: { Sword: "HT2", UHC: "HT2", Axe: "HT4" } },
  { id: 1024, username: "HyperionBeast", region: "EU", tiers: { Vanilla: "HT2", NethPot: "HT2", Sword: "HT4" } },
  { id: 1025, username: "GoliathElite", region: "NA", tiers: { Pot: "HT2", Mace: "HT2", UHC: "HT3" } },
  { id: 1026, username: "TsunamiLord", region: "CIS", tiers: { UHC: "HT2", Axe: "HT2", Vanilla: "HT4" } },
  { id: 1027, username: "CataclysmPro", region: "EU", tiers: { Sword: "HT2", SMP: "HT2", Pot: "HT4" } },
  { id: 1028, username: "SupernovaKing", region: "AS", tiers: { NethOP: "HT2", Vanilla: "HT2", UHC: "HT4" } },
  { id: 1029, username: "AnarchyGod", region: "NA", tiers: { Pot: "HT2", NethPot: "HT2", Axe: "HT3" } },
  { id: 1030, username: "OblivionLord", region: "CIS", tiers: { Sword: "HT2", Vanilla: "HT2", SMP: "HT4" } },

  // --- 150 ИГРОКОВ СО СРЕДНИМ КОЛИЧЕСТВОМ ОЧКОВ (от 20 до 50) ---
  { id: 2001, username: "Pixel2001", region: "EU", tiers: { Sword: "HT2", Vanilla: "LT3" } },
  { id: 2002, username: "Shadow2002", region: "NA", tiers: { UHC: "LT2", Pot: "HT3" } },
  { id: 2003, username: "Ghost2003", region: "CIS", tiers: { NethOP: "HT3", Vanilla: "LT4" } },
  { id: 2004, username: "Storm2004", region: "AS", tiers: { SMP: "HT2", Axe: "LT3" } },
  { id: 2005, username: "Blaze2005", region: "EU", tiers: { NethPot: "HT3", Sword: "LT2" } },
  { id: 2006, username: "Neon2006", region: "NA", tiers: { Pot: "HT2", UHC: "LT3" } },
  { id: 2007, username: "Echo2007", region: "CIS", tiers: { Vanilla: "HT3", Mace: "LT2" } },
  { id: 2008, username: "Frost2008", region: "AS", tiers: { Axe: "HT2", NethOP: "LT4" } },
  { id: 2009, username: "Void2009", region: "EU", tiers: { Sword: "HT3", SMP: "LT3" } },
  { id: 2010, username: "Solar2010", region: "NA", tiers: { UHC: "HT2", Vanilla: "LT3" } },
  { id: 2011, username: "Lunar2011", region: "CIS", tiers: { Pot: "HT3", NethPot: "LT2" } },
  { id: 2012, username: "Cyber2012", region: "AS", tiers: { NethOP: "HT2", Sword: "LT4" } },
  { id: 2013, username: "Alpha2013", region: "EU", tiers: { Vanilla: "HT2", Axe: "LT3" } },
  { id: 2014, username: "Beta2014", region: "NA", tiers: { SMP: "HT3", UHC: "LT2" } },
  { id: 2015, username: "Gamma2015", region: "CIS", tiers: { Sword: "HT2", Pot: "LT3" } },
  { id: 2016, username: "Delta2016", region: "AS", tiers: { NethPot: "HT3", Vanilla: "LT2" } },
  { id: 2017, username: "Omega2017", region: "EU", tiers: { UHC: "HT2", NethOP: "LT3" } },
  { id: 2018, username: "Sigma2018", region: "NA", tiers: { Pot: "HT2", SMP: "LT4" } },
  { id: 2019, username: "Rogue2019", region: "CIS", tiers: { Axe: "HT2", Sword: "LT3" } },
  { id: 2020, username: "Sigma2020", region: "AS", tiers: { Vanilla: "HT3", UHC: "LT2" } },
  { id: 2021, username: "Kite2021", region: "EU", tiers: { Sword: "HT2", NethPot: "LT3" } },
  { id: 2022, username: "Aura2022", region: "NA", tiers: { NethOP: "HT2", Pot: "LT3" } },
  { id: 2023, username: "Zetox2023", region: "CIS", tiers: { SMP: "HT2", Vanilla: "LT4" } },
  { id: 2024, username: "Colds2024", region: "AS", tiers: { UHC: "HT2", Axe: "LT3" } },
  { id: 2025, username: "Strix2025", region: "EU", tiers: { Pot: "HT2", Sword: "LT3" } },
  { id: 2026, username: "Glitch2026", region: "NA", tiers: { Vanilla: "HT2", NethPot: "LT2" } },
  { id: 2027, username: "Prism2027", region: "CIS", tiers: { NethOP: "HT2", UHC: "LT3" } },
  { id: 2028, username: "Wave2028", region: "AS", tiers: { Sword: "HT2", SMP: "LT3" } },
  { id: 2029, username: "Breeze2029", region: "EU", tiers: { Axe: "HT2", Pot: "LT4" } },
  { id: 2030, username: "Crux2030", region: "NA", tiers: { Vanilla: "HT2", NethOP: "LT3" } },
  { id: 2031, username: "Fable2031", region: "CIS", tiers: { UHC: "HT2", Sword: "LT3" } },
  { id: 2032, username: "Zenon2032", region: "AS", tiers: { Pot: "HT2", Vanilla: "LT3" } },
  { id: 2033, username: "Hollow2033", region: "EU", tiers: { NethPot: "HT2", SMP: "LT3" } },
  { id: 2034, username: "Valiant2034", region: "NA", tiers: { Sword: "HT2", UHC: "LT4" } },
  { id: 2035, username: "Drift2035", region: "CIS", tiers: { NethOP: "HT2", Axe: "LT3" } },
  { id: 2036, username: "Saber2036", region: "AS", tiers: { Vanilla: "HT2", Pot: "LT3" } },
  { id: 2037, username: "Kryptic2037", region: "EU", tiers: { UHC: "HT2", NethPot: "LT3" } },
  { id: 2038, username: "Flint2038", region: "NA", tiers: { SMP: "HT2", Sword: "LT3" } },
  { id: 2039, username: "Ashen2039", region: "CIS", tiers: { Pot: "HT2", Vanilla: "LT3" } },
  { id: 2040, username: "Raven2040", region: "AS", tiers: { Axe: "HT2", NethOP: "LT3" } },
  { id: 2041, username: "Viper2041", region: "EU", tiers: { Sword: "HT2", UHC: "LT3" } },
  { id: 2042, username: "Cobra2042", region: "NA", tiers: { NethPot: "HT2", SMP: "LT3" } },
  { id: 2043, username: "Titan2043", region: "CIS", tiers: { Vanilla: "HT2", Pot: "LT3" } },
  { id: 2044, username: "Atlas2044", region: "AS", tiers: { NethOP: "HT2", Axe: "LT3" } },
  { id: 2045, username: "Goliath2045", region: "EU", tiers: { UHC: "HT2", Sword: "LT3" } },
  { id: 2046, username: "Orion2046", region: "NA", tiers: { Pot: "HT2", Vanilla: "LT3" } },
  { id: 2047, username: "TitanX2047", region: "CIS", tiers: { Sword: "HT2", NethPot: "LT3" } },
  { id: 2048, username: "Stark2048", region: "AS", tiers: { SMP: "HT2", UHC: "LT3" } },
  { id: 2049, username: "Wayne2049", region: "EU", tiers: { Axe: "HT2", Pot: "LT3" } },
  { id: 2050, username: "Matrix2050", region: "NA", tiers: { NethOP: "HT2", Vanilla: "LT3" } },
  { id: 2051, username: "Nexus2051", region: "CIS", tiers: { Vanilla: "HT2", Sword: "LT3" } },
  { id: 2052, username: "Quantum2052", region: "AS", tiers: { UHC: "HT2", NethPot: "LT3" } },
  { id: 2053, username: "Hyper2053", region: "EU", tiers: { Pot: "HT2", SMP: "LT3" } },
  { id: 2054, username: "Turbo2054", region: "NA", tiers: { NethOP: "HT2", Axe: "LT3" } },
  { id: 2055, username: "Sonic2055", region: "CIS", tiers: { Sword: "HT2", Vanilla: "LT3" } },
  { id: 2056, username: "Aero2056", region: "AS", tiers: { SMP: "HT2", UHC: "LT3" } },
  { id: 2057, username: "Nitro2057", region: "EU", tiers: { Axe: "HT2", Pot: "LT3" } },
  { id: 2058, username: "Vector2058", region: "NA", tiers: { Vanilla: "HT2", NethOP: "LT3" } },
  { id: 2059, username: "Helix2059", region: "CIS", tiers: { UHC: "HT2", Sword: "LT3" } },
  { id: 2060, username: "Slayer2060", region: "AS", tiers: { Pot: "HT2", NethPot: "LT3" } },
  { id: 2061, username: "Hunter2061", region: "EU", tiers: { NethOP: "HT2", Vanilla: "LT3" } },
  { id: 2062, username: "Stalker2062", region: "NA", tiers: { Sword: "HT2", SMP: "LT3" } },
  { id: 2063, username: "Reaper2063", region: "CIS", tiers: { Axe: "HT2", UHC: "LT3" } },
  { id: 2064, username: "Warden2064", region: "AS", tiers: { Vanilla: "HT2", Pot: "LT3" } },
  { id: 2065, username: "Paladin2065", region: "EU", tiers: { UHC: "HT2", NethPot: "LT3" } },
  { id: 2066, username: "Knight2066", region: "NA", tiers: { Pot: "HT2", NethOP: "LT3" } },
  { id: 2067, username: "Warrior2067", region: "CIS", tiers: { NethOP: "HT2", Sword: "LT3" } },
  { id: 2068, username: "Berserk2068", region: "AS", tiers: { SMP: "HT2", Vanilla: "LT3" } },
  { id: 2069, username: "Barbarian2069", region: "EU", tiers: { Axe: "HT2", UHC: "LT3" } },
  { id: 2070, username: "Gladiator2070", region: "NA", tiers: { Sword: "HT2", Pot: "LT3" } },
  { id: 2071, username: "Centurion2071", region: "CIS", tiers: { Vanilla: "HT2", NethPot: "LT3" } },
  { id: 2072, username: "Spartan2072", region: "AS", tiers: { UHC: "HT2", SMP: "LT3" } },
  { id: 2073, username: "Viking2073", region: "EU", tiers: { Pot: "HT2", Axe: "LT3" } },
  { id: 2074, username: "Samurai2074", region: "NA", tiers: { NethOP: "HT2", Vanilla: "LT3" } },
  { id: 2075, username: "Ninja2075", region: "CIS", tiers: { Sword: "HT2", NethOP: "LT3" } },
  { id: 2076, username: "Assassin2076", region: "AS", tiers: { SMP: "HT2", UHC: "LT3" } },
  { id: 2077, username: "Sniper2077", region: "EU", tiers: { Axe: "HT2", Pot: "LT3" } },
  { id: 2078, username: "Commando2078", region: "NA", tiers: { Vanilla: "HT2", Sword: "LT3" } },
  { id: 2079, username: "Mercenary2079", region: "CIS", tiers: { UHC: "HT2", NethPot: "LT3" } },
  { id: 2080, username: "Outlaw2080", region: "AS", tiers: { Pot: "HT2", SMP: "LT3" } },
  { id: 2081, username: "Bandit2081", region: "EU", tiers: { NethOP: "HT2", Axe: "LT3" } },
  { id: 2082, username: "Pirate2082", region: "NA", tiers: { Sword: "HT2", Vanilla: "LT3" } },
  { id: 2083, username: "Corsair2083", region: "CIS", tiers: { Vanilla: "HT2", UHC: "LT3" } },
  { id: 2084, username: "Marauder2084", region: "AS", tiers: { UHC: "HT2", Pot: "LT3" } },
  { id: 2085, username: "Raider2085", region: "EU", tiers: { Pot: "HT2", NethPot: "LT3" } },
  { id: 2086, username: "Scavenger2086", region: "NA", tiers: { NethOP: "HT2", SMP: "LT3" } },
  { id: 2087, username: "Nomad2087", region: "CIS", tiers: { Sword: "HT2", Axe: "LT3" } },
  { id: 2088, username: "Wanderer2088", region: "AS", tiers: { SMP: "HT2", Vanilla: "LT3" } },
  { id: 2089, username: "Drifter2089", region: "EU", tiers: { Axe: "HT2", UHC: "LT3" } },
  { id: 2090, username: "Stryker2090", region: "NA", tiers: { Vanilla: "HT2", Sword: "LT3" } },
  { id: 2091, username: "Apex2091", region: "CIS", tiers: { UHC: "HT2", Pot: "LT3" } },
  { id: 2092, username: "Zenith2092", region: "AS", tiers: { Pot: "HT2", NethPot: "LT3" } },
  { id: 2093, username: "Nadir2093", region: "EU", tiers: { NethOP: "HT2", SMP: "LT3" } },
  { id: 2094, username: "Zen2094", region: "NA", tiers: { Sword: "HT2", Axe: "LT3" } },
  { id: 2095, username: "Aether2095", region: "CIS", tiers: { Vanilla: "HT2", UHC: "LT3" } },
  { id: 2096, username: "Nether2096", region: "AS", tiers: { UHC: "HT2", Pot: "LT3" } },
  { id: 2097, username: "End2097", region: "EU", tiers: { Pot: "HT2", NethOP: "LT3" } },
  { id: 2098, username: "Dragon2098", region: "NA", tiers: { NethOP: "HT2", Sword: "LT3" } },
  { id: 2099, username: "Wither2099", region: "CIS", tiers: { SMP: "HT2", Vanilla: "LT3" } },
  { id: 2100, username: "Creep2100", region: "AS", tiers: { Axe: "HT2", UHC: "LT3" } },
  { id: 2101, username: "Zombie2101", region: "EU", tiers: { Sword: "HT2", Pot: "LT3" } },
  { id: 2102, username: "Skeleton2102", region: "NA", tiers: { Vanilla: "HT2", NethPot: "LT3" } },
  { id: 2103, username: "Spider2103", region: "CIS", tiers: { UHC: "HT2", SMP: "LT3" } },
  { id: 2104, username: "Enderman2104", region: "AS", tiers: { Pot: "HT2", Axe: "LT3" } },
  { id: 2105, username: "Phantom2105", region: "EU", tiers: { NethOP: "HT2", Vanilla: "LT3" } },
  { id: 2106, username: "Shulker2106", region: "NA", tiers: { Sword: "HT2", NethOP: "LT3" } },
  { id: 2107, username: "Ghast2107", region: "CIS", tiers: { SMP: "HT2", UHC: "LT3" } },
  { id: 2108, username: "Piglin2108", region: "AS", tiers: { Axe: "HT2", Pot: "LT3" } },
  { id: 2109, username: "Hoglin2109", region: "EU", tiers: { Vanilla: "HT2", Sword: "LT3" } },
  { id: 2110, username: "Strider2110", region: "NA", tiers: { UHC: "HT2", NethPot: "LT3" } },
  { id: 2111, username: "BlazeMob2111", region: "CIS", tiers: { Pot: "HT2", SMP: "LT3" } },
  { id: 2112, username: "Magma2112", region: "AS", tiers: { NethOP: "HT2", Axe: "LT3" } },
  { id: 2113, username: "Slime2113", region: "EU", tiers: { Sword: "HT2", Vanilla: "LT3" } },
  { id: 2114, username: "MagmaCube2114", region: "NA", tiers: { Vanilla: "HT2", UHC: "LT3" } },
  { id: 2115, username: "Silverfish2115", region: "CIS", tiers: { UHC: "HT2", Pot: "LT3" } },
  { id: 2116, username: "Endermite2116", region: "AS", tiers: { Pot: "HT2", NethPot: "LT3" } },
  { id: 2117, username: "Vex2117", region: "EU", tiers: { NethOP: "HT2", SMP: "LT3" } },
  { id: 2118, username: "Evoker2118", region: "NA", tiers: { Sword: "HT2", Axe: "LT3" } },
  { id: 2119, username: "Vindicator2119", region: "CIS", tiers: { Vanilla: "HT2", UHC: "LT3" } },
  { id: 2120, username: "Pillager2120", region: "AS", tiers: { UHC: "HT2", Pot: "LT3" } },
  { id: 2121, username: "Ravager2121", region: "EU", tiers: { Pot: "HT2", NethOP: "LT3" } },
  { id: 2122, username: "Witch2122", region: "NA", tiers: { NethOP: "HT2", Sword: "LT3" } },
  { id: 2123, username: "Guardian2123", region: "CIS", tiers: { SMP: "HT2", Vanilla: "LT3" } },
  { id: 2124, username: "Elder2124", region: "AS", tiers: { Axe: "HT2", UHC: "LT3" } },
  { id: 2125, username: "Dolphin2125", region: "EU", tiers: { Sword: "HT2", Pot: "LT3" } },
  { id: 2126, username: "Turtle2126", region: "NA", tiers: { Vanilla: "HT2", NethPot: "LT3" } },
  { id: 2127, username: "Fox2127", region: "CIS", tiers: { UHC: "HT2", SMP: "LT3" } },
  { id: 2128, username: "Panda2128", region: "AS", tiers: { Pot: "HT2", Axe: "LT3" } },
  { id: 2129, username: "Polar2129", region: "EU", tiers: { NethOP: "HT2", Vanilla: "LT3" } },
  { id: 2130, username: "Bee2130", region: "NA", tiers: { Sword: "HT2", NethOP: "LT3" } },
  { id: 2131, username: "Llama2131", region: "CIS", tiers: { SMP: "HT2", UHC: "LT3" } },
  { id: 2132, username: "Trader2132", region: "AS", tiers: { Axe: "HT2", Pot: "LT3" } },
  { id: 2133, username: "IronGolem2133", region: "EU", tiers: { Vanilla: "HT2", Sword: "LT3" } },
  { id: 2134, username: "SnowGolem2134", region: "NA", tiers: { UHC: "HT2", NethPot: "LT3" } },
  { id: 2135, username: "Cat2135", region: "CIS", tiers: { Pot: "HT2", SMP: "LT3" } },
  { id: 2136, username: "Wolf2136", region: "AS", tiers: { NethOP: "HT2", Axe: "LT3" } },
  { id: 2137, username: "Parrot2137", region: "EU", tiers: { Sword: "HT2", Vanilla: "LT3" } },
  { id: 2138, username: "Chicken2138", region: "NA", tiers: { Vanilla: "HT2", UHC: "LT3" } },
  { id: 2139, username: "Cow2139", region: "CIS", tiers: { UHC: "HT2", Pot: "LT3" } },
  { id: 2140, username: "Pig2140", region: "AS", tiers: { Pot: "HT2", NethPot: "LT3" } },
  { id: 2141, username: "Sheep2141", region: "EU", tiers: { NethOP: "HT2", SMP: "LT3" } },
  { id: 2142, username: "Horse2142", region: "NA", tiers: { Sword: "HT2", Axe: "LT3" } },
  { id: 2143, username: "Donkey2143", region: "CIS", tiers: { Vanilla: "HT2", UHC: "LT3" } },
  { id: 2144, username: "Mule2144", region: "AS", tiers: { UHC: "HT2", Pot: "LT3" } },
  { id: 2145, username: "SkeletonHorse2145", region: "EU", tiers: { Pot: "HT2", NethOP: "LT3" } },
  { id: 2146, username: "ZombieHorse2146", region: "NA", tiers: { NethOP: "HT2", Sword: "LT3" } },
  { id: 2147, username: "Skeleton2147", region: "CIS", tiers: { SMP: "HT2", Vanilla: "LT3" } },
  { id: 2148, username: "Villager2148", region: "AS", tiers: { Axe: "HT2", UHC: "LT3" } },
  { id: 2149, username: "WanderingTrader2149", region: "EU", tiers: { Sword: "HT2", Pot: "LT3" } },
  { id: 2150, username: "Allay2150", region: "NA", tiers: { Vanilla: "HT2", NethPot: "LT3" } }
]

export const TIER_POINTS: Record<string, number> = {
  "HT1": 60,
  "LT1": 45,
  "HT2": 30,
  "LT2": 20,
  "HT3": 10,
  "LT3": 6,
  "LT4": 4,
  "HT4": 4,
  "HT5": 2,
  "LT5": 1,
}

export function formatTierDisplay(tier: string): string {
  if (tier.toLowerCase().includes("retired")) {
    return `${tier.replace(/retired/gi, "").trim()} Retired`
  }
  return tier
}

export function calculatePlayerPoints(tiers: Record<string, string>): number {
  let total = 0
  for (const tierValue of Object.values(tiers)) {
    const cleanTier = tierValue.toUpperCase().trim()
    for (const [key, points] of Object.entries(TIER_POINTS)) {
      if (cleanTier === key || cleanTier.includes(key)) {
        total += points
        break
      }
    }
  }
  return total
}

export function getPlayerTitle(points: number, tiers?: Record<string, string>): { title: string; color: string } {
  if (tiers && Object.keys(tiers).length > 0) {
    const allHT1 = Object.values(tiers).every((t) => t.toUpperCase().includes("HT1"))
    if (allHT1) {
      return { title: "The Strongest", color: "text-red-500 font-black animate-pulse" }
    }
  }

  if (points >= 400) return { title: "Combat Grandmaster", color: "text-amber-400" }
  if (points >= 250) return { title: "Combat Master", color: "text-amber-300" }
  if (points >= 100) return { title: "Combat Ace", color: "text-rose-400" }
  if (points >= 50) return { title: "Combat Specialist", color: "text-purple-400" }
  if (points >= 20) return { title: "Combat Cadet", color: "text-indigo-400" }
  if (points >= 10) return { title: "Combat Novice", color: "text-blue-400" }
  return { title: "Rookie", color: "text-zinc-400" }
}

export function getStaffRoleBadge(role?: StaffRole): { label: string; color: string } | null {
  if (!role) return null
  switch (role) {
    case "Owner":
      return { label: "Owner", color: "text-red-400 bg-red-950/40 border border-red-500/30" }
    case "Co-Owner":
      return { label: "Co-Owner", color: "text-rose-400 bg-rose-950/40 border border-rose-500/30" }
    case "Admin":
      return { label: "Admin", color: "text-orange-400 bg-orange-950/40 border border-orange-500/30" }
    case "Moder":
      return { label: "Moderator", color: "text-emerald-400 bg-emerald-950/40 border border-emerald-500/30" }
    case "Tester":
      return { label: "Tester", color: "text-cyan-400 bg-cyan-950/40 border border-cyan-500/30" }
    default:
      return null
  }
}

export function getTierPoints(tierValue: string): number {
  const cleanTier = tierValue.toUpperCase().trim()
  for (const [key, points] of Object.entries(TIER_POINTS)) {
    if (cleanTier === key || cleanTier.includes(key)) {
      return points
    }
  }
  return 0
}

export const playersData = INITIAL_PLAYERS
