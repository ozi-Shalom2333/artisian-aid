# Connecting a future backend

Demo mode is ready now. API mode is a **contract template**, not a working integration with the old unavailable server. No backend provider has been chosen. A service backed by your own API or a BaaS SDK can implement the same operations without replacing the page components.

## Boundary and mode selection

`src/services/index.js` selects one service object. `VITE_DATA_MODE=demo` is the default. `src/services/demo.js` implements the operations with fictional records and local storage. `src/services/http.js` provides a small fetch-based template with a configured base URL, 12-second timeout, normalized error messages and no fallback to successful demo results.

Do not point the template at the old server and assume compatibility. Confirm endpoint names, payloads, pagination, relationships, storage behavior and error envelopes, then map them to the domain shapes below.

```dotenv
VITE_DATA_MODE=api
VITE_API_BASE_URL=https://your-api.example.com/v1
```

Restart Vite after changing environment variables and rebuild before deployment. Only public configuration belongs in `VITE_*`; it is included in browser code. No credentials or privileged keys are required by demo mode.

For a future BaaS implementation, add an adapter that implements the same object and choose it here. Keep its SDK calls, row mappings and uploads inside the adapter/helper boundary. Pages should continue to call `services.*`, receive ordinary records and handle rejected promises.

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

| Operation | Input / result | Proposed route |
| --- | --- | --- |
| `login` | `{ identifier, password }` → session | `POST /auth/login` |
| `register` | Role, name, contact, password confirmation, area and artisan fields → session | `POST /auth/register` |
| `logout` | Clear local session; add server revocation if needed | Local template action |
| `listArtisans` | Public artisan array | `GET /artisans` |
| `getArtisan` | ID → public artisan | `GET /artisans/:id` |
| `getProfile` | Current private profile | `GET /me` |
| `updateProfile` | Name, bio, area, business/social/availability, optional image data → updated profile | `PATCH /me` |
| `createBooking` | Artisan ID plus title, details, date, address, phone → saved request | `POST /bookings` |
| `listBookings` | Current role’s populated requests | `GET /bookings` |
| `respondToBooking` | Request ID, `Confirmed` or `Rejected` → updated request | `PATCH /bookings/:id` |
| `submitVerification` | Guarantor fields, document name and image → updated profile | `POST /me/verification` |
| `addWork` | Title and image → saved work record | `POST /me/portfolio` |
| `deleteWork` | Work ID → resolved removal | `DELETE /me/portfolio/:id` |
| `createReport` | Artisan ID, reason → report | `POST /reports` |
| `listVerifications` | Status → private artisan submissions | `GET /admin/verifications?status=...` |
| `reviewVerification` | User ID, approved/declined, reason → updated profile | `PATCH /admin/verifications/:id` |
| `listReports` | Open populated reports | `GET /admin/reports` |
| `resolveReport` | Report ID, action → saved report | `PATCH /admin/reports/:id` |
| `listPlans` | Plan array | `GET /plans` |
| `sendContact` | Name, email, message → reference | `POST /contact` |
| `requestPasswordReset` | Email → non-enumerating acknowledgement | `POST /auth/password-reset` |
| `choosePlan` | Demo selection only; live template rejects | Needs future server checkout design |
| `previewEmailVerification` | Demo flag only; live template rejects | Needs a server-issued verification flow |
| `resetDemo` | Remove demo keys and restore seed | Demo adapter only |

`listBookings` must enforce the signed-in actor’s ownership and populate the relationships the UI needs. Admin operations require server-side Admin authorization. Restriction/removal and repeated/stale review or booking responses must be handled atomically. Never trust the client role, visibility flag or IDs as authorization.

## Authentication and session integration still required

The demo token is a label such as `demo:artisan-1`, not a credential. The HTTP template uses the separate `artisanaid.api-session.v1` key and attaches a bearer token. A 401 clears that template session. It has no refresh, revocation or secure session lifecycle implementation and should not be treated as production auth.

Choose and implement your session policy in the adapter. If you adopt cookies or asynchronous session restoration, add a small bootstrap/loading state around `useAuth` instead of teaching every screen a different authentication model. Registration and login need the same normalized user/session shape, and role enforcement belongs on the server.

## Uploads and functionality that need further work

The current image helper reads small JPEG/PNG/WebP files as base64 data URLs. The HTTP template passes them as JSON to show the operation boundary. For durable storage, implement a real upload operation or signed upload flow in the service/helper layer and return `image_url` values. Validate size/type/content and document access on the server. Never store real identity documents in localStorage. PDF support needs an explicit document preview/upload path and is not currently claimed.

Payments need a real server-confirmed checkout and subscription lifecycle. The live plan button stays unavailable until that is implemented. Replace illustrative prices and features with actual rules; do not unlock paid functionality solely because the browser holds a plan ID.

Email verification and password reset need server-issued, expiring tokens and delivery. `ResetPassword.jsx` currently explains that those operations are unavailable; it does not accept a token as proof or claim a changed password. Implement those specific flows when your backend supports them. Real notifications, messaging, scheduling and moderation audit persistence likewise require backend work.

Search/filter is currently client-side over a small dataset. For larger datasets, implement paginated search in the adapter and extend the discovery resource to pass filters and paging. No speculative caching or pagination framework has been added.

## Practical integration sequence

1. Keep demo mode while implementing and testing an adapter against this contract.
2. Add server authorization and normalize login/profile, discovery and request responses first.
3. Connect file storage, verification and moderation with controlled document access.
4. Implement contact delivery, email/recovery and notification behavior only when their genuine services exist.
5. Add payment/subscription integration and update the explicit unavailable UI.
6. Run the existing contract/journey tests plus real API integration and browser checks, then enable API mode and rebuild.

No local demo records are automatically uploaded or migrated to a future backend. Treat them as disposable examples. Keep demo disclosures while publishing a portfolio demonstration.
