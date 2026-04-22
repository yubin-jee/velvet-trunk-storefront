# Velvet Trunk

> A small, considered e-commerce storefront for Korean-inspired jewelry,
> accessories and clothing. Made with React + Vite + Tailwind + Stripe.

**Live site:** https://dist-vpdsspjs.devinapps.com

<p align="left">
  <img alt="Stack" src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white"/>
  <img alt="Stack" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black"/>
  <img alt="Stack" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white"/>
  <img alt="Stack" src="https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwindcss&logoColor=white"/>
  <img alt="Stack" src="https://img.shields.io/badge/Stripe-Checkout-635BFF?logo=stripe&logoColor=white"/>
</p>

## Features

- **Full storefront**: home, shop (with category + sort), product detail,
  side-drawer cart, dedicated cart page, 3-step checkout, thank-you, about,
  404.
- **Soft, editorial aesthetic**: Cormorant Garamond + Playfair Display serifs,
  a cream / blush / gold / ink palette, gentle interactions.
- **Cart state persists** across page refreshes via `localStorage`.
- **Stripe Checkout** for real payments — hosted Stripe page, no PCI scope.
  See [DEPLOY.md](./DEPLOY.md) for keys / Vercel setup.
- **Non-technical product management**: edit products in a published Google
  Sheet — the site auto-syncs. See [SHEET_SETUP.md](./SHEET_SETUP.md).
- **Graceful fallback**: if the sheet is unreachable (or no sheet is
  configured), the site serves 12 built-in placeholder pieces so it's never
  broken.
- **Fully responsive**, accessible markup, SEO-friendly meta.

## Project structure

```
api/
├── _shared.ts              # Stripe client helper + origin resolver
├── checkout.ts             # POST /api/checkout → creates Stripe Checkout Session
└── verify-session.ts       # GET  /api/verify-session → verifies payment for /thank-you

src/
├── App.tsx                 # Router + global providers
├── components/             # Header, Footer, CartDrawer, Layout, ProductCard
├── context/
│   ├── CartContext.tsx     # Cart state (items, open/close, persist)
│   └── ProductsContext.tsx # Products source (sheet or placeholders)
├── data/
│   ├── products.ts         # Placeholder catalogue (fallback)
│   └── sheetLoader.ts      # Google Sheet CSV fetch + parse + cache
├── hooks/
│   └── useCartItems.ts     # Cart items joined with product data
├── lib/
│   ├── format.ts           # Price formatter
│   └── stripe.ts           # Publishable-key guard
└── pages/                  # Home, Shop, ProductDetail, Cart, Checkout, ThankYou, About, NotFound

vercel.json                 # SPA rewrites so client-side routes work on Vercel
```

## Getting started

Requires Node 20+.

```bash
npm install
npm run dev    # http://localhost:5173 (storefront only; no Stripe API)
```

For local Stripe checkout, use Vercel's dev server (it runs `/api/*` too):

```bash
npm install -g vercel
cp .env.example .env.local   # paste test Stripe keys
vercel dev                   # http://localhost:3000
```

Build for production:

```bash
npm run build
npm run preview
```

## Deploying

Full step-by-step in **[DEPLOY.md](./DEPLOY.md)** — takes about 5 minutes on
Vercel. You'll need a free Stripe account to enable real checkout.

## Connecting a Google Sheet (recommended)

The site can read its entire catalogue from a published Google Sheet so the
shop owner can manage products without touching code. Set up:

1. Follow the [non-technical guide →](./SHEET_SETUP.md).
2. Add one env var: `VITE_PRODUCTS_SHEET_URL`.
3. Redeploy.

Until that's configured, the site happily renders the 12 built-in
placeholder pieces.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Local dev server with HMR (frontend only) |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `vercel dev` | Full local stack: frontend + /api functions |

## Environment variables

| Name | Required? | Used by | Purpose |
|---|---|---|---|
| `STRIPE_SECRET_KEY` | for checkout | server (`/api/*`) | Create Stripe Checkout sessions |
| `VITE_STRIPE_PUBLISHABLE_KEY` | for checkout | client | Show "Payments enabled" state; used by `@stripe/stripe-js` |
| `VITE_PRODUCTS_SHEET_URL` | optional | client | Load catalogue from a published Google Sheet |
| `SITE_ORIGIN` | optional | server | Override origin used for Stripe success/cancel URLs |

See [.env.example](./.env.example).

## Roadmap

- Order notifications to the shop owner's email (Stripe → email → sheet log).
- Image upload UI (drop-in replacement for the Sheet).
- Size variants for clothing.
- Saved wishlists.
