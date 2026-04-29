import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCartItems } from "../hooks/useCartItems";
import { formatPrice } from "../lib/format";

export default function CartPage() {
  const { updateQuantity, removeFromCart } = useCart();
  const { resolved, subtotal } = useCartItems();

  if (resolved.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <span className="eyebrow">Your Trunk</span>
        <h1 className="mt-3 font-display text-5xl italic">Empty, for now.</h1>
        <p className="mt-4 text-sm text-ink-500">
          Begin your little collection with a single pearl.
        </p>
        <Link to="/shop" className="btn-primary mt-8">
          Explore the shop
        </Link>
      </section>
    );
  }

  const shipping = subtotal > 120 ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[2fr,1fr]">
      <div>
        <span className="eyebrow">Your Trunk</span>
        <h1 className="mt-3 font-display text-5xl italic">Review your pieces</h1>

        <ul className="mt-10 divide-y divide-ink-900/10 border-y border-ink-900/10">
          {resolved.map(({ product, quantity }) => (
            <li key={product.id} className="flex gap-5 py-6">
              <Link
                to={`/product/${product.id}`}
                className="aspect-square w-32 flex-none overflow-hidden bg-cream-100"
              >
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link
                      to={`/product/${product.id}`}
                      className="font-display text-xl italic text-ink-900"
                    >
                      {product.name}
                    </Link>
                    {product.koreanName && (
                      <p className="text-xs text-ink-500">{product.koreanName}</p>
                    )}
                    <p className="mt-1 text-sm text-ink-700">{formatPrice(product.price)}</p>
                  </div>
                  <p className="font-serif text-lg">{formatPrice(product.price * quantity)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="inline-flex items-center border border-ink-900/20 text-sm">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="px-3 py-1"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="min-w-[2ch] text-center">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="px-3 py-1"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    className="text-xs uppercase tracking-widest text-ink-500 hover:text-ink-900"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="h-fit border border-ink-900/10 bg-cream-100 p-6">
        <h2 className="font-display text-2xl italic">Order summary</h2>
        <dl className="mt-6 space-y-3 text-sm">
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
        <Link to="/checkout" className="btn-primary mt-6 w-full">
          Proceed to checkout
        </Link>
        <Link
          to="/shop"
          className="mt-3 block text-center text-xs uppercase tracking-widest text-ink-700 hover:text-ink-900"
        >
          Continue shopping
        </Link>
      </aside>
    </section>
  );
}
