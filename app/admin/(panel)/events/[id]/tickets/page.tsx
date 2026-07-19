import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvent, getListings } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import { regenerateListings } from "../../../../actions";
import TicketsManager from "./TicketsManager";

export const dynamic = "force-dynamic";

export default async function EventTicketsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;
  const event = getEvent(id);
  if (!event) notFound();
  const listings = getListings(id);

  return (
    <div>
      <nav className="mb-2 text-xs text-ink-muted">
        <Link href="/admin/events" className="hover:text-brand">Events</Link>
        <span className="mx-1">/</span>
        <Link href={`/admin/events/${id}`} className="hover:text-brand">{event.performer}</Link>
        <span className="mx-1">/</span>
        <span className="text-ink">Tickets</span>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-ink">
          Tickets — {event.performer}{" "}
          <span className="text-base font-normal text-ink-muted">({listings.length})</span>
        </h1>
        <form action={regenerateListings}>
          <input type="hidden" name="eventId" value={id} />
          <button
            type="submit"
            className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink hover:border-brand"
            title="Replace all tickets with a freshly generated set"
          >
            ↻ Regenerate tickets
          </button>
        </form>
      </div>

      <p className="mt-1 text-sm text-ink-soft">
        The event&apos;s “from” price ({formatPrice(event.minPrice)}) and listing count derive from
        these tickets automatically. Deal scores are computed from each price vs. the cheapest ticket.
      </p>

      {saved && (
        <p className="mt-3 rounded-lg bg-brand-tint px-4 py-2 text-sm font-medium text-brand">
          Saved ticket “{saved}”.
        </p>
      )}

      <div className="mt-5">
        <TicketsManager eventId={id} listings={listings} />
      </div>
    </div>
  );
}
