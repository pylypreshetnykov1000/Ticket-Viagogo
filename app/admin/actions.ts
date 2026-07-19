"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { CategoryKey, EventItem, Listing } from "@/lib/types";
import { SESSION_COOKIE, sessionToken, verifyPassword } from "@/lib/auth";
import { LISTING_ZONES, TICKET_TYPES, LISTING_FEATURES } from "@/lib/derive";
import * as store from "@/lib/store";

// ---------- auth ----------

export async function login(_prev: string | null, formData: FormData): Promise<string | null> {
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) return "Incorrect password.";
  const jar = await cookies();
  jar.set(SESSION_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  redirect(String(formData.get("from") || "/admin"));
}

export async function logout(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// every mutation below runs behind middleware, but double-check the cookie
async function assertAdmin(): Promise<void> {
  const jar = await cookies();
  if (jar.get(SESSION_COOKIE)?.value !== sessionToken()) {
    throw new Error("Not authenticated");
  }
}

function revalidateSite(): void {
  revalidatePath("/", "layout"); // homepage, categories, events, search
}

// ---------- events ----------

const CATEGORIES: CategoryKey[] = ["concerts", "sport", "theatre"];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface EventFormState {
  error: string | null;
}

export async function saveEvent(
  _prev: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  await assertAdmin();

  const existingId = String(formData.get("existingId") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const performer = String(formData.get("performer") ?? "").trim();
  const category = String(formData.get("category") ?? "") as CategoryKey;
  const date = String(formData.get("date") ?? "");
  const venue = String(formData.get("venue") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const image = String(formData.get("image") ?? "");
  const popularity = Number(formData.get("popularity"));

  if (!name || !performer || !venue || !city || !country)
    return { error: "Please fill in all text fields." };
  if (!CATEGORIES.includes(category)) return { error: "Invalid category." };
  if (!date || isNaN(+new Date(date))) return { error: "Invalid date." };
  if (!image.startsWith("/images/")) return { error: "Please choose an image." };
  if (!Number.isInteger(popularity) || popularity < 0 || popularity > 100)
    return { error: "Popularity must be an integer 0-100." };

  // minPrice/listingCount are DERIVED from ticket listings. On create, the
  // "base ticket price" seeds the generated tickets; on edit, keep stored values.
  let id = existingId;
  let minPrice: number;
  let listingCount: number;
  if (!id) {
    const basePrice = Number(formData.get("minPrice"));
    if (!Number.isFinite(basePrice) || basePrice <= 0)
      return { error: "Base ticket price must be a positive number." };
    minPrice = basePrice;
    listingCount = 0; // synced by the store once tickets are generated
    id = slugify(performer) || slugify(name);
    if (!id) return { error: "Could not derive an id from the performer name." };
    if (store.getEvent(id)) {
      let n = 2;
      while (store.getEvent(`${id}-${n}`)) n++;
      id = `${id}-${n}`;
    }
  } else {
    const existing = store.getEvent(id);
    if (!existing) return { error: `Event "${id}" no longer exists.` };
    minPrice = existing.minPrice;
    listingCount = existing.listingCount;
  }

  const event: EventItem = {
    id,
    name,
    performer,
    category,
    date: date.length === 16 ? `${date}:00` : date, // datetime-local → seconds
    venue,
    city,
    country,
    image,
    minPrice,
    listingCount,
    popularity,
  };
  store.upsertEvent(event);
  revalidateSite();
  redirect("/admin/events?saved=" + encodeURIComponent(id));
}

export async function removeEvent(formData: FormData): Promise<void> {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  store.deleteEvent(id);
  revalidateSite();
  revalidatePath("/admin/events");
}

export async function resetData(): Promise<void> {
  await assertAdmin();
  store.resetToSeed();
  revalidateSite();
  revalidatePath("/admin", "layout");
}

// ---------- ticket listings ----------

export interface ListingFormState {
  error: string | null;
}

export async function saveListing(
  _prev: ListingFormState,
  formData: FormData
): Promise<ListingFormState> {
  await assertAdmin();

  const eventId = String(formData.get("eventId") ?? "");
  const listingId = String(formData.get("listingId") ?? "");
  const zone = String(formData.get("zone") ?? "") as Listing["zone"];
  const section = String(formData.get("section") ?? "").trim();
  const row = String(formData.get("row") ?? "").trim();
  const price = Number(formData.get("price"));
  const maxQty = Number(formData.get("maxQty"));
  const available = Number(formData.get("available"));
  const ticketType = String(formData.get("ticketType") ?? "") as Listing["ticketType"];
  const features = formData.getAll("features").map(String).filter((f) => LISTING_FEATURES.includes(f));

  if (!store.getEvent(eventId)) return { error: "Event not found." };
  if (!LISTING_ZONES.includes(zone)) return { error: "Invalid zone." };
  if (!TICKET_TYPES.includes(ticketType)) return { error: "Invalid ticket type." };
  if (!section) return { error: "Section is required." };
  if (!Number.isFinite(price) || price <= 0) return { error: "Price must be a positive number." };
  if (!Number.isInteger(maxQty) || maxQty < 1 || maxQty > 10)
    return { error: "Max quantity must be 1-10." };
  if (!Number.isInteger(available) || available < 0)
    return { error: "Available must be a non-negative integer." };
  if (available < maxQty)
    return { error: "Available tickets can't be fewer than the max quantity per order." };
  if (listingId && !store.getListing(eventId, listingId))
    return { error: "Ticket listing no longer exists." };

  const listing: Listing = {
    id: listingId || store.nextListingId(eventId),
    zone,
    section,
    row: row || undefined,
    pricePerTicket: Math.round(price),
    quantity: Array.from({ length: maxQty }, (_, k) => k + 1),
    available,
    ticketType,
    features,
    // dealScore is recomputed by the store relative to the event's cheapest ticket
  };
  store.saveListing(eventId, listing);
  revalidateSite();
  redirect(`/admin/events/${eventId}/tickets?saved=${encodeURIComponent(listing.id)}`);
}

export async function removeListing(formData: FormData): Promise<void> {
  await assertAdmin();
  const eventId = String(formData.get("eventId") ?? "");
  const listingId = String(formData.get("listingId") ?? "");
  store.deleteListing(eventId, listingId);
  revalidateSite();
  revalidatePath(`/admin/events/${eventId}/tickets`);
}

export async function regenerateListings(formData: FormData): Promise<void> {
  await assertAdmin();
  const eventId = String(formData.get("eventId") ?? "");
  store.regenerateListings(eventId);
  revalidateSite();
  revalidatePath(`/admin/events/${eventId}/tickets`);
}

// ---------- orders ----------

const ORDER_STATUSES = ["confirmed", "cancelled", "refunded"] as const;

export async function setOrderStatus(formData: FormData): Promise<void> {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!ORDER_STATUSES.includes(status as (typeof ORDER_STATUSES)[number])) return;
  try {
    store.updateOrderStatus(id, status as (typeof ORDER_STATUSES)[number]);
  } catch {
    // e.g. not enough stock to re-confirm — ignore, the page will reflect reality
  }
  revalidateSite();
  revalidatePath("/admin/orders");
}

// ---------- images ----------

export interface ImageFormState {
  error: string | null;
  uploaded?: string;
}

export async function uploadImage(
  _prev: ImageFormState,
  formData: FormData
): Promise<ImageFormState> {
  await assertAdmin();
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return { error: "Choose a file to upload." };
  if (file.size > 5 * 1024 * 1024) return { error: "Max file size is 5 MB." };
  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const rel = store.saveImage(file.name, buf);
    revalidatePath("/admin/images");
    revalidatePath("/admin/events", "layout");
    return { error: null, uploaded: rel };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Upload failed." };
  }
}

export async function removeImage(formData: FormData): Promise<void> {
  await assertAdmin();
  const file = String(formData.get("file") ?? "");
  try {
    store.deleteImage(file);
  } catch {
    // referenced images can't be deleted — the UI disables the button, but
    // guard anyway; swallow to avoid an error page from a stale form
  }
  revalidatePath("/admin/images");
}
