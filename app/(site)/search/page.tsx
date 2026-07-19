import Link from "next/link";
import EventRow from "@/components/EventRow";
import { getEvents } from "@/lib/store";
import { searchEvents } from "@/lib/derive";

export const metadata = { title: "Search | viagogo" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = searchEvents(getEvents(), q);

  return (
    <div className="container-page py-8">
      <nav className="mb-2 text-xs text-ink-faint">
        <Link href="/" className="hover:text-brand">Home</Link>
        <span className="mx-1">/</span>
        <span className="text-ink-soft">Search</span>
      </nav>
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">
        Results for “{q}”
      </h1>
      <p className="mt-1 text-sm text-ink-soft">
        {results.length} event{results.length !== 1 ? "s" : ""} found
      </p>

      <div className="mt-6 space-y-3">
        {results.length === 0 ? (
          <div className="rounded-xl border border-line bg-white p-10 text-center">
            <p className="text-sm text-ink-soft">
              No events found for “{q}”.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Link href="/concerts" className="btn-outline">Concerts</Link>
              <Link href="/sport" className="btn-outline">Sports</Link>
              <Link href="/theatre" className="btn-outline">Theatre</Link>
            </div>
          </div>
        ) : (
          results.map((e) => <EventRow key={e.id} event={e} />)
        )}
      </div>
    </div>
  );
}
