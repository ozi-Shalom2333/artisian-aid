# Artisan Aid

A React frontend for discovering local artisans, reviewing their work and tracking project requests. The public interface preserves the project's blue, navy and amber identity, shared ownership and original contributor acknowledgments.

Public pages always use a real-service adapter. No backend is currently connected. Account creation, sign-in and profile management are API-ready screens, **not working real authentication or a durable user database**. When a service is unavailable, the action reports that limitation and does not manufacture success or create a browser-only public account. No provider, server or backend infrastructure has been chosen or built.

## Run the public application

Use Node.js 20.19 or newer.

```bash
npm ci
npm run dev
```

Without `VITE_API_BASE_URL`, public forms give concise unavailable feedback and discovery displays a retryable unavailable state. The public shell, service categories, story, contributor page and email contact link remain accessible. There is no automatic fallback to fictional marketplace records. Old `VITE_DATA_MODE=demo` settings no longer select a simulator.

Copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL` only after implementing the adapter contract in [BACKEND_INTEGRATION.md](docs/BACKEND_INTEGRATION.md). The old unavailable server is not assumed compatible. Restart Vite after configuration changes; rebuild deployed assets.

## Local developer testing

```bash
npm run dev:testing
```

Open `http://127.0.0.1:5173/__testing` (use the port printed by Vite if different). Sample accounts, browser records, reset controls and all three dashboards are available there. `/` on the same server still uses public services. No public navigation links to this area.

The testing command binds to loopback. Testing middleware rejects non-loopback connections, and the browser entry also requires a loopback hostname. Every build excludes the testing entry, seed records, sample credentials and sample certificate, even with `--mode testing` or a development `NODE_ENV`. This is a local development boundary, not a hosted private portal. Do not expose the development server through a proxy/tunnel. A future hosted testing area needs server-enforced authentication and permissions plus separate test services/storage; an unlisted route or frontend password is insufficient.

See [DEVELOPER_TESTING.md](docs/DEVELOPER_TESTING.md) for accounts, reset, persistence and limitations.

## Checks and build

```bash
npm run lint
npm test
npm run build
npm run preview
```

Preview serves the public production build. The existing `vercel.json` SPA rewrite is retained; nothing has been deployed. SPA hosting may return the HTML shell with HTTP 200 for an unknown path, but the application has no production testing route and renders its normal unavailable-page screen.

Tests cover backend-offline public actions, a stubbed HTTP contract journey, isolated local workflows, persistence failures and role/ownership behavior. A stubbed API test is not evidence of a working live backend. See [VERIFICATION.md](docs/VERIFICATION.md) for actual checks and browser limitations.

Subtle Framer Motion scroll reveals retain fully readable content, run once, settle immediately for keyboard focus and respect reduced-motion changes. Motion settings, placement, bundle cost and remaining browser checks are documented in [MOTION.md](docs/MOTION.md).

## Code map

```text
src/
  auth/                 Sign-in, registration and recovery screens
  components/           Navigation, layouts, states and UI primitives
  data/                 Category/location catalog and original team credits
  dashboards/           Role-specific composition and navigation
  features/dashboard/   Requests, profiles, gallery, review, plans and moderation
  features/home/        Search-first landing sections
  hooks/                Scoped auth snapshots and async resource loading
  lib/                  Image preview/validation helper
  pages/                Public discovery, profile, story, contact and credits
  routes/               Shared routes, preserved aliases and role guards
  services/             Public HTTP adapter, environment factory and React context
  testing/              Local-only service, sample records, credentials and tools
public/media/           Optimized original project photographs
```

Components call the service provided by `ServiceContext`, not storage or fetch directly. Public and local testing environments implement the same domain operations but have different routes, event subscriptions and storage namespaces. Backend integration belongs in the adapter; the interface does not require a provider SDK or a replacement state framework.

- [Review and design rationale](docs/REVIEW.md)
- [Backend contract, incomplete flows and session considerations](docs/BACKEND_INTEGRATION.md)
- [Local testing and data isolation](docs/DEVELOPER_TESTING.md)
- [Verification and remaining browser checks](docs/VERIFICATION.md)
- [Motion choices and accessibility](docs/MOTION.md)

## Team and contributor acknowledgments

Artisan Aid is a collaborative project. The following names and roles are transcribed exactly from `src/pages/MeetTeam.jsx` in the supplied original project archive. They credit contributions to this project; no new biographies, individual social profiles or employment details have been invented. The website recognizes the team at `/meetTeam`, with links from the story and footer.

| Contributor         | Original project role        |
| ------------------- | ---------------------------- |
| Prince Jehoshaphat  | Team Lead / Product Designer |
| Ernest Shaibu       | Back-end Developer           |
| Victoria Trust      | Front-end Developer          |
| Ozioma Okafor       | Front-end Dev / UI Engineer  |
| Yusuf Olamilekan    | Back-end Developer           |
| Ikechukwu Joshua    | Front-end Developer          |
| Gerald Elibe        | Front-end Developer          |
| Christopher Ichigou | Back-end Developer           |

`src/data/team.js` holds these credits separately from fictional marketplace data. The original image assignments for Prince, Ernest and Victoria are retained as optimized local files. The remaining contributors use initials, as their original entries had a generic avatar. Generic social-network home links from the original screen are omitted because they are not contributor profiles.
