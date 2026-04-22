import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { formatPrice } from "../lib/format";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products, getProduct, status } = useProducts();
  const product = id ? getProduct(id) : undefined;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const related = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product, products]);

  if (!product) {
    if (status === "loading") {
      return <div className="mx-auto max-w-xl px-6 py-24 text-center text-sm text-ink-500">Loading…</div>;
    }
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl italic">We can't find that piece.</h1>
        <p className="mt-4 text-sm text-ink-500">
          It may have sold out, or slipped between the pages of our little book.
        </p>
        <Link to="/shop" className="btn-ghost mt-8">
          Back to the shop
        </Link>
      </div>
    );
  }

  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];
  const safeIndex = Math.min(activeImage, gallery.length - 1);

  return (
    <>
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-2 md:py-20">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden bg-cream-100">
            <img
              src={gallery[safeIndex]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-3">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square w-20 overflow-hidden border ${
                    i === safeIndex ? "border-ink-900" : "border-transparent"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <nav className="text-xs uppercase tracking-widest text-ink-500">
            <Link to="/shop" className="hover:text-ink-900">Shop</Link>
            <span className="mx-2">/</span>
            <Link to={`/shop/${product.category}`} className="hover:text-ink-900">
              {product.category}
            </Link>
          </nav>
          <h1 className="mt-4 font-display text-4xl italic leading-tight text-ink-900 sm:text-5xl">
            {product.name}
          </h1>
          {product.koreanName && (
            <p className="mt-1 text-sm text-ink-500">{product.koreanName}</p>
          )}
          <p className="mt-4 font-serif text-2xl text-ink-900">{formatPrice(product.price)}</p>

          <p className="mt-6 text-base leading-relaxed text-ink-700">
            {product.description || product.shortDescription}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="inline-flex items-center border border-ink-900/20">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-3 text-ink-700 hover:text-ink-900"
              >
                −
              </button>
              <span className="min-w-[2ch] text-center text-sm">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-3 text-ink-700 hover:text-ink-900"
              >
                +
              </button>
            </div>
            {product.sold ? (
              <button disabled className="btn-primary flex-1 opacity-60">
                Sold out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => addToCart(product.id, quantity)}
                className="btn-primary flex-1"
              >
                Add to trunk · {formatPrice(product.price * quantity)}
              </button>
            )}
          </div>

          {product.details.length > 0 && (
            <div className="mt-10 border-t border-ink-900/10 pt-8">
              <span className="eyebrow">Details</span>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-700">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-ink-900/10 pt-8 text-xs text-ink-700">
            <div>
              <span className="eyebrow">Shipping</span>
              <p className="mt-2">Ships within 2 business days from Seoul, via DHL Express.</p>
            </div>
            <div>
              <span className="eyebrow">Gift-wrapped</span>
              <p className="mt-2">
                Every order arrives hand-wrapped in ribboned paper with a short note from us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-10 font-display text-3xl italic">You may also love</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
