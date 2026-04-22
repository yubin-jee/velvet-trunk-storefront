import { Link, useSearchParams } from "react-router-dom";

export default function ThankYou() {
  const [params] = useSearchParams();
  const order = params.get("order") ?? "VT-000000";

  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <span className="eyebrow">Thank you</span>
      <h1 className="mt-4 font-display text-5xl italic">Your trunk is on its way.</h1>
      <p className="mt-4 text-sm text-ink-700">
        Order <span className="font-serif text-ink-900">{order}</span> has been placed. A
        confirmation will arrive in your inbox shortly — and your pieces will be wrapped by hand
        and shipped within two business days.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/shop" className="btn-primary">Keep browsing</Link>
        <Link to="/" className="btn-ghost">Back to home</Link>
      </div>
    </section>
  );
}
