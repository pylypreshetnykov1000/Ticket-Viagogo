"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { EventItem, Listing } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import SeatMap from "./SeatMap";

const FEES_RATE = 0.15;

export default function ListingsPanel({
  event,
  listings,
}: {
  event: EventItem;
  listings: Listing[];
}) {
  const router = useRouter();
  const [zone, setZone] = useState<string | null>(null);
  const [qty, setQty] = useState<number>(2);
  const [sort, setSort] = useState<"price" | "zone">("price");

  const filtered = useMemo(() => {
    let list = listings.filter((l) => l.quantity.includes(qty));
    if (zone) list = list.filter((l) => l.zone === zone);
    list = [...list];
    if (sort === "price") list.sort((a, b) => a.pricePerTicket - b.pricePerTicket);
    else list.sort((a, b) => a.zone.localeCompare(b.zone) || a.pricePerTicket - b.pricePerTicket);
    return list;
  }, [listings, zone, qty, sort]);

  function select(l: Listing) {
    const params = new URLSearchParams({
      event: event.id,
      listing: l.id,
      qty: String(qty),
      price: String(l.pricePerTicket),
      section: l.section,
      zone: l.zone,
    });
    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
      {/* Left: seat map + quantity */}
      <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
        <SeatMap activeZone={zone} onZoneClick={setZone} />

        <div className="rounded-xl border border-line bg-white p-4 shadow-card">
          <label className="mb-2 block text-sm font-semibold text-ink">
            Number of tickets
          </label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => setQty(n)}
                className={`h-9 w-9 rounded-md border text-sm font-semibold transition-colors ${
                  qty === n
                    ? "border-brand bg-brand text-white"
                    : "border-line text-ink hover:border-brand"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Prices shown are for {qty} ticket{qty > 1 ? "s" : ""}.
          </p>
        </div>
      </aside>

      {/* Right: listings */}
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-ink-soft">
            <span className="font-semibold text-ink">{filtered.length}</span> listings
            {zone && (
              <>
                {" "}· section <span className="font-semibold text-brand">{zone}</span>
              </>
            )}
          </p>
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "price" | "zone")}
              className="rounded-md border border-line bg-white px-3 py-1.5 text-sm focus:border-brand focus:outline-none"
            >
              <option value="price">Lowest price</option>
              <option value="zone">Section</option>
            </select>
          </label>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-line bg-white p-8 text-center text-sm text-ink-soft shadow-card">
              No listings for {qty} ticket{qty > 1 ? "s" : ""}
              {zone ? ` in section ${zone}` : ""}. Try a different quantity or section.
            </div>
          ) : (
            filtered.map((l) => (
              <ListingCard key={l.id} listing={l} qty={qty} onSelect={() => select(l)} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function ListingCard({
  listing,
  qty,
  onSelect,
}: {
  listing: Listing;
  qty: number;
  onSelect: () => void;
}) {
  const total = listing.pricePerTicket * qty;
  const fees = Math.round(total * FEES_RATE);

  const dealColor =
    listing.dealScore === "Great deal"
      ? "bg-brand/10 text-brand-dark"
      : listing.dealScore === "Premium"
      ? "bg-amber-100 text-amber-700"
      : "bg-brand/10 text-brand-dark";

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-white p-4 shadow-card transition-shadow hover:shadow-cardHover sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-ink">{listing.zone}</h3>
          {listing.dealScore && (
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${dealColor}`}>
              {listing.dealScore}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-ink-soft">
          {listing.section} · {listing.row}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="rounded border border-line px-1.5 py-0.5 text-[11px] text-ink-soft">
            {listing.ticketType}
          </span>
          {listing.features.map((f) => (
            <span
              key={f}
              className="rounded border border-line px-1.5 py-0.5 text-[11px] text-ink-soft"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
        <div className="text-right">
          <div className="text-lg font-bold text-ink">
            {formatPrice(listing.pricePerTicket)}
          </div>
          <div className="text-[11px] text-ink-faint">
            per ticket · +{formatPrice(fees)} fees
          </div>
        </div>
        <button onClick={onSelect} className="btn-tickets whitespace-nowrap">
          Select
        </button>
      </div>
    </div>
  );
}
