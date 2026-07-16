import Link from "next/link";
import CardCarousel from "@/components/CardCarousel";
import WorldCupSection from "@/components/WorldCupSection";
import SpotifyBanner from "@/components/SpotifyBanner";
import PopularCategories from "@/components/PopularCategories";
import SubscribeSection from "@/components/SubscribeSection";
import DownloadApp from "@/components/DownloadApp";
import { IconSend, IconPin, IconCalendar, IconChevronDown } from "@/components/icons";
import { popularEvents, eventsByCategory, events } from "@/lib/data";

export default function HomePage() {
  const popular = popularEvents(10);
  const recommended = [...events].sort((a, b) => a.name.localeCompare(b.name));
  const trending = [...events].sort((a, b) => b.popularity - a.popularity);
  const lastMinute = [...events].sort((a, b) => +new Date(a.date) - +new Date(b.date));
  const concerts = eventsByCategory("concerts");
  const sports = eventsByCategory("sport");
  const theatre = eventsByCategory("theatre");
  const comedy = [...theatre].reverse();

  const quickFilters = ["All types", "Sports", "Concerts", "Theatre & Comedy"];

  return (
    <div className="space-y-10 pb-6 pt-2">
      {/* Popular events */}
      <section className="container-page">
        <CardCarousel title="Popular events" events={popular} variant="overlay" />
      </section>

      {/* Filter pills */}
      <section className="container-page !mt-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-dark text-white" aria-label="Use my location">
            <IconSend size={15} />
          </button>
          <span className="pill border-brand font-semibold text-brand-dark">
            <IconPin size={14} /> Stockholm <IconChevronDown size={12} className="text-brand-dark" />
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

      {/* World Cup 2026 */}
      <section className="container-page">
        <WorldCupSection />
      </section>

      {/* Connect Spotify */}
      <section className="container-page">
        <SpotifyBanner />
      </section>

      {/* Recommended for you */}
      <section className="container-page">
        <CardCarousel
          title="Recommended for you"
          events={recommended}
          subtitle="2 events near you"
        />
      </section>

      {/* Trending near Stockholm */}
      <section className="container-page">
        <CardCarousel title="Trending events near Stockholm" events={trending} />
      </section>

      {/* Popular categories */}
      <section className="container-page">
        <PopularCategories />
      </section>

      {/* Last-minute deals */}
      <section className="container-page">
        <CardCarousel title="Last-minute deals" events={lastMinute} viewAllHref="/concerts" />
      </section>

      {/* Concerts */}
      <section className="container-page">
        <CardCarousel title="Concerts" events={concerts} viewAllHref="/concerts" />
      </section>

      {/* Sports */}
      <section className="container-page">
        <CardCarousel title="Sports" events={sports} viewAllHref="/sport" />
      </section>

      {/* Theatre */}
      <section className="container-page">
        <CardCarousel title="Theatre" events={theatre} viewAllHref="/theatre" />
      </section>

      {/* Subscribe */}
      <section className="container-page">
        <SubscribeSection />
      </section>

      {/* Comedy */}
      <section className="container-page">
        <CardCarousel title="Comedy" events={comedy} viewAllHref="/theatre" />
      </section>

      {/* Download app */}
      <section className="container-page">
        <DownloadApp />
      </section>
    </div>
  );
}
