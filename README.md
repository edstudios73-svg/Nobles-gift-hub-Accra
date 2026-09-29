# TheNobles.gift&surprise_hub

Gift & surprise storefront for Rashida Yussif — NIMA & UPSA, Accra · 0551586167 · yussifrashida918@gmail.com

Static site (no build step). Open `index.html` or host on Netlify / Vercel / GitHub Pages.

- Products live in the `PRODUCTS` list at the top of `app.js`. Add `price` (GH₵) to any item to display it; otherwise it shows "Price on request".
- Orders are sent as a WhatsApp message to 0551586167 (`WHATSAPP` constant in `app.js`).
- Photos are in `img/`.
- Pages: `index.html` (home), `shop.html`, `categories.html`, `how-it-works.html`, `contact.html`. The header, footer, cart and checkout are shared and built in `app.js`.
- Price list lives in `prices.html` (from the price flyers). Product cards in categories with a price list show "See price list". Set `price` on a product to show an exact price instead.
- Legal pages: `privacy.html` and `terms.html` (template text, review before relying on it).

## Backend (Supabase) and admin
- `supabase/schema.sql` creates tables, security policies, order/review/message functions and the `product-images` storage bucket. `supabase/seed.sql` loads the existing categories and products.
- `config.js` holds the Supabase URL and public (publishable) key. `sb.js` is a tiny client used by the website and the admin.
- The admin lives in `admin/` and opens at `/admin`. Until `config.js` has a Supabase URL it runs in demo mode (sample data kept in the browser, see `demo.js`). With a Supabase URL it uses the real database, and only users listed in the `admins` table can read or change data.
