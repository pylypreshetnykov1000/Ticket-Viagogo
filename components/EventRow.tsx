import Link from "next/link";
import type { EventItem } from "@/lib/types";
import { parseDate } from "@/lib/format";
import { IconTicket } from "./icons";

export default function EventRow({ event }: { event: EventItem }) {
  const d = parseDate(event.date);
  const pct = (event.popularity % 5) + 1;
  const scarce = event.popularity > 85;

  return (
    <Link
      href={`/event/${event.id}`}
      className="group flex items-center gap-4 rounded-xl border border-line bg-white px-4 py-4 shadow-card transition-shadow hover:shadow-cardHover"
    >
      {/* Date box */}
      <div className="flex w-16 flex-shrink-0 flex-col items-center rounded-lg bg-brand-tint/60 py-2 text-center">
        <span className="text-[12px] font-semibold text-ink">{d.month}</span>
        <span className="text-xl font-bold leading-6 text-ink">{d.day}</span>
        <span className="text-[12px] text-ink-muted">{d.weekday}</span>
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[15px] font-bold text-ink group-hover:text-brand-dark sm:text-base">
          {event.name}
        </h3>
        <p className="mt-0.5 truncate text-xs text-ink-muted sm:text-sm">
          {d.time} · {event.venue} · {event.city}
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {event.popularity > 90 && (
            <span className="badge-pink">
              <FlameIcon /> Selling fast
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

function FlameIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c4 0 7-2.7 7-7 0-3-2-5.5-3.5-7C14 6.5 13 4.5 13 2c-3 2-5 5-5 8-.8-.8-1.4-1.8-1.7-3C4.8 8.6 4 10.7 4 13c0 5 3.5 9 8 9Z" />
    </svg>
  );
}
