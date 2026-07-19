import CheckoutClient from "@/components/CheckoutClient";
import { getEvent, getListing } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata = { title: "Checkout | viagogo" };

/**
 * The URL only identifies the ticket (event + listing + qty). Price, section
 * and zone are resolved server-side from the store so they cannot be tampered
 * with, and qty is validated against the listing's allowed quantities.
 */
export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const event = getEvent(sp.event ?? "") ?? null;
  const listing = event ? getListing(event.id, sp.listing ?? "") ?? null : null;

  const requestedQty = Number(sp.qty ?? "1");
  const qty =
    listing && listing.quantity.includes(requestedQty)
      ? requestedQty
      : listing?.quantity[0] ?? 1;

  return <CheckoutClient event={event} listing={listing} qty={qty} />;
}
