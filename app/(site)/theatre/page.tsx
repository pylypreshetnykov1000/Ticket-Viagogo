import CategoryListing from "@/components/CategoryListing";
import { getEvents } from "@/lib/store";
import { eventsByCategory } from "@/lib/derive";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Theatre & comedy tickets | viagogo",
  description: "Shows, musicals and stand-up comedy.",
};

export default function TheatrePage() {
  const events = eventsByCategory(getEvents(), "theatre");
  const cities = Array.from(new Set(events.map((e) => e.city))).sort();
  return (
    <CategoryListing
      title="Theatre & Comedy"
      subtitle="Musicals, plays and comedy shows"
      events={events}
      cities={cities}
    />
  );
}
