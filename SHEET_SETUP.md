# Managing products with Google Sheets

Velvet Trunk is designed so the shop owner can add, edit, and remove products
**just by editing a Google Sheet** — no code, no logins to a CMS, no re-deploy.

This guide is written for a non-technical reader. If you get stuck, anything
in `code font` is something to copy literally.

---

## TL;DR

1. Make a copy of the Google Sheet template.
2. In Google Sheets, choose **File → Share → Publish to web** and publish the
   products tab as **CSV**. Copy that URL.
3. Paste the URL into an environment variable called `VITE_PRODUCTS_SHEET_URL`
   on Vercel / devinapps / your hosting provider.
4. Edit the sheet whenever you want — the site picks up changes within ~5
   minutes (Google's publish cache).

---

## Step 1 — Create your sheet

Start from this blank template and duplicate it to your own Google account:

> **Template columns (first row = headers, exactly as written):**
>
> `id | name | koreanName | price | category | image | images | shortDescription | description | details | tags | bestseller | newArrival | sold`

Column-by-column:

| Column | What to put | Example |
|---|---|---|
| `id` | *(optional)* A short URL slug. Leave blank and we'll make one from the name. | `pearl-drop-earrings` |
| `name` | **(required)** Product name shown on the site. | `Hanbit Pearl Drop Earrings` |
| `koreanName` | *(optional)* Korean name shown under the English name. | `한빛 진주 귀걸이` |
| `price` | **(required)** Number only, in USD. No `$`. | `48` |
| `category` | **(required)** One of: `jewelry`, `accessories`, `clothing`. Lowercase. | `jewelry` |
| `image` | **(required)** A public URL to the main photo. See "Images" below. | `https://...jpg` |
| `images` | *(optional)* More photo URLs, one per line in the same cell (press **Alt+Enter** for a new line inside a cell). | *(see below)* |
| `shortDescription` | *(optional)* One-line tagline. Shown on cards. | `Freshwater pearls on 14k gold threads.` |
| `description` | *(optional)* Long description shown on the product page. | *(a paragraph)* |
| `details` | *(optional)* Bullet points. One bullet per line inside the cell (Alt+Enter). | `14k gold hooks` \n `Length: 3.2cm` |
| `tags` | *(optional)* Comma-separated tags (not shown yet, reserved for future filters). | `pearl, gold, dainty` |
| `bestseller` | *(optional)* `TRUE` to put a "Bestseller" badge on the card. | `TRUE` |
| `newArrival` | *(optional)* `TRUE` to put a "New" badge on the card. | `TRUE` |
| `sold` | *(optional)* `TRUE` to hide the Add-to-Cart button (show "Sold out"). | `FALSE` |

**Multi-line cells:** inside any cell, press **Alt + Enter** (Mac: **Option +
Enter**) to create a new line. That's how you add multiple bullet points in
`details` or multiple image URLs in `images`.

---

## Step 2 — Images

Each product needs at least one public image URL. Easiest options:

- **Google Drive.** Upload the photo → right-click → **Share** → "Anyone with
  the link" → copy link. Then convert it to a direct-image URL by replacing:
  - `https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing`
  - with: `https://drive.google.com/uc?export=view&id=<FILE_ID>`
- **Imgur** (free, very simple). Upload at https://imgur.com → right-click the
  photo → "Copy image address" → paste that URL.
- **Your own photos already hosted somewhere** (Instagram CDN URLs expire, so
  prefer Drive or Imgur).

Recommended photo size: **1200 × 1500 pixels** or larger, portrait orientation.
The site crops to a 4:5 aspect ratio automatically.

---

## Step 3 — Publish the sheet as CSV

The site does not log in to Google — it just fetches a public CSV URL that
Google generates for you. This is a one-time step.

1. Open your sheet.
2. Menu: **File → Share → Publish to web**.
3. In the dialog:
   - Left dropdown: select the **products** tab (the one with the headers).
   - Right dropdown: select **Comma-separated values (.csv)**.
4. Click **Publish**, then confirm. Copy the URL Google gives you — it will
   look like:
   ```
   https://docs.google.com/spreadsheets/d/e/2PACX-1vR.../pub?gid=0&single=true&output=csv
   ```
5. Test it: paste the URL in your browser. You should see a plain-text CSV
   download. If it asks you to sign in, the sheet isn't published — redo step 3.

---

## Step 4 — Tell the site about the sheet

The site reads one environment variable: `VITE_PRODUCTS_SHEET_URL`. Paste the
URL you copied above into that variable in your hosting dashboard.

### On Vercel
1. Project → **Settings** → **Environment Variables**
2. Add: name `VITE_PRODUCTS_SHEET_URL`, value = your CSV URL
3. Hit **Save** and redeploy the latest deployment.

### On devinapps / other static hosts
Set `VITE_PRODUCTS_SHEET_URL` at build time, then rebuild:

```bash
VITE_PRODUCTS_SHEET_URL="https://docs.google.com/..." npm run build
```

### Locally (for testing)
Create a file called `.env.local` in the project root:

```
VITE_PRODUCTS_SHEET_URL="https://docs.google.com/..."
```

Then run `npm run dev`.

---

## How it works day-to-day

Once the URL is configured, the flow is:

- Add a row → save the sheet → wait ~5 min → the next visitor sees the new product.
- Want to hide something fast? Set `sold` to `TRUE`, or delete the row.
- Want to feature something? Set `bestseller` or `newArrival` to `TRUE`.

Google caches published sheets for about 5 minutes. If you want to force a
hard refresh sooner, open the sheet, then **File → Share → Publish to web →
Published content & settings → click "Stop publishing" then "Publish" again.**

---

## Troubleshooting

- **My new product doesn't show up.** Wait 5 minutes, then hard-refresh the
  site (Cmd/Ctrl + Shift + R). If still missing, open the CSV URL directly
  in your browser and check the row is there.
- **The image shows as a broken icon.** The URL in the `image` column isn't
  publicly viewable. Open that URL in an Incognito window — if you're asked
  to sign in, the image isn't shared publicly. Re-share (see Step 2).
- **The site shows the placeholder catalogue.** The site falls back to the
  built-in 12 sample products whenever the sheet URL is missing, blocked, or
  returns zero valid rows. Check that `VITE_PRODUCTS_SHEET_URL` is set and
  that at least one row has `name`, `price`, `category`, and `image` filled
  in.
- **"category must be jewelry, accessories, or clothing".** That field is
  case-sensitive. Use exactly one of those three words, all lowercase.

---

## Power user — swapping later

Because the site only reads a CSV, you can point `VITE_PRODUCTS_SHEET_URL` at
**any** public CSV URL. If you outgrow Google Sheets later (say, you want
image upload with drag-and-drop), swap it for Airtable's CSV export, Notion's
CSV, or a little admin dashboard — nothing else needs to change on the
storefront.
