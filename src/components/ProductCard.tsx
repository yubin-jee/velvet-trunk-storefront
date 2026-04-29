import { Link } from "react-router-dom";
import { formatPrice } from "../lib/format";
import type { Product } from "../data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
        {(product.bestseller || product.newArrival) && (
          <span className="absolute left-3 top-3 bg-cream-50/90 px-2.5 py-1 text-[10px] uppercase tracking-widest text-ink-900">
            {product.newArrival ? "New" : "Bestseller"}
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-col items-center text-center">
        <span className="eyebrow">{categoryLabel(product.category)}</span>
        <h3 className="mt-1 font-display text-lg text-ink-900 group-hover:italic">
          {product.name}
        </h3>
        {product.koreanName && (
          <span className="text-xs text-ink-500">{product.koreanName}</span>
        )}
        <span className="mt-2 text-sm text-ink-700">{formatPrice(product.price)}</span>
      </div>
    </Link>
  );
}

function categoryLabel(c: Product["category"]) {
  switch (c) {
    case "jewelry":
      return "Jewelry";
    case "accessories":
      return "Accessories";
    case "clothing":
      return "Clothing";
  }
}
