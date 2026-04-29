import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";

type VerifyResponse = {
  paid: boolean;
  amountTotal: number | null;
  currency: string | null;
  email: string | null;
  name: string | null;
  orderId: string;
  lineItems: { description: string; quantity: number; amount: number }[];
};

type Status = "idle" | "loading" | "ok" | "error" | "demo";

export default function ThankYou() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const demoOrderId = params.get("order");
  const { clearCart } = useCart();
  const [status, setStatus] = useState<Status>(sessionId ? "loading" : "demo");
  const [data, setData] = useState<VerifyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      clearCart();
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`);
        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(body.error || "Could not verify your payment.");
        }
        const payload = (await res.json()) as VerifyResponse;
        if (cancelled) return;
        setData(payload);
        setStatus(payload.paid ? "ok" : "error");
        if (payload.paid) clearCart();
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Could not verify your payment.");
        setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sessionId, clearCart]);

  const readableId = data?.orderId
    ? data.orderId.replace(/^cs_(test|live)_/, "VT-").slice(0, 14).toUpperCase()
    : demoOrderId ?? "VT-PENDING";

  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <span className="eyebrow">Thank you</span>

      {status === "loading" && (
        <>
          <h1 className="mt-4 font-display text-4xl italic">Confirming your order…</h1>
          <p className="mt-4 text-sm text-ink-500">One moment — checking with Stripe.</p>
        </>
      )}

      {status === "ok" && data && (
        <>
          <h1 className="mt-4 font-display text-5xl italic">Your trunk is on its way.</h1>
          <p className="mt-4 text-sm text-ink-700">
            Order <span className="font-serif text-ink-900">{readableId}</span> has been placed.
            {data.email && (
              <> A confirmation will arrive in your inbox at <span className="font-serif text-ink-900">{data.email}</span>.</>
            )}
          </p>
          {data.amountTotal !== null && (
            <p className="mt-4 font-display text-2xl italic">
              Total charged: {formatPrice((data.amountTotal ?? 0) / 100)}
            </p>
          )}
        </>
      )}

      {status === "demo" && (
        <>
          <h1 className="mt-4 font-display text-5xl italic">Your trunk is on its way.</h1>
          <p className="mt-4 text-sm text-ink-700">
            Order <span className="font-serif text-ink-900">{readableId}</span> has been placed. A
            confirmation will arrive in your inbox shortly — and your pieces will be wrapped by
            hand and shipped within two business days.
          </p>
        </>
      )}

      {status === "error" && (
        <>
          <h1 className="mt-4 font-display text-4xl italic">We couldn't confirm your payment.</h1>
          <p className="mt-4 text-sm text-ink-700">
            {error ?? "Please check your email for a Stripe receipt, or contact us and we'll look into it."}
          </p>
        </>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/shop" className="btn-primary">Keep browsing</Link>
        <Link to="/" className="btn-ghost">Back to home</Link>
      </div>
    </section>
  );
}
