import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";

export default function Layout() {
  return (
    <div className="flex min-h-full flex-col">
      <div className="bg-ink-900 py-2 text-center text-[11px] uppercase tracking-widest text-cream-50">
        Complimentary shipping within the US on orders over $120
      </div>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <ScrollRestoration />
    </div>
  );
}
