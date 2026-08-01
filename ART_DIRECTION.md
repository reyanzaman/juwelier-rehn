# Art direction — The Quiet Mechanism

## Concept

Two signatures, one promise. The opening film behaves like a finely made object: it moves once, settles without a loop, and responds when the visitor changes direction. The page then expands into two immersive editorial chapters—jewelry for the occasion and the precision inside a mechanical watch—before returning to services, brands, and consultation.

The direction borrows the restraint of current Apple product pages: one dominant idea per viewport, concise claims, large product imagery, horizontal touch exploration, generous negative space, and interactions that clarify the product instead of decorating it.

## Palette and typography

- Primary paper: `#f6f3ee`
- Champagne field: `#f1e5d5`
- Warm elevated surface: `#faf4eb`
- Primary text: `#211b1e`
- Brand accent: `#8e466f`
- Dark accent: `#6f2d53`
- Display: Bodoni Moda, locally vendored
- Body and interface: Manrope, locally vendored

## Motion language

- Native H.264 playback for hardware-decoded one-shot motion with no visible controls or loop
- Native scrolling remains independent from playback, eliminating scrub-induced resistance
- Dedicated 720 × 720 product-led frame set on mobile; 1280 × 720 frames on desktop
- Short sticky editorial chapters with stable copy and direct image inspection
- Click/touch detail inspection for both supplied photographs
- Native scrolling with lightweight, one-time opacity and 8-12 px section arrivals
- Hover feedback uses restrained 1-4 px movement, small accent bars, and surface changes
- The "Zwei Handschriften" composition responds to pointer movement, tap, click, Enter, and Space
- All cinematic motion pauses or simplifies under `prefers-reduced-motion`

## Responsive interpretation

- Desktop: full cinematic field, graded copy zone, and full-resolution paired-ring composition
- Tablet: paired-ring composition with responsive typography and navigation
- Mobile: typography and film occupy one continuous feathered field; the engraved ring becomes the dominant subject without a hard media boundary
- The mobile headline has independent lines with normal line flow—no negative line overlap or masked descenders
- Watch brands become a touch-scrollable snap carousel, while fixed call and appointment actions remain reachable
