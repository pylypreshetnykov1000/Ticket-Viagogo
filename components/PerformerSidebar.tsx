import Image from "next/image";
import type { EventItem } from "@/lib/types";

const genreByCategory: Record<string, string[]> = {
  concerts: ["Pop", "Live Music"],
  sport: ["Sports", "Live Events"],
  theatre: ["Theatre", "Stage Show"],
};

export default function PerformerSidebar({ event }: { event: EventItem }) {
  const genres = genreByCategory[event.category] ?? ["Live Events"];

  return (
    <aside className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      {/* Performer image */}
      <div className="relative aspect-[16/10] w-full bg-surface">
        <Image src={event.image} alt={event.performer} fill sizes="380px" className="object-cover" />
      </div>

      <div className="p-4">
        {/* Genre tags */}
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => (
            <span key={g} className="rounded-md bg-brand-tint px-2.5 py-1 text-xs font-semibold text-brand-dark">
              {g}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {event.performer} is performing live at {event.venue} in {event.city}. Browse
          verified resale tickets for this event — every order is covered by the
          viagogo Guarantee, with secure payment and electronic delivery.{" "}
          <span className="cursor-pointer font-semibold text-ink">See more</span>
        </p>

        {/* Player mock */}
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-announce p-3 text-white">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
            <Image src={event.image} alt="" fill sizes="48px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">Top track — {event.performer}</p>
            <p className="truncate text-xs text-white/60">Preview</p>
          </div>
          <button
            aria-label="Play preview"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-black"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </button>
        </div>

        {/* Social icons — real viagogo glyphs */}
        <div className="mt-4 flex items-center gap-2.5">
          <Social label="Spotify"><SpotifyGlyph /></Social>
          <Social label="X"><XGlyph /></Social>
          <Social label="Instagram"><InstagramGlyph /></Social>
          <Social label="Facebook"><FacebookGlyph /></Social>
          <Social label="YouTube"><YouTubeGlyph /></Social>
        </div>
      </div>
    </aside>
  );
}

function Social({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-announce text-white transition-opacity hover:opacity-80"
    >
      {children}
    </a>
  );
}

function SpotifyGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 10C0 4.48 4.48 0 10 0s10 4.48 10 10-4.48 10-10 10S0 15.52 0 10m15.875-1.161a.934.934 0 0 0 1.456-.782c0-.48-.206-.73-.52-.912-2.255-1.314-5.34-1.927-8.283-1.927-1.73 0-3.318.197-4.738.613-.363.104-.701.415-.701.963a.93.93 0 0 0 .94.952c.16 0 .314-.045.444-.083l.075-.022c3.323-.927 8.456-.516 11.327 1.198m-.73 3.23c-.184 0-.315-.072-.442-.14l-.054-.03c-2.52-1.492-6.278-2.093-9.62-1.185l-.139.04a1 1 0 0 1-.342.065.783.783 0 0 1-.782-.783c0-.431.21-.717.625-.834a13.6 13.6 0 0 1 3.944-.549c2.617 0 5.145.65 7.198 1.866.302.176.395.417.395.767a.78.78 0 0 1-.783.784m-1.375 2.796a.62.62 0 0 0 .32-.549c0-.28-.114-.435-.334-.567-1.802-1.079-3.995-1.638-6.281-1.638-1.284 0-2.525.156-3.69.44-.263.063-.535.245-.535.65 0 .345.267.628.612.628l.302-.05c1.03-.235 2.117-.363 3.311-.363 2.063 0 4.006.512 5.657 1.451.22.126.418.126.638-.002" />
    </svg>
  );
}
function XGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
      <path d="M15.801 1h3.066l-6.731 7.638L20 19h-6.171l-4.832-6.297L3.466 19H.4l7.13-8.17L0 1h6.325l4.365 5.752zm-1.073 16.207h1.7L5.432 2.727H3.605z" />
    </svg>
  );
}
function InstagramGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M20 10.059C20 4.504 15.523 0 10 0S0 4.504 0 10.059c0 5.02 3.657 9.182 8.438 9.937v-7.03h-2.54V10.06h2.54V7.843c0-2.521 1.492-3.914 3.777-3.914 1.094 0 2.238.197 2.238.197V6.6h-1.26c-1.243 0-1.63.776-1.63 1.571v1.887h2.773l-.443 2.908h-2.33v7.029C16.343 19.24 20 15.08 20 10.059" />
    </svg>
  );
}
function YouTubeGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
      <path d="m8.006 12.955 5.186-2.962-5.186-2.949zM2.19 16.48A2.56 2.56 0 0 1 .41 14.74C0 13.199 0 9.993 0 9.993S0 6.785.41 5.26c.247-.849.92-1.51 1.781-1.74 1.549-.418 7.802-.418 7.802-.418s6.267 0 7.816.418c.876.23 1.534.891 1.767 1.74C20 6.785 20 9.993 20 9.993s0 3.207-.424 4.746a2.49 2.49 0 0 1-1.767 1.74c-1.549.417-7.816.417-7.816.417s-6.253 0-7.802-.417" />
    </svg>
  );
}
