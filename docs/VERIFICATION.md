# Verification

Checks completed on 11 October 2026 with Node 24.19.0, npm 11.9.0 and the installed Vite 6.2.5. Demo mode was used with backend fetch access rejected in interface tests. No real external service transaction was performed.

## Results

| Check | Result | What it establishes |
| --- | --- | --- |
| `npm run lint` | Passed, no errors or warnings | Active source and test files satisfy configured correctness/hook rules |
| `npm test` | Passed, 22 tests | 12 demo service tests, 3 HTTP adapter tests and 7 DOM journeys |
| `npm run build` | Passed | Production JavaScript, route chunks and CSS compile |
| Dependency/lockfile comparison | Passed | Runtime/dev dependency and engine declarations agree with the lockfile |
| Local media reference check | Passed | Referenced local photographs, sample document and brand mark exist |
| Production preview over HTTP | Passed | Six SPA routes return the app shell, and all 53 built files serve with the expected bytes |
| Original contributor comparison | Passed | All eight team names and roles match the supplied original `MeetTeam.jsx` exactly; original assigned image files exist |
| Real-browser visual/responsive check | Blocked | Cloud browser could not reach the container’s loopback development server (`ERR_CONNECTION_REFUSED`) |

The npm commands also printed an environment-level warning about the runtime’s `http-proxy` npm configuration. That warning is separate from project lint/build/test results.

## Automated behavior covered

**Demo service tests** verify:

- Public listings exclude pending/declined/restricted profiles and omit contact/verification fields.
- Email/phone login, invalid credentials, role guards, record ownership and logout semantics.
- A client’s new request can be answered by the artisan and read by the client after recreating the service from saved storage.
- Repeat/stale responses are rejected rather than silently overwriting a decision.
- Past/impossible dates, missing/short fields, invalid phones and unavailable artisans are rejected.
- Registration, simulated email state, verification submission, mandatory decline reason, resubmission and approval/discovery.
- Profile text/photos/availability, work gallery capacity/removal and persistence.
- Report creation, administrator restriction, discovery removal and login rejection.
- Local plan/contact/recovery/reset behavior.
- Corrupt or structurally malformed saved data recovers with a warning.
- Storage quota failures keep the previous saved record. Memory-only sessions warn; failed session writes do not leave the previous role active in memory.
- Duplicate phone identities are rejected.

**HTTP adapter tests** verify configuration, response normalization, configured URL/token use, 401 session clearing and a network failure that never silently falls back to demo success. They use injected fetch responses; a live API has not been implemented or tested.

**DOM integration tests** mount the actual React app and route tree in jsdom:

1. Public profile → sign-in return → request review → failed-save feedback/retry → client dashboard → artisan response → client updated status.
2. Discovery search/empty state/clear/filter → contact simulation → recovery disclosure, plus unavailable profile feedback.
3. Unsigned and wrong-role dashboard guards.
4. Admin document review/decline reason → artisan receives the note and a resubmission form.
5. Gallery image preview/save → profile photo/text save → public profile shows the same stored changes.
6. Home discovery without portfolio-demo promotion → full original team credits → story acknowledgment → service information and simulation disclosures.
7. Initially collapsed sample sign-in choices → sample client workspace, with the conditional storage warning retained when localStorage is unavailable.

Each DOM journey rejects and counts backend `fetch` calls, expects zero such calls in demo mode, and checks for captured runtime errors. Standard Node fetch/abort globals and basic platform stubs bridge the test DOM; CSS is deliberately excluded from the DOM bundle. The tests cannot establish rendered geometry, visual quality or assistive-technology behavior. Seeded/sample images and local app files are not backend services.

## Implemented accessibility/responsive foundations

The source includes landmarks, a skip link, field labels and hint associations, visible focus, text status labels, native select/check/details controls, navigation state, busy buttons, Base UI dialogs and reduced-motion styling. Secondary text was consolidated to a darker token and native form text uses 16 px. These are implementation checks, not a WCAG conformance certification.

Layout rules cover 1100, 900, 700 and 420 px widths. Public navigation changes at 900 px and dashboard navigation at 700 px. Cards, filters, galleries, forms, profile/request columns and plan cards adapt to smaller widths. Images are optimized and served locally. No visual screenshot or browser/device performance benchmark is claimed.

## Remaining real-browser review

Before presenting or deploying a public demo, check the final build in a browser:

- At 360, 390, 768, 1024 and 1440 px, inspect the home search, heading wrapping, navigation, artisan cards, request dialog and each dashboard. Confirm there is no horizontal overflow or clipped action text.
- Inspect all eight contributor cards, the story team link, footer credits and the native sample-account disclosure at those widths.
- Use only Tab/Shift+Tab/Enter/Escape through public and dashboard navigation, login, filters, booking, file selection and modal actions. Confirm focus entry/trapping/return in dialogs and after route changes.
- Check screen-reader names, heading hierarchy and announcements for loading, empty, error and success states; validate contrast over photographs and all interaction states.
- Refresh a changed profile/request; close/reopen the same origin; sign out; switch roles; reset the demo. Try private/unavailable storage and a quota error in a real browser.
- Check long names/addresses, reduced motion, 200% zoom and touch targets on a phone.
- Team names, project roles and original image assignments have been checked against the supplied source. Confirm image rights and any real contact details before publication; no current employment or personal social profiles are claimed.

Actual authentication, delivery, moderation guarantees, storage security, payments and live scheduling remain dependent on the future backend. See `BACKEND_INTEGRATION.md` for the adapter contract and the intentionally unavailable live flows.
