# Connecting a future backend

Public pages use the HTTP **contract template**, not a working integration with the old unavailable server. Simulations are confined to the local developer area. No backend provider has been chosen. A service backed by your own API or a BaaS SDK can implement the same operations without replacing the page components.

## Public and testing boundary

`src/services/index.js` creates the public HTTP environment. `src/services/context.js` supplies its domain operations to components. There is no public simulator selection and no sample-data fallback. Missing configuration reports concise, feature-specific unavailability without network requests or local public records.

`src/testing/bootstrap.jsx` creates the local simulator and a separate router with basename `/__testing`. It is imported only by the explicitly enabled loopback development entry. The Vite configuration defines `__LOCAL_TESTING__` from the **serve command** and **testing mode**, not an environment secret or `NODE_ENV`; all builds set it false and exclude the import. Test credentials, records and document assets are inside that excluded module tree. See [DEVELOPER_TESTING.md](DEVELOPER_TESTING.md).

```dotenv
VITE_API_BASE_URL=https://your-api.example.com/v1
```

Configure only after matching endpoint names, payloads, data relationships, validation, error envelopes and storage policy. Restart the dev server and rebuild when changing configuration. `VITE_*` values are browser-visible public configuration, never secrets.

A self-built backend or later BaaS adapter can implement the same service object and be selected in `createPublicEnvironment()`. Keep SDK calls, record mapping and uploads behind that boundary. Pages should continue receiving ordinary records and rejected promises. No provider is selected here.

## Domain conventions

- IDs are opaque strings. `_id` is retained to avoid unnecessary interface churn, regardless of the backend’s internal ID format.
- Roles: `Employer`, `Artisan`, `Admin`. The UI presents Employer as “Client / Employer”.
- Request statuses: `Pending`, `Confirmed`, `Rejected`. The UI labels the first “Awaiting response” and the last “Declined”.
- Profile review statuses: `Unverified`, `Pending`, `Approved`, `Declined`.
- Report statuses: `Open`, `Dismissed`, `Restricted`, `Deleted`. `Deleted` is a soft removal in the demo.
- Preferred dates use `YYYY-MM-DD`; timestamps use ISO strings. The demo validates dates against the current UTC calendar day. Adopt a documented local scheduling/time-zone policy when real appointments exist.
- Mutations resolve only after a confirmed save. Failures reject with a human-readable `Error.message`; components display it without pretending success.
- `getSession()` and `getStorageWarning()` are synchronous snapshots. All domain operations return promises. Auth state changes must call `notify()` so subscribed consumers update.

### Minimum records consumed by the UI

```js
// Session, after sign-in/registration
{ token, role, user }

// User/profile
{
  _id, fullname, role, email, phoneNumber, bio,
  location: { lga },
  // Artisan fields:
  businessName, category, availability, verificationStatus,
  verificationReason, restricted, socialMediaLink, subscription,
  profilePic: { image_url },
  coverPhoto: { image_url, illustrative },
  portfolio: [{ _id, title, image_url, illustrative }],
  verificationId: {
    guarantorName, guarantorPhoneNumber, documentName,
    workCertificate: { image_url }
  }
}

// Request returned by listBookings(), including UI relationships
{
  _id, artisanId, employerId,
  serviceTitle, serviceDescription, location, phoneNumber,
  date, status, createdAt,
  artisan: { _id, fullname /* public profile fields */ },
  employer: { _id, fullname }
}

// Admin report list
{
  _id, artisanId, employerId, reason, status, createdAt,
  artisan: { _id, fullname, profilePic },
  employer: { fullname }
}

// Plan and contact result
{ _id, planName, amount, duration, description, features: [] }
{ reference }
```

Use the category/location values in `src/data/catalog.js` or map your backend’s taxonomy to them. Public discovery must return only approved, unrestricted profiles. The demo strips email, phone and verification details from public artisan responses; preserve that separation on the server.

## Operations and proposed HTTP routes

These routes are intentionally replaceable. The current template accepts either a direct JSON record/array or `{ data: recordOrArray }`. Login/registration `data` must contain `{ token, user }`; the adapter derives the role from `user.role`. Error responses should include `{ message }` and a non-success HTTP status.

| Operation                  | Input / result                                                                                                              | Proposed route                          |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `login`                    | `{ identifier, password }` → session                                                                                        | `POST /auth/login`                      |
| `register`                 | Role, name, contact, password, area and artisan fields → session; confirmation is checked in the form and omitted from HTTP | `POST /auth/register`                   |
| `logout`                   | Confirm server revocation, then clear the local session                                                                     | `POST /auth/logout`                     |
| `listArtisans`             | Public artisan array                                                                                                        | `GET /artisans`                         |
| `getArtisan`               | ID → public artisan                                                                                                         | `GET /artisans/:id`                     |
| `getProfile`               | Current private profile                                                                                                     | `GET /me`                               |
| `updateProfile`            | Name, bio, area, business/social/availability, optional image data → updated profile                                        | `PATCH /me`                             |
| `createBooking`            | Artisan ID plus title, details, date, address, phone → saved request                                                        | `POST /bookings`                        |
| `listBookings`             | Current role’s populated requests                                                                                           | `GET /bookings`                         |
| `respondToBooking`         | Request ID, `Confirmed` or `Rejected` → updated request                                                                     | `PATCH /bookings/:id`                   |
| `submitVerification`       | Guarantor fields, document name and image → updated profile                                                                 | `POST /me/verification`                 |
| `addWork`                  | Title and image → saved work record                                                                                         | `POST /me/portfolio`                    |
| `deleteWork`               | Work ID → resolved removal                                                                                                  | `DELETE /me/portfolio/:id`              |
| `createReport`             | Artisan ID, reason → report                                                                                                 | `POST /reports`                         |
| `listVerifications`        | Status → private artisan submissions                                                                                        | `GET /admin/verifications?status=...`   |
| `reviewVerification`       | User ID, approved/declined, reason → updated profile                                                                        | `PATCH /admin/verifications/:id`        |
| `listReports`              | Open populated reports                                                                                                      | `GET /admin/reports`                    |
| `resolveReport`            | Report ID, action → saved report                                                                                            | `PATCH /admin/reports/:id`              |
| `listPlans`                | Plan array                                                                                                                  | `GET /plans`                            |
| `sendContact`              | Name, email, message → reference                                                                                            | `POST /contact`                         |
| `requestPasswordReset`     | Email → `{ accepted: true }`, a non-enumerating acknowledgement                                                             | `POST /auth/password-reset`             |
| `choosePlan`               | Demo selection only; live template rejects                                                                                  | Needs future server checkout design     |
| `previewEmailVerification` | Demo flag only; live template rejects                                                                                       | Needs a server-issued verification flow |
| `resetDemo`                | Remove dedicated testing keys and restore seed                                                                              | Local testing adapter only              |

`listBookings` must enforce the signed-in actor’s ownership and populate the relationships the UI needs. Admin operations require server-side Admin authorization. Restriction/removal and repeated/stale review or booking responses must be handled atomically. Never trust the client role, visibility flag or IDs as authorization.

## Confirmation, session and error handling

The adapter validates required result shapes before an interaction shows success: login/register need a nonempty token and a user with `_id`, name and allowed role; profile saves must return the signed-in account; record mutations need `_id`; contact needs a reference; recovery needs `{ accepted: true }`. Deletion and logout accept HTTP 204 or `{ success: true }`. A successful HTTP status with an incompatible response is not presented as a completed user action. Align these requirements with the actual backend contract before connecting it.

Network loss, timeout, malformed mutation responses and server errors can leave a write's outcome uncertain. The interface says it could not confirm the result instead of asserting that nothing happened. Add idempotency/reconciliation on the backend for retryable writes, particularly account creation, requests and contact. A missing API URL, by contrast, means no request was made and no account/message was created by this action.

The provisional HTTP adapter stores only a bearer token in `artisanaid.api-session.v1`, not a user profile, role, password or test record. Startup displays a loading state and retrieves `/me` before establishing an authenticated session. Cached client roles are ignored; invalid/restricted users and failed revalidation clear the cached session. A 401 clears active state. Confirmed login can remain in memory if browser storage fails, with a warning that it will not survive reload.

This is not a complete production session policy. Bearer tokens in localStorage are exposed to same-origin script and XSS; choose the session transport, expiry, refresh, revocation, cookie/CSRF and cross-tab rules with your backend. Server permissions and record ownership remain authoritative. The frontend guards only shape navigation. Current-device versus all-device logout must be defined; the UI currently offers ordinary Sign out. Failed revocation is reported at the dashboard and does not claim successful server logout.

Public profile data and uploads need genuine backend/storage persistence. No public user account is stored by the frontend-only simulator. Dedicated testing keys, legacy demo records and unrelated site storage are never uploaded or migrated into a real account.

## Uploads and functionality that need further work

The current image helper reads small JPEG/PNG/WebP files as base64 data URLs. The HTTP template passes them as JSON to show the operation boundary. For durable storage, implement a real upload operation or signed upload flow in the service/helper layer and return `image_url` values. Validate size/type/content and document access on the server. Never store real identity documents in localStorage. PDF support needs an explicit document preview/upload path and is not currently claimed.

Payments need a real server-confirmed checkout and subscription lifecycle. The live plan button stays unavailable until that is implemented. Replace illustrative prices and features with actual rules; do not unlock paid functionality solely because the browser holds a plan ID.

Email verification and password reset need server-issued, expiring tokens and delivery. `ResetPassword.jsx` currently explains that those operations are unavailable; it does not accept a token as proof or claim a changed password. Implement those specific flows when your backend supports them. Real notifications, messaging, scheduling and moderation audit persistence likewise require backend work.

Search/filter is currently client-side over a small dataset. For larger datasets, implement paginated search in the adapter and extend the discovery resource to pass filters and paging. No speculative caching or pagination framework has been added.

## Practical integration sequence

1. Use the isolated local testing area while implementing an adapter against this contract.
2. Add server authorization and normalize login/profile, discovery and request responses first.
3. Connect file storage, verification and moderation with controlled document access.
4. Implement contact delivery, email/recovery and notification behavior only when their genuine services exist.
5. Add payment/subscription integration and update the explicit unavailable UI.
6. Run contract/journey tests plus genuine API integration and browser checks, configure the public base URL and rebuild.

Testing records are disposable examples and never migrate automatically. Public token confirmation and reset-password screens remain concise unavailable states until genuine token-consumption methods/forms are connected. Subscription checkout also remains unavailable; it cannot be enabled by configuring the base URL alone.
