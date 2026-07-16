"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { EventItem } from "@/lib/types";
import EventRow from "./EventRow";
import EventCard from "./EventCard";
import { IconPin, IconBell } from "./icons";

type SortKey = "date" | "price" | "popularity";

const heroImage: Record<string, string> = {
  Concerts: "/images/armin-van-buuren.jpg",
  Sports: "/images/man-utd-wrexham.jpg",
  "Theatre & Comedy": "/images/saturday-night-fever.jpg",
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

  const trending = [...events].sort((a, b) => b.popularity - a.popularity).slice(0, 8);
  const performers = [...events].sort((a, b) => b.popularity - a.popularity).slice(0, 8);

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
      {/* Dark photo hero with trending carousel (live style) */}
      <div className="relative overflow-hidden bg-announce">
        <Image
          src={heroImage[title] ?? heroImage.Concerts}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40 blur-[2px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="container-page relative pb-10 pt-12 sm:pt-16">
          <h1 className="text-5xl font-extrabold tracking-[-1px] text-white sm:text-6xl">
            {title === "Concerts" ? "Concert Tickets" : title === "Sports" ? "Sports Tickets" : "Theatre Tickets"}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/70 sm:text-base">{subtitle}</p>

          <h2 className="mb-4 mt-10 text-[24px] font-bold leading-7 tracking-[-0.5px] text-white">
            Trending events near Stockholm
          </h2>
          <div className="no-scrollbar flex gap-5 overflow-x-auto pb-1">
            {trending.map((e) => (
              <div key={e.id} className="w-[200px] shrink-0 sm:w-[220px]">
                <EventCard event={e} onDark />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <section className="container-page mt-10">
        <h2 className="section-title mb-5">Top Performers</h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {performers.map((e) => (
            <div key={e.id} className="flex items-center gap-3 border-b border-line pb-3">
              <a href={`/event/${e.id}`} className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-surface">
                <Image src={e.image} alt={e.performer} fill sizes="56px" className="object-cover" />
              </a>
              <a href={`/event/${e.id}`} className="min-w-0 flex-1 truncate text-[15px] font-bold text-ink hover:text-brand-dark">
                {e.performer}
              </a>
              <button
                aria-label={`Follow ${e.performer}`}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-line text-ink-muted hover:border-brand hover:text-brand-dark"
              >
                <IconBell size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Filters + rows */}
      <section className="container-page mt-10">
        <div className="mb-4 flex flex-wrap items-center gap-2.5">
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

          <button onClick={() => setMaxPrice(null)} className={`pill ${maxPrice === null ? "pill-active" : ""}`}>
            All prices
          </button>
          {[50, 100, 150, 250].map((p) => (
            <button key={p} onClick={() => setMaxPrice(p)} className={`pill ${maxPrice === p ? "pill-active" : ""}`}>
              ≤ €{p}
            </button>
          ))}

          <label className="ml-auto flex items-center gap-2 text-sm text-ink-muted">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-line bg-white px-3 py-1.5 text-sm text-ink focus:border-brand focus:outline-none"
            >
              <option value="popularity">Popularity</option>
              <option value="date">Date</option>
              <option value="price">Price</option>
            </select>
          </label>
        </div>

        <h2 className="mb-4 text-lg font-bold text-ink">
          {filtered.length} events in all locations
        </h2>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="rounded-xl border border-line bg-white p-10 text-center text-sm text-ink-muted">
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
