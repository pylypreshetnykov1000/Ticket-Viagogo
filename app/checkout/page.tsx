import CheckoutClient from "@/components/CheckoutClient";

export const metadata = { title: "Checkout | viagogo" };

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  return (
    <CheckoutClient
      eventId={sp.event ?? ""}
      listingId={sp.listing ?? ""}
      qty={Number(sp.qty ?? "2")}
      price={Number(sp.price ?? "0")}
      section={sp.section ?? ""}
      zone={sp.zone ?? ""}
    />
  );
}
