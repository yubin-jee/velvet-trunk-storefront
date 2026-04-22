import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <span className="eyebrow">404</span>
      <h1 className="mt-4 font-display text-5xl italic">A missing page.</h1>
      <p className="mt-4 text-sm text-ink-500">
        The page you're looking for has wandered off. Shall we start again?
      </p>
      <Link to="/" className="btn-primary mt-8">Back home</Link>
    </section>
  );
}
