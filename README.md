# Artisan Aid

A React frontend for discovering local artisans, reviewing their work and tracking project requests. With live services currently unavailable, the default frontend mode uses fictional marketplace records and simulated actions that work without a backend.

The original public pages and artisan, client/employer and administrator journeys have been retained and refined. No backend provider, server, database or payment infrastructure has been selected or built.

## Run locally

Use Node.js 20.19 or newer. This revision was checked with Node 24.19.0 and npm 11.9.0.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. Demo mode is the default, including when no `.env` file exists. You can copy `.env.example` to `.env` if you want the mode explicit. No API credentials are needed.

```bash
npm run lint
npm test
npm run build
npm run preview
```

`npm run preview` serves a production build after `npm run build`. The included `vercel.json` retains the original SPA route rewrite; no deployment was performed.

## Try the core journeys

On **Sign in**, expand **Explore with a sample account**, or use **Service information** in the footer. All sample accounts use `Demo123!`. Public discovery, the story and team credits are available without signing in.

| Perspective       | Demo email             | What to try                                                                 |
| ----------------- | ---------------------- | --------------------------------------------------------------------------- |
| Client / Employer | chidinma@artisanaid.ng | Search/filter, inspect Adewale’s profile, review and save a project request |
| Artisan           | ade@artisanaid.ng      | Confirm or decline the same request, edit the profile, add a work photo     |
| Administrator     | admin@artisanaid.ng    | Review sample documents, approve/decline profiles, handle sample reports    |

1. Browse Carpentry and request Adewale Adeyemi. Use a future date, sample phone and sample address.
2. Open the artisan perspective from `/demo` and respond to that request.
3. Return to the client perspective to see the saved response.
4. Create a new artisan account with sample contact details, submit a sample JPEG/PNG/WebP verification image, then switch to Admin to review it. Approved profiles appear in discovery; declined profiles show the reason to the artisan and allow another submission.
5. Try the work gallery, profile edits, contact form and plan preview. Their success messages explain what was saved locally.

There are eight fictional artisans: six initially listed, one awaiting review and one declined. Seeded dates are generated relative to the first fresh demo. Those dates then persist with the rest of the data.

## Persistence and limitations

- `localStorage` holds the demo dataset under `artisanaid.demo.v2` and the current demo session under `artisanaid.demo-session.v2`.
- Changes survive refresh, sign-out and reopening the same site in the same browser. The session also survives reopening until you sign out or reset it. Sign-out removes the session, not the dataset.
- Storage is specific to the browser and origin, including the port. It does not sync across devices. Use one tab for role switching; concurrent writes in different tabs are not coordinated.
- Clearing site data, private browsing policies, unavailable storage or a future schema reset can lose changes. When storage is unavailable the app warns and can operate in memory. If only a session write fails, it uses the new role in memory and warns that a reload might restore the previously saved session.
- Image uploads are data URLs. Each JPEG/PNG/WebP must be no larger than 1 MiB, and the demo work gallery allows four photos. The browser’s total quota may be reached sooner. Failed dataset writes keep the previous saved data and give an actionable error.
- **Reset sample data** in `/demo` clears only these two demo keys, signs out and restores the sample dataset. API sessions and unrelated site storage are untouched.
- All demo accounts share the sample password; passwords are not stored. Client-side role checks are interaction safeguards, not secure authentication. Use fictional contact details and non-sensitive images.

## What cannot operate genuinely yet

Real authentication and authorization, password changes/reset tokens, email verification/delivery, notifications, messaging, appointment coordination, identity or skill checks, payment processing, subscriptions, receipts and cross-device file/data storage require backend integration. PDF verification documents are currently unsupported.

A locally confirmed request does not schedule a real appointment. A locally approved profile does not establish credentials. A plan selection does not charge money or create benefits. The contact form saves a sample message; it does not open a support ticket or send an email. Password recovery validates a sample request but does not send or change credentials.

## Code map

```text
src/
  auth/                 Sign-in, registration and recovery screens
  components/           Shared navigation, layouts, states and UI primitives
  data/                 Fictional seed records, category/location catalog and original team credits
  dashboards/           Role-specific page composition and navigation
  features/dashboard/   Requests, profiles, gallery, verification, plans and moderation
  features/home/        Search-first landing page sections
  hooks/                Shared auth snapshot and async resource loading
  lib/                  Image preview/validation helper
  pages/                Public discovery, artisan profile, story, contact and demo guide
  routes/               Route definitions, preserved aliases and role guards
  services/             Demo implementation, HTTP adapter template and mode selection
public/media/           Optimized photographs reused from the supplied project
```

Pages call domain operations from `src/services/index.js`. They do not access storage or send network requests directly. The demo service and future adapter share those operations and data shapes; there is no provider SDK in the application.

## Handoff notes

- [Review, design rationale and journey changes](docs/REVIEW.md)
- [Service contract and future backend integration](docs/BACKEND_INTEGRATION.md)
- [Verification results and remaining browser checks](docs/VERIFICATION.md)

Automated service and DOM integration tests exercise the core demo without backend access. DOM tests do not measure layout. A real-browser visual, responsive and assistive-technology pass remains necessary; see the verification notes for the specific environment limitation and checklist.

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
