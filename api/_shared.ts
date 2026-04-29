import Stripe from "stripe";

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not configured. Set it in your hosting provider's env vars.",
    );
  }
  return new Stripe(key);
}

export function getSiteOrigin(req: { headers: Record<string, string | string[] | undefined> }): string {
  const fromEnv = process.env.SITE_ORIGIN || process.env.VITE_SITE_ORIGIN;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const proto = (req.headers["x-forwarded-proto"] as string) || "https";
  const host = (req.headers["x-forwarded-host"] as string) || (req.headers.host as string);
  return `${proto}://${host}`;
}
