import Link from "next/link";
import { getEvents } from "@/lib/store";
import EventsList from "./EventsList";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; saved?: string }>;
}) {
  const { cat, saved } = await searchParams;
  let events = getEvents();
  if (cat) events = events.filter((e) => e.category === cat);
  events = [...events].sort((a, b) => a.performer.localeCompare(b.performer));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-ink">
          Events <span className="text-base font-normal text-ink-muted">({events.length})</span>
        </h1>
        <Link href="/admin/events/new" className="btn-brand">+ New event</Link>
      </div>

      {saved && (
        <p className="mt-3 rounded-lg bg-brand-tint px-4 py-2 text-sm font-medium text-brand">
          Saved “{saved}”.
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { key: undefined, label: "All" },
          { key: "concerts", label: "Concerts" },
          { key: "sport", label: "Sports" },
          { key: "theatre", label: "Theatre" },
        ].map((f) => (
          <Link
            key={f.label}
            href={f.key ? `/admin/events?cat=${f.key}` : "/admin/events"}
            className={`pill ${cat === f.key || (!cat && !f.key) ? "pill-active" : ""}`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <EventsList events={events} />
    </div>
  );
}
