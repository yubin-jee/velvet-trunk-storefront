import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "/shop/:category", element: <Shop /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/thank-you", element: <ThankYou /> },
      { path: "/about", element: <About /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ProductsProvider>
  );
}
