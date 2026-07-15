import type { Category, EventItem, Listing } from "./types";

export const categories: Category[] = [
  {
    key: "concerts",
    label: "Concerts",
    href: "/concerts",
    blurb: "The biggest tours and festivals",
  },
  {
    key: "sport",
    label: "Sports",
    href: "/sport",
    blurb: "Football, hockey, tennis and more",
  },
  {
    key: "theatre",
    label: "Theatre & Comedy",
    href: "/theatre",
    blurb: "Shows, musicals and classical concerts",
  },
];

// Gradient fallbacks used behind images while they load
export const gradients: Record<string, string> = {
  a: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
  b: "linear-gradient(135deg,#42275a,#734b6d)",
  c: "linear-gradient(135deg,#1a2980,#26d0ce)",
  d: "linear-gradient(135deg,#c31432,#240b36)",
  f: "linear-gradient(135deg,#232526,#414345)",
};

// Events use real performer names + locally hosted images sourced from viagogo.fr
export const events: EventItem[] = [
  // --- Concerts ---
  {
    id: "the-weeknd",
    name: "The Weeknd - After Hours Til Dawn Tour",
    performer: "The Weeknd",
    category: "concerts",
    date: "2026-09-28T20:00:00",
    venue: "Groupama Stadium",
    city: "Lyon",
    country: "France",
    image: "/images/the-weeknd.jpg",
    minPrice: 79,
    listingCount: 412,
    popularity: 98,
  },
  {
    id: "pitbull",
    name: "Pitbull - I'm Back Tour",
    performer: "Pitbull",
    category: "concerts",
    date: "2026-12-07T20:30:00",
    venue: "Accor Arena",
    city: "Paris",
    country: "France",
    image: "/images/pitbull.jpg",
    minPrice: 65,
    listingCount: 268,
    popularity: 90,
  },
  {
    id: "lenny-kravitz",
    name: "Lenny Kravitz - Blue Electric Light Tour",
    performer: "Lenny Kravitz",
    category: "concerts",
    date: "2026-07-20T19:00:00",
    venue: "Zénith de Paris - La Villette",
    city: "Paris",
    country: "France",
    image: "/images/lenny-kravitz.jpg",
    minPrice: 72,
    listingCount: 224,
    popularity: 88,
  },
  {
    id: "scorpions",
    name: "Scorpions - Rock Believer World Tour",
    performer: "Scorpions",
    category: "concerts",
    date: "2026-07-28T20:00:00",
    venue: "Halle Tony Garnier",
    city: "Lyon",
    country: "France",
    image: "/images/scorpions.jpg",
    minPrice: 68,
    listingCount: 176,
    popularity: 83,
  },
  {
    id: "the-cure",
    name: "The Cure - Songs of a Lost World Tour",
    performer: "The Cure",
    category: "concerts",
    date: "2026-08-09T19:00:00",
    venue: "Accor Arena",
    city: "Paris",
    country: "France",
    image: "/images/the-cure.jpg",
    minPrice: 85,
    listingCount: 301,
    popularity: 92,
  },
  {
    id: "moby",
    name: "Moby - Live Orchestra",
    performer: "Moby",
    category: "concerts",
    date: "2026-08-06T20:00:00",
    venue: "L'Olympia",
    city: "Paris",
    country: "France",
    image: "/images/moby.jpg",
    minPrice: 59,
    listingCount: 132,
    popularity: 76,
  },
  {
    id: "placebo",
    name: "Placebo - This Search for Meaning Tour",
    performer: "Placebo",
    category: "concerts",
    date: "2026-10-18T18:30:00",
    venue: "Zénith Arena",
    city: "Lille",
    country: "France",
    image: "/images/placebo.jpg",
    minPrice: 62,
    listingCount: 158,
    popularity: 81,
  },
  {
    id: "armin-van-buuren",
    name: "Armin van Buuren - A State of Trance",
    performer: "Armin van Buuren",
    category: "concerts",
    date: "2026-09-05T22:00:00",
    venue: "Paris La Défense Arena",
    city: "Nanterre",
    country: "France",
    image: "/images/armin-van-buuren.jpg",
    minPrice: 89,
    listingCount: 347,
    popularity: 94,
  },
  {
    id: "joe-bonamassa",
    name: "Joe Bonamassa - Live in Concert",
    performer: "Joe Bonamassa",
    category: "concerts",
    date: "2026-10-21T18:30:00",
    venue: "Salle Pleyel",
    city: "Paris",
    country: "France",
    image: "/images/joe-bonamassa.jpg",
    minPrice: 75,
    listingCount: 96,
    popularity: 72,
  },
  {
    id: "five-finger-death-punch",
    name: "Five Finger Death Punch - European Tour",
    performer: "Five Finger Death Punch",
    category: "concerts",
    date: "2026-11-15T19:30:00",
    venue: "Zénith de Paris - La Villette",
    city: "Paris",
    country: "France",
    image: "/images/five-finger-death-punch.jpg",
    minPrice: 66,
    listingCount: 143,
    popularity: 79,
  },
  {
    id: "westlife",
    name: "Westlife - The Wild Dreams Tour",
    performer: "Westlife",
    category: "concerts",
    date: "2026-11-02T20:00:00",
    venue: "Accor Arena",
    city: "Paris",
    country: "France",
    image: "/images/westlife.jpg",
    minPrice: 70,
    listingCount: 189,
    popularity: 82,
  },

  // --- Sport ---
  {
    id: "seattle-kraken",
    name: "NHL Global Series - Seattle Kraken vs Carolina Hurricanes",
    performer: "Seattle Kraken",
    category: "sport",
    date: "2026-11-12T19:00:00",
    venue: "Avicii Arena",
    city: "Stockholm",
    country: "Sweden",
    image: "/images/seattle-kraken.jpg",
    minPrice: 98,
    listingCount: 210,
    popularity: 89,
  },
  {
    id: "carolina-hurricanes",
    name: "NHL Global Series - Carolina Hurricanes vs Seattle Kraken",
    performer: "Carolina Hurricanes",
    category: "sport",
    date: "2026-11-14T20:00:00",
    venue: "Avicii Arena",
    city: "Stockholm",
    country: "Sweden",
    image: "/images/carolina-hurricanes.jpg",
    minPrice: 95,
    listingCount: 198,
    popularity: 87,
  },
  {
    id: "man-utd-wrexham",
    name: "Manchester United vs Wrexham FC - Friendly",
    performer: "Manchester United",
    category: "sport",
    date: "2026-07-18T18:00:00",
    venue: "Old Trafford",
    city: "Manchester",
    country: "United Kingdom",
    image: "/images/man-utd-wrexham.jpg",
    minPrice: 120,
    listingCount: 265,
    popularity: 91,
  },
  {
    id: "finland-football",
    name: "Finland - Albania | Nations League",
    performer: "Finland National Team",
    category: "sport",
    date: "2026-10-03T16:00:00",
    venue: "Helsinki Olympic Stadium",
    city: "Helsinki",
    country: "Finland",
    image: "/images/finland-football.jpg",
    minPrice: 45,
    listingCount: 121,
    popularity: 74,
  },
  {
    id: "davis-cup",
    name: "Davis Cup | Finland - Monaco",
    performer: "Davis Cup",
    category: "sport",
    date: "2026-09-18T18:00:00",
    venue: "Metro Areena",
    city: "Espoo",
    country: "Finland",
    image: "/images/davis-cup.jpg",
    minPrice: 55,
    listingCount: 88,
    popularity: 70,
  },
  {
    id: "hjk-helsinki",
    name: "HJK Helsinki - VPS | Veikkausliiga",
    performer: "HJK Helsinki",
    category: "sport",
    date: "2026-07-18T15:00:00",
    venue: "Bolt Arena",
    city: "Helsinki",
    country: "Finland",
    image: "/images/hjk-helsinki.jpg",
    minPrice: 35,
    listingCount: 64,
    popularity: 66,
  },

  // --- Théâtre & classique ---
  {
    id: "andre-rieu",
    name: "André Rieu and his Johann Strauss Orchestra",
    performer: "André Rieu",
    category: "theatre",
    date: "2026-10-06T19:00:00",
    venue: "Accor Arena",
    city: "Paris",
    country: "France",
    image: "/images/andre-rieu.jpg",
    minPrice: 69,
    listingCount: 187,
    popularity: 85,
  },
  {
    id: "havasi",
    name: "HAVASI - Symphonic Concert Show",
    performer: "HAVASI",
    category: "theatre",
    date: "2026-09-20T16:00:00",
    venue: "Palais des Congrès",
    city: "Paris",
    country: "France",
    image: "/images/havasi.jpg",
    minPrice: 58,
    listingCount: 112,
    popularity: 75,
  },
  {
    id: "yamato",
    name: "Yamato - The Drummers of Japan",
    performer: "Yamato",
    category: "theatre",
    date: "2026-09-12T20:00:00",
    venue: "Bobino",
    city: "Paris",
    country: "France",
    image: "/images/yamato.jpg",
    minPrice: 42,
    listingCount: 74,
    popularity: 71,
  },
  {
    id: "flashdance",
    name: "Flashdance - The Musical",
    performer: "Flashdance",
    category: "theatre",
    date: "2026-10-10T20:30:00",
    venue: "Le Dôme de Paris",
    city: "Paris",
    country: "France",
    image: "/images/flashdance.jpg",
    minPrice: 49,
    listingCount: 143,
    popularity: 80,
  },
  {
    id: "saturday-night-fever",
    name: "Saturday Night Fever - The Musical",
    performer: "Saturday Night Fever",
    category: "theatre",
    date: "2026-08-22T20:00:00",
    venue: "Théâtre Mogador",
    city: "Paris",
    country: "France",
    image: "/images/saturday-night-fever.jpg",
    minPrice: 45,
    listingCount: 128,
    popularity: 78,
  },
  {
    id: "johann-strauss",
    name: "New Year's Grand Concert - Johann Strauss",
    performer: "Johann Strauss",
    category: "theatre",
    date: "2026-12-31T19:30:00",
    venue: "Théâtre des Champs-Élysées",
    city: "Paris",
    country: "France",
    image: "/images/johann-strauss.jpg",
    minPrice: 60,
    listingCount: 95,
    popularity: 73,
  },
];

export function getEvent(id: string): EventItem | undefined {
  return events.find((e) => e.id === id);
}

export function eventsByCategory(cat: string): EventItem[] {
  return events
    .filter((e) => e.category === cat)
    .sort((a, b) => b.popularity - a.popularity);
}

export function popularEvents(limit = 8): EventItem[] {
  return [...events].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}

export function searchEvents(q: string): EventItem[] {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return events.filter(
    (e) =>
      e.name.toLowerCase().includes(s) ||
      e.performer.toLowerCase().includes(s) ||
      e.city.toLowerCase().includes(s) ||
      e.venue.toLowerCase().includes(s)
  );
}

// Deterministic pseudo-random listing generator (stable per event id)
function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const ZONES: Listing["zone"][] = [
  "Golden Circle",
  "Lower Tier",
  "Upper Tier",
  "Floor",
  "Balcony",
  "Orchestra",
];

const TYPES: Listing["ticketType"][] = ["E-ticket", "Mobile ticket", "Paper ticket"];

const FEATURE_POOL = [
  "Seats together",
  "Unobstructed view",
  "Instant delivery",
  "Fast entry",
  "Drinks included",
  "Close to the stage",
];

export function generateListings(event: EventItem): Listing[] {
  const seedNum = event.id
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const rand = seeded(seedNum);
  const count = 14 + Math.floor(rand() * 10);
  const listings: Listing[] = [];

  for (let i = 0; i < count; i++) {
    const zone = ZONES[Math.floor(rand() * ZONES.length)];
    const zoneMult =
      zone === "Golden Circle"
        ? 2.6
        : zone === "Orchestra"
        ? 2.1
        : zone === "Lower Tier"
        ? 1.5
        : zone === "Balcony"
        ? 1.3
        : zone === "Upper Tier"
        ? 1.1
        : 1.0;
    const price = Math.round(
      (event.minPrice * zoneMult * (0.9 + rand() * 0.6)) / 1
    );
    const maxQty = 1 + Math.floor(rand() * 4);
    const qty = Array.from({ length: maxQty }, (_, k) => k + 1);
    const nFeatures = 1 + Math.floor(rand() * 3);
    const features = [...FEATURE_POOL]
      .sort(() => rand() - 0.5)
      .slice(0, nFeatures);

    const deal =
      price < event.minPrice * 1.3
        ? "Great deal"
        : price > event.minPrice * 2.2
        ? "Premium"
        : "Average price";

    listings.push({
      id: `${event.id}-L${i + 1}`,
      section: `Section ${String.fromCharCode(65 + (i % 8))}${
        10 + Math.floor(rand() * 40)
      }`,
      row: `Row ${1 + Math.floor(rand() * 25)}`,
      quantity: qty,
      pricePerTicket: price,
      ticketType: TYPES[Math.floor(rand() * TYPES.length)],
      features,
      dealScore: deal,
      zone,
    });
  }

  return listings.sort((a, b) => a.pricePerTicket - b.pricePerTicket);
}
