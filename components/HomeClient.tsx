"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CardCarousel from "./CardCarousel";
import WorldCupHeroCard from "./WorldCupHeroCard";
import WorldCupSection from "./WorldCupSection";
import SpotifyBanner from "./SpotifyBanner";
import PopularCategories from "./PopularCategories";
import SubscribeSection from "./SubscribeSection";
import DownloadApp from "./DownloadApp";
import { IconSend, IconPin, IconCalendar, IconChevronDown } from "./icons";
import { popularEvents, eventsByCategory } from "@/lib/derive";
import type { EventItem } from "@/lib/types";

/**
 * Interactive homepage — replicates viagogo.fr's filter row behavior:
 * - type pills (All types / Sports / Concerts / Theatre & Comedy) toggle and
 *   filter every section's content, hiding sections that become empty
 * - the location pill opens a city dropdown ("Trending near {city}" follows)
 * - the dates pill opens a date-range dropdown filtering all sections
 */

type TypeKey = "all" | "sport" | "concerts" | "theatre";

const TYPE_PILLS: { key: TypeKey; label: string }[] = [
  { key: "all", label: "All types" },
  { key: "sport", label: "Sports" },
  { key: "concerts", label: "Concerts" },
  { key: "theatre", label: "Theatre & Comedy" },
];

const DATE_OPTIONS = [
  { key: "all", label: "All dates", days: null as number | null },
  { key: "7", label: "Next 7 days", days: 7 },
  { key: "30", label: "Next 30 days", days: 30 },
  { key: "90", label: "Next 3 months", days: 90 },
  { key: "180", label: "Next 6 months", days: 180 },
];

// Pin the same leading artists/order as viagogo.fr, then fill by popularity
function pinFirst(ids: string[], list: EventItem[]): EventItem[] {
  const pinned = ids
    .map((id) => list.find((e) => e.id === id))
    .filter((e): e is EventItem => Boolean(e));
  return [...pinned, ...list.filter((e) => !ids.includes(e.id))];
}

export default function HomeClient({ events }: { events: EventItem[] }) {
  const [type, setType] = useState<TypeKey>("all");
  const [city, setCity] = useState("Stockholm");
  const [dateKey, setDateKey] = useState("all");

  const cities = useMemo(
    () => Array.from(new Set(events.map((e) => e.city))).sort(),
    [events]
  );

  const lists = useMemo(() => {
    const days = DATE_OPTIONS.find((o) => o.key === dateKey)?.days ?? null;
    const horizon = days ? Date.now() + days * 86_400_000 : null;
    const keep = (e: EventItem) =>
      (type === "all" || e.category === type) &&
      (!horizon || +new Date(e.date) <= horizon);
    const f = (list: EventItem[]) => list.filter(keep);

    const byPopularity = [...events].sort((a, b) => b.popularity - a.popularity);
    const concerts = eventsByCategory(events, "concerts");
    const theatre = eventsByCategory(events, "theatre");

    // trending prefers the selected city (origin: "near {city}")
    const trendingBase = pinFirst(
      ["the-weeknd", "the-neighbourhood", "noah-kahan", "robyn", "westlife"],
      byPopularity
    ).filter(keep);
    const inCity = trendingBase.filter((e) => e.city === city);
    const trending = [...inCity, ...trendingBase.filter((e) => e.city !== city)];

    return {
      popular: f(popularEvents(events, 10)),
      recommended: pinFirst(
        ["the-weeknd", "jimmy-carr", "the-neighbourhood", "noah-kahan", "westlife"],
        [...concerts, ...theatre].sort((a, b) => b.popularity - a.popularity)
      ).filter(keep),
      trending,
      lastMinute: f([...events].sort((a, b) => +new Date(a.date) - +new Date(b.date))),
      concerts: f(concerts),
      sports: f(eventsByCategory(events, "sport")),
      theatre: f(theatre),
      comedy: f([...theatre].reverse()),
    };
  }, [events, type, city, dateKey]);

  const dateLabel = DATE_OPTIONS.find((o) => o.key === dateKey)?.label ?? "All dates";

  return (
    <div className="space-y-12 pb-8 pt-4">
      {/* Popular events */}
      {lists.popular.length > 0 && (
        <section className="container-page">
          <CardCarousel
            title="Popular events"
            events={lists.popular}
            variant="overlay"
            lead={type === "all" || type === "sport" ? <WorldCupHeroCard /> : undefined}
          />
        </section>
      )}

      {/* Filter pills */}
      <section className="container-page !mt-8">
        <div className="flex flex-wrap items-center gap-2">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white transition-colors hover:bg-brand-dark"
            aria-label="Use my location"
            onClick={() => setCity("Stockholm")}
          >
            <IconSend size={16} />
          </button>

          <Dropdown
            active
            label={city}
            icon={<IconPin size={14} />}
            value={city}
            options={cities.map((c) => ({ value: c, label: c }))}
            onSelect={setCity}
          />

          <Dropdown
            active={dateKey !== "all"}
            label={dateLabel}
            icon={<IconCalendar size={14} />}
            value={dateKey}
            options={DATE_OPTIONS.map((o) => ({ value: o.key, label: o.label }))}
            onSelect={setDateKey}
          />

          {/* origin: thin vertical divider between location/date pills and type pills */}
          <span className="mx-3 hidden h-6 w-px bg-line sm:block" />

          {TYPE_PILLS.map((t) => (
            <button
              key={t.key}
              onClick={() => setType(t.key)}
              className={`pill ${type === t.key ? "pill-active" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* World Cup 2026 — a football tournament: hidden for concert/theatre filters */}
      {(type === "all" || type === "sport") && (
        <section className="container-page">
          <WorldCupSection />
        </section>
      )}

      {/* Connect Spotify */}
      <section className="container-page">
        <SpotifyBanner />
      </section>

      {/* Recommended for you */}
      {lists.recommended.length > 0 && (
        <section className="container-page">
          <CardCarousel title="Recommended for you" events={lists.recommended} mode="performer" />
        </section>
      )}

      {/* Trending near {city} */}
      {lists.trending.length > 0 && (
        <section className="container-page">
          <CardCarousel title={`Trending events near ${city}`} events={lists.trending} />
        </section>
      )}

      {/* Popular categories */}
      <section className="container-page">
        <PopularCategories />
      </section>

      {/* Last-minute deals */}
      {lists.lastMinute.length > 0 && (
        <section className="container-page">
          <CardCarousel title="Last-minute deals" events={lists.lastMinute} viewAllHref="/concerts" />
        </section>
      )}

      {/* Concerts */}
      {lists.concerts.length > 0 && (
        <section className="container-page">
          <CardCarousel title="Concerts" events={lists.concerts} viewAllHref="/concerts" mode="performer" />
        </section>
      )}

      {/* Sports */}
      {lists.sports.length > 0 && (
        <section className="container-page">
          <CardCarousel title="Sports" events={lists.sports} viewAllHref="/sport" mode="performer" />
        </section>
      )}

      {/* Theatre */}
      {lists.theatre.length > 0 && (
        <section className="container-page">
          <CardCarousel title="Theatre" events={lists.theatre} viewAllHref="/theatre" mode="performer" />
        </section>
      )}

      {/* Subscribe */}
      <section className="container-page">
        <SubscribeSection />
      </section>

      {/* Comedy */}
      {lists.comedy.length > 0 && (
        <section className="container-page">
          <CardCarousel title="Comedy" events={lists.comedy} viewAllHref="/theatre" mode="performer" />
        </section>
      )}

      {/* Download app */}
      <section className="container-page">
        <DownloadApp />
      </section>
    </div>
  );
}

/** Filter pill with a simple dropdown menu (click-outside to close) */
function Dropdown({
  label,
  icon,
  active,
  value,
  options,
  onSelect,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  value: string;
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`pill ${active ? "pill-active" : ""}`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {icon} {label}
        <IconChevronDown size={12} className={open ? "rotate-180" : ""} />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-full z-30 mt-1.5 max-h-72 min-w-[180px] overflow-y-auto rounded-lg border border-line bg-white py-1 shadow-cardHover"
        >
          {options.map((o) => (
            <button
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              onClick={() => {
                onSelect(o.value);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm hover:bg-surface ${
                o.value === value ? "font-semibold text-brand" : "text-ink"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
