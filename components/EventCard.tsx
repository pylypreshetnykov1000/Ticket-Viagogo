import Image from "next/image";
import Link from "next/link";
import type { EventItem } from "@/lib/types";
import { parseDate } from "@/lib/format";
import { IconBell } from "./icons";

/**
 * viagogo event card.
 * - "below" (default): landscape image (4:3, radius 8) with title/date below on white.
 *   Title 16px/700 #091218, date 14px/500 #606970, subtitle 14px/500 #677383.
 * - "overlay": portrait image with the name/date overlaid in white (hero rows).
 */
export default function EventCard({
  event,
  subtitle,
  variant = "below",
}: {
  event: EventItem;
  subtitle?: string;
  variant?: "below" | "overlay";
}) {
  const d = parseDate(event.date);
  const dateStr = `${d.day} ${d.month} ${d.year} · ${d.time}`;

  const bell = (
    <button
      type="button"
      aria-label="Add to favourites"
      className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
    >
      <IconBell size={16} />
    </button>
  );

  if (variant === "overlay") {
    return (
      <Link href={`/event/${event.id}`} className="group block w-full">
        <div className="relative aspect-[5/6] w-full overflow-hidden rounded-lg bg-surface">
          <Image
            src={event.image}
            alt={event.performer}
            fill
            sizes="(max-width:640px) 60vw, 230px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          {bell}
          <div className="absolute inset-x-0 bottom-0 p-3">
            <h3 className="line-clamp-2 text-[16px] font-bold leading-5 text-white">
              {event.performer}
            </h3>
            <p className="mt-1 text-[14px] leading-5 text-white/90">{dateStr}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/event/${event.id}`} className="group block w-full">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface">
        <Image
          src={event.image}
          alt={event.performer}
          fill
          sizes="(max-width:640px) 60vw, 260px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {bell}
      </div>
      <div className="pt-2">
        <h3 className="truncate text-[16px] font-bold leading-5 text-ink-strong">
          {event.performer}
        </h3>
        <p className="mt-1 truncate text-[14px] font-medium leading-5 text-ink-date">
          {dateStr}
        </p>
        <p className="mt-0.5 truncate text-[14px] font-medium leading-5 text-ink-muted">
          {subtitle ?? `${event.venue}, ${event.city}`}
        </p>
      </div>
    </Link>
  );
}
