import { Link } from "react-router-dom";
import { useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductsContext";

export default function Home() {
  const { products } = useProducts();

  const bestsellers = useMemo(
    () => products.filter((p) => p.bestseller).slice(0, 4),
    [products],
  );
  const newArrivals = useMemo(
    () => products.filter((p) => p.newArrival).slice(0, 4),
    [products],
  );
  const featured = useMemo(() => (bestsellers.length ? bestsellers : products.slice(0, 4)), [
    bestsellers,
    products,
  ]);
  const fresh = useMemo(
    () => (newArrivals.length ? newArrivals : products.slice(-4)),
    [newArrivals, products],
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-blush-100">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blush-100/20 via-blush-100/60 to-cream-50" />
        </div>
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-36">
          <div>
            <span className="eyebrow">Spring · Summer · 2025</span>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] text-ink-900 sm:text-6xl md:text-7xl">
              Quietly <em className="not-italic font-serif italic">romantic</em>
              <br />
              pieces from Seoul.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-700">
              Velvet Trunk is a small, considered shop for Korean-inspired jewelry,
              accessories and clothing — made in tiny batches, meant to be kept,
              lent, and eventually passed down.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/shop" className="btn-primary">
                Shop the collection
              </Link>
              <Link to="/about" className="link-underline text-sm uppercase tracking-widest text-ink-900">
                Our story
              </Link>
            </div>
          </div>
          <div className="hidden md:block" />
        </div>
      </section>

      {/* Category strip */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-6 py-16 sm:grid-cols-3">
        {[
          { label: "Jewelry", to: "/shop/jewelry", img: "photo-1535632066927-ab7c9ab60908" },
          { label: "Accessories", to: "/shop/accessories", img: "photo-1591561954557-26941169b49e" },
          { label: "Clothing", to: "/shop/clothing", img: "photo-1485968579580-b6d095142e6e" },
        ].map((cat) => (
          <Link
            key={cat.label}
            to={cat.to}
            className="group relative block aspect-[4/5] overflow-hidden bg-cream-100"
          >
            <img
              src={`https://images.unsplash.com/${cat.img}?auto=format&fit=crop&w=900&q=80`}
              alt={cat.label}
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-900/40" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center p-6 text-cream-50">
              <span className="font-display text-3xl italic">{cat.label}</span>
              <span className="mt-1 text-[11px] uppercase tracking-widest">Shop now →</span>
            </div>
          </Link>
        ))}
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="eyebrow">Quietly Adored</span>
            <h2 className="mt-2 font-display text-4xl italic">
              {bestsellers.length ? "Bestsellers" : "Featured"}
            </h2>
          </div>
          <Link to="/shop" className="link-underline hidden text-xs uppercase tracking-widest text-ink-900 sm:inline-block">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Editorial split */}
      <section className="bg-cream-100">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80"
              alt="A hand resting on linen with pearl jewelry"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <span className="eyebrow">The Velvet Trunk Ethos</span>
            <h2 className="mt-3 font-display text-4xl italic leading-tight text-ink-900">
              Small batches,<br />softer edges.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-700">
              Every piece begins as a sketch in a café in Yeonnam-dong, and ends in the hands
              of a small maker in Seoul or a family-run atelier outside Busan. We work in
              gentle colorways — oyster, pressed rose, warm gold — and in quantities rarely
              more than fifty.
            </p>
            <Link to="/about" className="btn-ghost mt-8">
              Read our story
            </Link>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="eyebrow">Just In</span>
            <h2 className="mt-2 font-display text-4xl italic">
              {newArrivals.length ? "New Arrivals" : "More pieces"}
            </h2>
          </div>
          <Link to="/shop" className="link-underline hidden text-xs uppercase tracking-widest text-ink-900 sm:inline-block">
            Shop all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {fresh.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-blush-50">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <span className="eyebrow">Love Letters</span>
          <p className="mt-6 font-display text-2xl italic leading-relaxed text-ink-900 sm:text-3xl">
            “The prettiest pair of pearl earrings I own, packaged so beautifully I almost
            didn't want to open them. Velvet Trunk feels like a secret you want to keep, and
            also tell everyone about.”
          </p>
          <p className="mt-6 text-xs uppercase tracking-widest text-ink-500">
            — Mia K., Brooklyn
          </p>
        </div>
      </section>
    </>
  );
}
