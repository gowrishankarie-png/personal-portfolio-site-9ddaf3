// Single source of truth for who this site belongs to.
// Swap these values to make the portfolio your own.

export const site = {
  name: 'Noa Kestrel',
  short: 'N.K.',
  title: 'Designer & photographer',
  city: 'Porto, Portugal',
  coords: '41.1496° N, 8.6109° W',
  email: 'studio@noakestrel.com',
  availability: 'Booking commissions from February 2027',
  description:
    'Noa Kestrel is an independent designer and photographer in Porto, making identities, books and exhibitions for people who care about the details.',
}

export const socials = [
  { label: 'Instagram', handle: '@noa.kestrel', href: 'https://instagram.com/' },
  { label: 'Are.na', handle: 'noa-kestrel', href: 'https://www.are.na/' },
  { label: 'LinkedIn', handle: 'in/noakestrel', href: 'https://www.linkedin.com/' },
  { label: 'Behance', handle: 'noakestrel', href: 'https://www.behance.net/' },
  { label: 'Vimeo', handle: 'noakestrel', href: 'https://vimeo.com/' },
] as const

export type Series = 'Salt Hours' | 'Concrete Psalms' | 'Night Shift' | 'Still Rooms'

export type Photo = {
  id: string
  src: string
  title: string
  series: Series
  place: string
  year: string
  film: string
  width: number
  height: number
}

export const seriesNotes: Record<Series, string> = {
  'Salt Hours': 'The Atlantic before the town wakes up. Shot between 5:40 and 7:15, every morning of one August.',
  'Concrete Psalms': 'Brutalist buildings read as places of worship — for light, mostly.',
  'Night Shift': 'The city after the last tram. Long exposures, sodium lamps, very few people.',
  'Still Rooms': 'Objects and interiors from the studio, photographed slowly, in window light only.',
}

export const photos: Photo[] = [
  { id: '01', src: '/img/salt-01.jpg', title: 'Red Cap, 6:02', series: 'Salt Hours', place: 'Matosinhos', year: '2026', film: 'Portra 400', width: 768, height: 1376 },
  { id: '02', src: '/img/concrete-02.jpg', title: 'One Beam', series: 'Concrete Psalms', place: 'Marco de Canaveses', year: '2025', film: 'HP5+', width: 1408, height: 768 },
  { id: '03', src: '/img/night-02.jpg', title: 'Last Reader', series: 'Night Shift', place: 'Bonfim', year: '2026', film: 'CineStill 800T', width: 768, height: 1376 },
  { id: '04', src: '/img/still-01.jpg', title: 'Jug, Two Lemons', series: 'Still Rooms', place: 'Studio', year: '2025', film: 'Ektar 100', width: 768, height: 1376 },
  { id: '05', src: '/img/salt-03.jpg', title: 'Pans at Aveiro', series: 'Salt Hours', place: 'Aveiro', year: '2026', film: 'Portra 160', width: 1024, height: 1024 },
  { id: '06', src: '/img/concrete-01.jpg', title: 'Door 40', series: 'Concrete Psalms', place: 'Lisbon', year: '2025', film: 'Portra 400', width: 768, height: 1376 },
  { id: '07', src: '/img/night-01.jpg', title: 'Stop 22, 01:14', series: 'Night Shift', place: 'Ribeira', year: '2026', film: 'CineStill 800T', width: 1408, height: 768 },
  { id: '08', src: '/img/still-03.jpg', title: 'Light Table', series: 'Still Rooms', place: 'Studio', year: '2026', film: 'Portra 400', width: 768, height: 1376 },
  { id: '09', src: '/img/salt-02.jpg', title: 'Hauled In', series: 'Salt Hours', place: 'Póvoa de Varzim', year: '2026', film: 'Portra 400', width: 1408, height: 768 },
  { id: '10', src: '/img/concrete-03.jpg', title: 'Tile Meets Slab', series: 'Concrete Psalms', place: 'Alfama', year: '2025', film: 'Ektar 100', width: 768, height: 1376 },
  { id: '11', src: '/img/night-03.jpg', title: 'Funicular, 30s', series: 'Night Shift', place: 'Guindais', year: '2026', film: 'Portra 800', width: 1024, height: 1024 },
  { id: '12', src: '/img/still-02.jpg', title: 'Chair, Curtain', series: 'Still Rooms', place: 'Studio', year: '2025', film: 'HP5+', width: 1376, height: 768 },
]

export const allSeries = Object.keys(seriesNotes) as Series[]
