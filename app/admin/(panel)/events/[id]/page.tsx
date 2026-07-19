import { notFound } from "next/navigation";
import { getEvent, listImages } from "@/lib/store";
import EventForm from "../EventForm";

export const dynamic = "force-dynamic";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEvent(id);
  if (!event) notFound();
  const images = listImages().map((i) => i.path);

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Edit event</h1>
      <p className="mb-6 mt-1 text-sm text-ink-soft">
        <code className="rounded bg-surface px-1.5 py-0.5 text-xs">/event/{event.id}</code>
      </p>
      <EventForm event={event} images={images} />
    </div>
  );
}
