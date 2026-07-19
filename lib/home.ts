export interface WorldCupMatch {
  id: string;
  stage: string;
  month: string;
  day: number;
  weekday: string;
  home: string; // 3-letter team code, flag rendered via <Flag /> SVGs
  away: string;
  time: string;
  city: string;
  venue: string;
}

export const worldCupMatches: WorldCupMatch[] = [
  {
    id: "wc-1",
    stage: "Group Third Place Playoff",
    month: "Jul",
    day: 18,
    weekday: "Sat",
    home: "FRA",
    away: "ENG",
    time: "5:00 PM",
    city: "Miami, FL, US",
    venue: "Hard Rock Stadium - Concert...",
  },
  {
    id: "wc-2",
    stage: "Group Final",
    month: "Jul",
    day: 19,
    weekday: "Sun",
    home: "ESP",
    away: "ARG",
    time: "3:00 PM",
    city: "East Rutherford, NJ, US",
    venue: "MetLife Stadium",
  },
  {
    id: "wc-3",
    stage: "Group Semi-Final",
    month: "Jul",
    day: 15,
    weekday: "Wed",
    home: "ENG",
    away: "GER",
    time: "8:00 PM",
    city: "Dallas, TX, US",
    venue: "AT&T Stadium",
  },
  {
    id: "wc-4",
    stage: "Group Quarter-Final",
    month: "Jul",
    day: 11,
    weekday: "Sat",
    home: "BRA",
    away: "POR",
    time: "4:00 PM",
    city: "Los Angeles, CA, US",
    venue: "SoFi Stadium",
  },
];

export interface HomeCategory {
  label: string;
  image: string;
  href: string;
}

// Tiles and order mirror viagogo.fr (images downloaded from the origin CDN)
export const popularCategories: HomeCategory[] = [
  { label: "Pop", image: "/images/cat-pop.jpg", href: "/concerts" },
  { label: "Rock Music", image: "/images/cat-rock.jpg", href: "/concerts" },
  { label: "Football", image: "/images/cat-football.jpg", href: "/sport" },
  { label: "Formula 1", image: "/images/cat-formula-1.jpg", href: "/sport" },
  { label: "Cricket", image: "/images/cat-cricket.jpg", href: "/sport" },
  { label: "Ice Hockey", image: "/images/seattle-kraken.jpg", href: "/sport" },
  { label: "Tennis", image: "/images/davis-cup.jpg", href: "/sport" },
];
