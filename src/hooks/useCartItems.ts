import { useMemo } from "react";
import { useCart, type CartItem } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import type { Product } from "../data/products";

export type ResolvedCartItem = CartItem & { product: Product };

export function useCartItems() {
  const { items } = useCart();
  const { getProduct } = useProducts();

  const resolved = useMemo<ResolvedCartItem[]>(() => {
    return items
      .map((item) => {
        const product = getProduct(item.productId);
        return product ? { ...item, product } : null;
      })
      .filter((x): x is ResolvedCartItem => x !== null);
  }, [items, getProduct]);

  const itemCount = useMemo(() => resolved.reduce((n, i) => n + i.quantity, 0), [resolved]);
  const subtotal = useMemo(
    () => resolved.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [resolved],
  );

  return { resolved, itemCount, subtotal };
}
