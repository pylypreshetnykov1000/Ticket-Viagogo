import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ListingsPanel from "@/components/ListingsPanel";
import { IconCalendar, IconPin, IconUsers, IconCheck } from "@/components/icons";
import { events, getEvent, generateListings } from "@/lib/data";
import { formatFullDate, formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

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

  const listings = generateListings(event);

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

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="relative hidden h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-surface sm:block">
              <Image
                src={event.image}
                alt={event.performer}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="max-w-2xl text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                {event.name} Tickets
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ink-muted">
                <span className="flex items-center gap-1.5">
                  <IconCalendar size={15} /> {formatFullDate(event.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <IconPin size={15} /> {event.venue}, {event.city}
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-line bg-surface px-4 py-3 text-right">
            <span className="text-xs text-ink-muted">from</span>
            <div className="text-2xl font-bold text-ink">{formatPrice(event.minPrice)}</div>
            <span className="text-xs text-ink-muted">{event.listingCount} listings</span>
          </div>
        </div>

        {/* Views info banner */}
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-blue-tint px-4 py-3 text-sm text-blue-dark">
          <IconUsers size={16} />
          {Math.round(event.popularity * 5.1)} people viewed this event in the last hour
        </div>
      </div>

      {/* Guarantee strip */}
      <div className="mt-5 border-y border-line bg-brand/5">
        <div className="container-page flex flex-wrap items-center gap-x-6 gap-y-1 py-2.5 text-xs text-ink-soft">
          <span className="flex items-center gap-1.5 font-semibold text-brand-dark">
            <IconCheck size={14} /> viagogo Guarantee — 100% secure purchase
          </span>
          <span>Electronic delivery</span>
          <span>Verified sellers</span>
        </div>
      </div>

      <div className="container-page py-8">
        <h2 className="mb-4 text-lg font-bold text-ink">Choose your tickets</h2>
        <ListingsPanel event={event} listings={listings} />
      </div>
    </>
  );
}

