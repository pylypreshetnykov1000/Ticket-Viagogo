"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { EventItem } from "@/lib/types";
import { saveEvent, uploadImage, type EventFormState, type ImageFormState } from "../../actions";

export default function EventForm({
  event,
  images,
}: {
  /** undefined = create mode */
  event?: EventItem;
  /** available images under /public/images */
  images: string[];
}) {
  const [state, action, pending] = useActionState<EventFormState, FormData>(saveEvent, {
    error: null,
  });
  const [image, setImage] = useState(event?.image ?? images[0] ?? "");
  const [pickerOpen, setPickerOpen] = useState(false);

  // inline upload inside the picker
  const [upState, upAction, upPending] = useActionState<ImageFormState, FormData>(
    async (prev, fd) => {
      const res = await uploadImage(prev, fd);
      if (res.uploaded) setImage(res.uploaded);
      return res;
    },
    { error: null }
  );

  const allImages = upState.uploaded && !images.includes(upState.uploaded)
    ? [upState.uploaded, ...images]
    : images;

  // datetime-local wants "YYYY-MM-DDTHH:mm"
  const dateValue = (event?.date ?? "").slice(0, 16);

  return (
    <>
      {/* sibling form for uploads — inputs opt in via form="upload-form"
          (forms cannot nest, but the form attribute may cross boundaries) */}
      <form id="upload-form" action={upAction} className="hidden" />

      <form action={action} className="max-w-2xl space-y-5">
      {event && <input type="hidden" name="existingId" value={event.id} />}
      <input type="hidden" name="image" value={image} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Performer" name="performer" defaultValue={event?.performer} placeholder="The Weeknd" />
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink-soft">Category</span>
          <select
            name="category"
            defaultValue={event?.category ?? "concerts"}
            className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            <option value="concerts">Concerts</option>
            <option value="sport">Sports</option>
            <option value="theatre">Theatre & Comedy</option>
          </select>
        </label>
      </div>

      <Field
        label="Event name"
        name="name"
        defaultValue={event?.name}
        placeholder="The Weeknd - After Hours Til Dawn Tour"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink-soft">Date & time</span>
          <input
            type="datetime-local"
            name="date"
            required
            defaultValue={dateValue}
            className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
        </label>
        <Field label="Venue" name="venue" defaultValue={event?.venue} placeholder="Avicii Arena" />
        <Field label="City" name="city" defaultValue={event?.city} placeholder="Stockholm" />
        <Field label="Country" name="country" defaultValue={event?.country} placeholder="Sweden" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {event ? (
          /* price & count derive from ticket listings — manage them there */
          <div className="rounded-lg border border-line bg-surface/60 px-3 py-2">
            <span className="block text-xs font-medium text-ink-soft">Tickets (derived)</span>
            <span className="mt-0.5 block text-sm text-ink">
              from €{event.minPrice} · {event.listingCount} listings —{" "}
              <Link href={`/admin/events/${event.id}/tickets`} className="font-semibold text-brand hover:underline">
                manage tickets
              </Link>
            </span>
          </div>
        ) : (
          <Field
            label="Base ticket price (€) — seeds the generated tickets"
            name="minPrice"
            type="number"
            min={1}
          />
        )}
        <Field label="Popularity (0-100)" name="popularity" type="number" defaultValue={event?.popularity} min={0} max={100} />
      </div>

      {/* Image picker */}
      <div>
        <span className="mb-1 block text-xs font-medium text-ink-soft">Image</span>
        <div className="flex items-center gap-4">
          <span className="relative block h-20 w-20 overflow-hidden rounded-lg border border-line bg-surface">
            {image && <Image src={image} alt="" fill sizes="80px" className="object-cover" />}
          </span>
          <div>
            <button
              type="button"
              onClick={() => setPickerOpen((v) => !v)}
              className="btn-outline !px-4 !py-1.5 text-sm"
            >
              {pickerOpen ? "Close picker" : "Choose image"}
            </button>
            <p className="mt-1 max-w-[260px] truncate text-xs text-ink-faint">{image}</p>
          </div>
        </div>

        {pickerOpen && (
          <div className="mt-3 rounded-xl border border-line bg-white p-4 shadow-card">
            {/* upload */}
            <div className="mb-3 flex flex-wrap items-center gap-3 border-b border-line pb-3">
              <input
                type="file"
                name="file"
                accept="image/*"
                form="upload-form"
                className="text-xs text-ink-soft file:mr-3 file:rounded-md file:border-0 file:bg-brand file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-brand-dark"
              />
              <button
                type="submit"
                form="upload-form"
                disabled={upPending}
                className="rounded-md border border-brand px-3 py-1.5 text-xs font-semibold text-brand hover:bg-brand hover:text-white disabled:opacity-60"
              >
                {upPending ? "Uploading…" : "Upload"}
              </button>
              {upState.error && <span className="text-xs text-pink">{upState.error}</span>}
            </div>
            {/* gallery */}
            <div className="grid max-h-72 grid-cols-4 gap-2 overflow-y-auto sm:grid-cols-6">
              {allImages.map((img) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => {
                    setImage(img);
                    setPickerOpen(false);
                  }}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                    img === image ? "border-brand" : "border-transparent hover:border-line"
                  }`}
                  title={img}
                >
                  <Image src={img} alt="" fill sizes="100px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {state.error && <p className="text-sm font-medium text-pink">{state.error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={pending} className="btn-brand disabled:opacity-60">
          {pending ? "Saving…" : event ? "Save changes" : "Create event"}
        </button>
        <Link href="/admin/events" className="btn-ghost">
          Cancel
        </Link>
      </div>
      </form>
    </>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  min,
  max,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
  type?: string;
  min?: number;
  max?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-ink-soft">{label}</span>
      <input
        type={type}
        name={name}
        required
        defaultValue={defaultValue}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}
