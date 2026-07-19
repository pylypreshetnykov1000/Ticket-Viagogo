export type CategoryKey = "concerts" | "sport" | "theatre";

export interface Category {
  key: CategoryKey;
  label: string;
  href: string;
  blurb: string;
}

export interface Listing {
  id: string;
  section: string;
  row?: string;
  quantity: number[]; // purchasable quantities e.g. [1,2,3,4]
  available: number; // tickets remaining in this listing (inventory)
  pricePerTicket: number; // in EUR
  ticketType: "E-ticket" | "Mobile ticket" | "Paper ticket";
  features: string[];
  dealScore?: "Great deal" | "Average price" | "Premium";
  zone: "Floor" | "Lower Tier" | "Upper Tier" | "Golden Circle" | "Balcony" | "Orchestra";
}

export type OrderStatus = "confirmed" | "cancelled" | "refunded";

/**
 * A purchase. Event/ticket details are SNAPSHOT at buy time so the order stays
 * accurate even if the event or listing is later edited or deleted.
 */
export interface Order {
  id: string; // e.g. "VGG-3F9K2A"
  createdAt: string; // ISO
  status: OrderStatus;

  // snapshot of what was bought
  eventId: string;
  eventName: string;
  performer: string;
  eventDate: string;
  venue: string;
  city: string;
  listingId: string;
  zone: string;
  section: string;
  row?: string;

  qty: number;
  pricePerTicket: number;
  subtotal: number;
  fees: number;
  total: number;

  customerName: string;
  customerEmail: string;
}

export interface EventItem {
  id: string;
  name: string;
  performer: string;
  category: CategoryKey;
  date: string; // ISO
  venue: string;
  city: string;
  country: string;
  image: string; // gradient key
  minPrice: number;
  listingCount: number;
  popularity: number;
}
