import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCartItems } from "../hooks/useCartItems";

const navLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/shop/jewelry", label: "Jewelry" },
  { to: "/shop/accessories", label: "Accessories" },
  { to: "/shop/clothing", label: "Clothing" },
  { to: "/about", label: "Our Story" },
];

export default function Header() {
  const { openCart } = useCart();
  const { itemCount } = useCartItems();

  return (
    <header className="sticky top-0 z-30 border-b border-ink-900/10 bg-cream-50/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex flex-1 items-center gap-8">
          <nav className="hidden items-center gap-6 text-xs uppercase tracking-widest text-ink-700 md:flex">
            {navLinks.slice(0, 3).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `link-underline ${isActive ? "text-ink-900" : "hover:text-ink-900"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <Link to="/" className="flex flex-col items-center leading-none">
          <span className="text-[10px] uppercase tracking-[0.45em] text-gold-600">Est. 2025</span>
          <span className="mt-1 font-display text-2xl italic text-ink-900 md:text-3xl">
            Velvet&nbsp;Trunk
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-6">
          <nav className="hidden items-center gap-6 text-xs uppercase tracking-widest text-ink-700 md:flex">
            {navLinks.slice(3).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `link-underline ${isActive ? "text-ink-900" : "hover:text-ink-900"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            onClick={openCart}
            className="relative flex items-center gap-2 text-xs uppercase tracking-widest text-ink-700 hover:text-ink-900"
            aria-label={`Open cart, ${itemCount} items`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M6 7h12l-1.2 11.3a2 2 0 0 1-2 1.7h-5.6a2 2 0 0 1-2-1.7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-ink-900 px-1 text-[10px] font-medium tracking-normal text-cream-50">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <nav className="flex items-center justify-center gap-5 overflow-x-auto border-t border-ink-900/5 px-6 py-2 text-[11px] uppercase tracking-widest text-ink-700 md:hidden">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `whitespace-nowrap ${isActive ? "text-ink-900" : "hover:text-ink-900"}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
