import Link from "next/link";
import CardCarousel from "@/components/CardCarousel";
import EventRow from "@/components/EventRow";
import { IconSend, IconPin, IconCalendar, IconChevronDown } from "@/components/icons";
import { popularEvents, eventsByCategory, events } from "@/lib/data";

export default function HomePage() {
  const popular = popularEvents(10);
  const recommended = [...events].sort((a, b) => a.name.localeCompare(b.name));
  const concerts = eventsByCategory("concerts").slice(0, 5);

  const quickFilters = ["All types", "Sports", "Concerts", "Theatre & Comedy"];

  return (
    <div className="pb-4">
      {/* Popular events carousel */}
      <section className="container-page mt-8 pt-2">
        <CardCarousel
          title="Popular events"
          events={popular}
          viewAllHref="/concerts"
          variant="overlay"
        />
      </section>

      {/* Filter pills row */}
      <section className="container-page mt-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white" aria-label="Use my location">
            <IconSend size={16} />
          </button>
          <span className="pill">
            <IconPin size={14} /> Paris <IconChevronDown size={12} className="text-ink-muted" />
          </span>
          <span className="pill">
            <IconCalendar size={14} /> All dates <IconChevronDown size={12} className="text-ink-muted" />
          </span>
          <span className="mx-1 hidden h-6 w-px bg-line sm:block" />
          {quickFilters.map((f, i) => (
            <Link
              key={f}
              href={
                f === "Sports"
                  ? "/sport"
                  : f === "Concerts"
                  ? "/concerts"
                  : f.startsWith("Theatre")
                  ? "/theatre"
                  : "/"
              }
              className={`pill ${i === 0 ? "pill-active" : ""}`}
            >
              {f}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured concerts (rows) */}
      <section className="container-page mt-10">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="section-title">Featured concerts</h2>
          <Link href="/concerts" className="link-blue whitespace-nowrap">See all</Link>
        </div>
        <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
          {concerts.map((e) => (
            <EventRow key={e.id} event={e} />
          ))}
        </div>
      </section>

      {/* Spotify banner */}
      <section className="container-page mt-10">
        <div className="flex flex-col items-start gap-4 rounded-2xl bg-announce p-6 text-white sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1DB954] text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.62.62 0 0 1-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.63.63 0 1 1-.28-1.22c3.82-.87 7.09-.5 9.72 1.11.3.18.39.57.21.86Zm1.23-2.73a.78.78 0 0 1-1.07.26c-2.69-1.65-6.79-2.13-9.98-1.16a.78.78 0 1 1-.45-1.49c3.64-1.1 8.16-.57 11.24 1.32.37.22.49.7.26 1.07Zm.11-2.85C14.72 8.96 9.5 8.79 6.42 9.72a.94.94 0 1 1-.54-1.8c3.53-1.07 9.3-.86 12.96 1.31a.94.94 0 0 1-.96 1.61Z" />
              </svg>
            </span>
            <div>
              <p className="text-base font-bold">
                Connect your Spotify account and sync your favourite artists
              </p>
              <p className="text-sm text-white/70">
                Discover events featuring the people you actually listen to
              </p>
            </div>
          </div>
          <button className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark">
            Connect Spotify
          </button>
        </div>
      </section>

      {/* Recommandé pour vous carousel */}
      <section className="container-page mt-10">
        <CardCarousel
          title="Recommended for you"
          events={recommended}
          subtitle="2 events near you"
        />
      </section>

      {/* App download banner */}
      <section className="container-page mt-10">
        <div className="flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl bg-brand/10 p-8 sm:flex-row">
          <div>
            <h3 className="text-xl font-bold text-ink">
              Download the viagogo app
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              Easily find your favourite events
            </p>
          </div>
          <div className="flex gap-3">
            <StoreBadge top="Download on the" bottom="App Store" />
            <StoreBadge top="GET IT ON" bottom="Google Play" />
          </div>
        </div>
      </section>
    </div>
  );
}

function StoreBadge({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-announce px-4 py-2 text-white">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 2H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm-5 18a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
      </svg>
      <div className="leading-tight">
        <div className="text-[9px] uppercase text-white/70">{top}</div>
        <div className="text-sm font-semibold">{bottom}</div>
      </div>
    </div>
  );
}

