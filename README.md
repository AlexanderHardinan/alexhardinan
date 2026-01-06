# alexhardinan.com

Personal portfolio website for **Alexander Hardinan** — modern UI with premium liquid-glass styling, responsive pages, and curated culinary content.

## Tech Stack
- **Next.js 14 (App Router)**
- **TypeScript**
- Global styling in `app/globals.css`
- **Resend** for contact form email delivery (API route)

## Pages
- `/` Home
- `/blog` Culinary Journal
- `/blog/[slug]` Blog posts (static params + metadata + JSON-LD BlogPosting)
- `/stories-on-a-plate` Visual gallery (dishes)
- `/in-the-glass` Cocktails & beverage stories
- `/food-ethos` Philosophy and core principles
- `/off-duty` Lifestyle & photography
- `/myrecipebook` Private recipe area (password gated)

## SEO
- `app/robots.ts` → generates `/robots.txt`
- `app/sitemap.ts` → generates `/sitemap.xml`
- Global JSON-LD: `WebSite` + `Person` in `app/layout.tsx`
- Per-blog-post metadata + canonical + OG/Twitter in `app/blog/[slug]/page.tsx`
- Per-blog-post JSON-LD: `BlogPosting`

## Environment Variables
Create a `.env.local` in the project root:

```bash
RESEND_API_KEY=re_3hhB3nRB_6amaNuFvdakZHzLQLPTzPXMe
