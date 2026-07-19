import CategoryListing from "@/components/CategoryListing";
import { getEvents } from "@/lib/store";
import { eventsByCategory } from "@/lib/derive";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Concert tickets | viagogo",
  description: "Buy your tickets for upcoming concerts and tours.",
};

export default function ConcertsPage() {
  const events = eventsByCategory(getEvents(), "concerts");
  const cities = Array.from(new Set(events.map((e) => e.city))).sort();
  return (
    <CategoryListing
      title="Concerts"
      subtitle="The biggest tours, festivals and headliners"
      events={events}
      cities={cities}
    />
  );
}
