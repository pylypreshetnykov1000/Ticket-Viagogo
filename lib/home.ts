export interface WorldCupMatch {
  id: string;
  stage: string;
  month: string;
  day: number;
  weekday: string;
  homeFlag: string;
  home: string;
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
    homeFlag: "🇫🇷",
    home: "FRA",
    away: "TBD",
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
    homeFlag: "🇪🇸",
    home: "ESP",
    away: "TBD",
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
    homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    home: "ENG",
    away: "TBD",
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
    homeFlag: "🇧🇷",
    home: "BRA",
    away: "TBD",
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

export const popularCategories: HomeCategory[] = [
  { label: "Pop", image: "/images/the-weeknd.jpg", href: "/concerts" },
  { label: "Rock Music", image: "/images/scorpions.jpg", href: "/concerts" },
  { label: "Soccer", image: "/images/man-utd-wrexham.jpg", href: "/sport" },
  { label: "Ice Hockey", image: "/images/seattle-kraken.jpg", href: "/sport" },
  { label: "Tennis", image: "/images/davis-cup.jpg", href: "/sport" },
  { label: "Classical", image: "/images/andre-rieu.jpg", href: "/theatre" },
];
