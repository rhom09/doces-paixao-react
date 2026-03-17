import type { Stat, GalleryItem } from '@/types'

export const STATS: Stat[] = [
  {
    id: 1,
    icon: 'fas fa-users',
    value: '',
    counterTarget: 1800,
    suffix: '+',
    label: 'Clientes Felizes',
    colorClass: 'bg-rose-pale text-rose',
  },
  {
    id: 2,
    icon: 'fas fa-star',
    value: '4.9',
    label: 'Avaliação Média',
    colorClass: 'bg-mint-pale text-mint-deep',
  },
  {
    id: 3,
    icon: 'fas fa-award',
    value: '',
    counterTarget: 10,
    suffix: '+',
    label: 'Anos de Experiência',
    colorClass: 'bg-[#fff8ec] text-peach-deep',
  },
  {
    id: 4,
    icon: 'fas fa-birthday-cake',
    value: '',
    counterTarget: 300,
    suffix: '+',
    label: 'Receitas Exclusivas',
    colorClass: 'bg-rose-pale text-rose-deep',
  },
]

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1563778084459-859099e48677?w=800&q=85',
    alt: 'Bolo Floral',
    caption: 'Bolo Floral',
    span: 'both',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=85',
    alt: 'Pâtisserie',
    caption: 'Pâtisserie',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=85',
    alt: 'Docinhos Especiais',
    caption: 'Docinhos Especiais',
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=500&q=85',
    alt: 'Macarons',
    caption: 'Macarons',
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=85',
    alt: 'Cupcakes Premium',
    caption: 'Cupcakes Premium',
    span: 'col',
  },
]
