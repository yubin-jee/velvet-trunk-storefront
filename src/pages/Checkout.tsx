import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCartItems } from "../hooks/useCartItems";
import { formatPrice } from "../lib/format";

export default function Checkout() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { resolved, subtotal } = useCartItems();
  const [submitting, setSubmitting] = useState(false);

  const shipping = subtotal > 120 ? 0 : 12;
  const total = subtotal + shipping;

  if (resolved.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl italic">Your trunk is empty.</h1>
        <Link to="/shop" className="btn-primary mt-6">
          Back to shop
        </Link>
      </section>
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const orderId = `VT-${Math.floor(100000 + Math.random() * 900000)}`;
      clearCart();
      navigate(`/thank-you?order=${orderId}`);
    }, 900);
  }

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[3fr,2fr]">
      <form onSubmit={handleSubmit} className="space-y-10">
        <div>
          <span className="eyebrow">Step 01</span>
          <h2 className="mt-2 font-display text-3xl italic">Contact</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="First name" name="firstName" required />
            <Field label="Last name" name="lastName" required />
            <Field label="Email" name="email" type="email" required className="sm:col-span-2" />
          </div>
        </div>

        <div>
          <span className="eyebrow">Step 02</span>
          <h2 className="mt-2 font-display text-3xl italic">Shipping</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Address" name="address" required className="sm:col-span-2" />
            <Field label="Apartment, suite, etc. (optional)" name="address2" className="sm:col-span-2" />
            <Field label="City" name="city" required />
            <Field label="State / Province" name="state" required />
            <Field label="ZIP / Postal code" name="zip" required />
            <Field label="Country" name="country" defaultValue="United States" required />
          </div>
        </div>

        <div>
          <span className="eyebrow">Step 03</span>
          <h2 className="mt-2 font-display text-3xl italic">Payment</h2>
          <p className="mt-2 text-xs text-ink-500">
            This is a demo checkout — no card is charged and no data is stored.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Card number" name="card" placeholder="1234 5678 9012 3456" required className="sm:col-span-2" />
            <Field label="Expiration (MM / YY)" name="exp" placeholder="04 / 28" required />
            <Field label="CVC" name="cvc" placeholder="123" required />
          </div>
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? "Placing your order…" : `Place order · ${formatPrice(total)}`}
        </button>
      </form>

      <aside className="h-fit space-y-6 border border-ink-900/10 bg-cream-100 p-6">
        <h2 className="font-display text-2xl italic">In your trunk</h2>
        <ul className="space-y-4">
          {resolved.map(({ product, quantity }) => (
            <li key={product.id} className="flex gap-3">
              <div className="relative aspect-square w-16 flex-none overflow-hidden bg-cream-50">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink-900 text-[10px] text-cream-50">
                  {quantity}
                </span>
              </div>
              <div className="flex-1 text-sm">
                <p className="font-display italic">{product.name}</p>
                <p className="text-xs text-ink-500">{formatPrice(product.price)} each</p>
              </div>
              <p className="text-sm">{formatPrice(product.price * quantity)}</p>
            </li>
          ))}
        </ul>
        <dl className="space-y-2 border-t border-ink-900/10 pt-4 text-sm">
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
      </aside>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
};

function Field({ label, name, type = "text", required, placeholder, defaultValue, className }: FieldProps) {
  return (
    <label className={`flex flex-col ${className ?? ""}`}>
      <span className="text-[11px] uppercase tracking-widest text-ink-500">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-1 border-b border-ink-900/20 bg-transparent py-2 text-sm focus:border-ink-900 focus:outline-none"
      />
    </label>
  );
}
