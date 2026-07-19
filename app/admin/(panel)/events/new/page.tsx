import { listImages } from "@/lib/store";
import EventForm from "../EventForm";

export const dynamic = "force-dynamic";

export default function NewEventPage() {
  const images = listImages().map((i) => i.path);
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">New event</h1>
      <p className="mb-6 mt-1 text-sm text-ink-soft">
        The event id (URL slug) is derived from the performer name.
      </p>
      <EventForm images={images} />
    </div>
  );
}
