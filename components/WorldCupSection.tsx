import Link from "next/link";
import { worldCupMatches } from "@/lib/home";

export default function WorldCupSection() {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <h2 className="section-title">World Cup 2026</h2>
        <Link href="/sport" className="link-blue whitespace-nowrap">View all</Link>
      </div>

      <div className="no-scrollbar flex gap-4 overflow-x-auto pb-1">
        {worldCupMatches.map((m) => (
          <div
            key={m.id}
            className="flex w-[280px] shrink-0 flex-col rounded-xl border border-line bg-white p-4 shadow-card"
          >
            <p className="font-bold text-ink">{m.stage}</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex w-14 flex-shrink-0 flex-col items-center rounded-lg bg-surface py-1.5 text-center">
                <span className="text-[11px] font-medium text-ink-muted">{m.month}</span>
                <span className="text-xl font-bold leading-none text-ink">{m.day}</span>
                <span className="text-[11px] text-ink-muted">{m.weekday}</span>
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <span>{m.homeFlag}</span> {m.home}
                  <span className="font-normal text-ink-muted">vs.</span>
                  <span className="text-ink-muted">⚽</span> {m.away}
                </p>
                <p className="mt-0.5 truncate text-xs text-ink-muted">
                  {m.time} · {m.city}
                </p>
                <p className="truncate text-xs text-ink-muted">{m.venue}</p>
              </div>
            </div>
            <Link
              href="/sport"
              className="mt-4 rounded-lg bg-announce py-2.5 text-center text-sm font-semibold text-white hover:bg-black"
            >
              View all
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
