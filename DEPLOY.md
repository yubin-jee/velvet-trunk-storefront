# Deploying Velvet Trunk

> A 5-minute guide for the shop owner (or whoever manages the hosting).

The site is a static Vite app with two small serverless functions (`/api/checkout`
and `/api/verify-session`) that talk to Stripe. Deploy it anywhere that supports
Node serverless functions — **Vercel is the easiest and is what this guide
assumes.**

---

## One-time setup

### 1. Get Stripe test keys

1. Sign up at https://dashboard.stripe.com (free).
2. Make sure the toggle at the top-right says **Test mode** (it will be orange).
3. Open **Developers → API keys** (or go to
   https://dashboard.stripe.com/test/apikeys directly).
4. Copy the two keys:
   - **Publishable key** — starts with `pk_test_…`
   - **Secret key** — starts with `sk_test_…` (click "Reveal test key")

Keep both handy for step 3.

### 2. Import the repo into Vercel

1. Go to https://vercel.com/new.
2. **Import Git Repository** → select `yubin-jee/velvet-trunk-storefront`.
3. Leave all defaults (Framework: Vite · Root Directory: `./`).
4. Click **Deploy**. It'll take about a minute.

When it's done, Vercel will give you a URL like
`https://velvet-trunk-storefront.vercel.app`. **Don't test checkout yet** —
we haven't added the keys.

### 3. Add environment variables

In the deployed project on Vercel:

1. **Settings → Environment Variables**.
2. Add these three (Production + Preview + Development — tick all three
   environments):

   | Name | Value |
   |---|---|
   | `STRIPE_SECRET_KEY` | `sk_test_...` (from step 1) |
   | `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` (from step 1) |
   | `VITE_PRODUCTS_SHEET_URL` | *(leave blank for now — see `SHEET_SETUP.md`)* |

3. Go to **Deployments**, find the latest deployment, click the `…` menu
   → **Redeploy** so it picks up the new env vars.

### 4. Test the checkout

1. Open the Vercel URL.
2. Add any two products to the cart.
3. Click **Checkout → Pay securely**. You'll be redirected to Stripe.
4. Use Stripe's test card: **`4242 4242 4242 4242`**, any future expiry
   (e.g. `12/34`), any 3-digit CVC, any ZIP.
5. After submitting, you should be redirected back to `/thank-you` showing
   **"Total charged: $xx.xx"** and the customer email you entered.
6. In the Stripe dashboard → **Payments**, you should see a new test payment.

---

## Going live (when the shop is ready for real money)

1. In Stripe, toggle **Test mode → Live mode** (top-right).
2. Grab the **live** API keys from https://dashboard.stripe.com/apikeys.
3. In Vercel → Environment Variables, change `STRIPE_SECRET_KEY` to the
   `sk_live_…` value and `VITE_STRIPE_PUBLISHABLE_KEY` to `pk_live_…`.
4. Redeploy.
5. Optional but strongly recommended: enable
   [Stripe Radar](https://dashboard.stripe.com/settings/radar) for fraud
   protection, and set up email receipts in
   [Settings → Emails](https://dashboard.stripe.com/settings/emails).

---

## Custom domain

Once you have a domain (e.g. `velvettrunk.com`):

1. Vercel → project → **Settings → Domains → Add**.
2. Paste your domain. Vercel gives you DNS records to add at your registrar
   (GoDaddy / Namecheap / Cloudflare).
3. After DNS propagates (usually < 1 hour), the HTTPS certificate is
   provisioned automatically.
4. No code change needed — Stripe success/cancel URLs use the request host,
   so the domain update just works.

---

## Troubleshooting

- **`Payments are not configured yet` banner on the checkout page.**
  `VITE_STRIPE_PUBLISHABLE_KEY` is missing or blank. Double-check Vercel env
  vars and **redeploy** — publishable keys are baked into the client at build
  time.
- **`Checkout failed (500)` when clicking Pay.** `STRIPE_SECRET_KEY` is
  missing or invalid on the server. Check Vercel env vars and the Functions
  logs in the Deployments tab.
- **Stripe redirects to `/thank-you` but it says "We couldn't confirm your
  payment".** Rare — usually means the Stripe session ID couldn't be found.
  Check Vercel function logs and the Stripe Payments dashboard.

---

## Local development (optional)

If you want to run the site locally with working checkout:

```bash
npm install -g vercel
npm install
cp .env.example .env.local
# paste your Stripe test keys into .env.local
vercel dev
```

Then open http://localhost:3000. The `vercel dev` command serves both the
Vite app and the `/api/*` functions together.
