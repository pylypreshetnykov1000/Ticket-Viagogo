import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ListingsPanel from "@/components/ListingsPanel";
import PerformerSidebar from "@/components/PerformerSidebar";
import { IconCalendar, IconPin, IconUsers, IconCheck, IconBell } from "@/components/icons";
import { getEvent, getListings } from "@/lib/store";
import { formatFullDate, formatPrice } from "@/lib/format";

// Events are editable via the admin panel — resolve at request time
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = getEvent(id);
  if (!event) return { title: "Event not found | viagogo" };
  return {
    title: `${event.name} — Tickets | viagogo`,
    description: `Tickets for ${event.name} at ${event.venue}, ${event.city}. From ${formatPrice(
      event.minPrice
    )}.`,
  };
}

const catLabel: Record<string, string> = {
  concerts: "Concerts",
  sport: "Sports",
  theatre: "Theatre & Comedy",
};

const catHref: Record<string, string> = {
  concerts: "/concerts",
  sport: "/sport",
  theatre: "/theatre",
};

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEvent(id);
  if (!event) notFound();

  // Tickets come from the admin-managed store, not a generator
  const listings = getListings(event.id);

  return (
    <>
      {/* Event header (white, viagogo style) */}
      <div className="container-page pt-6">
        <nav className="mb-3 text-xs text-ink-muted">
          <Link href="/" className="hover:text-brand-dark">Home</Link>
          <span className="mx-1">/</span>
          <Link href={catHref[event.category]} className="hover:text-brand-dark">
            {catLabel[event.category]}
          </Link>
          <span className="mx-1">/</span>
          <span className="text-ink">{event.performer}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left column */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-4xl font-extrabold tracking-[-1px] text-ink sm:text-5xl">
                {event.performer} Tickets
              </h1>
              <button className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-brand">
                {(event.popularity * 0.4).toFixed(1)}K <IconBell size={16} />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ink-muted">
              <span className="flex items-center gap-1.5">
                <IconCalendar size={15} /> {formatFullDate(event.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <IconPin size={15} /> {event.venue}, {event.city}
              </span>
              <span className="font-semibold text-ink">
                from {formatPrice(event.minPrice)} · {event.listingCount} listings
              </span>
            </div>

            {/* Views info banner */}
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-blue-tint px-4 py-3 text-sm text-blue-dark">
              <IconUsers size={16} />
              {Math.round(event.popularity * 5.1)} people viewed {event.performer} events in the past hour
            </div>

            {/* Guarantee strip */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 rounded-lg bg-brand/5 px-4 py-2.5 text-xs text-ink-soft">
              <span className="flex items-center gap-1.5 font-semibold text-brand-dark">
                <IconCheck size={14} /> viagogo Guarantee — 100% secure purchase
              </span>
              <span>Electronic delivery</span>
              <span>Verified sellers</span>
            </div>

            <h2 className="mb-4 mt-8 text-lg font-bold text-ink">Choose your tickets</h2>
            <ListingsPanel event={event} listings={listings} />
          </div>

          {/* Right sidebar (live performer-page style) */}
          <div className="hidden lg:block">
            <PerformerSidebar event={event} />
          </div>
        </div>
      </div>
    </>
  );
}

