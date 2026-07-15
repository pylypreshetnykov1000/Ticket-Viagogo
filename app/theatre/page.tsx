import CategoryListing from "@/components/CategoryListing";
import { eventsByCategory } from "@/lib/data";

export const metadata = {
  title: "Theatre & comedy tickets | viagogo",
  description: "Shows, musicals and stand-up comedy.",
};

export default function TheatrePage() {
  const events = eventsByCategory("theatre");
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
