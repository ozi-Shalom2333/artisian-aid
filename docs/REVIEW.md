# Review and design rationale

Reviewed the supplied React/Vite source, route map, authentication/storage code, mock handlers, relevant public pages, role dashboards and image assets before implementation. The original project built and linted with six warnings. Its screens and journey behavior were reviewed through their component code; no functioning original backend was assumed.

The earlier portfolio context supports retaining Artisan Aid’s blue-and-amber identity, warmer surfaces, craft photography, quieter dashboards and search as the main entry point. The portfolio address retrieved was https://ozioma-dev.vercel.app/. It was not accessible through the available web retrieval tool, so this revision does not claim a visual comparison against its live pages. Findings below are code observations and design judgments, not user research or measured conversion improvements.

## Problems found and addressed

| Original issue                                                                         | Result in this revision                                                                                  |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Login request/response fields and stored authentication keys disagreed                 | One session shape, one shared auth snapshot and role-aware redirects                                     |
| Mock installation was asynchronous and intercepted only one Axios client               | A directly selected async service implementation, initialized before rendering                           |
| Hardcoded unavailable API URLs were scattered across pages                             | One provider-neutral adapter boundary and an explicit future API base URL                                |
| Mutation mocks reported success without saving changes                                 | Atomic local writes shared by all roles, meaningful success and failed-save states                       |
| Public provider profiles were hidden behind an employer guard                          | Anyone can evaluate a profile; sign-in is requested when a client starts a request                       |
| Tablet navigation disappeared between desktop and mobile breakpoints                   | Public mobile navigation begins at 900 px; dashboard navigation adapts at 700 px                         |
| Booking responses triggered full-page reloads                                          | Resource refreshes keep the route, filters and response feedback coherent                                |
| Verification data omitted the selected file; a placeholder image implied a certificate | Sample image preview, submission state, visible decline reasons and an explicitly marked sample document |
| Generic social links and invented praise suggested unverified trust                    | Unsupported links/testimonials removed; review badges and photos disclose their demo meaning             |
| Large duplicated photographs and unused legacy screens obscured the active app         | Optimized local media, removed unreachable legacy modules and dead API/mock wiring                       |

Useful capabilities retained: service categories, Lagos-area discovery, three account perspectives, artisan profiles and work galleries, booking requests, profile editing, verification review, report moderation, subscription previews, account recovery entry points, contact, about and original team pages. Useful public and dashboard paths remain; the old public `/demo` route has been removed, while legacy notification, recovery and admin-detail routes have explanatory redirects.

## Relevant design references

These creator presentations helped identify useful patterns. They are concept showcases, not evidence that a pattern has been validated with Artisan Aid’s users.

| Reference                                                                                                                       | Idea that suits Artisan Aid                                                 | How it was interpreted                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Baru by Aamir Sehar on Dribbble](https://dribbble.com/shots/27469557-Baru-On-Demand-Home-Services-Marketplace-Landing-Page-UI) | A confident headline, warmth and search as the primary call to action       | The home page leads with skill/area search, quieter category links and a craft photograph. Serif emphasis is limited to editorial phrases. No fabricated ratings or trust counts were adopted.      |
| [HandyNaija by Moinul Islam Rehan on Dribbble](https://dribbble.com/shots/27109977-HandyNaija-Home-Services-Marketplace-UI)     | Local-service categories, provider information and a clear request sequence | Lagos filters, business/availability details and a review step help a client make a considered request. The request remains distinct from a confirmed appointment.                                  |
| [Home Services Marketplace by Ronas IT on Dribbble](https://dribbble.com/shots/26588870-Home-Services-Marketplace-Mobile-App)   | Search/filter first, followed by work terms, profile details and portfolio  | Discovery offers URL-backed filters; profiles show biography, area, availability and work photos before requesting. Mobile uses readable stacked content rather than shrinking a desktop dashboard. |

An artisan-marketplace reference on Behance, [Kala Kosha](https://www.behance.net/gallery/242360005/Kala-Kosha-Artisan-Marketplace-Website), was also located, but direct access returned 403. Its imagery/layout was not treated as inspected evidence. Broad gallery trends were not used as a substitute for a product reason.

## Visual direction and interaction decisions

- **Blue, navy and amber:** preserve the project’s recognizable identity. Navy carries headings and navigation; blue marks actions; amber adds warmth and is restrained to accents and the artisan invitation.
- **Warm paper surfaces and craft photography:** place the people and their work at the centre. Original photographs are optimized. Illustrative sample work remains identified inside the local testing environment. Initial avatars avoid assigning team photos to fictional professionals.
- **Confident type hierarchy:** large, tight headings establish the story, with Georgia italic emphasis and familiar self-contained body fonts. No external font request is required. Form controls use 16 px text, captions have a 12 px floor and secondary text uses one darker token.
- **Consistent components:** shared buttons, fields, cards, status badges, layout shells and dialogs reduce visual drift. State labels accompany colour, and request details use native disclosure elements.
- **Quiet workspaces:** requests are the default artisan/client task. Navigation uses meaningful labels and real URLs. Admin review groups the sample document, guarantor and decision in one dialog.
- **Feedback at the task:** loading messages name the work in progress; empty states explain how to recover; retryable errors preserve the draft; success states describe what actually happened. Busy actions prevent repeat submissions.
- **Accessible foundations:** semantic landmarks, skip link, unique field labels, native selects/checks/disclosures, visible focus, pressed/current navigation states, live error/success messages and reduced-motion handling. Dialog focus and Escape behavior use the existing Base UI primitive. Full accessibility conformance has not been audited.

The arched home photograph and circular craft mark give the landing page a distinct character. Those decorative elements stay out of admin tasks, where scanability matters more. The subsequent requested Framer Motion pass adds short, one-time scroll reveals with live reduced-motion support and focus bypass. It preserves readable content, existing layouts and immediate task feedback. There is no splash screen, fake countdown or scroll hijacking. See [MOTION.md](MOTION.md) for timing, placement, bundle measurements and verification limits.

## Journeys available in local testing

| Journey                | Sequence and feedback                                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Discovery to request   | Search/filter → inspect public profile → sign in if needed → return to the same profile → enter details → review → save → view tracked request |
| Artisan response       | Open Job requests → inspect details → confirm/decline → local success → client sees the same updated record                                    |
| New artisan onboarding | Create sample account → explicitly simulated email step → fill profile/gallery → submit sample image → Pending status                          |
| Profile review         | Admin inspects submission → approves or supplies a decline reason → discoverability/status updates → artisan can correct and resubmit          |
| Report moderation      | Client submits a concern → Admin inspects reason → confirms dismiss/restrict/remove action → queue and listing access update                   |
| Plan preview           | Read illustrative price/features → confirm simulation → local selection saved; no checkout or benefits claimed                                 |
| Recovery/contact       | Validate form → disclose simulated result; no claim of an email, credential change or support ticket                                           |

Moderation removal is a soft removal from discovery and login, preserving the record for the demo. It does not erase related request history. The team page acknowledges all eight original contributors with their exact project roles and original image assignments. These are project credits, not newly researched current employment claims.

## Public product and separate developer area

The public interface has no portfolio-demo promotion, sample-account picker, mock record captions, service-information/reset links or technical backend instructions. Product typography, colours, responsive layouts, original imagery, service categories and useful request/profile/dashboard components are retained. Expected discovery outages use a calm retryable state. Account, contact and recovery failures describe the relevant action at the form.

Inspection confirmed that the earlier account flows were simulations with browser storage and a shared sample password. That limitation was explained before editing. The user chose API-ready public screens rather than public browser-only account previews. Public actions therefore require a real response and report unavailability while the backend is absent; styling does not imply that signup or authentication already works.

Developer tools moved to a local-only `/__testing` router, with sample account shortcuts, fixtures, reset and role dashboards. A context-scoped service lets the same interface work against either environment without global mock interception. Testing uses separate data/session keys and events, never imports public user records, and cannot be entered through public navigation. Its toolbar identifies the testing context and offers a full-page exit to the public service environment. Every build omits the testing module tree and certificate; the loopback server and connection/hostname checks restrict local development. This is not a substitute for server authentication if testing is ever hosted.

The exact eight contributor names, original roles and image assignments remain in `src/data/team.js`, the team page, story links, footer and README. Credits were checked against the supplied original `MeetTeam.jsx`; no names, biographies, personal links or contributions were invented. Team role descriptions are project acknowledgments, not technical developer notices or current employment claims.

## Proportionate architecture changes

The React/Vite/Router stack, JavaScript conventions and existing Base UI/shadcn primitives remain. Feature components replace duplicate role-specific implementations where they performed the same work. The public artisan profile now lives with public pages. No global state framework, provider SDK, backend framework or infrastructure configuration was introduced.

The service layer owns validation, persistence, domain transitions and role/ownership guards. Components own form drafts and task feedback. `useResource` centralizes loading, retry and stale-result suppression; `useAuth` keeps session consumers synchronized. Domain operations are injectible for deterministic service tests. DOM integration tests use Node’s test runner, esbuild and jsdom rather than a new application test framework.

Obsolete Axios/mock wiring and unused Axios, JWT, toast, icon and animation dependencies were removed. Existing generated UI primitives remain available without an unrelated component-system rewrite. Focused ESLint configuration permits the existing generated primitive exports and router definitions; hook and correctness rules remain enabled.

## Account confirmation changes

The public adapter no longer trusts a stored role to open a dashboard. It revalidates the cached credential through `/me`, confirms server logout and checks mutation result shapes before displaying success. Lost responses describe uncertainty, and failed saves retain form drafts. Success feedback is cleared before a new attempt so an earlier save cannot appear to confirm a failed change. No backend, provider SDK, global state package or new dependency was added.
