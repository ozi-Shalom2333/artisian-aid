// Provider-neutral HTTP adapter template. Adapt these routes to your backend
// contract before enabling API mode; no provider SDK or infrastructure is used.
const LIVE_SESSION_KEY = 'artisanaid.api-session.v1';
export function createHttpService({ baseUrl, storage, notify = () => {}, fetcher = fetch }) {
  const session = () => {
    try {
      return JSON.parse(storage.getItem(LIVE_SESSION_KEY) || 'null');
    } catch {
      return null;
    }
  };
  const saveSession = (value) => {
    if (value) storage.setItem(LIVE_SESSION_KEY, JSON.stringify(value));
    else storage.removeItem(LIVE_SESSION_KEY);
    notify();
    return value;
  };
  async function request(path, method = 'GET', body) {
    if (!baseUrl)
      throw new Error('API mode needs VITE_API_BASE_URL. Configure your backend adapter first.');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetcher(`${baseUrl.replace(/\/$/, '')}${path}`, {
        method,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(session()?.token ? { Authorization: `Bearer ${session().token}` } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
      const payload = await response.json().catch(() => ({}));
      if (response.status === 401) saveSession(null);
      if (!response.ok)
        throw new Error(
          payload.message || `Request failed (${response.status}). Please try again.`,
        );
      return payload.data ?? payload;
    } catch (error) {
      if (error.name === 'AbortError')
        throw new Error('The server took too long to respond. Please try again.');
      if (error instanceof TypeError)
        throw new Error('The server is unavailable. Your changes were not saved.');
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }
  return {
    getSession: session,
    getStorageWarning: () => '',
    login: async (input) => {
      const value = await request('/auth/login', 'POST', input);
      if (
        !value.token ||
        !value.user ||
        !['Employer', 'Artisan', 'Admin'].includes(value.user.role)
      )
        throw new Error('Login response does not match the service contract.');
      return saveSession({ token: value.token, role: value.user.role, user: value.user });
    },
    logout: async () => {
      saveSession(null);
    },
    register: async (input) => {
      const value = await request('/auth/register', 'POST', input);
      if (!value.token || !value.user)
        throw new Error('Registration response does not match the service contract.');
      return saveSession({ token: value.token, role: value.user.role, user: value.user });
    },
    listArtisans: () => request('/artisans'),
    getArtisan: (id) => request(`/artisans/${encodeURIComponent(id)}`),
    getProfile: () => request('/me'),
    updateProfile: async (input) => {
      const user = await request('/me', 'PATCH', input);
      saveSession({ ...session(), user });
      return user;
    },
    createBooking: (id, input) => request('/bookings', 'POST', { ...input, artisanId: id }),
    listBookings: () => request('/bookings'),
    respondToBooking: (id, status) =>
      request(`/bookings/${encodeURIComponent(id)}`, 'PATCH', { status }),
    submitVerification: (input) => request('/me/verification', 'POST', input),
    addWork: (input) => request('/me/portfolio', 'POST', input),
    deleteWork: (id) => request(`/me/portfolio/${encodeURIComponent(id)}`, 'DELETE'),
    createReport: (artisanId, reason) => request('/reports', 'POST', { artisanId, reason }),
    listVerifications: (status) =>
      request(`/admin/verifications?status=${encodeURIComponent(status)}`),
    reviewVerification: (id, status, reason) =>
      request(`/admin/verifications/${encodeURIComponent(id)}`, 'PATCH', { status, reason }),
    listReports: () => request('/admin/reports'),
    resolveReport: (id, action) =>
      request(`/admin/reports/${encodeURIComponent(id)}`, 'PATCH', { action }),
    listPlans: () => request('/plans'),
    choosePlan: () =>
      Promise.reject(
        new Error('Real subscription checkout needs a secure server and payment integration.'),
      ),
    sendContact: (input) => request('/contact', 'POST', input),
    previewEmailVerification: () =>
      Promise.reject(new Error('Email verification requires a server-issued link.')),
    requestPasswordReset: (email) => request('/auth/password-reset', 'POST', { email }),
  };
}
