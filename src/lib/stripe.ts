import { loadStripe, type Stripe } from "@stripe/stripe-js";

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripePromise(): Promise<Stripe | null> {
  if (!publishableKey) return Promise.resolve(null);
  if (!stripePromise) stripePromise = loadStripe(publishableKey);
  return stripePromise;
}

export function hasStripeConfig(): boolean {
  return Boolean(publishableKey);
}
