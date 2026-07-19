import Image from "next/image";
import Link from "next/link";
import { getEvents, listImages, isSiteAsset } from "@/lib/store";
import { removeImage } from "../../actions";
import UploadForm from "./UploadForm";

export const dynamic = "force-dynamic";

function fmtSize(bytes: number): string {
  return bytes < 1024 * 1024
    ? `${Math.round(bytes / 1024)} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

type ImageCategory = "concerts" | "sport" | "theatre" | "assets" | "unused";

const FILTERS: { key: ImageCategory | undefined; label: string }[] = [
  { key: undefined, label: "All" },
  { key: "concerts", label: "Concerts" },
  { key: "sport", label: "Sports" },
  { key: "theatre", label: "Theatre" },
  { key: "assets", label: "Site assets" },
  { key: "unused", label: "Unused" },
];

export default async function AdminImagesPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const events = getEvents();
  const catOfEvent = new Map(events.map((e) => [e.id, e.category]));

  const images = listImages().map((img) => {
    // classify: events using it → their categories; else site asset; else unused
    const eventCats = Array.from(
      new Set(img.usedBy.map((id) => catOfEvent.get(id)).filter(Boolean))
    ) as ImageCategory[];
    const isAsset = isSiteAsset(img.file);
    const categories: ImageCategory[] =
      eventCats.length > 0 ? eventCats : isAsset ? ["assets"] : ["unused"];
    return { ...img, categories, deletable: img.usedBy.length === 0 && !isAsset };
  });

  const filtered = cat
    ? images.filter((i) => i.categories.includes(cat as ImageCategory))
    : images;

  const CAT_BADGE: Record<ImageCategory, string> = {
    concerts: "Concerts",
    sport: "Sports",
    theatre: "Theatre",
    assets: "Site asset",
    unused: "Unused",
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-ink">
          Images{" "}
          <span className="text-base font-normal text-ink-muted">
            ({filtered.length}
            {cat ? ` of ${images.length}` : ""})
          </span>
        </h1>
      </div>

      <div className="mt-4">
        <UploadForm />
      </div>

      {/* category filter — derived from what each image is actually used by */}
      <div className="mt-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.label}
            href={f.key ? `/admin/images?cat=${f.key}` : "/admin/images"}
            className={`pill ${cat === f.key || (!cat && !f.key) ? "pill-active" : ""}`}
          >
            {f.label}
            <span className="text-xs text-ink-faint">
              {f.key ? images.filter((i) => i.categories.includes(f.key!)).length : images.length}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {filtered.map((img) => (
          <div
            key={img.file}
            className="overflow-hidden rounded-xl border border-line bg-white shadow-card"
          >
            <div className="relative aspect-square bg-surface">
              <Image src={img.path} alt={img.file} fill sizes="200px" className="object-cover" />
            </div>
            <div className="p-3">
              <p className="truncate text-xs font-semibold text-ink" title={img.file}>
                {img.file}
              </p>
              <p className="mt-0.5 text-[11px] text-ink-muted">
                {fmtSize(img.size)}
                {img.usedBy.length > 0 && (
                  <span title={img.usedBy.join(", ")}>
                    {" "}
                    · {img.usedBy.length} event{img.usedBy.length > 1 ? "s" : ""}
                  </span>
                )}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {img.categories.map((c) => (
                  <span
                    key={c}
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                      c === "unused"
                        ? "bg-pink-soft text-pink"
                        : c === "assets"
                        ? "bg-blue-tint text-blue-dark"
                        : "bg-brand/10 text-brand-dark"
                    }`}
                  >
                    {CAT_BADGE[c]}
                  </span>
                ))}
              </div>
              <form action={removeImage} className="mt-2">
                <input type="hidden" name="file" value={img.file} />
                <button
                  type="submit"
                  disabled={!img.deletable}
                  title={
                    img.usedBy.length > 0
                      ? `In use by: ${img.usedBy.join(", ")}`
                      : !img.deletable
                      ? "Site asset — referenced from code"
                      : "Delete this image"
                  }
                  className="w-full rounded-md border border-line py-1 text-xs text-pink hover:border-pink disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full rounded-xl border border-line bg-white p-10 text-center text-sm text-ink-muted">
            No images in this category.
          </p>
        )}
      </div>
    </div>
  );
}
