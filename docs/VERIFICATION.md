# Verification

Checked on 11 October 2026 with Node 24.19.0, npm 11.9.0 and installed Vite 6.2.5. Public services were unavailable or replaced by injected test responses. No real external service transaction, account or deployment was performed.

## Results

| Check                                              | Result                             | Evidence                                                                                                                                |
| -------------------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`                                     | Passed, no project warnings/errors | Source and tests satisfy hook/correctness rules                                                                                         |
| `npm test`                                         | Passed, 36 tests                   | 13 simulator tests, 5 HTTP adapter tests, 8 local-testing DOM checks, 5 public DOM checks, 5 motion DOM checks                            |
| `npm run build`                                    | Passed                             | Public production JS, CSS and route chunks compile                                                                                      |
| Production exclusion                               | Passed                             | Fresh build has no testing entry, sample credentials, seed records or certificate; production DOM rejects `/__testing` and old `/demo`  |
| Build with testing mode and `NODE_ENV=development` | Passed                             | Build command still excludes the testing module tree, records, credentials and certificate                                              |
| Production preview HTTP                            | Passed                             | Seven SPA paths return the shell; all 54 fresh built files serve with the expected bytes                                                |
| Testing dev server                                 | Passed                             | Explicit testing mode, loopback binding and local toolkit module confirmed                                                              |
| Data isolation                                     | Passed                             | Testing persistence/reset preserves public session, legacy records and unrelated storage; public actions never consume testing sessions |
| Lockfile consistency                               | Passed                             | Runtime/dev dependency and engine declarations match the lockfile                                                                       |
| Contributor comparison                             | Passed                             | All eight original names/roles match supplied `MeetTeam.jsx`; exact credit assertions also run in DOM tests                             |
| Motion and bundle checks                           | Passed                             | Entry-once, focus bypass, live reduced motion and observer fallback; +10,545 entry / +30,756 all-chunks gzip bytes                       |
| Real-browser visual/responsive check               | Not completed                      | Cloud browser could not reach this container's loopback server in the earlier review; no local browser is installed                     |

Old output from a previous demo build was found during exclusion checks and removed before the fresh production build. Build output is configured to be emptied. Deploy a fresh output directory and remove obsolete deployment assets; excluding a route from new JavaScript does not remove an old file from an existing host/CDN. The delivered archive contains source and documentation, not old build artifacts or dependencies.

The environment prints a separate npm `http-proxy` configuration warning. The deliberately atypical development `NODE_ENV` build prints a bundle-size advisory; this build was used only to check exclusion and is not the production deliverable.

## Public behavior verified

- Home, story, category navigation and all eight real contributor credits remain available without accounts or simulation promotion.
- Missing API configuration gives contextual signup/login/contact/recovery errors, creates no browser-only public account, makes no backend request and never displays successful completion.
- Public menus, footer, login and dashboards have no testing links or account shortcuts.
- A testing session cannot authenticate a public dashboard. A cached public role cannot bypass `/me` revalidation when the backend is unavailable.
- Production route selection rejects both `/__testing` and the former `/demo` route. Reset/email token screens state that the password/email status has not changed.
- With injected HTTP responses, signup passes the allowed role and omits password confirmation; confirmed server profile saves update the header; a rejected save retains the previous confirmed profile and clears old success feedback; server logout clears the public token; subsequent login opens the appropriate workspace.
- Malformed mutation results, lost responses and missing acknowledgments do not manufacture success. HTTP failures never fall back to sample data.

The API journey uses a test stub that keeps records in memory. It proves requests and confirmation handling, **not live authentication, shared database persistence or a working backend**.

## Local testing behavior verified

- Client discovery/profile → sign-in return → request details/review → quota failure without success → retry → saved request → artisan response → client reads updated status.
- Search, filters, empty results and clear filters; unavailable profile handling.
- Unsigned and wrong-role dashboard guards; editable client/artisan profiles.
- Registration → sample verification → decline with reason → resubmission → approval/discoverability.
- Admin document review and moderation; restrictions block discovery/login in the simulator.
- Gallery image upload/preview/removal and profile-photo changes; saved data survives a recreated service.
- Contact/recovery/plan simulation and reset; no emails, credentials, charges or real appointments claimed.
- Corrupt storage, duplicate identities, memory fallback, failed session writes and quota errors.
- Test reset clears only the dedicated test keys; public/legacy/unrelated data stays intact.
- Non-loopback hostnames do not boot the developer workspace, even in explicit testing mode.

Simulator/DOM tests reject and count backend fetch calls, expecting zero. HTTP tests inject fetch responses and check authenticated requests, 401 behavior, server session restoration and memory fallback. DOM tests mount the actual app/router in jsdom and check captured runtime errors. CSS is excluded from DOM bundles, so they do not verify visual geometry, responsive quality or assistive-technology behavior.

The requested motion pass reran lint, all 36 tests and a fresh production build, with production exclusion, lockfile consistency and unchanged contributor-data checks. Five motion tests exercise the actual app with controlled viewport and media-query events: visible content, preserved section/card semantics, entry without replay, keyboard focus/navigation, reduced-motion startup and preference changes, and observer fallback. [MOTION.md](MOTION.md) records placement, consistent timing, bundle measurements and the outstanding visual/performance browser pass.

## Responsive and accessibility foundations retained

The app retains semantic landmarks, skip link, unique labels/hints, visible keyboard focus, navigation state, text status labels, async error/success announcements, busy controls, native select/check/details interactions, Base UI dialogs and reduced-motion rules. Public navigation adapts at 900 px and dashboard navigation at 700 px; layouts also cover 1100 and 420 px. The local toolbar wraps on small screens. Expected public discovery outages use a calmer error presentation, with retry and no fake empty listing.

Before showcasing or deploying, perform a real-browser pass at 360, 390, 768, 1024 and 1440 px. Inspect heading wrapping, forms, cards, dialogs, dashboards, credits, image captions and horizontal overflow. Check Tab/Shift+Tab/Enter/Escape, dialog focus return, screen-reader announcements, contrast, 200% zoom, reduced motion and touch targets. Exercise refresh, closing/reopening the origin, role switching, blocked/quota storage and testing reset in an actual browser. No visual screenshots, WCAG certification or device benchmark are claimed.

## Backend work remaining

Real signup/login/profile persistence and ownership require an implemented API and session policy. Email verification/reset-token consumption, durable protected uploads, moderation guarantees/audit persistence, contact delivery and subscription checkout remain incomplete integration work. Configuring a base URL alone does not enable these unfinished flows. No provider or backend infrastructure has been added. See [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) and [DEVELOPER_TESTING.md](DEVELOPER_TESTING.md).
