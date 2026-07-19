import HomeClient from "@/components/HomeClient";
import { getEvents } from "@/lib/store";

// Data comes from the mutable JSON store — render per request
export const dynamic = "force-dynamic";

export default function HomePage() {
  return <HomeClient events={getEvents()} />;
}
