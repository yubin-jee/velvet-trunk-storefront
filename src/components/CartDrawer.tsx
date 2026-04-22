import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useCartItems } from "../hooks/useCartItems";
import { formatPrice } from "../lib/format";

export default function CartDrawer() {
  const { isOpen, closeCart, updateQuantity, removeFromCart } = useCart();
  const { resolved, subtotal } = useCartItems();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  return (
    <>
      <div
        aria-hidden
        className={`fixed inset-0 z-40 bg-ink-900/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream-50 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink-900/10 px-6 py-5">
          <h2 className="font-display text-xl italic">Your Trunk</h2>
          <button
            type="button"
            onClick={closeCart}
            className="text-xs uppercase tracking-widest text-ink-700 hover:text-ink-900"
            aria-label="Close cart"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {resolved.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <p className="font-display text-2xl italic text-ink-900">Your trunk is empty.</p>
              <p className="max-w-xs text-sm text-ink-500">
                Nothing here yet — explore our newest pieces and begin a little collection.
              </p>
              <button onClick={closeCart} className="btn-ghost">
                Continue browsing
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {resolved.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4">
                  <Link
                    to={`/product/${product.id}`}
                    onClick={closeCart}
                    className="aspect-square w-24 flex-none overflow-hidden bg-cream-100"
                  >
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <Link
                        to={`/product/${product.id}`}
                        onClick={closeCart}
                        className="font-display text-base leading-tight text-ink-900 hover:italic"
                      >
                        {product.name}
                      </Link>
                      <span className="text-sm text-ink-700">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                    {product.koreanName && (
                      <span className="text-xs text-ink-500">{product.koreanName}</span>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="inline-flex items-center border border-ink-900/20 text-sm">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-3 py-1 text-ink-700 hover:text-ink-900"
                        >
                          −
                        </button>
                        <span className="min-w-[2ch] text-center">{quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-3 py-1 text-ink-700 hover:text-ink-900"
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
          )}
        </div>

        {resolved.length > 0 && (
          <div className="border-t border-ink-900/10 px-6 py-6">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow">Subtotal</span>
              <span className="font-display text-2xl italic">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-ink-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-5 flex flex-col gap-3">
              <Link to="/checkout" onClick={closeCart} className="btn-primary">
                Checkout
              </Link>
              <Link to="/cart" onClick={closeCart} className="btn-ghost">
                View cart
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
