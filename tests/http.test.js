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
  await assert.rejects(service.listArtisans(), /service is unavailable/);
  await assert.rejects(service.choosePlan('plan-basic'), /could not confirm/);
});
test('API adapter requires configuration and rejects incompatible login responses', async () => {
  const missing = createHttpService({
    storage: storage(),
    fetcher: async () => {
      throw new Error('should not fetch');
    },
  });
  await assert.rejects(missing.listArtisans(), /profiles are temporarily unavailable/);
  const incompatible = createHttpService({
    baseUrl: 'https://example.com',
    storage: storage(),
    fetcher: async () => new Response(JSON.stringify({ data: { success: true } }), { status: 200 }),
  });
  await assert.rejects(
    incompatible.login({ identifier: 'sample@example.com', password: 'secret' }),
    /could not confirm/,
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
              data: {
                token: 'api-test-token',
                user: { _id: 'u1', role: 'Employer', fullname: 'Client User' },
              },
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

test('Invalid mutation responses and lost responses never manufacture successful changes', async () => {
  const incompatible = createHttpService({
    baseUrl: 'https://example.com',
    storage: storage(),
    fetcher: async () => new Response(JSON.stringify({ data: { unknown: true } })),
  });
  await assert.rejects(incompatible.register({ role: 'Employer' }), /could not confirm/);
  assert.equal(incompatible.getSession(), null);
  await assert.rejects(incompatible.sendContact({}), /could not confirm/);
  await assert.rejects(incompatible.createBooking('a1', {}), /could not confirm/);
  await assert.rejects(incompatible.deleteWork('photo1'), /could not confirm/);
  await assert.rejects(
    incompatible.requestPasswordReset('someone@example.test'),
    /could not confirm/,
  );
  const lost = createHttpService({
    baseUrl: 'https://example.com',
    storage: storage(),
    fetcher: async () => {
      throw new TypeError('Connection lost after a possible write');
    },
  });
  await assert.rejects(
    lost.register({ role: 'Employer' }),
    /Check your workspace before trying again/,
  );
});

test('HTTP sessions restore only after server validation and retain confirmed login in memory if storage is blocked', async () => {
  const db = storage();
  db.setItem(
    'artisanaid.api-session.v1',
    JSON.stringify({ token: 'remembered', role: 'Admin', user: { _id: 'forged', role: 'Admin' } }),
  );
  const user = { _id: 'server-user', role: 'Employer', fullname: 'Server Client' };
  const service = createHttpService({
    baseUrl: 'https://example.com',
    storage: db,
    fetcher: async () => new Response(JSON.stringify({ data: user })),
  });
  assert.equal(service.getSession(), null);
  await service.initialize();
  assert.equal(service.getSession().role, 'Employer');
  assert.equal(service.getSession().user._id, 'server-user');
  const blocked = createHttpService({
    baseUrl: 'https://example.com',
    fetcher: async () => new Response(JSON.stringify({ data: { token: 'confirmed', user } })),
  });
  await blocked.login({ identifier: 'someone@example.test', password: 'test' });
  assert.equal(blocked.getSession().token, 'confirmed');
  assert(blocked.getStorageWarning().includes('for this visit'));
});
