import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink-900 text-cream-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl italic">Velvet Trunk</div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-100/80">
            A small, considered shop for Korean-inspired jewelry, accessories and clothing —
            pieces meant to be kept, lent, and eventually passed down.
          </p>
          <form
            className="mt-6 flex w-full max-w-md items-center gap-2 border-b border-cream-50/30 pb-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full bg-transparent py-2 text-sm text-cream-50 placeholder:text-cream-50/50 focus:outline-none"
            />
            <button
              type="submit"
              className="text-xs uppercase tracking-widest text-gold-400 hover:text-cream-50"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-2 text-[11px] text-cream-100/60">
            10% off your first order, and the occasional letter from Seoul.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-[11px] uppercase tracking-widest text-gold-400">Shop</h4>
          <ul className="space-y-2 text-sm text-cream-100/80">
            <li><Link to="/shop/jewelry" className="hover:text-cream-50">Jewelry</Link></li>
            <li><Link to="/shop/accessories" className="hover:text-cream-50">Accessories</Link></li>
            <li><Link to="/shop/clothing" className="hover:text-cream-50">Clothing</Link></li>
            <li><Link to="/shop" className="hover:text-cream-50">All Pieces</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-[11px] uppercase tracking-widest text-gold-400">House</h4>
          <ul className="space-y-2 text-sm text-cream-100/80">
            <li><Link to="/about" className="hover:text-cream-50">Our Story</Link></li>
            <li><a href="#" className="hover:text-cream-50">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-cream-50">Care Guide</a></li>
            <li><a href="#" className="hover:text-cream-50">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream-50/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-[11px] uppercase tracking-widest text-cream-100/60 sm:flex-row">
          <span>© {new Date().getFullYear()} Velvet Trunk · Seoul ✺ Elsewhere</span>
          <span>Made with quiet care.</span>
        </div>
      </div>
    </footer>
  );
}
