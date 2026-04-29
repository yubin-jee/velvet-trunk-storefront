import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { placeholderProducts, type Product } from "../data/products";
import { fetchSheetProducts, hasSheetConfig } from "../data/sheetLoader";

type Status = "idle" | "loading" | "ready";

type ProductsContextValue = {
  products: Product[];
  status: Status;
  source: "sheet" | "placeholder";
  getProduct: (id: string) => Product | undefined;
  refresh: () => Promise<void>;
};

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(placeholderProducts);
  const [source, setSource] = useState<"sheet" | "placeholder">("placeholder");
  const [status, setStatus] = useState<Status>(hasSheetConfig() ? "loading" : "ready");

  useEffect(() => {
    if (!hasSheetConfig()) return;
    let cancelled = false;
    (async () => {
      const sheetProducts = await fetchSheetProducts();
      if (cancelled) return;
      if (sheetProducts && sheetProducts.length > 0) {
        setProducts(sheetProducts);
        setSource("sheet");
      }
      setStatus("ready");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const byId = useMemo(() => {
    const map = new Map<string, Product>();
    for (const p of products) map.set(p.id, p);
    return map;
  }, [products]);

  const value: ProductsContextValue = {
    products,
    status,
    source,
    getProduct: (id) => byId.get(id),
    refresh: async () => {
      if (!hasSheetConfig()) return;
      const sheetProducts = await fetchSheetProducts({ force: true });
      if (sheetProducts && sheetProducts.length > 0) {
        setProducts(sheetProducts);
        setSource("sheet");
      }
    },
  };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
