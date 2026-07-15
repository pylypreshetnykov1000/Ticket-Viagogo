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
  quantity: number[]; // available quantities e.g. [1,2,3,4]
  pricePerTicket: number; // in EUR
  ticketType: "E-ticket" | "Mobile ticket" | "Paper ticket";
  features: string[];
  dealScore?: "Great deal" | "Average price" | "Premium";
  zone: "Floor" | "Lower Tier" | "Upper Tier" | "Golden Circle" | "Balcony" | "Orchestra";
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
