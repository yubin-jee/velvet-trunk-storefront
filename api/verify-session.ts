import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getStripe } from "./_shared.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const sessionId = typeof req.query.session_id === "string" ? req.query.session_id : "";
  if (!sessionId || !/^cs_[a-zA-Z0-9_]+$/.test(sessionId)) {
    return res.status(400).json({ error: "Missing or invalid session_id" });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    const lineItems =
      session.line_items?.data.map((li) => ({
        description: li.description,
        quantity: li.quantity ?? 1,
        amount: li.amount_total ?? 0,
      })) ?? [];

    return res.status(200).json({
      paid: session.payment_status === "paid",
      amountTotal: session.amount_total,
      currency: session.currency,
      email: session.customer_details?.email ?? null,
      name: session.customer_details?.name ?? null,
      lineItems,
      orderId: session.id,
    });
  } catch (err) {
    console.error("[api/verify-session]", err);
    return res.status(404).json({ error: "Session not found" });
  }
}
