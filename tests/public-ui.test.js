import test from 'node:test';
import assert from 'node:assert/strict';
import { browserApp } from './helpers/browser.js';
const { start, code } = await browserApp();
const apiApp = await browserApp({ apiUrl: 'https://api.example.test/v1' });
const reply = (data, status = 200) => new Response(JSON.stringify({ data }), { status });
const publicKey = 'artisanaid.api-session.v1';

test('Public build has no test credentials or seed data; public navigation renders clean empty states', async () => {
  for (const marker of [
    'Demo123!',
    'chidinma@artisanaid.ng',
    'Adewale Adeyemi',
    'sample-certificate.svg',
    'artisanaid.testing.data.v1',
  ]) {
    assert(!code.includes(marker), `Production entry contains ${marker}`);
  }
  const app = await start('/');
  try {
    await app.wait(
      () => app.text().includes('Profiles are temporarily unavailable'),
      'Unavailable discovery did not settle',
    );
    assert(
      !/portfolio demo|developer testing|sample profiles|mock data|VITE_|backend|service information/i.test(
        app.text(),
      ),
    );
    assert.equal(app.document.querySelectorAll('.artisan-card').length, 0);
    assert(!app.document.querySelector('a[href*="__testing"],a[href="/demo"]'));
    app.clickText('Team & contributors');
    await app.wait(
      () => app.text().includes('No team members listed yet'),
      'Team empty state did not load',
    );
    assert.equal(app.requests.length, 0);
    assert.deepEqual(app.errors, []);
  } finally {
    app.dom.window.close();
  }
});

test('Public account, contact and recovery actions report unavailability without creating local records or success', async () => {
  for (const path of ['/signup', '/employersignup', '/login', '/contact', '/forget']) {
    const app = await start(path, {
      stored: {
        'artisanaid.demo.v2': 'legacy-test-record',
        'artisanaid.testing.data.v1': 'test-record',
      },
    });
    try {
      assert(!app.document.querySelector('.demo-login, .demo-role, .testing-toolbar'));
      const form = app.document.querySelector('form');
      app.submit(form);
      await app.wait(
        () => app.document.querySelector('.form-error'),
        `${path} did not report unavailable service`,
      );
      assert(!app.document.querySelector('.success-note, .success-panel, .dash-sidebar'));
      assert(!/VITE_|backend|service contract|frontend demo/i.test(app.text()));
      assert.equal(app.window.localStorage.getItem(publicKey), null);
      assert.equal(app.window.localStorage.getItem('artisanaid.demo.v2'), 'legacy-test-record');
      assert.equal(app.window.localStorage.getItem('artisanaid.testing.data.v1'), 'test-record');
      assert.equal(app.requests.length, 0);
      if (path.includes('signup')) assert(app.text().includes('No account was created'));
      if (path === '/forget') assert(app.text().includes('No reset email was sent'));
      assert.deepEqual(app.errors, []);
    } finally {
      app.dom.window.close();
    }
  }
});

test('Production excludes developer routes, unsigned dashboards stay guarded, token screens never claim success', async () => {
  for (const path of [
    '/__testing',
    '/__testing/login',
    '/demo',
    '/admindashboard',
    '/verifyemail/unknown',
    '/resetpassword/unknown',
  ]) {
    const app = await start(path, {
      stored: {
        'artisanaid.testing.session.v1': JSON.stringify({
          role: 'Admin',
          user: { _id: 'admin-1' },
        }),
      },
    });
    try {
      assert(!app.document.querySelector('.testing-toolbar, .dash-sidebar, .demo-role'));
      assert(!app.text().includes('Your demo account is ready'));
      if (path === '/admindashboard') assert(app.text().includes('Welcome back.'));
      else if (path.startsWith('/verifyemail'))
        assert(app.text().includes('Your email status has not changed'));
      else if (path.startsWith('/resetpassword'))
        assert(app.text().includes('Your password has not changed'));
      else assert(app.text().includes('That page isn’t available.'));
      assert.deepEqual(app.errors, []);
    } finally {
      app.dom.window.close();
    }
  }
});

test('Public API contract journey: signup, server profile save, logout and login; rejected changes never show success', async () => {
  let profile = {
    _id: 'public-user-1',
    role: 'Employer',
    fullname: 'Public Client',
    email: 'client@example.test',
    location: { lga: 'Ikeja' },
    bio: '',
  };
  let rejectSave = false;
  const app = await apiApp.start('/employersignup', {
    fetcher: async (url, options) => {
      const input = options.body ? JSON.parse(options.body) : {};
      if (url.endsWith('/auth/register')) {
        assert.equal(input.role, 'Employer');
        assert(!('confirmPassword' in input));
        return reply({ token: 'server-test-token', user: profile });
      }
      if (url.endsWith('/auth/login')) return reply({ token: 'server-test-token', user: profile });
      if (url.endsWith('/auth/logout')) return new Response(null, { status: 204 });
      assert.equal(options.headers.Authorization, 'Bearer server-test-token');
      if (url.endsWith('/me') && options.method === 'PATCH') {
        if (rejectSave)
          return new Response(JSON.stringify({ message: 'Please review your name.' }), {
            status: 422,
          });
        profile = {
          ...profile,
          fullname: input.fullname,
          bio: input.bio,
          location: { lga: input.lga },
        };
        return reply(profile);
      }
      if (url.endsWith('/me')) return reply(profile);
      if (url.endsWith('/bookings')) return reply([]);
      if (url.endsWith('/categories')) return reply([]);
      if (url.endsWith('/locations')) return reply(['Ikeja', 'Lekki']);
      throw new Error(`Unexpected request ${url}`);
    },
  });
  try {
    app.fill('Full name', profile.fullname);
    app.fill('Email', profile.email);
    app.fill('Phone number', '08012345678');
    app.fill('Password', 'test-secret-123');
    app.fill('Confirm password', 'test-secret-123');
    app.submit(app.document.querySelector('form'));
    await app.wait(
      () => app.document.querySelector('.dash-sidebar'),
      'API signup did not open dashboard',
    );
    app.clickText('Personal profile');
    await app.wait(() => app.document.querySelector('#profile-area'), 'Profile did not load');
    app.fill('Full name', 'Updated Public Client');
    app.submit(app.document.querySelector('.panel form'));
    await app.wait(
      () => app.text().includes('Your profile is saved.'),
      'Confirmed profile did not show success',
    );
    assert.equal(profile.fullname, 'Updated Public Client');
    assert(app.document.querySelector('.dash-user').textContent.includes('Updated Public Client'));
    assert.deepEqual(JSON.parse(app.window.localStorage.getItem(publicKey)), {
      token: 'server-test-token',
    });
    assert.equal(app.window.localStorage.getItem('artisanaid.testing.data.v1'), null);
    rejectSave = true;
    app.fill('Full name', 'Rejected Public Change');
    app.submit(app.document.querySelector('.panel form'));
    await app.wait(
      () => app.text().includes('Please review your name.'),
      'Rejected edit did not report error',
    );
    assert(!app.text().includes('Your profile is saved.'));
    assert.equal(profile.fullname, 'Updated Public Client');
    app.clickText('Sign out');
    await app.wait(() => app.text().includes('Welcome back.'), 'Logout did not finish');
    assert.equal(app.window.localStorage.getItem(publicKey), null);
    assert(app.requests.some(([url]) => url.endsWith('/auth/logout')));
    app.fill('Email or phone number', profile.email);
    app.fill('Password', 'test-secret-123');
    app.submit(app.document.querySelector('form'));
    await app.wait(
      () => app.document.querySelector('.dash-sidebar'),
      'API login did not open workspace',
    );
    assert.deepEqual(app.errors, []);
  } finally {
    app.dom.window.close();
  }
});

test('A stored role cannot bypass public session validation when the API is offline', async () => {
  const app = await apiApp.start('/admindashboard', {
    stored: {
      [publicKey]: JSON.stringify({
        token: 'stale',
        role: 'Admin',
        user: { _id: 'forged-admin', role: 'Admin' },
      }),
    },
  });
  try {
    assert(app.text().includes('Welcome back.'));
    assert(!app.document.querySelector('.dash-sidebar'));
    assert.equal(app.window.localStorage.getItem(publicKey), null);
    assert.equal(app.requests[0][0], 'https://api.example.test/v1/me');
    assert.deepEqual(app.errors, []);
  } finally {
    app.dom.window.close();
  }
});
