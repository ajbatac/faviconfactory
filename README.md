# favicon.love

Generate professional, modern favicons from any image — entirely client-side. favicon.love supports seasonal effects, color adjustments, background transparency, multi-size exports (PNG/ICO), and animated SVG favicons with speed control.

• Open Source • MIT License • By AJ Batac — Instagram: @ajbatac

## Highlights

- Seasonal favicon effects (❄️ Snow, ❤️ Valentine, 🎃 Halloween, 🎉 Celebration)
- Animated SVG favicons (Pulse, Rotate) with adjustable animation speed
- Static exports in all standard sizes: 16, 32, 48, 180, 192, 512 (PNG) + favicon.ico
- Client-side processing (no uploads, privacy-friendly, blazing fast)
- Image cropping, positioning, zoom, background transparency, color overlays (blend modes + opacity)
- Modern results page with copy-paste install snippets and troubleshooting
- Polished front page with How-To, feature showcase, best practices, and technical specs
- Collapsible accordion documentation for easy scanning (Best Practices, Technical Guide, Quick Help/FAQ)

## What’s Included (Accomplishments)

### Core Generation
- Image upload → crop → generate flow
- Precise crop and live 16×16 preview
- Position and zoom controls with reset
- Transparent background option
- Color overlay system with blend modes (multiply, overlay, soft/hard light, color burn/dodge, normal)
- High-quality canvas scaling to multiple outputs

### Seasonal Effects (Client-Side)
- Utility: `src/react-app/utils/seasonalEffects.ts`
- Effects: snow, valentine, halloween, celebration
- Overlays include emoji icon, color tint, and configurable opacity
- Works at all export sizes (16 → 512)

### Animated Favicons (Client-Side, SVG)
- Utility: `src/react-app/utils/svgAnimations.ts`
- Animated SVG generation with embedded CSS keyframes
- Supported effects: pulse (ease-in-out), rotate (linear)
- Animation speed slider (0.5s – 5s) respected in output SVG
- Download individual animated SVGs or all sizes at once
- Clear install guidance + PNG/ICO fallbacks

### UI/UX Improvements
- Seasonal effects tab in editor with side-by-side live comparison (original vs seasonal)
- Cleaned-up Animation Studio focusing on CSS animations (pulse/rotate)
- Front page: feature grid, How-To steps, feature showcase
- Results page: dynamic messaging (seasonal/animated badges), grouped download actions
- Installation instructions rendered with seasonal/animated-aware tags
- Troubleshooting + Pro Tips (cache, paths, browser support, fallbacks)
- New Accordion component with accessible, smooth transitions
  - Best Practices & Guidelines (Dos/Don’ts)
  - Technical Guide & Specifications (sizes, formats, browser support)
  - Quick Help & Troubleshooting (issues + FAQ)

### Developer Experience
- React 19 + Vite setup with TypeScript
- TailwindCSS for styling
- Lucide icons
- ESLint configured for modern React/TS

## Getting Started

Prerequisites: Node.js 18+

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite (typically http://localhost:5173).

## Usage

1) Upload an image (PNG with transparency recommended).
2) Crop to a square, adjust position/zoom as needed.
3) Optional:
   - Background → Transparent
   - Color → Overlay color, opacity, blend mode
   - Seasonal → Choose a theme (snow/valentine/halloween/celebration)
   - Animation Studio → Pulse/Rotate + speed (animated SVG)
4) Generate → Results → Download:
   - Static: PNGs (16/32/48/180/192/512) + favicon.ico
   - Animated: SVGs at standard sizes (with speed baked in)
5) Follow installation instructions shown on the results page.

## Installation (HTML Head)

The app shows the exact code you need based on what you generated. Examples:

Static example (with seasonal prefix shown when used):
```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">
```

Animated SVG example (with ICO fallback):
```html
<!-- Animated SVG Favicons -->
<link rel="icon" type="image/svg+xml" href="/animated-favicon-32x32.svg">
<link rel="icon" type="image/svg+xml" sizes="16x16" href="/animated-favicon-16x16.svg">
<link rel="icon" type="image/svg+xml" sizes="32x32" href="/animated-favicon-32x32.svg">
<link rel="icon" type="image/svg+xml" sizes="48x48" href="/animated-favicon-48x48.svg">
<link rel="apple-touch-icon" href="/animated-apple-touch-icon.svg">
<link rel="icon" type="image/svg+xml" sizes="192x192" href="/animated-android-chrome-192x192.svg">
<link rel="icon" type="image/svg+xml" sizes="512x512" href="/animated-android-chrome-512x512.svg">

<!-- Fallback for older browsers -->
<link rel="icon" href="/favicon.ico" sizes="32x32">
```

## Best Practices (Quick)

Dos
- Use high-contrast, simple designs
- Test at 16×16; ensure recognizability
- Keep package sizes small; include ICO fallback

Don’ts
- Avoid long text, too many colors, low contrast
- Don’t omit fallbacks for older browsers

## Tech Stack

- React 19, TypeScript, Vite
- TailwindCSS
- Lucide Icons
- Canvas 2D (image processing)

## Scripts

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint ."
}
```

## Contributing

Issues and PRs are welcome. Please follow the existing code style (TypeScript, React, Tailwind) and keep UI changes accessible and responsive.

## License

MIT License. See LICENSE if present; otherwise this repository is licensed under MIT.

## Attribution

favicon.love — by AJ Batac

- Instagram: @ajbatac
- Copyright © 2025

