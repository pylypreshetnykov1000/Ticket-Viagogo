"use client";

import { useActionState, useRef } from "react";
import { uploadImage, type ImageFormState } from "../../actions";

export default function UploadForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState<ImageFormState, FormData>(
    async (prev, fd) => {
      const res = await uploadImage(prev, fd);
      if (res.uploaded) ref.current?.reset();
      return res;
    },
    { error: null }
  );

  return (
    <form
      ref={ref}
      action={action}
      className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-white p-4 shadow-card"
    >
      <input
        type="file"
        name="file"
        accept="image/*"
        required
        className="text-sm text-ink-soft file:mr-3 file:rounded-md file:border-0 file:bg-brand file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-dark"
      />
      <button type="submit" disabled={pending} className="btn-brand disabled:opacity-60">
        {pending ? "Uploading…" : "Upload image"}
      </button>
      {state.error && <span className="text-sm text-pink">{state.error}</span>}
      {state.uploaded && !state.error && (
        <span className="text-sm font-medium text-brand">Uploaded {state.uploaded}</span>
      )}
      <span className="basis-full text-xs text-ink-faint">
        JPG, PNG, WebP, SVG or GIF — max 5 MB. Saved to /public/images.
      </span>
    </form>
  );
}
