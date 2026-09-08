export interface Colorway {
  id: string;
  name: string; // Display name: Ash, Beige, Black, Sky
  dbValue: string; // Supabase internal database value
  bg: string;
  img: string;
  alt: string;
  slug: string;
  tagline: string;
  description: string;
}

export const COLORWAYS: Colorway[] = [
  {
    id: 'swatch-grey',
    name: 'Ash',
    dbValue: 'Ash Grey',
    bg: '#B0ADA8',
    img: '/Untitled Project - illustrationImage (4).png',
    alt: 'CuddlWear Signature Hoodie in Ash',
    slug: 'ash-grey',
    tagline: 'Timeless, understated, everyday neutral',
    description: 'A balanced, versatile neutral that blends anywhere. Perfect for campus walks, late study sessions, or quiet focus in the library.'
  },
  {
    id: 'swatch-beige',
    name: 'Beige',
    dbValue: 'Sand Beige',
    bg: '#F0EAD6',
    img: '/Untitled Project - illustrationimage (5).png',
    alt: 'CuddlWear Signature Hoodie in Beige',
    slug: 'sand-beige',
    tagline: 'Warm, grounding, calm aesthetic',
    description: 'A comforting, warm earth tone designed to soothe the senses. Gives an effortless, relaxed look whether at your desk or winding down.'
  },
  {
    id: 'swatch-black',
    name: 'Black',
    dbValue: 'Midnight Black',
    bg: '#1E1E1E',
    img: '/Untitled Project - illustrationimage (6).png',
    alt: 'CuddlWear Signature Hoodie in Black',
    slug: 'midnight-black',
    tagline: 'Sleek, invisible focus, effortless style',
    description: 'Deep, matte, and discreet. The ultimate low-profile tool — looks like a classic staple while packing full sensory calming support.'
  },
  {
    id: 'swatch-blue',
    name: 'Sky',
    dbValue: 'Powder Blue',
    bg: '#A8C4D4',
    img: '/Untitled Project - illustrationimage (7).png',
    alt: 'CuddlWear Signature Hoodie in Sky',
    slug: 'powder-blue',
    tagline: 'Airy, refreshing, mindful clarity',
    description: 'A gentle, refreshing hue with cool undertones. Brings a sense of airy calm and mental clarity during high-stress study or work blocks.'
  }
];

export const DISPLAY_TO_DB_COLORWAY: Record<string, string> = {
  'Ash': 'Ash Grey',
  'Beige': 'Sand Beige',
  'Black': 'Midnight Black',
  'Sky': 'Powder Blue',
  'Ash Grey': 'Ash Grey',
  'Sand Beige': 'Sand Beige',
  'Midnight Black': 'Midnight Black',
  'Powder Blue': 'Powder Blue',
};

export const DB_TO_DISPLAY_COLORWAY: Record<string, string> = {
  'Ash Grey': 'Ash',
  'Sand Beige': 'Beige',
  'Midnight Black': 'Black',
  'Powder Blue': 'Sky',
  'Ash': 'Ash',
  'Beige': 'Beige',
  'Black': 'Black',
  'Sky': 'Sky',
};

export function getColorwayBySlug(slug: string): Colorway | undefined {
  return COLORWAYS.find((cw) => cw.slug === slug);
}
