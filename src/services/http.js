// Provider-neutral HTTP contract. No simulation or provider SDK is used here.
export const LIVE_SESSION_KEY = 'artisanaid.api-session.v1';
const roles = ['Employer', 'Artisan', 'Admin'];
const unconfirmed = () =>
  new Error('We could not confirm the result. Check your workspace before trying again.');
const record = (value) => {
  if (!value || typeof value._id !== 'string') throw unconfirmed();
  return value;
};
const userRecord = (value) => {
  record(value);
  if (
    !roles.includes(value.role) ||
    value.restricted ||
    typeof value.fullname !== 'string' ||
    !value.fullname.trim()
  )
    throw unconfirmed();
  return value;
};
const list = (value) => {
  if (!Array.isArray(value))
    throw new Error('This information is temporarily unavailable. Please try again.');
  return value.map(record);
};
export function createHttpService({ baseUrl, storage, notify = () => {}, fetcher = fetch }) {
  let current = null;
  let credential = null;
  let warning = '';
  if (baseUrl) {
    try {
      const cached = JSON.parse(storage?.getItem(LIVE_SESSION_KEY) || 'null');
      if (typeof cached?.token === 'string') credential = cached.token;
    } catch {
      /* Cached roles and users are never trusted. */
    }
  }
  const saveSession = (value) => {
    current = value;
    credential = value?.token || null;
    try {
      if (value) storage?.setItem(LIVE_SESSION_KEY, JSON.stringify({ token: value.token }));
      else storage?.removeItem(LIVE_SESSION_KEY);
      warning =
        value && !storage ? 'You are signed in for this visit. Sign in again after reloading.' : '';
    } catch {
      warning = 'Your session could not be remembered. Sign in again after reloading.';
    }
    notify();
    return value;
  };
  function unavailable(path) {
    if (path === '/auth/register')
      return 'Sign-up is unavailable right now. No account was created. Please try again later.';
    if (path === '/auth/login') return 'Sign-in is unavailable right now. Please try again later.';
    if (path === '/contact')
      return 'Your message was not sent. Please use the email link or try again later.';
    if (path === '/auth/password-reset')
      return 'Account recovery is unavailable right now. No reset email was sent.';
    if (path.startsWith('/artisans'))
      return 'Artisan profiles are temporarily unavailable. Please try again later.';
    return 'This service is temporarily unavailable. Please try again later.';
  }
  async function request(path, method = 'GET', body) {
    if (!baseUrl) throw new Error(unavailable(path));
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetcher(`${baseUrl.replace(/\/$/, '')}${path}`, {
        method,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(credential ? { Authorization: `Bearer ${credential}` } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
      if (response.status === 401) saveSession(null);
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        if (response.status >= 500 && method !== 'GET') throw unconfirmed();
        throw new Error(
          payload.message ||
            (response.status === 401
              ? 'Your session has ended. Please sign in again.'
              : 'This request could not be completed. Please try again.'),
        );
      }
      if (response.status === 204) return null;
      const payload = await response.json().catch(() => {
        throw unconfirmed();
      });
      return payload.data ?? payload;
    } catch (error) {
      if (error.name === 'AbortError' || error instanceof TypeError) {
        if (method !== 'GET') throw unconfirmed();
        throw new Error('The service is unavailable. Please try again later.');
      }
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }
  const authenticate = async (path, input) => {
    const value = await request(path, 'POST', input);
    if (typeof value?.token !== 'string' || !value.token) throw unconfirmed();
    const user = userRecord(value.user);
    if (
      path === '/auth/register' &&
      (!['Employer', 'Artisan'].includes(user.role) || user.role !== input.role)
    )
      throw unconfirmed();
    return saveSession({ token: value.token, role: user.role, user });
  };
  const acknowledgement = async (path, method) => {
    const value = await request(path, method);
    if (value !== null && value?.success !== true) throw unconfirmed();
  };
  return {
    async initialize() {
      if (!credential) return;
      try {
        const user = userRecord(await request('/me'));
        saveSession({ token: credential, role: user.role, user });
      } catch {
        saveSession(null);
      }
    },
    getSession: () => current,
    getStorageWarning: () => warning,
    login: (input) => authenticate('/auth/login', input),
    register: (input) => {
      const { confirmPassword: _confirm, ...account } = input;
      return authenticate('/auth/register', account);
    },
    logout: async () => {
      await acknowledgement('/auth/logout', 'POST');
      saveSession(null);
    },
    listCategories: async () => {
      if (!baseUrl) return [];
      try {
        const items = await request('/categories');
        return Array.isArray(items) ? items : [];
      } catch {
        return [];
      }
    },
    listLocations: async () => {
      if (!baseUrl) return [];
      try {
        const items = await request('/locations');
        return Array.isArray(items) ? items : [];
      } catch {
        return [];
      }
    },
    listTeam: async () => {
      if (!baseUrl) return [];
      try {
        const items = await request('/team');
        return Array.isArray(items) ? items : [];
      } catch {
        return [];
      }
    },
    listArtisans: async () => list(await request('/artisans')),
    getArtisan: async (id) => record(await request(`/artisans/${encodeURIComponent(id)}`)),
    getProfile: async () => userRecord(await request('/me')),
    updateProfile: async (input) => {
      const user = userRecord(await request('/me', 'PATCH', input));
      if (!current || user._id !== current.user._id || user.role !== current.role)
        throw unconfirmed();
      saveSession({ ...current, user });
      return user;
    },
    createBooking: async (id, input) =>
      record(await request('/bookings', 'POST', { ...input, artisanId: id })),
    listBookings: async () => list(await request('/bookings')),
    respondToBooking: async (id, status) => {
      const booking = record(
        await request(`/bookings/${encodeURIComponent(id)}`, 'PATCH', { status }),
      );
      if (booking._id !== id || booking.status !== status) throw unconfirmed();
      return booking;
    },
    submitVerification: async (input) => record(await request('/me/verification', 'POST', input)),
    addWork: async (input) => record(await request('/me/portfolio', 'POST', input)),
    deleteWork: (id) => acknowledgement(`/me/portfolio/${encodeURIComponent(id)}`, 'DELETE'),
    createReport: async (artisanId, reason) =>
      record(await request('/reports', 'POST', { artisanId, reason })),
    listVerifications: async (status) =>
      list(await request(`/admin/verifications?status=${encodeURIComponent(status)}`)),
    reviewVerification: async (id, status, reason) =>
      record(
        await request(`/admin/verifications/${encodeURIComponent(id)}`, 'PATCH', {
          status,
          reason,
        }),
      ),
    listReports: async () => list(await request('/admin/reports')),
    resolveReport: async (id, action) =>
      record(await request(`/admin/reports/${encodeURIComponent(id)}`, 'PATCH', { action })),
    listPlans: async () => list(await request('/plans')),
    choosePlan: async (planId) => {
      if (!baseUrl)
        throw new Error('Subscription checkout is currently unavailable. No payment was taken.');
      return record(await request('/me/subscription', 'POST', { planId }));
    },
    sendContact: async (input) => {
      const result = await request('/contact', 'POST', input);
      if (typeof result?.reference !== 'string' || !result.reference) throw unconfirmed();
      return result;
    },
    requestPasswordReset: async (email) => {
      const result = await request('/auth/password-reset', 'POST', { email });
      if (result?.accepted !== true)
        throw new Error('We could not confirm your recovery request. Please try again later.');
      return result;
    },
  };
}
