# Motion

Framer Motion 14.1.0 adds restrained scroll reveals to the existing design. The original layouts, colours, contributor data, routes, forms and service behavior are preserved.

## Choices

- Sections rise 12 px into place over 420 ms with an ease-out curve `[0.22, 1, 0.36, 1]`. They remain fully opaque throughout, so reading and image display do not wait for animation.
- Each reveal runs once per mount when its first part enters the viewport, with a 24 px bottom inset. The small threshold also works for sections taller than a mobile viewport. Scrolling back does not replay it.
- Home section headings, service and featured-card groups, the artisan invitation, story and category sections reveal as groups. The hero photograph gets the same movement while its heading and search form remain still. The three explanatory steps use delays of 0, 45 and 90 ms to reinforce their sequence. Team cards reveal independently with equal timing for all contributors.
- Existing card hover movement remains on the cards, while reveals apply to their grid, avoiding competing transforms. Button/card hover transitions share the reveal easing with a shorter 180 ms duration; the existing image zoom uses 280 ms.
- Forms, filters, navigation, dialogs and asynchronous status feedback retain their existing behavior. There are no route exit waits, staggered search results, scroll listeners, parallax, continuous motion, animated dimensions or blur effects.

## Accessibility and fallback

`MotionConfig` uses the user's motion preference. `useReducedMotionPreference` subscribes to the media query so changing that preference while browsing immediately settles reveals. CSS also removes reveal and hover transforms under reduced motion; the existing static craft-mark rotation and dialog centering are preserved.

Keyboard focus inside a reveal settles that element immediately and removes its delay. A CSS focus-within rule also covers focus before the animation feature chunk loads. Nothing is hidden or removed from the accessibility tree while awaiting viewport entry. Without `IntersectionObserver`, content renders at rest. A failed optional animation-feature download leaves content readable and keeps the application usable.

`Reveal` renders the original `div`, `section` or `article` directly. It introduces no extra layout wrappers, horizontal offset or fixed sizing. The existing responsive grid and spacing rules still apply.

## Implementation and cost

- `src/components/motion/Reveal.jsx`: viewport entry, focus bypass and supported semantic elements.
- `src/components/motion/settings.js`: shared reveal timing and easing.
- `src/components/motion/MotionProvider.jsx` and `features.js`: lightweight `m` components with `LazyMotion`, using only `domAnimation`. The feature bundle loads after rendering; drag/layout features are excluded.
- `src/hooks/useReducedMotionPreference.js`: live preference subscription.
- `src/index.css`: matching hover tokens and reduced-motion fallbacks.

Production measurements on 11 October 2026, compressing each JavaScript asset with Python gzip using `mtime=0`:

| Measurement | Before | After | Increase |
| --- | ---: | ---: | ---: |
| Entry JavaScript, gzip bytes | 137,138 | 147,683 | 10,545 |
| All JavaScript chunks, gzip bytes | 177,036 | 207,792 | 30,756 |

The separately loaded animation-feature chunk is 14,730 gzip bytes. Viewport reveals share a single observer in the app-level test. The all-chunks total includes route chunks that are not necessarily loaded during a visit. These are bundle measurements, not device frame-rate or network benchmarks.

Five app-level DOM tests cover entry and no replay, readable content and preserved grid semantics, focus/navigation, reduced motion at startup and after a preference change, and missing observer support. The complete suite still checks public and isolated testing journeys, backend outages and all eight contributor credits.

Real-browser visual and responsive QA remains pending because no browser is installed in this environment. Check 360, 390, 768, 1024 and 1440 px: scroll slowly and quickly, scroll back, navigate between routes, Tab into offscreen links, toggle reduced motion, check overflow and focus outlines, and inspect touch hover behavior. Confirm smooth playback on a lower-powered device with browser performance tools; DOM tests cannot prove animation quality or geometry.

Implementation references: [Motion component](https://motion.dev/docs/react-motion-component), [scroll animation](https://motion.dev/docs/react-scroll-animations), [accessibility](https://motion.dev/docs/react-accessibility) and [LazyMotion](https://motion.dev/docs/react-lazy-motion). The pinned package's peer dependencies include this project's React 19, and its exports support `framer-motion/m`.
