"use client";

import { useActionState, useState } from "react";
import type { Listing } from "@/lib/types";
import { LISTING_ZONES, TICKET_TYPES, LISTING_FEATURES } from "@/lib/derive";
import { formatPrice } from "@/lib/format";
import { saveListing, removeListing, type ListingFormState } from "../../../../actions";

export default function TicketsManager({
  eventId,
  listings,
}: {
  eventId: string;
  listings: Listing[];
}) {
  // null = closed, undefined-id listing = "new", otherwise editing that listing
  const [editing, setEditing] = useState<Listing | "new" | null>(null);

  return (
    <div className="space-y-5">
      {editing === null ? (
        <button onClick={() => setEditing("new")} className="btn-brand">
          + Add ticket listing
        </button>
      ) : (
        <ListingForm
          eventId={eventId}
          listing={editing === "new" ? undefined : editing}
          onClose={() => setEditing(null)}
        />
      )}

      <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-card">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-4 py-3">Zone</th>
              <th className="px-4 py-3">Section · Row</th>
              <th className="px-4 py-3 text-right">Price / ticket</th>
              <th className="px-4 py-3 text-right">Max qty</th>
              <th className="px-4 py-3 text-right">Available</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Deal</th>
              <th className="px-4 py-3">Features</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((l) => (
              <tr key={l.id} className="border-b border-line last:border-0 hover:bg-surface/60">
                <td className="px-4 py-2.5 font-semibold text-ink">{l.zone}</td>
                <td className="px-4 py-2.5 text-ink-soft">
                  {l.section}
                  {l.row ? ` · ${l.row}` : ""}
                </td>
                <td className="px-4 py-2.5 text-right font-semibold text-ink">
                  {formatPrice(l.pricePerTicket)}
                </td>
                <td className="px-4 py-2.5 text-right text-ink-soft">
                  {l.quantity[l.quantity.length - 1]}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <span
                    className={`font-semibold ${
                      l.available === 0
                        ? "text-pink"
                        : l.available <= 4
                        ? "text-amber-600"
                        : "text-ink-soft"
                    }`}
                  >
                    {l.available === 0 ? "Sold out" : l.available}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-ink-soft">{l.ticketType}</td>
                <td className="px-4 py-2.5">
                  {l.dealScore && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        l.dealScore === "Great deal"
                          ? "bg-brand/10 text-brand-dark"
                          : l.dealScore === "Premium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-surface text-ink-soft"
                      }`}
                    >
                      {l.dealScore}
                    </span>
                  )}
                </td>
                <td className="max-w-[220px] truncate px-4 py-2.5 text-xs text-ink-muted" title={l.features.join(", ")}>
                  {l.features.join(", ")}
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditing(l)}
                      className="rounded-md border border-line px-2.5 py-1 text-xs font-semibold text-brand hover:border-brand"
                    >
                      Edit
                    </button>
                    <form action={removeListing}>
                      <input type="hidden" name="eventId" value={eventId} />
                      <input type="hidden" name="listingId" value={l.id} />
                      <button
                        type="submit"
                        className="rounded-md border border-line px-2.5 py-1 text-xs text-pink hover:border-pink"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {listings.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-ink-muted">
                  No tickets for this event yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ListingForm({
  eventId,
  listing,
  onClose,
}: {
  eventId: string;
  listing?: Listing;
  onClose: () => void;
}) {
  const [state, action, pending] = useActionState<ListingFormState, FormData>(saveListing, {
    error: null,
  });

  return (
    <form action={action} className="rounded-xl border border-brand/40 bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-ink">
          {listing ? `Edit ticket ${listing.id}` : "New ticket listing"}
        </h2>
        <button type="button" onClick={onClose} className="text-xs text-ink-muted hover:text-ink">
          ✕ Close
        </button>
      </div>

      <input type="hidden" name="eventId" value={eventId} />
      {listing && <input type="hidden" name="listingId" value={listing.id} />}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink-soft">Zone</span>
          <select
            name="zone"
            defaultValue={listing?.zone ?? "Lower Tier"}
            className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            {LISTING_ZONES.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink-soft">Section</span>
          <input
            name="section"
            required
            defaultValue={listing?.section}
            placeholder="Section B12"
            className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink-soft">Row (optional)</span>
          <input
            name="row"
            defaultValue={listing?.row}
            placeholder="Row 4"
            className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink-soft">Price per ticket (€)</span>
          <input
            type="number"
            name="price"
            required
            min={1}
            defaultValue={listing?.pricePerTicket}
            className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink-soft">Max qty / order</span>
          <input
            type="number"
            name="maxQty"
            required
            min={1}
            max={10}
            defaultValue={listing ? listing.quantity[listing.quantity.length - 1] : 4}
            className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink-soft">Available (inventory)</span>
          <input
            type="number"
            name="available"
            required
            min={0}
            defaultValue={listing ? listing.available : 10}
            className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink-soft">Ticket type</span>
          <select
            name="ticketType"
            defaultValue={listing?.ticketType ?? "E-ticket"}
            className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            {TICKET_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="mt-4">
        <legend className="mb-2 text-xs font-medium text-ink-soft">Features</legend>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {LISTING_FEATURES.map((f) => (
            <label key={f} className="flex items-center gap-1.5 text-sm text-ink">
              <input
                type="checkbox"
                name="features"
                value={f}
                defaultChecked={listing?.features.includes(f)}
                className="accent-brand"
              />
              {f}
            </label>
          ))}
        </div>
      </fieldset>

      {state.error && <p className="mt-3 text-sm font-medium text-pink">{state.error}</p>}

      <div className="mt-5 flex gap-3">
        <button type="submit" disabled={pending} className="btn-brand disabled:opacity-60">
          {pending ? "Saving…" : listing ? "Save ticket" : "Add ticket"}
        </button>
        <button type="button" onClick={onClose} className="btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}
