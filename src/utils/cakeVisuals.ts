export const FLAVOR_COLORS: Record<string, string> = {
  'Chocolate Belga': '#8B4513',
  'Ninho com Morango': '#FFB6C1',
  'Doce de Leite': '#D2691E',
  'Red Velvet': '#DC143C',
  'Pistache': '#93C572',
  'Limão Siciliano': '#FFD700',
  'Brigadeiro': '#4A2C2A',
  'Bicho de Pé': '#FFC0CB',
  'Beijinho': '#FDF5E6',
  'Ninho com Nutella': '#5C4033',
  'Coco Queimado': '#8B7355',
  'Paçoca': '#DAA520',
}

export const PRODUCT_EMOJIS: Record<string, string> = {
  'Bolo': '🎂',
  'Docinhos': '🍫',
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
}

export function getCakeSize(quantity: string): 'small' | 'medium' | 'large' {
  if (!quantity) return 'small'
  const lower = quantity.toLowerCase()
  if (lower.includes('1kg') || lower.includes('1 kg') || lower.includes('50') || lower.includes('6')) return 'small'
  if (lower.includes('2kg') || lower.includes('2 kg') || lower.includes('1 cento') || lower.includes('12')) return 'medium'
  return 'large'
}

export function getFlavorColor(flavor: string | undefined): string {
  if (!flavor) return '#F0CBA8' // peach default
  return FLAVOR_COLORS[flavor] || '#F0CBA8'
}

export function getProductEmoji(type: string | undefined): string {
  if (!type) return '🍫'
  return PRODUCT_EMOJIS[type] || '🍫'
}
