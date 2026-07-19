import Link from "next/link";
import Image from "next/image";
import { getEvents, getOrders, getListings, listImages } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import { resetData } from "../actions";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const events = getEvents();
  const orders = getOrders();
  const images = listImages();
  const byCat = (c: string) => events.filter((e) => e.category === c).length;
  const ticketListings = events.reduce((acc, e) => acc + e.listingCount, 0);

  const confirmed = orders.filter((o) => o.status === "confirmed");
  const revenue = confirmed.reduce((acc, o) => acc + o.total, 0);
  const ticketsSold = confirmed.reduce((acc, o) => acc + o.qty, 0);

  // best sellers: tickets sold per event (confirmed orders)
  const soldByEvent = new Map<string, { performer: string; qty: number; revenue: number }>();
  for (const o of confirmed) {
    const cur = soldByEvent.get(o.eventId) ?? { performer: o.performer, qty: 0, revenue: 0 };
    cur.qty += o.qty;
    cur.revenue += o.total;
    soldByEvent.set(o.eventId, cur);
  }
  const bestSellers = [...soldByEvent.entries()]
    .map(([id, v]) => ({ id, ...v }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  // low stock: listings with little inventory left
  const lowStock = events
    .flatMap((e) =>
      getListings(e.id)
        .filter((l) => l.available <= 3)
        .map((l) => ({ event: e, listing: l }))
    )
    .sort((a, b) => a.listing.available - b.listing.available)
    .slice(0, 8);

  const stats = [
    { label: "Revenue", value: formatPrice(revenue), href: "/admin/orders", accent: true },
    { label: "Orders", value: String(orders.length), href: "/admin/orders" },
    { label: "Tickets sold", value: String(ticketsSold), href: "/admin/orders" },
    { label: "Events", value: String(events.length), href: "/admin/events" },
    { label: "Ticket listings", value: String(ticketListings), href: "/admin/events" },
    { label: "Images", value: String(images.length), href: "/admin/images" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Manage events, tickets, orders and images. Changes go live immediately.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className={`rounded-xl border p-4 shadow-card transition-shadow hover:shadow-cardHover ${
              s.accent ? "border-brand/30 bg-brand/5" : "border-line bg-white"
            }`}
          >
            <p className={`text-2xl font-bold ${s.accent ? "text-brand-dark" : "text-ink"}`}>{s.value}</p>
            <p className="mt-0.5 text-xs text-ink-muted">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/admin/events/new" className="btn-brand">+ New event</Link>
        <Link href="/admin/orders" className="btn-outline">View orders</Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Best sellers */}
        <div className="rounded-xl border border-line bg-white p-5 shadow-card">
          <h2 className="text-sm font-bold text-ink">Best sellers</h2>
          {bestSellers.length === 0 ? (
            <p className="mt-3 text-sm text-ink-muted">No confirmed sales yet.</p>
          ) : (
            <ul className="mt-3 space-y-2.5">
              {bestSellers.map((b) => (
                <li key={b.id} className="flex items-center justify-between gap-3">
                  <Link href={`/admin/events/${b.id}/tickets`} className="min-w-0 truncate text-sm font-medium text-ink hover:text-brand-dark">
                    {b.performer}
                  </Link>
                  <span className="flex-shrink-0 text-sm text-ink-soft">
                    <span className="font-semibold text-ink">{b.qty}</span> sold · {formatPrice(b.revenue)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Low stock */}
        <div className="rounded-xl border border-line bg-white p-5 shadow-card">
          <h2 className="text-sm font-bold text-ink">Low stock alerts</h2>
          {lowStock.length === 0 ? (
            <p className="mt-3 text-sm text-ink-muted">All listings are well stocked.</p>
          ) : (
            <ul className="mt-3 space-y-2.5">
              {lowStock.map(({ event, listing }) => (
                <li key={listing.id} className="flex items-center justify-between gap-3">
                  <Link
                    href={`/admin/events/${event.id}/tickets`}
                    className="flex min-w-0 items-center gap-2 hover:text-brand-dark"
                  >
                    <span className="relative block h-8 w-8 flex-shrink-0 overflow-hidden rounded-md bg-surface">
                      <Image src={event.image} alt="" fill sizes="32px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-ink">{event.performer}</span>
                      <span className="block truncate text-xs text-ink-muted">
                        {listing.zone} · {listing.section}
                      </span>
                    </span>
                  </Link>
                  <span
                    className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                      listing.available === 0 ? "bg-pink-soft text-pink" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {listing.available === 0 ? "Sold out" : `${listing.available} left`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-line bg-white p-5 shadow-card">
        <h2 className="text-sm font-bold text-ink">Danger zone</h2>
        <p className="mt-1 text-xs text-ink-muted">
          Restore the original seed data — all events, tickets and orders reset. Uploaded images stay.
        </p>
        <form action={resetData} className="mt-3">
          <button
            type="submit"
            className="rounded-lg border border-pink px-4 py-2 text-sm font-semibold text-pink hover:bg-pink-soft"
          >
            Reset to seed data
          </button>
        </form>
      </div>
    </div>
  );
}
