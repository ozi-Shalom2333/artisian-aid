import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { JSDOM, VirtualConsole } from 'jsdom';
import { DATA_KEY } from '../src/services/demo.js';
const output = await build({
  entryPoints: ['src/main.jsx'],
  bundle: true,
  write: false,
  format: 'iife',
  jsx: 'automatic',
  define: { 'import.meta.env': JSON.stringify({ VITE_DATA_MODE: 'demo' }) },
  loader: { '.css': 'empty' },
  alias: { '@': './src' },
  logLevel: 'silent',
});
const code = output.outputFiles[0].text;
async function start(path = '/', { storageUnavailable = false } = {}) {
  const errors = [];
  const requests = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', (e) => errors.push(e.message));
  virtualConsole.on('error', (...args) => errors.push(args.join(' ')));
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
    url: `https://artisanaid.test${path}`,
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    virtualConsole,
  });
  const { window } = dom;
  if (storageUnavailable) {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage is unavailable');
      },
    });
  }
  window.structuredClone = structuredClone;
  window.Request = Request;
  window.Response = Response;
  window.Headers = Headers;
  window.AbortController = AbortController;
  window.AbortSignal = AbortSignal;
  window.TextEncoder = TextEncoder;
  window.TextDecoder = TextDecoder;
  window.scrollTo = () => {};
  window.matchMedia = () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
  });
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  window.Element.prototype.scrollIntoView = () => {};
  window.Element.prototype.getAnimations = () => [];
  window.PointerEvent = window.MouseEvent;
  window.fetch = async (...args) => {
    requests.push(args);
    throw new Error('Network is unavailable during the demo test');
  };
  window.eval(code);
  const document = window.document;
  const wait = async (predicate, message) => {
    for (let i = 0; i < 200; i++) {
      if (predicate()) return;
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    throw new Error(`${message}\n${document.body.textContent}`);
  };
  const text = () => document.body.textContent;
  const clickText = (label, selector = 'button,a') => {
    const element = [...document.querySelectorAll(selector)].find(
      (el) => el.textContent.trim() === label,
    );
    assert(element, `Missing ${selector}: ${label}`);
    element.click();
  };
  const field = (label) => {
    const element = [...document.querySelectorAll('label')].find(
      (el) => el.textContent.trim() === label,
    );
    assert(element, `Missing field: ${label}`);
    return document.getElementById(element.htmlFor);
  };
  const fill = (label, value) => {
    const input = field(label);
    const proto =
      input.tagName === 'TEXTAREA'
        ? window.HTMLTextAreaElement.prototype
        : window.HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(input, value);
    input.dispatchEvent(new window.Event('input', { bubbles: true }));
  };
  const submit = (form) =>
    form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  await wait(() => document.querySelector('h1, [role="alert"]'), 'Initial route did not render');
  return {
    dom,
    window,
    document,
    errors,
    requests,
    wait,
    text,
    clickText,
    field,
    fill,
    submit,
  };
}

test('DOM journey: public discovery → login return → review request → artisan response → client status', async () => {
  const app = await start('/userprofile/artisan-1');
  try {
    await app.wait(() => app.text().includes('Adewale Adeyemi'), 'Public profile did not load');
    app.document.querySelector('.profile-request .button').click();
    await app.wait(() => app.text().includes('Welcome back.'), 'Guest was not asked to sign in');
    app.clickText('Explore with a sample account', 'summary');
    const employerButton = [...app.document.querySelectorAll('.demo-role')].find((el) =>
      el.textContent.includes('Client / Employer'),
    );
    employerButton.click();
    await app.wait(
      () => app.document.querySelector('[role="dialog"]'),
      'Login did not return to the booking form',
    );
    const preferred = new Date();
    preferred.setDate(preferred.getDate() + 5);
    app.fill('Project title', 'A sample shelf project');
    app.fill(
      'Tell us what needs doing',
      'Fit a small set of shelves and discuss the material options.',
    );
    app.fill('Preferred date', preferred.toISOString().slice(0, 10));
    app.fill('Phone number', '08012345678');
    app.fill('Project address', 'Sample location in Ikeja, Lagos');
    app.submit(app.document.querySelector('[role="dialog"] form'));
    await app.wait(() => app.text().includes('Review your request'), 'Booking review did not open');
    const originalSave = app.window.Storage.prototype.setItem;
    app.window.Storage.prototype.setItem = function (key, value) {
      if (key === DATA_KEY) throw new Error('Quota exceeded');
      return originalSave.call(this, key, value);
    };
    app.clickText('Save demo request');
    await app.wait(
      () => app.text().includes('Your browser could not save this change'),
      'Failed save did not give feedback',
    );
    assert(!app.text().includes('Your demo request is saved'));
    app.window.Storage.prototype.setItem = originalSave;
    app.clickText('Save demo request');
    await app.wait(() => app.text().includes('Your demo request is saved'), 'Booking did not save');
    app.clickText('View my requests');
    await app.wait(
      () =>
        [...app.document.querySelectorAll('.booking-card')].some((el) =>
          el.textContent.includes('A sample shelf project'),
        ),
      'Client dashboard did not show the request',
    );
    assert(app.text().includes('Awaiting response'));
    // Role switching through the demo guide uses the same persisted record.
    app.clickText('Service information & reset');
    await app.wait(() => app.text().includes('Explore as an artisan'), 'Demo guide did not load');
    app.clickText('Explore as an artisan');
    await app.wait(
      () => app.text().includes('A sample shelf project'),
      'Artisan dashboard did not show the new request',
    );
    const booking = [...app.document.querySelectorAll('.booking-card')].find((el) =>
      el.textContent.includes('A sample shelf project'),
    );
    [...booking.querySelectorAll('button')]
      .find((el) => el.textContent === 'Confirm request')
      .click();
    await app.wait(
      () => app.text().includes('Demo request confirmed.'),
      'Artisan response did not save',
    );
    app.clickText('Service information & reset');
    await app.wait(() => app.text().includes('Explore as a client'), 'Guide did not reopen');
    app.clickText('Explore as a client');
    await app.wait(
      () => app.document.querySelectorAll('.booking-card').length > 0,
      'Client requests did not reload',
    );
    const confirmed = [...app.document.querySelectorAll('.booking-card')].find((el) =>
      el.textContent.includes('A sample shelf project'),
    );
    assert(confirmed.textContent.includes('Confirmed'));
    assert.equal(
      JSON.parse(app.window.localStorage.getItem(DATA_KEY)).bookings.find(
        (b) => b.serviceTitle === 'A sample shelf project',
      ).status,
      'Confirmed',
    );
    assert.equal(app.requests.length, 0);
    assert.deepEqual(app.errors, []);
  } finally {
    app.dom.window.close();
  }
});

test('DOM states: empty search, clear filters, category changes, invalid profile and recovery disclosure', async () => {
  const app = await start('/artisanpage');
  try {
    await app.wait(
      () => app.document.querySelectorAll('.artisan-card').length === 6,
      'Artisan discovery did not populate',
    );
    app.fill('Search artisans, skills or businesses', 'no-such-maker');
    await app.wait(() => app.text().includes('No matches just yet'), 'Empty state did not appear');
    app.clickText('Clear filters');
    await app.wait(
      () => app.document.querySelectorAll('.artisan-card').length === 6,
      'Clear filters did not restore results',
    );
    const service = app.document.getElementById('service-filter');
    service.value = 'Carpentry Services';
    service.dispatchEvent(new app.window.Event('change', { bubbles: true }));
    await app.wait(
      () => app.document.querySelectorAll('.artisan-card').length === 1,
      'Service filtering did not work',
    );
    app.clickText('Contact');
    await app.wait(() => app.text().includes('Every good connection'), 'Contact did not render');
    app.fill('Full name', 'Sample Visitor');
    app.fill('Email', 'sample@example.com');
    app.fill('Your message', 'A sample message from the frontend demo.');
    app.submit(app.document.querySelector('.contact-layout form'));
    await app.wait(
      () => app.text().includes('Your demo message is saved.'),
      'Contact success did not appear',
    );
    assert(app.text().includes('No email or support ticket was sent.'));
    app.clickText('Sign in');
    await app.wait(() => app.text().includes('Welcome back.'), 'Login did not render');
    app.clickText('Forgot password?');
    await app.wait(() => app.text().includes('Need a fresh start?'), 'Recovery did not render');
    app.fill('Account email', 'sample@example.com');
    app.submit(app.document.querySelector('.auth-form form'));
    await app.wait(
      () => app.text().includes('Recovery request previewed.'),
      'Recovery preview did not complete',
    );
    assert(app.text().includes('No recovery email was sent'));
    assert.equal(app.requests.length, 0);
    assert.deepEqual(app.errors, []);
  } finally {
    app.dom.window.close();
  }
  const missing = await start('/userprofile/not-a-profile');
  try {
    await missing.wait(
      () => missing.text().includes('This profile is unavailable'),
      'Profile error state did not render',
    );
    assert(missing.text().includes('Explore other artisans'));
    assert.deepEqual(missing.errors, []);
  } finally {
    missing.dom.window.close();
  }
});

test('DOM role guards send unsigned users to login and employers away from the admin route', async () => {
  const app = await start('/admindashboard');
  try {
    assert(app.text().includes('Welcome back.'));
    app.clickText('Explore with a sample account', 'summary');
    const button = [...app.document.querySelectorAll('.demo-role')].find((el) =>
      el.textContent.includes('Client / Employer'),
    );
    button.click();
    await app.wait(
      () => app.text().includes('A little less on your to-do list.'),
      'Role guard did not route to the client workspace',
    );
    assert(!app.text().includes('Pending profiles'));
    assert.equal(app.requests.length, 0);
    assert.deepEqual(app.errors, []);
  } finally {
    app.dom.window.close();
  }
});

test('DOM admin journey: review sample document → decline reason → artisan sees feedback', async () => {
  const app = await start('/login');
  try {
    app.clickText('Explore with a sample account', 'summary');
    [...app.document.querySelectorAll('.demo-role')]
      .find((el) => el.textContent.includes('Administrator') || el.textContent.includes('Admin'))
      .click();
    await app.wait(() => app.document.querySelector('.admin-row'), 'Pending queue did not load');
    assert(app.text().includes('Ibrahim Sule'));
    app.clickText('Review details');
    await app.wait(
      () => app.document.querySelector('[role="dialog"]'),
      'Admin review did not open',
    );
    assert(app.text().includes('sample-certificate.svg'));
    app.clickText('Decline with a reason');
    await app.wait(
      () => app.document.querySelector('[role="dialog"] textarea'),
      'Decline reason field did not render',
    );
    app.fill('Reason for declining', 'Please send a clearer sample photo for this demo.');
    app.submit(app.document.querySelector('[role="dialog"] form'));
    await app.wait(
      () => app.text().includes('The queue is clear'),
      'Declined record did not leave the pending queue',
    );
    app.clickText('Sign out');
    await app.wait(() => app.text().includes('Welcome back.'), 'Admin did not sign out');
    app.fill('Email or phone number', 'artisan7@example.com');
    app.fill('Password', 'Demo123!');
    app.submit(app.document.querySelector('.auth-form form'));
    await app.wait(() => app.document.querySelector('.dash-sidebar'), 'Artisan did not sign in');
    app.clickText('Profile verification');
    await app.wait(
      () => app.text().includes('Please send a clearer sample photo for this demo.'),
      'Artisan did not receive the decline reason',
    );
    assert(app.document.querySelector('#verification-file'));
    assert.equal(app.requests.length, 0);
    assert.deepEqual(app.errors, []);
  } finally {
    app.dom.window.close();
  }
});

test('DOM media journey: upload gallery image and profile photo, then inspect the public profile', async () => {
  const app = await start('/login');
  try {
    app.clickText('Explore with a sample account', 'summary');
    [...app.document.querySelectorAll('.demo-role')]
      .find((el) => el.textContent.includes('Manage your craft'))
      .click();
    await app.wait(
      () => app.document.querySelector('.dash-sidebar'),
      'Artisan workspace did not load',
    );
    app.clickText('Work gallery');
    await app.wait(() => app.document.querySelector('#work-photo'), 'Gallery form did not load');
    const bytes = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jZQAAAABJRU5ErkJggg==',
      'base64',
    );
    const file = new app.window.File([bytes], 'sample.png', {
      type: 'image/png',
    });
    const choose = (input) => {
      Object.defineProperty(input, 'files', {
        configurable: true,
        value: [file],
      });
      input.dispatchEvent(new app.window.Event('change', { bubbles: true }));
    };
    choose(app.document.querySelector('#work-photo'));
    await app.wait(
      () => app.document.querySelector('.upload-preview'),
      'Gallery preview did not appear',
    );
    app.fill('Project or photo title', 'A sample work photo');
    app.submit(app.document.querySelector('.panel form'));
    await app.wait(
      () => app.document.querySelectorAll('.gallery-item').length === 2,
      'Gallery upload did not save',
    );
    assert(app.text().includes('Photo added to your local demo gallery.'));
    app.clickText('Personal profile');
    await app.wait(
      () => app.document.querySelector('#photo-profilePic'),
      'Profile editor did not load',
    );
    app.fill('Full name', 'Adewale Sample Update');
    choose(app.document.querySelector('#photo-profilePic'));
    await app.wait(
      () =>
        app.document
          .querySelector('#photo-profilePic')
          .parentElement.querySelector('.upload-preview-small')
          ?.src.startsWith('data:image/png'),
      'Profile photo preview did not appear',
    );
    app.submit(app.document.querySelector('.panel form'));
    await app.wait(
      () => app.text().includes('Your demo profile is saved in this browser.'),
      'Profile save did not complete',
    );
    assert(app.document.querySelector('.dash-user img').src.startsWith('data:image/png'));
    assert(!app.text().includes('Remove selected photo'));
    app.clickText('View public profile ↗');
    await app.wait(
      () =>
        app.document.querySelector('.profile-identity h1')?.textContent === 'Adewale Sample Update',
      'Public profile did not show saved details',
    );
    assert(app.document.querySelector('.profile-identity img').src.startsWith('data:image/png'));
    assert(app.text().includes('A sample work photo'));
    assert.equal(app.requests.length, 0);
    assert.deepEqual(app.errors, []);
  } finally {
    app.dom.window.close();
  }
});

test('DOM product identity: normal discovery, original team credits and service information remain reachable', async () => {
  const app = await start('/');
  try {
    await app.wait(
      () => app.document.querySelectorAll('.artisan-card').length === 3,
      'Featured profiles did not load',
    );
    assert(!app.text().includes('Portfolio demo'));
    assert(!app.text().includes('Explore the demo'));
    assert(!app.text().includes('Try the demo'));
    assert(!app.document.querySelector('.demo-banner'));
    assert(
      app.text().includes('Sample profiles are shown while live service access is unavailable.'),
    );
    app.clickText('Team & contributors');
    await app.wait(
      () => app.document.querySelectorAll('.team-card').length === 8,
      'Team credits did not render',
    );
    // The expected credits are copied from the supplied original MeetTeam.jsx, not the new data module.
    const originalCredits = [
      ['Prince Jehoshaphat', 'Team Lead / Product Designer'],
      ['Ernest Shaibu', 'Back-end Developer'],
      ['Victoria Trust', 'Front-end Developer'],
      ['Ozioma Okafor', 'Front-end Dev / UI Engineer'],
      ['Yusuf Olamilekan', 'Back-end Developer'],
      ['Ikechukwu Joshua', 'Front-end Developer'],
      ['Gerald Elibe', 'Front-end Developer'],
      ['Christopher Ichigou', 'Back-end Developer'],
    ];
    assert.deepEqual(
      [...app.document.querySelectorAll('.team-card')].map((card) => [
        card.querySelector('h2').textContent,
        card.querySelector('p').textContent,
      ]),
      originalCredits,
    );
    assert.equal(
      app.document.querySelector('img[alt="Victoria Trust"]').getAttribute('src'),
      '/media/victoria.webp',
    );
    assert(app.text().includes('Artisan Aid is a shared effort'));
    app.clickText('Our story');
    await app.wait(
      () => app.document.querySelector('.story-team-link'),
      'Story team acknowledgment did not render',
    );
    assert(app.text().includes('a collaborative team'));
    assert(!app.text().includes('portfolio version'));
    app.clickText('Meet all 8 contributors');
    await app.wait(
      () => app.document.querySelectorAll('.team-card').length === 8,
      'Story link did not return to the full team',
    );
    app.clickText('Service information');
    await app.wait(
      () => app.text().includes('Live services currently unavailable'),
      'Service information did not load',
    );
    assert(app.text().includes('Demo authentication is not secure.'));
    assert(app.text().includes('Nothing has been sent outside this browser.'));
    assert.equal(app.requests.length, 0);
    assert.deepEqual(app.errors, []);
  } finally {
    app.dom.window.close();
  }
});

test('DOM sign-in disclosure and storage warning survive removal of the global demo banner', async () => {
  const app = await start('/login', { storageUnavailable: true });
  try {
    assert(app.text().includes('Live sign-in is unavailable.'));
    const choices = app.document.querySelector('details.demo-login');
    assert(!choices.open, 'Sample shortcuts should start collapsed');
    const warning = app.document.querySelector('.storage-warning[role="status"]');
    assert(warning?.textContent.includes('will be lost on reload'));
    app.clickText('Explore with a sample account', 'summary');
    assert(choices.open, 'Sample shortcuts did not open');
    [...choices.querySelectorAll('button')]
      .find((el) => el.textContent.includes('Client / Employer'))
      .click();
    await app.wait(
      () => app.document.querySelector('.dash-sidebar'),
      'Sample account did not open the workspace',
    );
    assert(app.document.querySelector('.storage-warning[role="status"]'));
    assert.equal(app.requests.length, 0);
    assert.deepEqual(app.errors, []);
  } finally {
    app.dom.window.close();
  }
});
