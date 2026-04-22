import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { categories, type Category } from "../data/products";
import { useProducts } from "../context/ProductsContext";

type SortKey = "featured" | "price-asc" | "price-desc" | "new";

export default function Shop() {
  const { category } = useParams<{ category?: string }>();
  const [sort, setSort] = useState<SortKey>("featured");
  const { products, status } = useProducts();

  const activeCategory = (category && ["jewelry", "accessories", "clothing"].includes(category)
    ? (category as Category)
    : "all") as Category | "all";

  const heading = useMemo(() => {
    if (activeCategory === "all") return "The Full Collection";
    if (activeCategory === "jewelry") return "Jewelry";
    if (activeCategory === "accessories") return "Accessories";
    return "Clothing";
  }, [activeCategory]);

  const filtered = useMemo(() => {
    const list =
      activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);
    const copy = [...list];
    switch (sort) {
      case "price-asc":
        return copy.sort((a, b) => a.price - b.price);
      case "price-desc":
        return copy.sort((a, b) => b.price - a.price);
      case "new":
        return copy.sort((a, b) => Number(!!b.newArrival) - Number(!!a.newArrival));
      default:
        return copy.sort(
          (a, b) => Number(!!b.bestseller) - Number(!!a.bestseller),
        );
    }
  }, [activeCategory, sort, products]);

  return (
    <>
      <section className="border-b border-ink-900/10 bg-cream-100">
        <div className="mx-auto max-w-7xl px-6 py-14 text-center">
          <span className="eyebrow">Shop</span>
          <h1 className="mt-3 font-display text-5xl italic text-ink-900 sm:text-6xl">{heading}</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-700">
            A small, rotating selection of Korean-inspired pieces — made in gentle batches,
            wrapped by hand, shipped from Seoul.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const href = c.slug === "all" ? "/shop" : `/shop/${c.slug}`;
              const isActive = c.slug === activeCategory;
              return (
                <a
                  key={c.slug}
                  href={href}
                  className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest transition ${
                    isActive
                      ? "border-ink-900 bg-ink-900 text-cream-50"
                      : "border-ink-900/20 text-ink-700 hover:border-ink-900"
                  }`}
                >
                  {c.label}
                </a>
              );
            })}
          </nav>
          <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink-700">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-ink-900/20 bg-cream-50 px-3 py-1.5 text-xs uppercase tracking-widest focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="new">New arrivals</option>
              <option value="price-asc">Price · Low to high</option>
              <option value="price-desc">Price · High to low</option>
            </select>
          </label>
        </div>

        {status === "loading" && filtered.length === 0 ? (
          <p className="py-20 text-center text-sm text-ink-500">Loading the latest pieces…</p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
        {status === "ready" && filtered.length === 0 && (
          <p className="py-20 text-center text-sm text-ink-500">Nothing here just yet.</p>
        )}
      </section>
    </>
  );
}
