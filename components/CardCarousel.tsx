"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  mode = "event",
  lead,
}: {
  title: string;
  events: EventItem[];
  viewAllHref?: string;
  subtitle?: string;
  variant?: "below" | "overlay";
  /** card info style: "event" = date+venue, "performer" = range + "N events near you" */
  mode?: "event" | "performer";
  /** optional pinned first slide (e.g. the branded World Cup card) */
  lead?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  // viagogo: arrows only render in the direction you can actually scroll
  const updateArrows = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  function scroll(dir: 1 | -1) {
    ref.current?.scrollBy({ left: dir * 700, behavior: "smooth" });
  }

  // viagogo card widths (sampled): 280px overlay portrait / 220px below, 24px gap
  const itemWidth =
    variant === "overlay"
      ? "w-[220px] sm:w-[280px]"
      : "w-[190px] sm:w-[220px]";

  // arrows: 40px white circles centered ON the container edge, vertically
  // centered on the image (352px overlay / 220px square) — sampled from origin
  const arrowTop = variant === "overlay" ? "top-[176px]" : "top-[110px]";
  const arrowCls = `absolute ${arrowTop} hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_2px_6px_rgba(47,52,59,0.3)] hover:bg-surface md:flex`;

  return (
    <section className="relative">
      <div className={`${variant === "overlay" ? "mb-6" : "mb-5"} flex items-end justify-between`}>
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
          onScroll={updateArrows}
          className="carousel no-scrollbar -mx-1 flex gap-6 overflow-x-auto px-1 pb-1"
        >
          {lead && <div className={`${itemWidth} shrink-0`}>{lead}</div>}
          {events.map((e) => (
            <div key={e.id} className={`${itemWidth} shrink-0`}>
              <EventCard event={e} subtitle={subtitle} variant={variant} mode={mode} />
            </div>
          ))}
        </div>

        {canRight && (
          <button onClick={() => scroll(1)} aria-label="Next" className={`${arrowCls} -right-5`}>
            <IconChevronRight size={18} />
          </button>
        )}
        {canLeft && (
          <button onClick={() => scroll(-1)} aria-label="Previous" className={`${arrowCls} -left-5`}>
            <IconChevronLeft size={18} />
          </button>
        )}
      </div>
    </section>
  );
}
