import type { Product } from '../types/store'
import bagImage from '../assets/bag.png'
import bag2 from '../assets/bag2.png'
import bag3 from '../assets/bag3.png'
import bag4 from '../assets/bag4.png'
import bag5 from '../assets/bag5.png'
import keychain1 from '../assets/keychain1.png'
import keychain2 from '../assets/keychain2.png'
import keychain3 from '../assets/keychain3.png'
import keychain4 from '../assets/keychain4.png'
import keychain5 from '../assets/keychain5.png'
import phoneAccessory1 from '../assets/phoneAccessory1.png'
import phoneAccessory2 from '../assets/phoneAccessory2.png'
import phoneAccessory3 from '../assets/phoneAccessory3.png'
import phoneAccessory4 from '../assets/phoneAccessory4.png'
import phoneAccessory5 from '../assets/phoneAccessory5.png'
import letterKeychain2 from '../assets/letterKeychain2.png'
import lettersKeychain from '../assets/LettersKeychain.png'
import lettersKeychain3 from '../assets/lettersKeychain3.png'

export const products: Product[] = [
  {
    id: 1,
    slug: 'lumiere-mini-tote',
    name: 'Lumière Mini Tote',
    price: 148,
    description:
      'A softly structured pearl-accented mini tote finished with warm ivory tones and hand-sewn details for elevated everyday styling.',
    category: 'Pearl Bags',
    images: [bagImage, bag3, bag5],
    featured: true,
    isBestSeller: true,
    availability: 'in_stock',
    colors: ['Ivory', 'Blush', 'Champagne'],
    variations: [
      { name: 'Pearl style', value: 'Classic' },
      { name: 'Pearl style', value: 'Rose' },
    ],
  },
  {
    id: 2,
    slug: 'rose-pearl-charm',
    name: 'Rosé Pearl Charm',
    price: 34,
    description:
      'A tiny keepsake designed to attach to a handbag, zipper, or keyring with refined pearl detailing and a blush-pink finish.',
    category: 'Keychains',
    images: [keychain1, keychain3, keychain5],
    isNew: true,
    availability: 'in_stock',
    colors: ['Pearl', 'Rose Taupe', 'Warm Ivory'],
  },
  {
    id: 3,
    slug: 'velvet-pearl-case',
    name: 'Velvet Pearl Case',
    price: 46,
    description:
      'A delicate phone case with a satin-touch finish and pearl-inspired shell detailing, crafted to add charm without bulk.',
    category: 'Phone Accessories',
    images: [phoneAccessory1, phoneAccessory2, phoneAccessory3],
    isNew: true,
    availability: 'low_stock',
    colors: ['Rose', 'Sand', 'Champagne'],
  },
  {
    id: 4,
    slug: 'satin-pearl-bracelet',
    name: 'Satin Pearl Bracelet',
    price: 62,
    description:
      'An elegant bracelet with softly luminous pearl accents and a delicate clasp designed to pair beautifully with everyday looks.',
    category: 'Pearl Jewelry',
    images: [lettersKeychain3, phoneAccessory4, keychain4],
    isBestSeller: true,
    availability: 'in_stock',
    colors: ['Pearl White', 'Pink Pearl', 'Champagne'],
  },
  {
    id: 5,
    slug: 'lune-personalized-keyring',
    name: 'Lune Personalized Keyring',
    price: 39,
    description:
      'A customizable keepsake with a softly brushed finish and optional initials to make every everyday carry feel personal.',
    category: 'Keychains',
    images: [keychain2, letterKeychain2, keychain4],
    availability: 'made_to_order',
    colors: ['Blush', 'Pearl', 'Espresso'],
    variations: [
      { name: 'Initials', value: 'Monogram' },
      { name: 'Pearl style', value: 'Classic' },
    ],
  },
  {
    id: 6,
    slug: 'marie-lantern-pouch',
    name: 'Marie Lantern Pouch',
    price: 88,
    description:
      'A couture-inspired pouch with soft structured lines, pearl embellishment, and generous internal storage for gifting or travel.',
    category: 'Pearl Bags',
    images: [bag2, bag4, bagImage],
    featured: true,
    availability: 'in_stock',
    colors: ['Ivory', 'Champagne'],
  },
]

export const getProductById = (id: number) => products.find((product) => product.id === id)

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug)

export const galleryImages = [
  bagImage,
  keychain1,
  phoneAccessory3,
  bag3,
  lettersKeychain,
  phoneAccessory5,
  keychain2,
  letterKeychain2,
  bag2,
  bag5,
  keychain5,
  phoneAccessory4,
  lettersKeychain3,
]
