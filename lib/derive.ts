/**
 * Pure, client-safe helpers over event lists. No fs / server dependencies —
 * safe to import from client components. Data itself comes from lib/store
 * (server) and reaches the client via props or /api routes.
 */
import type { EventItem, Listing } from "./types";

/** Service-fee rate applied to ticket subtotals across the site. */
export const FEES_RATE = 0.15;

export function eventsByCategory(list: EventItem[], cat: string): EventItem[] {
  return list
    .filter((e) => e.category === cat)
    .sort((a, b) => b.popularity - a.popularity);
}

export function popularEvents(list: EventItem[], limit = 8): EventItem[] {
  return [...list].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}

export function searchEvents(list: EventItem[], q: string): EventItem[] {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return list.filter(
    (e) =>
      e.name.toLowerCase().includes(s) ||
      e.performer.toLowerCase().includes(s) ||
      e.city.toLowerCase().includes(s) ||
      e.venue.toLowerCase().includes(s)
  );
}

/**
 * Deterministic tour date range (stable per event id) — hero cards on viagogo
 * show performer tour ranges ("17 Jul - 22 Jul"), so derive an end date from
 * the event date plus a pseudo-random span of 2-120 days.
 */
export function eventDateRange(event: EventItem): { start: string; end: string } {
  const hash = event.id.split("").reduce((acc, c) => acc * 31 + c.charCodeAt(0), 7) >>> 0;
  const spanDays = 2 + (hash % 119);
  const end = new Date(event.date);
  end.setDate(end.getDate() + spanDays);
  return { start: event.date, end: end.toISOString() };
}

// Deterministic pseudo-random listing generator (stable per event id)
function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export const LISTING_ZONES: Listing["zone"][] = [
  "Golden Circle",
  "Lower Tier",
  "Upper Tier",
  "Floor",
  "Balcony",
  "Orchestra",
];

export const TICKET_TYPES: Listing["ticketType"][] = [
  "E-ticket",
  "Mobile ticket",
  "Paper ticket",
];

export const LISTING_FEATURES = [
  "Seats together",
  "Unobstructed view",
  "Instant delivery",
  "Fast entry",
  "Drinks included",
  "Close to the stage",
];

const ZONES = LISTING_ZONES;
const TYPES = TICKET_TYPES;
const FEATURE_POOL = LISTING_FEATURES;

/** Deal score relative to the event's cheapest ticket — viagogo's rule of thumb */
export function dealScoreFor(price: number, minPrice: number): Listing["dealScore"] {
  return price < minPrice * 1.3
    ? "Great deal"
    : price > minPrice * 2.2
    ? "Premium"
    : "Average price";
}

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
    // inventory: at least maxQty, up to maxQty + 7 tickets available
    const available = maxQty + Math.floor(rand() * 8);
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
      available,
      pricePerTicket: price,
      ticketType: TYPES[Math.floor(rand() * TYPES.length)],
      features,
      dealScore: deal,
      zone,
    });
  }

  return listings.sort((a, b) => a.pricePerTicket - b.pricePerTicket);
}
