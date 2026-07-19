"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { EventItem } from "@/lib/types";
import { formatCardDate, formatPrice } from "@/lib/format";
import Modal from "@/components/admin/Modal";
import { removeEvent } from "../../actions";

const CAT_LABEL: Record<string, string> = {
  concerts: "Concerts",
  sport: "Sports",
  theatre: "Theatre",
};

export default function EventsList({ events }: { events: EventItem[] }) {
  const [selected, setSelected] = useState<EventItem | null>(null);

  if (events.length === 0) {
    return (
      <div className="mt-4 rounded-xl border border-line bg-white p-10 text-center text-sm text-ink-muted shadow-card">
        No events yet.
      </div>
    );
  }

  return (
    <>
      {/* ---------- Desktop: table ---------- */}
      <div className="mt-4 hidden overflow-x-auto rounded-xl border border-line bg-white shadow-card md:block">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3 text-right">From</th>
              <th className="px-4 py-3 text-right">Pop.</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-b border-line last:border-0 hover:bg-surface/60">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <span className="relative block h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-surface">
                      <Image src={e.image} alt="" fill sizes="40px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block max-w-[260px] truncate font-semibold text-ink">{e.performer}</span>
                      <span className="block max-w-[260px] truncate text-xs text-ink-muted">{e.name}</span>
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-ink-soft">{CAT_LABEL[e.category]}</td>
                <td className="whitespace-nowrap px-4 py-2.5 text-ink-soft">{formatCardDate(e.date, { year: true })}</td>
                <td className="px-4 py-2.5 text-ink-soft">{e.city}</td>
                <td className="px-4 py-2.5 text-right text-ink-soft">{formatPrice(e.minPrice)}</td>
                <td className="px-4 py-2.5 text-right text-ink-soft">{e.popularity}</td>
                <td className="px-4 py-2.5">
                  <div className="flex flex-nowrap items-center justify-end gap-1.5 whitespace-nowrap">
                    <Link href={`/admin/events/${e.id}/tickets`} className="rounded-md border border-line px-2 py-1 text-xs font-semibold text-ink hover:border-brand" title={`${e.listingCount} ticket listings`}>
                      🎟 {e.listingCount}
                    </Link>
                    <Link href={`/event/${e.id}`} target="_blank" className="rounded-md border border-line px-2 py-1 text-xs text-ink hover:border-brand">View</Link>
                    <Link href={`/admin/events/${e.id}`} className="rounded-md border border-line px-2 py-1 text-xs font-semibold text-brand hover:border-brand">Edit</Link>
                    <form action={removeEvent}>
                      <input type="hidden" name="id" value={e.id} />
                      <button type="submit" className="rounded-md border border-line px-2 py-1 text-xs text-pink hover:border-pink">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile: tappable cards ---------- */}
      <div className="mt-4 space-y-2.5 md:hidden">
        {events.map((e) => (
          <button
            key={e.id}
            onClick={() => setSelected(e)}
            className="flex w-full items-center gap-3 rounded-xl border border-line bg-white p-3 text-left shadow-card active:bg-surface"
          >
            <span className="relative block h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-surface">
              <Image src={e.image} alt="" fill sizes="48px" className="object-cover" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold text-ink">{e.performer}</span>
              <span className="block truncate text-xs text-ink-muted">
                {CAT_LABEL[e.category]} · {formatCardDate(e.date, { year: true })}
              </span>
              <span className="mt-0.5 block text-xs font-medium text-ink-soft">
                {e.city} · from {formatPrice(e.minPrice)} · 🎟 {e.listingCount}
              </span>
            </span>
            <svg className="flex-shrink-0 text-ink-faint" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        ))}
      </div>

      {/* ---------- Detail modal (mobile primary) ---------- */}
      {selected && (
        <Modal
          title="Event details"
          onClose={() => setSelected(null)}
          footer={
            <div className="grid grid-cols-2 gap-2">
              <Link href={`/admin/events/${selected.id}/tickets`} className="rounded-lg bg-announce py-2.5 text-center text-sm font-semibold text-white">
                🎟 Tickets ({selected.listingCount})
              </Link>
              <Link href={`/admin/events/${selected.id}`} className="btn-brand !py-2.5">Edit event</Link>
              <Link href={`/event/${selected.id}`} target="_blank" className="btn-outline !py-2.5">View on site</Link>
              <form action={removeEvent} className="contents">
                <input type="hidden" name="id" value={selected.id} />
                <button type="submit" className="rounded-lg border border-pink py-2.5 text-sm font-semibold text-pink hover:bg-pink-soft">
                  Delete
                </button>
              </form>
            </div>
          }
        >
          <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-xl bg-surface">
            <Image src={selected.image} alt={selected.performer} fill sizes="512px" className="object-cover" />
          </div>
          <h3 className="text-lg font-bold text-ink">{selected.performer}</h3>
          <p className="text-sm text-ink-soft">{selected.name}</p>

          <dl className="mt-4 divide-y divide-line text-sm">
            <DetailRow label="Category" value={CAT_LABEL[selected.category]} />
            <DetailRow label="Date" value={formatCardDate(selected.date, { weekday: true, year: true })} />
            <DetailRow label="Venue" value={selected.venue} />
            <DetailRow label="City" value={`${selected.city}, ${selected.country}`} />
            <DetailRow label="From price" value={formatPrice(selected.minPrice)} />
            <DetailRow label="Ticket listings" value={String(selected.listingCount)} />
            <DetailRow label="Popularity" value={`${selected.popularity} / 100`} />
            <DetailRow label="Event ID" value={selected.id} mono />
          </dl>
        </Modal>
      )}
    </>
  );
}

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <dt className="flex-shrink-0 text-ink-muted">{label}</dt>
      <dd className={`min-w-0 truncate text-right font-medium text-ink ${mono ? "font-mono text-xs" : ""}`}>{value}</dd>
    </div>
  );
}
