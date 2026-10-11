import test from 'node:test';
import assert from 'node:assert/strict';
import { createDemoService, DATA_KEY, SESSION_KEY } from '../src/services/demo.js';
import { categories } from '../src/data/catalog.js';
const storage = () => {
  const records = new Map();
  return {
    getItem: (key) => records.get(key) || null,
    setItem: (key, value) => records.set(key, value),
    removeItem: (key) => records.delete(key),
    records,
  };
};
const setup = () => {
  const db = storage();
  return { db, service: createDemoService({ storage: db, delay: 0 }) };
};
const login = (service, identifier) => service.login({ identifier, password: 'Demo123!' });
const date = () => {
  const value = new Date();
  value.setDate(value.getDate() + 4);
  return value.toISOString().slice(0, 10);
};
const input = () => ({
  serviceTitle: 'Bedroom shelving',
  serviceDescription: 'Fit two shelves and discuss the material options.',
  date: date(),
  location: 'A sample address in Lagos',
  phoneNumber: '08012345678',
});
const image =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jZQAAAABJRU5ErkJggg==';

test('public discovery excludes pending, declined, private fields and restricted profiles', async () => {
  const { service } = setup();
  const artisans = await service.listArtisans();
  assert.equal(artisans.length, 6);
  assert(artisans.every((u) => u.verificationStatus === 'Approved'));
  assert(!('verificationId' in artisans[0]));
  assert(!('email' in artisans[0]));
  assert(!('phoneNumber' in artisans[0]));
  await assert.rejects(service.getArtisan('artisan-7'), /not currently listed/);
  await assert.rejects(service.getArtisan('missing'), /could not be found/);
});

test('login validates credentials, role, phone login and logout clears only the session', async () => {
  const { service, db } = setup();
  await assert.rejects(
    service.login({ identifier: 'ade@artisanaid.ng', password: 'wrong' }),
    /demo password/,
  );
  assert.equal(
    (await service.login({ identifier: '08012345678', password: 'Demo123!' })).role,
    'Employer',
  );
  assert.equal(
    (await service.login({ identifier: '08012345671', password: 'Demo123!' })).role,
    'Artisan',
  );
  await service.updateProfile({
    fullname: 'Adewale Updated',
    businessName: 'Woodworks',
    bio: 'Test biography',
    lga: 'Ikeja',
    availability: true,
  });
  await service.logout();
  assert.equal(service.getSession(), null);
  assert.equal(db.getItem(SESSION_KEY), null);
  assert(db.getItem(DATA_KEY));
  assert.equal((await login(service, 'ade@artisanaid.ng')).user.fullname, 'Adewale Updated');
});

test('client → artisan → client booking journey persists across a new service instance', async () => {
  const { service, db } = setup();
  await login(service, 'chidinma@artisanaid.ng');
  const booking = await service.createBooking('artisan-1', input());
  assert.equal((await service.listBookings()).find((b) => b._id === booking._id).status, 'Pending');
  await service.logout();
  await login(service, 'ade@artisanaid.ng');
  assert.equal(
    (await service.listBookings()).find((b) => b._id === booking._id).employer.fullname,
    'Chidinma Okafor',
  );
  await service.respondToBooking(booking._id, 'Confirmed');
  await assert.rejects(service.respondToBooking(booking._id, 'Rejected'), /already been handled/);
  const reloaded = createDemoService({ storage: db, delay: 0 });
  await login(reloaded, 'chidinma@artisanaid.ng');
  assert.equal(
    (await reloaded.listBookings()).find((b) => b._id === booking._id).status,
    'Confirmed',
  );
});

test('declines persist and role/ownership guards reject unauthorized mutations', async () => {
  const { service } = setup();
  await assert.rejects(service.createBooking('artisan-1', input()), /session/);
  await login(service, 'chidinma@artisanaid.ng');
  await assert.rejects(service.respondToBooking('booking-1', 'Confirmed'), /role/);
  await assert.rejects(service.listVerifications(), /role/);
  await login(service, 'ade@artisanaid.ng');
  await service.respondToBooking('booking-1', 'Rejected');
  await assert.rejects(service.createBooking('artisan-2', input()), /role/);
  await login(service, 'artisan2@example.com');
  assert.equal((await service.listBookings()).length, 0);
  await assert.rejects(service.respondToBooking('booking-2', 'Confirmed'), /no longer available/);
});

test('booking validation catches past dates, short descriptions and invalid phones', async () => {
  const { service } = setup();
  await login(service, 'chidinma@artisanaid.ng');
  for (const changes of [
    { date: '2020-01-01' },
    { date: '2099-02-30' },
    { serviceDescription: 'x' },
    { phoneNumber: 'not a phone' },
  ])
    await assert.rejects(service.createBooking('artisan-1', { ...input(), ...changes }));
  assert.equal((await service.listBookings()).length, 2);
  await assert.rejects(service.createBooking('artisan-7', input()), /not accepting/);
});

test('registration → verification → decline → resubmit → approval makes a profile discoverable', async () => {
  const { service, db } = setup();
  const account = await service.register({
    role: 'Artisan',
    fullname: 'Sample Maker',
    email: 'new@example.com',
    phoneNumber: '08012345679',
    businessName: 'Sample Workshop',
    category: categories[0].name,
    password: 'Demo123!',
    confirmPassword: 'Demo123!',
    lga: 'Ikeja',
  });
  await service.previewEmailVerification();
  assert.equal((await service.getProfile()).emailVerified, true);
  assert(!(await service.listArtisans()).some((u) => u._id === account.user._id));
  await service.submitVerification({
    guarantorName: 'Sample Guarantor',
    guarantorPhoneNumber: '08000000000',
    documentName: 'sample.png',
    image_url: image,
  });
  await login(service, 'admin@artisanaid.ng');
  assert((await service.listVerifications()).some((u) => u._id === account.user._id));
  await assert.rejects(service.reviewVerification(account.user._id, 'Declined', ''), /reason/);
  await service.reviewVerification(
    account.user._id,
    'Declined',
    'Please use a clearer sample photo.',
  );
  await login(service, 'new@example.com');
  assert.equal(
    (await service.getProfile()).verificationReason,
    'Please use a clearer sample photo.',
  );
  await service.submitVerification({
    guarantorName: 'Sample Guarantor',
    guarantorPhoneNumber: '08000000000',
    documentName: 'sample.png',
    image_url: image,
  });
  await login(service, 'admin@artisanaid.ng');
  await service.reviewVerification(account.user._id, 'Approved');
  assert((await service.listArtisans()).some((u) => u._id === account.user._id));
  await assert.rejects(
    service.reviewVerification(account.user._id, 'Approved'),
    /already been handled/,
  );
  assert(!JSON.stringify(JSON.parse(db.getItem(DATA_KEY))).includes('Demo123!'));
});

test('profile edits, photos, gallery removal and capacity survive reload', async () => {
  const { service, db } = setup();
  await login(service, 'ade@artisanaid.ng');
  await service.updateProfile({
    fullname: 'Updated Maker',
    businessName: 'Updated Workshop',
    bio: 'A new profile introduction',
    lga: 'Yaba',
    socialMediaLink: 'https://example.com',
    availability: false,
    profilePic: image,
    coverPhoto: image,
  });
  assert.equal((await service.getArtisan('artisan-1')).location.lga, 'Yaba');
  for (let i = 0; i < 3; i++)
    await service.addWork({ title: `Sample project ${i}`, image_url: image });
  await assert.rejects(service.addWork({ title: 'A fifth photo', image_url: image }), /four/);
  await assert.rejects(
    service.addWork({ title: 'Invalid photo', image_url: 'data:text/html;base64,abc' }),
    /PNG/,
  );
  const reloaded = createDemoService({ storage: db, delay: 0 });
  assert.equal((await reloaded.getProfile()).portfolio.length, 4);
  const work = (await reloaded.getProfile()).portfolio[3];
  await reloaded.deleteWork(work._id);
  assert.equal((await reloaded.getProfile()).portfolio.length, 3);
  await login(reloaded, 'chidinma@artisanaid.ng');
  await assert.rejects(reloaded.createBooking('artisan-1', input()), /not accepting/);
});

test('report creation, moderation and restriction update discovery and session access', async () => {
  const { service } = setup();
  await login(service, 'chidinma@artisanaid.ng');
  const report = await service.createReport(
    'artisan-1',
    'A sample concern for the demo moderation queue.',
  );
  await login(service, 'admin@artisanaid.ng');
  assert((await service.listReports()).some((r) => r._id === report._id));
  await service.resolveReport(report._id, 'Restricted');
  assert(!(await service.listArtisans()).some((u) => u._id === 'artisan-1'));
  await assert.rejects(login(service, 'ade@artisanaid.ng'), /Check your demo/);
  assert(!(await service.listReports()).some((r) => r._id === report._id));
});

test('plan, contact, recovery and reset are locally simulated with no network', async () => {
  const { service, db } = setup();
  await login(service, 'ade@artisanaid.ng');
  await service.choosePlan('plan-premium');
  assert.equal((await service.getProfile()).subscription, 'plan-premium');
  const { reference } = await service.sendContact({
    fullname: 'Demo Visitor',
    email: 'visitor@example.com',
    message: 'A helpful sample message for the project.',
  });
  assert(reference.startsWith('message-'));
  assert.equal((await service.requestPasswordReset('visitor@example.com')).simulated, true);
  await service.resetDemo();
  assert.equal(service.getSession(), null);
  assert.equal(db.getItem(DATA_KEY), null);
  assert.equal((await service.listArtisans()).length, 6);
});

test('corrupt storage recovers and quota failures preserve previously saved records', async () => {
  const db = storage();
  db.setItem(DATA_KEY, 'not-json');
  const recovered = createDemoService({ storage: db, delay: 0 });
  assert.equal((await recovered.listArtisans()).length, 6);
  assert(recovered.getStorageWarning());
  const { service, db: records } = setup();
  await login(service, 'chidinma@artisanaid.ng');
  const first = await service.createBooking('artisan-1', input());
  const saved = records.getItem(DATA_KEY);
  const originalSet = records.setItem;
  records.setItem = (key, value) => {
    if (key === DATA_KEY) throw new Error('quota');
    originalSet(key, value);
  };
  await assert.rejects(
    service.createBooking('artisan-1', { ...input(), serviceTitle: 'Must not be saved' }),
    /could not save/,
  );
  assert.equal(records.getItem(DATA_KEY), saved);
  assert((await service.listBookings()).some((b) => b._id === first._id));
  assert(!(await service.listBookings()).some((b) => b.serviceTitle === 'Must not be saved'));
});

test('memory-only data warns clearly and a failed session write does not keep the previous active role', async () => {
  const memory = createDemoService({ delay: 0 });
  assert(memory.getStorageWarning().includes('lost on reload'));
  await login(memory, 'ade@artisanaid.ng');
  await memory.updateProfile({
    fullname: 'Memory Maker',
    businessName: 'Memory Workshop',
    lga: 'Ikeja',
    availability: true,
  });
  assert.equal((await memory.getProfile()).fullname, 'Memory Maker');
  const { service, db } = setup();
  await login(service, 'chidinma@artisanaid.ng');
  db.setItem = () => {
    throw new Error('storage denied');
  };
  await login(service, 'ade@artisanaid.ng');
  assert.equal(service.getSession().role, 'Artisan');
  assert(service.getStorageWarning().includes('previously saved'));
  db.removeItem = () => {
    throw new Error('storage denied');
  };
  await service.logout();
  assert.equal(service.getSession(), null);
});

test('registration rejects duplicate phone identities and malformed saved records recover', async () => {
  const { service, db } = setup();
  await assert.rejects(
    service.register({
      role: 'Employer',
      fullname: 'Another Person',
      email: 'another@example.com',
      phoneNumber: '08012345678',
      password: 'Demo123!',
      confirmPassword: 'Demo123!',
    }),
    /already registered/,
  );
  db.setItem(
    DATA_KEY,
    JSON.stringify({
      version: 2,
      users: [null],
      bookings: [],
      reports: [],
      plans: [],
      messages: [],
    }),
  );
  const recovered = createDemoService({ storage: db, delay: 0 });
  assert.equal((await recovered.listArtisans()).length, 6);
  assert(recovered.getStorageWarning().includes('fresh demo'));
});
