export const FLAVOR_COLORS: Record<string, string> = {
  'Chocolate Belga': '#8B4513',
  'Ninho com Morango': '#FFB6C1',
  'Doce de Leite': '#D2691E',
  'Red Velvet': '#DC143C',
  'Pistache': '#93C572',
  'Limão Siciliano': '#FFD700',
}

export const PRODUCT_EMOJIS: Record<string, string> = {
  'Bolo': '🎂',
  'Cupcakes': '🧁',
  'Docinhos': '🍬',
  'Torta': '🥧',
  'Especial': '✨',
}

export const RESTRICTION_ICONS: Record<string, string> = {
  'Sem restrição': '✅',
  'Sem Glúten': '🌾',
  'Vegano': '🌱',
  'Sem Lactose': '🥛',
}

export const QUICK_QUANTITIES: Record<string, string[]> = {
  'Bolo': ['1kg', '1,5kg', '2kg', '3kg'],
  'Docinhos': ['50 un', '1 cento', '2 centos'],
  'Cupcakes': ['6 un', '12 un', '24 un'],
  'Torta': ['Pequena', 'Média', 'Grande'],
  'Especial': ['1 un', '2 un', '5 un'],
}

export function getCakeSize(quantity: string): 'small' | 'medium' | 'large' {
  if (!quantity) return 'small'
  const lower = quantity.toLowerCase()
  if (lower.includes('1kg') || lower.includes('1 kg') || lower.includes('50') || lower.includes('pequena') || lower.includes('6')) return 'small'
  if (lower.includes('2kg') || lower.includes('2 kg') || lower.includes('1 cento') || lower.includes('média') || lower.includes('12')) return 'medium'
  return 'large'
}

export function getFlavorColor(flavor: string | undefined): string {
  if (!flavor) return '#F0CBA8' // peach default
  return FLAVOR_COLORS[flavor] || '#F0CBA8'
}

export function getThemeDecoration(theme: string | undefined): string {
  if (!theme) return ''
  const lower = theme.toLowerCase()
  if (lower.includes('aniversário') || lower.includes('aniversario')) return '🎂'
  if (lower.includes('casamento')) return '💍'
  if (lower.includes('batizado')) return '👶'
  if (lower.includes('formatura')) return '🎓'
  if (lower.includes('natal')) return '🎄'
  if (lower.includes('páscoa') || lower.includes('pascoa')) return '🐰'
  return '🎀'
}

export function getProductEmoji(type: string | undefined): string {
  if (!type) return '🧁'
  return PRODUCT_EMOJIS[type] || '🧁'
}
