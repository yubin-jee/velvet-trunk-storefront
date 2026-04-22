import Papa from "papaparse";
import type { Category, Product } from "./products";

const SHEET_URL = import.meta.env.VITE_PRODUCTS_SHEET_URL as string | undefined;
const CACHE_KEY = "velvet-trunk:products-cache";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

type RawRow = Record<string, string>;

const toSlug = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const splitList = (s: string | undefined) =>
  s
    ? s
        .split(/\r?\n|\|{1,2}|;/)
        .map((x) => x.trim())
        .filter(Boolean)
    : [];

const truthy = (s: string | undefined) =>
  typeof s === "string" && ["true", "yes", "y", "1", "✓", "x"].includes(s.trim().toLowerCase());

const validCategory = (s: string | undefined): Category | null => {
  const v = s?.trim().toLowerCase();
  if (v === "jewelry" || v === "accessories" || v === "clothing") return v;
  return null;
};

const getField = (row: RawRow, keys: string[]): string | undefined => {
  const lower: Record<string, string> = {};
  for (const [k, v] of Object.entries(row)) lower[k.toLowerCase().trim()] = v;
  for (const k of keys) {
    const v = lower[k.toLowerCase()];
    if (v !== undefined && v !== null && String(v).trim() !== "") return String(v).trim();
  }
  return undefined;
};

function rowToProduct(row: RawRow): Product | null {
  const name = getField(row, ["name", "product", "title"]);
  const priceRaw = getField(row, ["price", "usd", "cost"]);
  const category = validCategory(getField(row, ["category", "type"]));
  const image = getField(row, ["image", "image url", "photo", "thumbnail"]);
  if (!name || !priceRaw || !category || !image) return null;

  const price = Number(String(priceRaw).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(price)) return null;

  const rawId = getField(row, ["id", "slug", "handle"]) ?? name;
  const id = toSlug(rawId);

  const imagesList = splitList(getField(row, ["images", "more images", "gallery"]));

  const description =
    getField(row, ["description", "long description", "details"]) ??
    getField(row, ["short description", "summary"]) ??
    "";

  const shortDescription =
    getField(row, ["short description", "summary", "tagline"]) ??
    description.split(/[.!?]/)[0]?.trim() ??
    "";

  const details = splitList(getField(row, ["details list", "bullets", "specs", "features"]));

  return {
    id,
    name,
    koreanName: getField(row, ["korean name", "hangul", "한국어"]),
    price,
    category,
    image,
    images: imagesList.length ? [image, ...imagesList].slice(0, 4) : undefined,
    shortDescription,
    description,
    details: details.length ? details : [],
    tags: splitList(getField(row, ["tags", "keywords"])),
    bestseller: truthy(getField(row, ["bestseller", "best seller", "featured"])),
    newArrival: truthy(getField(row, ["new", "new arrival", "new arrivals"])),
    sold: truthy(getField(row, ["sold", "sold out", "out of stock"])),
  };
}

function parseCsv(csv: string): Product[] {
  const result = Papa.parse<RawRow>(csv, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });
  if (result.errors.length) {
    console.warn("[velvet-trunk] CSV parse warnings:", result.errors.slice(0, 3));
  }
  const products: Product[] = [];
  for (const row of result.data) {
    const p = rowToProduct(row);
    if (p) products.push(p);
  }
  return products;
}

type CacheShape = { at: number; products: Product[] };

function readCache(): Product[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheShape;
    if (!parsed?.products?.length) return null;
    return parsed.products;
  } catch {
    return null;
  }
}

function writeCache(products: Product[]) {
  try {
    const payload: CacheShape = { at: Date.now(), products };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
}

function cacheIsFresh(): boolean {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as CacheShape;
    return Date.now() - parsed.at < CACHE_TTL_MS;
  } catch {
    return false;
  }
}

export function hasSheetConfig(): boolean {
  return Boolean(SHEET_URL && SHEET_URL.trim());
}

export function getSheetUrl(): string | undefined {
  return SHEET_URL?.trim();
}

export async function fetchSheetProducts(options?: { force?: boolean }): Promise<Product[] | null> {
  if (!SHEET_URL) return null;
  if (!options?.force && cacheIsFresh()) {
    return readCache();
  }
  try {
    const res = await fetch(SHEET_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`sheet fetch failed: ${res.status}`);
    const csv = await res.text();
    const products = parseCsv(csv);
    if (!products.length) throw new Error("sheet returned no valid rows");
    writeCache(products);
    return products;
  } catch (err) {
    console.warn("[velvet-trunk] unable to load products from sheet:", err);
    return readCache();
  }
}
