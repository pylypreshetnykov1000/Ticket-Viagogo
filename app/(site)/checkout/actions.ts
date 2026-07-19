"use server";

import { revalidatePath } from "next/cache";
import { createOrder } from "@/lib/store";

export interface CheckoutState {
  error: string | null;
  orderId?: string;
}

/**
 * Place the order server-side. The client sends only the ticket identity and
 * customer details — price and inventory are validated against the store, so a
 * tampered price or an over-quantity can never go through.
 */
export async function placeOrder(
  _prev: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const eventId = String(formData.get("eventId") ?? "");
  const listingId = String(formData.get("listingId") ?? "");
  const qty = Number(formData.get("qty"));
  const customerName = String(formData.get("customerName") ?? "").trim();
  const customerEmail = String(formData.get("customerEmail") ?? "").trim();

  if (!customerName) return { error: "Name on card is required." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customerEmail))
    return { error: "A valid email address is required." };

  try {
    const order = createOrder({ eventId, listingId, qty, customerName, customerEmail });
    // stock changed → refresh event pages + admin
    revalidatePath("/", "layout");
    return { error: null, orderId: order.id };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not place order." };
  }
}
