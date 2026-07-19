import Link from "next/link";
import { worldCupMatches } from "@/lib/home";

/**
 * World Cup 2026 strip — matches viagogo.fr: two 280px bordered cards, stage
 * title 16/700, date column in a light rounded box, "HOME vs. AWAY" line with
 * real flag graphics (inline SVG — emoji flags don't render on Windows), then
 * a full-width black "View all" button.
 */
export default function WorldCupSection() {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between">
        <h2 className="section-title">World Cup 2026</h2>
        <Link href="/sport" className="link-blue whitespace-nowrap">View all</Link>
      </div>

      <div className="no-scrollbar flex gap-6 overflow-x-auto pb-1">
        {/* origin shows two match cards */}
        {worldCupMatches.slice(0, 2).map((m) => (
          <div
            key={m.id}
            className="flex w-[280px] shrink-0 flex-col rounded-xl border border-line bg-white p-4"
          >
            <p className="text-[16px] font-bold leading-5 text-ink">{m.stage}</p>
            <div className="mt-3 flex items-start gap-3">
              <div className="flex w-14 flex-shrink-0 flex-col items-center rounded-lg bg-surface py-1.5 text-center">
                <span className="text-[12px] font-medium text-ink-muted">{m.month}</span>
                <span className="text-xl font-bold leading-6 text-ink">{m.day}</span>
                <span className="text-[12px] text-ink-muted">{m.weekday}</span>
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-[16px] font-bold text-ink-strong">
                  <Flag code={m.home} /> {m.home}
                  <span className="text-xs font-normal text-ink-muted">vs.</span>
                  <Flag code={m.away} /> {m.away}
                </p>
                <p className="mt-1 truncate text-sm text-ink-muted">
                  {m.time} · {m.city}
                </p>
                <p className="truncate text-sm text-ink-muted">{m.venue}</p>
              </div>
            </div>
            <Link
              href="/sport"
              className="mt-4 rounded-lg bg-announce py-2 text-center text-sm font-semibold text-white hover:bg-black"
            >
              View all
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Simplified national flags, 16×12 — reliable cross-platform (emoji are not) */
function Flag({ code }: { code: string }) {
  const flag = FLAGS[code];
  if (!flag) return null;
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      className="flex-shrink-0 overflow-hidden rounded-[2px] border border-black/10"
      aria-label={`${code} flag`}
    >
      {flag}
    </svg>
  );
}

const FLAGS: Record<string, React.ReactNode> = {
  FRA: (
    <>
      <rect width="5.33" height="12" fill="#0055A4" />
      <rect x="5.33" width="5.33" height="12" fill="#fff" />
      <rect x="10.67" width="5.33" height="12" fill="#EF4135" />
    </>
  ),
  ENG: (
    <>
      <rect width="16" height="12" fill="#fff" />
      <rect x="6.5" width="3" height="12" fill="#CE1124" />
      <rect y="4.5" width="16" height="3" fill="#CE1124" />
    </>
  ),
  ESP: (
    <>
      <rect width="16" height="12" fill="#AA151B" />
      <rect y="3" width="16" height="6" fill="#F1BF00" />
    </>
  ),
  ARG: (
    <>
      <rect width="16" height="12" fill="#74ACDF" />
      <rect y="4" width="16" height="4" fill="#fff" />
      <circle cx="8" cy="6" r="1.3" fill="#F6B40E" />
    </>
  ),
  GER: (
    <>
      <rect width="16" height="4" fill="#000" />
      <rect y="4" width="16" height="4" fill="#DD0000" />
      <rect y="8" width="16" height="4" fill="#FFCE00" />
    </>
  ),
  BRA: (
    <>
      <rect width="16" height="12" fill="#009C3B" />
      <path d="M8 1.5 14.5 6 8 10.5 1.5 6z" fill="#FFDF00" />
      <circle cx="8" cy="6" r="2.2" fill="#002776" />
    </>
  ),
  POR: (
    <>
      <rect width="6.4" height="12" fill="#046A38" />
      <rect x="6.4" width="9.6" height="12" fill="#DA291C" />
      <circle cx="6.4" cy="6" r="2" fill="#FFE900" />
    </>
  ),
};
