import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getStripe, getSiteOrigin } from "./_shared.js";

type StripeLineItem = {
  quantity: number;
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      description?: string;
      images?: string[];
      metadata?: Record<string, string>;
    };
  };
};

type IncomingLine = {
  name: string;
  description?: string;
  image?: string;
  priceCents: number;
  quantity: number;
  productId: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  let body: { items?: IncomingLine[]; email?: string; shippingCents?: number };
  try {
    body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : (req.body as typeof body) ?? {};
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const items = body.items ?? [];
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  // Validate & shape the line items.
  const lineItems: StripeLineItem[] = [];
  for (const item of items) {
    if (
      !item ||
      typeof item.name !== "string" ||
      typeof item.priceCents !== "number" ||
      !Number.isFinite(item.priceCents) ||
      item.priceCents < 50 || // Stripe min charge
      typeof item.quantity !== "number" ||
      item.quantity < 1 ||
      item.quantity > 99
    ) {
      return res.status(400).json({ error: "Invalid cart item" });
    }
    lineItems.push({
      quantity: Math.floor(item.quantity),
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.priceCents),
        product_data: {
          name: item.name.slice(0, 250),
          description: item.description?.slice(0, 250) || undefined,
          images: item.image && /^https?:\/\//.test(item.image) ? [item.image] : undefined,
          metadata: item.productId ? { productId: item.productId.slice(0, 100) } : undefined,
        },
      },
    });
  }

  const shippingCents = Number(body.shippingCents ?? 0);
  const origin = getSiteOrigin(req as unknown as { headers: Record<string, string | string[] | undefined> });

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: body.email || undefined,
      shipping_address_collection: {
        allowed_countries: [
          "US", "CA", "GB", "AU", "NZ", "IE", "FR", "DE", "IT", "ES", "NL", "BE",
          "SE", "NO", "DK", "FI", "CH", "AT", "JP", "KR", "SG", "HK",
        ],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: Math.max(0, Math.round(shippingCents)), currency: "usd" },
            display_name:
              shippingCents === 0
                ? "Complimentary — DHL Express (5–7 days)"
                : "DHL Express (5–7 days)",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      allow_promotion_codes: true,
    });

    return res.status(200).json({ id: session.id, url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("[api/checkout]", err);
    return res.status(500).json({ error: message });
  }
}
