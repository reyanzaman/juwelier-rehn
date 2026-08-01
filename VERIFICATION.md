# Verification report

## Film runtime

- Supplied master: 8.00 seconds, 1280 x 720, 24 fps, H.264
- Runtime: native browser video decoding with motion-interpolated 60 fps desktop and mobile masters
- Playback: autoplay once, no loop, no visible player controls; touch/keyboard fallback for mobile autoplay policies
- Finale: continuous 1.0x / 60 fps playback with a visual settle over the final 0.9 seconds, then a held final frame
- Mobile treatment: dedicated square film, gentle 1.46x to 1.32x zoom-out, product-led framing, and a matching blurred atmosphere behind it
- Return journey: after the film ends and the visitor leaves the hero, a 220-frame high-resolution ImageBitmap window scrubs backward on the return to the top, then hands back to the native video at frame zero
- Reduced motion: paused opening frame
- Scroll remains native and independent from film playback

## Responsive and visual QA

- Desktop 1440 x 900: pass
- Tablet 820 x 1180: pass
- Mobile 390 x 844: pass
- Horizontal overflow: none
- Headline and "Zwei Handschriften" clipping: none
- Mobile horizontal content gutter: 28 px in primary content and hero composition
- Visible section numbering: none
- Mobile bottom navigation dock: removed
- Both supplied editorial photographs and all 12 watch-brand logos load with alternative text
- Watch-brand marks use non-destructive transparent cutout copies; original PNGs remain preserved

## Interaction

- "Zwei Handschriften" pointer response and click/tap/keyboard toggle: pass; mobile circles removed and word edges aligned
- Jewelry and watchmaking detail-inspection controls: pass; scroll parallax, pointer tilt, tracked light, and arrival sheen active
- German/English language switch: pass
- Mobile menu and service accordion ARIA states: pass
- Appointment validation and email-client handoff: pass
- Material hover uses a 3 px accent bar instead of a full-row colour fill

## Motion and performance

- Native scroll with one-time IntersectionObserver reveals; no sticky hold zones or scroll hijacking
- ScrollTriggers active: 0
- Headless scroll-through: 904 frames over 11,745 px
- Average frame delay: 4.2 ms
- p95 frame delay: 4.4 ms
- Maximum frame delay: 4.6 ms
- Frames over 50 ms: 0
- Result: **PASS**

## Mechanical gates

- Runtime verification: pass at 1440 x 900, 820 x 1180, 390 x 844, and 390 x 844 reduced motion
- One-shot end state: currentTime 7.933, ended true, paused true, playbackRate 1.00, loop false
- Full decode validation: desktop 60 fps master pass; mobile 60 fps master pass
- Scroll Film Studio copy gate: pass
- JavaScript syntax checks: pass
- Local browser console errors: none
