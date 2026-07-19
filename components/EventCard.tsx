import Image from "next/image";
import Link from "next/link";
import type { EventItem } from "@/lib/types";
import { formatCardDate, formatDateRange, formatShortRange } from "@/lib/format";
import { eventDateRange } from "@/lib/derive";
import { IconHeart } from "./icons";

/**
 * viagogo event card (metrics sampled from viagogo.fr, 1440px viewport).
 * - "below" (default): square image (220×220) with title/date below on white.
 *   Title 16px/700 #091218, date 14px/500 #606970, subtitle 14px/500 #677383.
 * - "overlay": portrait image (280×352, radius 16) with 20px/700 white name + date range.
 *
 * Two info modes matching origin's sections:
 * - "event" (Trending, Last-minute): "08 Aug 2026 • 19:30" + venue line.
 * - "performer" (Recommended, Concerts, Sports, …): "Sun, 29 Nov • 19:30" or a
 *   short range "08 Aug - 10 Aug" for multi-show performers + "N events near you".
 */
export default function EventCard({
  event,
  subtitle,
  variant = "below",
  mode = "event",
  onDark = false,
}: {
  event: EventItem;
  /** explicit third line override; defaults per `mode` */
  subtitle?: string;
  variant?: "below" | "overlay";
  mode?: "event" | "performer";
  /** white text for cards placed on dark hero backgrounds */
  onDark?: boolean;
}) {
  // deterministic "shows near you" count per performer (1-3), stable per id
  const nearYou =
    1 + (event.id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 3);

  let dateStr: string;
  let thirdLine: string;
  if (mode === "performer") {
    if (nearYou > 1) {
      const end = new Date(event.date);
      end.setDate(end.getDate() + nearYou * 2);
      dateStr = formatShortRange(event.date, end.toISOString());
    } else {
      dateStr = formatCardDate(event.date, { weekday: true });
    }
    thirdLine = `${nearYou} event${nearYou > 1 ? "s" : ""} near you`;
  } else {
    dateStr = formatCardDate(event.date, { year: true });
    thirdLine = event.venue; // origin shows the venue only, no city suffix
  }

  const heart = (
    <button
      type="button"
      aria-label="Add to favourites"
      className="absolute right-3 top-3 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] transition-transform hover:scale-110"
    >
      <IconHeart size={20} />
    </button>
  );

  if (variant === "overlay") {
    // hero cards show the performer's tour date range, e.g. "17 Jul - 22 Jul"
    const range = eventDateRange(event);
    return (
      <Link href={`/event/${event.id}`} className="group block w-full">
        <div className="relative aspect-[280/352] w-full overflow-hidden rounded-2xl bg-surface">
          <Image
            src={event.image}
            alt={event.performer}
            fill
            sizes="(max-width:640px) 60vw, 280px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          {heart}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="line-clamp-2 text-[20px] font-bold leading-6 text-white">
              {event.performer}
            </h3>
            <p className="mt-1 text-[15px] font-medium leading-5 text-white">
              {formatDateRange(range.start, range.end)}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/event/${event.id}`} className="group block w-full">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface">
        <Image
          src={event.image}
          alt={event.performer}
          fill
          sizes="(max-width:640px) 60vw, 220px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {heart}
      </div>
      <div className="pt-2">
        <h3 className={`truncate text-[16px] font-bold leading-5 ${onDark ? "text-white" : "text-ink-strong"}`}>
          {event.performer}
        </h3>
        <p className={`mt-1 truncate text-[14px] font-medium leading-5 ${onDark ? "text-white/85" : "text-ink-date"}`}>
          {dateStr}
        </p>
        <p className={`mt-0.5 truncate text-[14px] font-medium leading-5 ${onDark ? "text-white/70" : "text-ink-muted"}`}>
          {subtitle ?? thirdLine}
        </p>
      </div>
    </Link>
  );
}
