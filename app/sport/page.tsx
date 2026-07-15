import CategoryListing from "@/components/CategoryListing";
import { eventsByCategory } from "@/lib/data";

export const metadata = {
  title: "Sports tickets | viagogo",
  description: "Football, hockey, tennis — find your tickets for the biggest matches.",
};

export default function SportPage() {
  const events = eventsByCategory("sport");
  const cities = Array.from(new Set(events.map((e) => e.city))).sort();
  return (
    <CategoryListing
      title="Sports"
      subtitle="Football, hockey, tennis and the biggest sporting fixtures"
      events={events}
      cities={cities}
    />
  );
}
