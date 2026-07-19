/**
 * SERVER-ONLY JSON data store. Never import from client components — data
 * reaches the client via page props or /api routes.
 *
 * Storage: data/db.json (gitignored), seeded from lib/data.ts on first read.
 * The dataset is tiny, so we read the file on every call — always fresh,
 * no cache invalidation to get wrong. Writes go through a temp file + rename.
 */
import fs from "fs";
import path from "path";
import type { EventItem, Listing, Order, OrderStatus } from "./types";
import { seedEvents } from "./data";
import { generateListings, dealScoreFor, FEES_RATE } from "./derive";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

interface Db {
  events: EventItem[];
  /** ticket listings per event id — the source of truth for prices/counts */
  listings: Record<string, Listing[]>;
  /** completed purchases */
  orders: Order[];
}

function seedDb(): Db {
  const db: Db = { events: structuredClone(seedEvents), listings: {}, orders: [] };
  for (const e of db.events) db.listings[e.id] = generateListings(e);
  for (const e of db.events) syncDerived(db, e.id);
  return db;
}

function ensureDb(): void {
  if (fs.existsSync(DB_FILE)) return;
  fs.mkdirSync(DATA_DIR, { recursive: true });
  writeDb(seedDb());
}

function readDb(): Db {
  ensureDb();
  const db = JSON.parse(fs.readFileSync(DB_FILE, "utf8")) as Db;
  let dirty = false;

  // migrate stores created before ticket listings existed
  if (!db.listings) {
    db.listings = {};
    for (const e of db.events) {
      db.listings[e.id] = generateListings(e);
      syncDerived(db, e.id);
    }
    dirty = true;
  }
  // migrate stores created before orders / inventory existed
  if (!db.orders) {
    db.orders = [];
    dirty = true;
  }
  for (const list of Object.values(db.listings)) {
    for (const l of list) {
      if (typeof l.available !== "number") {
        const maxQty = l.quantity[l.quantity.length - 1] ?? 1;
        l.available = maxQty + 4;
        dirty = true;
      }
    }
  }
  if (dirty) writeDb(db);
  return db;
}

/**
 * Events don't own their price/count — tickets do. Recompute the event's
 * derived fields and every listing's deal score from the stored tickets.
 * The public "from" price and count reflect listings that still have stock.
 */
function syncDerived(db: Db, eventId: string): void {
  const event = db.events.find((e) => e.id === eventId);
  const listings = db.listings[eventId] ?? [];
  if (!event) return;
  const inStock = listings.filter((l) => l.available > 0);
  event.listingCount = inStock.length;
  const priced = inStock.length > 0 ? inStock : listings;
  if (priced.length > 0) {
    const min = Math.min(...priced.map((l) => l.pricePerTicket));
    event.minPrice = min;
    for (const l of listings) l.dealScore = dealScoreFor(l.pricePerTicket, min);
  }
}

function writeDb(db: Db): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = `${DB_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, DB_FILE);
}

export function getEvents(): EventItem[] {
  return readDb().events;
}

export function getEvent(id: string): EventItem | undefined {
  return getEvents().find((e) => e.id === id);
}

export function upsertEvent(event: EventItem): void {
  const db = readDb();
  const i = db.events.findIndex((e) => e.id === event.id);
  if (i >= 0) db.events[i] = event;
  else db.events.push(event);
  // a brand-new event starts with a generated set of tickets (editable after)
  if (!db.listings[event.id]) db.listings[event.id] = generateListings(event);
  syncDerived(db, event.id);
  writeDb(db);
}

export function deleteEvent(id: string): boolean {
  const db = readDb();
  const before = db.events.length;
  db.events = db.events.filter((e) => e.id !== id);
  delete db.listings[id];
  writeDb(db);
  return db.events.length < before;
}

/** Reset the store back to the seed data (admin "restore defaults"). */
export function resetToSeed(): void {
  writeDb(seedDb());
}

// ---------- ticket listings ----------

export function getListings(eventId: string): Listing[] {
  const db = readDb();
  return (db.listings[eventId] ?? []).slice().sort((a, b) => a.pricePerTicket - b.pricePerTicket);
}

export function getListing(eventId: string, listingId: string): Listing | undefined {
  return getListings(eventId).find((l) => l.id === listingId);
}

/** Create or update a ticket listing; deal scores & event price/count re-derive. */
export function saveListing(eventId: string, listing: Listing): void {
  const db = readDb();
  if (!db.events.some((e) => e.id === eventId)) throw new Error("Event not found");
  const listings = (db.listings[eventId] ??= []);
  const i = listings.findIndex((l) => l.id === listing.id);
  if (i >= 0) listings[i] = listing;
  else listings.push(listing);
  syncDerived(db, eventId);
  writeDb(db);
}

export function deleteListing(eventId: string, listingId: string): void {
  const db = readDb();
  db.listings[eventId] = (db.listings[eventId] ?? []).filter((l) => l.id !== listingId);
  syncDerived(db, eventId);
  writeDb(db);
}

/** Replace an event's tickets with a freshly generated set. */
export function regenerateListings(eventId: string): void {
  const db = readDb();
  const event = db.events.find((e) => e.id === eventId);
  if (!event) throw new Error("Event not found");
  db.listings[eventId] = generateListings(event);
  syncDerived(db, eventId);
  writeDb(db);
}

/** Next free listing id for an event: "<eventId>-L<n>" */
export function nextListingId(eventId: string): string {
  const used = new Set(getListings(eventId).map((l) => l.id));
  let n = 1;
  while (used.has(`${eventId}-L${n}`)) n++;
  return `${eventId}-L${n}`;
}

// ---------- orders ----------

function newOrderId(db: Db): string {
  const existing = new Set(db.orders.map((o) => o.id));
  let id: string;
  do {
    id = "VGG-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  } while (existing.has(id));
  return id;
}

export function getOrders(): Order[] {
  return readDb().orders.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getOrder(id: string): Order | undefined {
  return readDb().orders.find((o) => o.id === id);
}

export interface CreateOrderInput {
  eventId: string;
  listingId: string;
  qty: number;
  customerName: string;
  customerEmail: string;
}

/**
 * Place a purchase: validates live inventory, snapshots event/ticket details,
 * decrements the listing's stock, and records the order. Throws on any problem
 * so the checkout can surface a real error instead of a fake success.
 */
export function createOrder(input: CreateOrderInput): Order {
  const db = readDb();
  const event = db.events.find((e) => e.id === input.eventId);
  if (!event) throw new Error("Event not found.");
  const listing = (db.listings[input.eventId] ?? []).find((l) => l.id === input.listingId);
  if (!listing) throw new Error("This ticket listing is no longer available.");
  if (!Number.isInteger(input.qty) || input.qty < 1) throw new Error("Invalid quantity.");
  if (listing.available < input.qty)
    throw new Error(
      listing.available === 0
        ? "Sorry, these tickets just sold out."
        : `Only ${listing.available} ticket${listing.available > 1 ? "s" : ""} left for this listing.`
    );

  const subtotal = listing.pricePerTicket * input.qty;
  const fees = Math.round(subtotal * FEES_RATE);
  const order: Order = {
    id: newOrderId(db),
    createdAt: new Date().toISOString(),
    status: "confirmed",
    eventId: event.id,
    eventName: event.name,
    performer: event.performer,
    eventDate: event.date,
    venue: event.venue,
    city: event.city,
    listingId: listing.id,
    zone: listing.zone,
    section: listing.section,
    row: listing.row,
    qty: input.qty,
    pricePerTicket: listing.pricePerTicket,
    subtotal,
    fees,
    total: subtotal + fees,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
  };

  listing.available -= input.qty;
  db.orders.push(order);
  syncDerived(db, event.id);
  writeDb(db);
  return order;
}

/**
 * Change an order's status. Confirmed orders hold stock; cancelling or refunding
 * releases it back to the listing, and re-confirming re-reserves it (if the
 * listing still exists and has room).
 */
export function updateOrderStatus(id: string, status: OrderStatus): void {
  const db = readDb();
  const order = db.orders.find((o) => o.id === id);
  if (!order) throw new Error("Order not found.");
  if (order.status === status) return;

  const listing = (db.listings[order.eventId] ?? []).find((l) => l.id === order.listingId);
  const wasHolding = order.status === "confirmed";
  const willHold = status === "confirmed";

  if (listing) {
    if (wasHolding && !willHold) {
      listing.available += order.qty; // release stock
    } else if (!wasHolding && willHold) {
      if (listing.available < order.qty)
        throw new Error("Not enough stock to re-confirm this order.");
      listing.available -= order.qty; // re-reserve
    }
    syncDerived(db, order.eventId);
  }

  order.status = status;
  writeDb(db);
}

// ---------- images (public/images) ----------

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"]);

export interface ImageInfo {
  file: string; // e.g. "the-weeknd.jpg"
  path: string; // e.g. "/images/the-weeknd.jpg"
  size: number; // bytes
  usedBy: string[]; // event ids referencing it
}

export function listImages(): ImageInfo[] {
  const events = getEvents();
  return fs
    .readdirSync(IMAGES_DIR)
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .sort()
    .map((file) => {
      const rel = `/images/${file}`;
      return {
        file,
        path: rel,
        size: fs.statSync(path.join(IMAGES_DIR, file)).size,
        usedBy: events.filter((e) => e.image === rel).map((e) => e.id),
      };
    });
}

export function saveImage(fileName: string, buf: Buffer): string {
  // sanitize: keep basename, kebab-case, safe extension
  const ext = path.extname(fileName).toLowerCase();
  if (!IMAGE_EXT.has(ext)) throw new Error(`Unsupported image type: ${ext || "none"}`);
  const base = path
    .basename(fileName, path.extname(fileName))
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "") || "image";
  let name = `${base}${ext}`;
  let n = 1;
  while (fs.existsSync(path.join(IMAGES_DIR, name))) name = `${base}-${n++}${ext}`;
  fs.writeFileSync(path.join(IMAGES_DIR, name), buf);
  return `/images/${name}`;
}

/** Static artwork referenced from code (banners, badges, category tiles) */
const SITE_ASSET_PATTERNS = [/^cat-/, /^app-/, /^google-play/, /^qr-code/, /^spotify/, /^subscribe-/];

export function isSiteAsset(file: string): boolean {
  return SITE_ASSET_PATTERNS.some((p) => p.test(file));
}

export function deleteImage(file: string): void {
  const safe = path.basename(file); // no traversal
  const info = listImages().find((i) => i.file === safe);
  if (!info) throw new Error("Image not found");
  if (info.usedBy.length) throw new Error(`Image is used by: ${info.usedBy.join(", ")}`);
  if (isSiteAsset(safe)) throw new Error("Site assets referenced from code cannot be deleted");
  fs.unlinkSync(path.join(IMAGES_DIR, safe));
}
