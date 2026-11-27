// Единый список иконок режимов (ключи — в нижнем регистре, без пробелов)
export const MODE_ICONS: Record<string, string> = {
  ltms: "/ltm's.svg",
  vanilla: "/vanilla.svg",
  uhc: "/uhc.svg",
  pot: "/pot.svg",
  nethop: "/nethop.svg",
  nethpot: "/nethop.svg",
  smp: "/smp.svg",
  sword: "/sword.svg",
  axe: "/axe.svg",
  mace: "/mace.svg",
  spear: "/spearmace.png",
  spearmace: "/spearmace.png",
  cart: "/minecart-e4204998.svg",
}

export function getModeIcon(mode: string): string | undefined {
  return MODE_ICONS[String(mode).toLowerCase().replace(/\s+/g, "")]
}
