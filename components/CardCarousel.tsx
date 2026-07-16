"use client";

import { useRef } from "react";
import Link from "next/link";
import type { EventItem } from "@/lib/types";
import EventCard from "./EventCard";
import { IconChevronLeft, IconChevronRight } from "./icons";

export default function CardCarousel({
  title,
  events,
  viewAllHref,
  subtitle,
  variant = "below",
}: {
  title: string;
  events: EventItem[];
  viewAllHref?: string;
  subtitle?: string;
  variant?: "below" | "overlay";
}) {
  const ref = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    ref.current?.scrollBy({ left: dir * 700, behavior: "smooth" });
  }

  // viagogo card widths: ~248px (overlay portrait) / ~220px (below)
  const itemWidth =
    variant === "overlay"
      ? "w-[200px] sm:w-[240px]"
      : "w-[200px] sm:w-[220px]";

  return (
    <section className="relative">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="section-title">{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="link-blue whitespace-nowrap">
            View all
          </Link>
        )}
      </div>

      <div className="relative">
        <div
          ref={ref}
          className="carousel no-scrollbar -mx-1 flex gap-5 overflow-x-auto px-1 pb-1"
        >
          {events.map((e) => (
            <div key={e.id} className={`${itemWidth} shrink-0`}>
              <EventCard event={e} subtitle={subtitle} variant={variant} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll(1)}
          aria-label="Next"
          className="absolute -right-3 top-[34%] hidden h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-card hover:bg-surface md:flex"
        >
          <IconChevronRight size={18} />
        </button>
        <button
          onClick={() => scroll(-1)}
          aria-label="Previous"
          className="absolute -left-3 top-[34%] hidden h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-card hover:bg-surface md:flex"
        >
          <IconChevronLeft size={18} />
        </button>
      </div>
    </section>
  );
}
