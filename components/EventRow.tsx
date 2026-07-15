import Link from "next/link";
import type { EventItem } from "@/lib/types";
import { parseDate } from "@/lib/format";
import { IconTicket } from "./icons";

export default function EventRow({ event }: { event: EventItem }) {
  const d = parseDate(event.date);
  // deterministic urgency badge
  const pct = (event.popularity % 5) + 1;
  const scarce = event.popularity > 85;

  return (
    <Link
      href={`/event/${event.id}`}
      className="group flex items-center gap-4 border-b border-line px-3 py-4 transition-colors last:border-0 hover:bg-surface sm:px-4"
    >
      {/* Date box */}
      <div className="flex w-16 flex-shrink-0 flex-col items-center rounded-lg border border-line bg-brand/5 py-2 text-center">
        <span className="text-[11px] font-medium lowercase text-ink-muted">{d.month}</span>
        <span className="text-2xl font-bold leading-none text-ink">{d.day}</span>
        <span className="text-[11px] lowercase text-ink-muted">{d.weekday}</span>
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[15px] font-bold text-ink group-hover:text-brand-dark sm:text-base">
          {event.name}
        </h3>
        <p className="mt-0.5 truncate text-xs text-ink-muted sm:text-sm">
          {d.time} · {event.venue}, {event.city}
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {event.popularity > 90 && (
            <span className="badge-green">
              <IconTicket size={12} /> Popular
            </span>
          )}
          {scarce && (
            <span className="badge-pink">
              <IconTicket size={12} /> Only {pct}% of tickets left
            </span>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="flex-shrink-0">
        <span className="btn-green-outline">See tickets</span>
      </div>
    </Link>
  );
}
