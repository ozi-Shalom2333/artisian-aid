import test from 'node:test';
import assert from 'node:assert/strict';
import { createHttpService } from '../src/services/http.js';
const storage = () => {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) || null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
};
test('API adapter never falls back to demo data when the backend is unavailable', async () => {
  const service = createHttpService({
    baseUrl: 'https://example.com',
    storage: storage(),
    fetcher: async () => {
      throw new TypeError('Failed to fetch');
    },
  });
  await assert.rejects(service.listArtisans(), /server is unavailable/);
  await assert.rejects(service.choosePlan('plan-basic'), /secure server/);
});
test('API adapter requires configuration and rejects incompatible login responses', async () => {
  const missing = createHttpService({
    storage: storage(),
    fetcher: async () => {
      throw new Error('should not fetch');
    },
  });
  await assert.rejects(missing.listArtisans(), /VITE_API_BASE_URL/);
  const incompatible = createHttpService({
    baseUrl: 'https://example.com',
    storage: storage(),
    fetcher: async () => new Response(JSON.stringify({ data: { success: true } }), { status: 200 }),
  });
  await assert.rejects(
    incompatible.login({ identifier: 'sample@example.com', password: 'secret' }),
    /service contract/,
  );
});
test('API adapter uses the configured URL, attaches session token and clears on 401', async () => {
  let path, headers;
  const service = createHttpService({
    baseUrl: 'https://example.com/v1/',
    storage: storage(),
    fetcher: async (url, options) => {
      path = url;
      headers = options.headers;
      return url.endsWith('/auth/login')
        ? new Response(
            JSON.stringify({
              data: { token: 'api-test-token', user: { _id: 'u1', role: 'Employer' } },
            }),
          )
        : new Response(JSON.stringify({ message: 'Sign in again' }), { status: 401 });
    },
  });
  await service.login({ identifier: 'sample@example.com', password: 'password' });
  await assert.rejects(service.listBookings(), /Sign in again/);
  assert.equal(path, 'https://example.com/v1/bookings');
  assert.equal(headers.Authorization, 'Bearer api-test-token');
  assert.equal(service.getSession(), null);
});
