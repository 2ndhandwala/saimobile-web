# Image drop zone

Drop real photos here with these exact filenames. Everything is already wired.

## Section photos (this folder)

| Filename | Dimensions | Aspect | Where it shows |
|---|---|---|---|
| `hero-counter.jpg` | 1200 × 1500 | 4:5 portrait | Hero, right of headline |
| `new-phones.jpg` | 1600 × 1280 | 5:4 landscape | "Brand new" block |
| `used-phones.jpg` | 1600 × 1280 | 5:4 landscape | "Second-hand" block |
| `storefront.jpg` | 1600 × 1200 | 3:2 landscape | JSON-LD (search + WhatsApp preview only, not on page) |

## Product photos (`products/` subfolder)

Square 1000 × 1000 each, on a plain surface, top-down or 3/4 angle:

- `phone-iphone-13.jpg`
- `phone-iphone-12.jpg`
- `phone-s22.jpg`
- `phone-op11r.jpg`
- `phone-note12pro.jpg`
- `phone-v29.jpg`
- `phone-iphone-15.jpg`
- `phone-s24.jpg`

Filenames must match — they're built from the `seed` field in `content.ts →
stockUsed / stockNew`.

## Format

JPG for all photos. Keep source files under ~1MB — Next.js resizes and
auto-converts to WebP/AVIF at request time.

## After you upload

Everything renders automatically. No code changes needed.

If you want to remove the visible "Photo placeholder" chips that still appear on
top of each image, delete the `<span>` with `Photo placeholder` text in:
- `components/site/Hero.tsx`
- `components/site/CategoryBlocks.tsx` (two of them)
- `components/site/InStockNow.tsx` (the `Placeholder` chip on product cards)
