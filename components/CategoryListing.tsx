"use client";

import { useMemo, useState } from "react";
import type { EventItem } from "@/lib/types";
import EventRow from "./EventRow";
import CardCarousel from "./CardCarousel";
import { IconPin } from "./icons";

type SortKey = "date" | "price" | "popularity";

const heroBg: Record<string, string> = {
  Concerts: "linear-gradient(120deg,#0b1e2d,#123047,#0b1e2d)",
  Sports: "linear-gradient(120deg,#0a1f14,#123d26,#0a1f14)",
  "Theatre & Comedy": "linear-gradient(120deg,#241237,#3a1d52,#241237)",
};

export default function CategoryListing({
  title,
  subtitle,
  events,
  cities,
}: {
  title: string;
  subtitle: string;
  events: EventItem[];
  cities: string[];
}) {
  const [sort, setSort] = useState<SortKey>("popularity");
  const [city, setCity] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const trending = [...events].sort((a, b) => b.popularity - a.popularity).slice(0, 10);

  const filtered = useMemo(() => {
    let list = [...events];
    if (city !== "all") list = list.filter((e) => e.city === city);
    if (maxPrice) list = list.filter((e) => e.minPrice <= maxPrice);
    switch (sort) {
      case "date":
        list.sort((a, b) => +new Date(a.date) - +new Date(b.date));
        break;
      case "price":
        list.sort((a, b) => a.minPrice - b.minPrice);
        break;
      default:
        list.sort((a, b) => b.popularity - a.popularity);
    }
    return list;
  }, [events, city, maxPrice, sort]);

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: heroBg[title] ?? heroBg.Concerts }}>
        <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 30% 30%,rgba(255,255,255,.15),transparent 55%)" }} />
        <div className="container-page relative py-14 sm:py-20">
          <nav className="mb-2 text-xs text-white/60">
            <a href="/" className="hover:text-white">Home</a>
            <span className="mx-1">/</span>
            <span className="text-white/85">{title}</span>
          </nav>
          <h1 className="text-4xl font-extrabold text-white sm:text-6xl">{title}</h1>
          <p className="mt-3 max-w-xl text-sm text-white/75 sm:text-base">{subtitle}</p>
        </div>
      </div>

      {/* Trending carousel */}
      <section className="container-page mt-8">
        <CardCarousel title={`Trending events — ${title}`} events={trending} />
      </section>

      {/* Filters + rows */}
      <section className="container-page mt-10">
        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          <span className="pill-wrapper">
            <label className="pill cursor-pointer">
              <IconPin size={14} />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="cursor-pointer bg-transparent focus:outline-none"
              >
                <option value="all">All cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
          </span>

          <button
            onClick={() => setMaxPrice(null)}
            className={`pill ${maxPrice === null ? "pill-active" : ""}`}
          >
            All prices
          </button>
          {[50, 100, 150, 250].map((p) => (
            <button
              key={p}
              onClick={() => setMaxPrice(p)}
              className={`pill ${maxPrice === p ? "pill-active" : ""}`}
            >
              ≤ {p}€
            </button>
          ))}

          <label className="ml-auto flex items-center gap-2 text-sm text-ink-muted">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-line bg-white px-3 py-1.5 text-sm text-ink focus:border-brand focus:outline-none"
            >
              <option value="popularity">Popularity</option>
              <option value="date">Date</option>
              <option value="price">Price</option>
            </select>
          </label>
        </div>

        <h2 className="mb-3 text-lg font-bold text-ink">
          {filtered.length} events in all locations
        </h2>

        <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
          {filtered.length === 0 ? (
            <p className="p-10 text-center text-sm text-ink-muted">
              No events match your filters.
            </p>
          ) : (
            filtered.map((e) => <EventRow key={e.id} event={e} />)
          )}
        </div>
      </section>
    </div>
  );
}
