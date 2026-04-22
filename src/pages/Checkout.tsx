import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartItems } from "../hooks/useCartItems";
import { formatPrice } from "../lib/format";
import { hasStripeConfig } from "../lib/stripe";

export default function Checkout() {
  const { resolved, subtotal } = useCartItems();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shipping = subtotal > 120 ? 0 : 12;
  const total = subtotal + shipping;

  if (resolved.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl italic">Your trunk is empty.</h1>
        <Link to="/shop" className="btn-primary mt-6">
          Back to shop
        </Link>
      </section>
    );
  }

  const stripeEnabled = hasStripeConfig();

  async function handleCheckout() {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingCents: Math.round(shipping * 100),
          items: resolved.map(({ product, quantity }) => ({
            productId: product.id,
            name: product.name,
            description: product.shortDescription,
            image: product.image,
            priceCents: Math.round(product.price * 100),
            quantity,
          })),
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || `Checkout failed (${res.status})`);
      }
      const data = (await res.json()) as { url?: string };
      if (!data.url) throw new Error("Stripe did not return a redirect URL.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[3fr,2fr]">
      <div className="space-y-10">
        <div>
          <span className="eyebrow">Checkout</span>
          <h1 className="mt-3 font-display text-5xl italic">Almost yours.</h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-700">
            We'll take you to our secure Stripe page to enter your contact details, shipping
            address and payment. Your pieces will be hand-wrapped and shipped from Seoul within
            two business days.
          </p>
        </div>

        <ul className="space-y-4 border-y border-ink-900/10 py-6">
          {resolved.map(({ product, quantity }) => (
            <li key={product.id} className="flex gap-4">
              <div className="aspect-square w-20 flex-none overflow-hidden bg-cream-100">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-display text-lg italic">{product.name}</p>
                {product.koreanName && (
                  <p className="text-xs text-ink-500">{product.koreanName}</p>
                )}
                <p className="mt-1 text-sm text-ink-700">
                  Qty {quantity} · {formatPrice(product.price)}
                </p>
              </div>
              <p className="font-serif text-base">{formatPrice(product.price * quantity)}</p>
            </li>
          ))}
        </ul>

        {!stripeEnabled && (
          <p className="rounded border border-blush-200 bg-blush-50 p-4 text-sm text-ink-700">
            <strong className="font-display italic">Demo mode.</strong>{" "}
            Payments are not configured yet — set <code>STRIPE_SECRET_KEY</code> +{" "}
            <code>VITE_STRIPE_PUBLISHABLE_KEY</code> on your host to enable real checkout.
          </p>
        )}
        {error && (
          <p className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>
        )}

        <button
          type="button"
          onClick={handleCheckout}
          disabled={submitting}
          className="btn-primary w-full disabled:opacity-60"
        >
          {submitting
            ? "Redirecting to Stripe…"
            : `Pay securely · ${formatPrice(total)}`}
        </button>
        <p className="text-center text-[11px] uppercase tracking-widest text-ink-500">
          Powered by Stripe · Cards, Apple Pay, Google Pay
        </p>
      </div>

      <aside className="h-fit space-y-4 border border-ink-900/10 bg-cream-100 p-6">
        <h2 className="font-display text-2xl italic">Order summary</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-500">Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-500">Shipping</dt>
            <dd>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-ink-900/10 pt-3 text-base">
            <dt className="font-display italic">Total</dt>
            <dd className="font-serif text-lg">{formatPrice(total)}</dd>
          </div>
        </dl>
        <p className="text-xs text-ink-500">
          Sales tax calculated at the next step. Orders over $120 ship free.
        </p>
      </aside>
    </section>
  );
}
