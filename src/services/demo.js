import { createSeed } from '../data/seed.js';
import { categories, DEMO_PASSWORD } from '../data/catalog.js';

export const DATA_KEY = 'artisanaid.demo.v2';
export const SESSION_KEY = 'artisanaid.demo-session.v2';
export const CHANGE_EVENT = 'artisanaid:change';
const clone = (data) => structuredClone(data);
const required = (value, name, min = 1) => {
  if (typeof value !== 'string' || value.trim().length < min)
    throw new Error(`${name} is required${min > 1 ? ` (at least ${min} characters)` : ''}.`);
  return value.trim();
};
const phone = (value) => {
  if (!/^(?:\+234|0)[789][01]\d{8}$/.test(value))
    throw new Error('Enter a valid Nigerian phone number.');
  return value;
};
const email = (value) => {
  const normalized = required(value, 'Email').toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized))
    throw new Error('Enter a valid email address.');
  return normalized;
};
const id = (prefix) => `${prefix}-${globalThis.crypto.randomUUID()}`;
// Reject structurally broken saved data before a page tries to render it.
const isSavedDemo = (data) => {
  if (
    data?.version !== 2 ||
    !['users', 'bookings', 'reports', 'messages', 'plans'].every((key) => Array.isArray(data[key]))
  )
    return false;
  const usersValid = data.users.every(
    (user) =>
      user &&
      typeof user._id === 'string' &&
      typeof user.fullname === 'string' &&
      typeof user.email === 'string' &&
      ['Artisan', 'Employer', 'Admin'].includes(user.role) &&
      (user.role !== 'Artisan' || Array.isArray(user.portfolio)),
  );
  const ids = new Set(data.users.map((user) => user?._id));
  return (
    usersValid &&
    ids.size === data.users.length &&
    data.bookings.every(
      (booking) =>
        booking &&
        ids.has(booking.artisanId) &&
        ids.has(booking.employerId) &&
        typeof booking.serviceTitle === 'string' &&
        ['Pending', 'Confirmed', 'Rejected'].includes(booking.status),
    ) &&
    data.reports.every(
      (report) => report && ids.has(report.artisanId) && ids.has(report.employerId),
    ) &&
    data.plans.every((plan) => plan && Number.isFinite(plan.amount) && Array.isArray(plan.features))
  );
};

/** Provider-neutral async operations. Storage and latency are injectable for tests. */
export function createDemoService({ storage, delay = 300, notify = () => {} } = {}) {
  let state;
  let memorySession = null;
  let sessionInMemory = !storage;
  let storageWarning = storage
    ? ''
    : 'Browser storage is unavailable. Changes and your demo session will be lost on reload.';
  try {
    const saved = storage?.getItem(DATA_KEY);
    const parsed = saved ? JSON.parse(saved) : null;
    if (isSavedDemo(parsed)) state = parsed;
    else {
      state = createSeed();
      if (saved) storageWarning = 'Saved demo data could not be read. A fresh demo is in use.';
    }
  } catch {
    state = createSeed();
    storageWarning =
      'Browser storage is unavailable or unreadable. This demo can run in memory; changes may be lost on reload.';
  }
  const pause = async () => {
    if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
  };
  const session = () => {
    if (sessionInMemory) return memorySession;
    try {
      const value = storage?.getItem(SESSION_KEY);
      return value ? JSON.parse(value) : memorySession;
    } catch {
      return memorySession;
    }
  };
  const setSession = (user) => {
    const value = user ? { token: `demo:${user._id}`, role: user.role, user } : null;
    try {
      if (value) storage?.setItem(SESSION_KEY, JSON.stringify(value));
      else storage?.removeItem(SESSION_KEY);
      sessionInMemory = !storage;
    } catch {
      sessionInMemory = true;
      storageWarning =
        'Session changes are only held in memory. A reload may restore the previously saved demo session.';
    }
    memorySession = value;
    notify();
    return clone(value);
  };
  const actor = (roles) => {
    const current = session();
    const user = state.users.find((u) => u._id === current?.user?._id && u.role === current?.role);
    if (!user || user.restricted)
      throw new Error('Your demo session has ended. Please sign in again.');
    if (roles && !roles.includes(user.role))
      throw new Error('This action is not available for your account role.');
    return user;
  };
  const write = (change) => {
    const next = clone(state);
    const result = change(next);
    try {
      storage?.setItem(DATA_KEY, JSON.stringify(next));
    } catch {
      throw new Error(
        'Your browser could not save this change. Free some storage or reset the demo, then try again.',
      );
    }
    state = next;
    notify();
    return clone(result);
  };
  const find = (userId) => {
    const user = state.users.find((u) => u._id === userId);
    if (!user) throw new Error('This profile could not be found.');
    return user;
  };
  const publicArtisan = (u) => {
    const { verificationId: _verification, email: _email, phoneNumber: _phone, ...safe } = u;
    return safe;
  };
  const service = {
    getSession: () => {
      const current = session();
      if (!current) return null;
      const user = state.users.find(
        (u) => u._id === current.user?._id && u.role === current.role && !u.restricted,
      );
      return user ? { ...current, user: clone(user) } : null;
    },
    getStorageWarning: () => storageWarning,
    async login({ identifier, password }) {
      await pause();
      const value = required(identifier, 'Email or phone').toLowerCase();
      const user = state.users.find(
        (u) => u.email.toLowerCase() === value || u.phoneNumber === value,
      );
      if (!user || password !== DEMO_PASSWORD || user.restricted)
        throw new Error('Check your demo email or phone. The demo password is Demo123!.');
      return setSession(user);
    },
    async logout() {
      setSession(null);
    },
    async register(input) {
      await pause();
      if (!['Artisan', 'Employer'].includes(input.role))
        throw new Error('Choose an artisan or employer account.');
      const normalizedEmail = email(input.email);
      if (state.users.some((u) => u.email.toLowerCase() === normalizedEmail))
        throw new Error('This demo email is already registered. Try signing in.');
      const normalizedPhone = phone(input.phoneNumber);
      if (state.users.some((u) => u.phoneNumber === normalizedPhone))
        throw new Error(
          'This demo phone number is already registered. Use a different sample number.',
        );
      if (input.password !== DEMO_PASSWORD || input.confirmPassword !== DEMO_PASSWORD)
        throw new Error('Use Demo123! in both password fields. Demo passwords are not stored.');
      const user = {
        _id: id('user'),
        fullname: required(input.fullname, 'Full name', 2),
        email: normalizedEmail,
        phoneNumber: normalizedPhone,
        role: input.role,
        location: { lga: input.lga || 'Ikeja' },
        bio: '',
        emailVerified: false,
      };
      if (input.role === 'Artisan') {
        if (!categories.some((c) => c.name === input.category))
          throw new Error('Choose a service category.');
        Object.assign(user, {
          businessName: required(input.businessName, 'Business name', 2),
          category: input.category,
          verificationStatus: 'Unverified',
          portfolio: [],
          availability: true,
          restricted: false,
        });
      }
      write((next) => {
        next.users.push(user);
        return user;
      });
      return setSession(user);
    },
    async listArtisans() {
      await pause();
      return clone(
        state.users
          .filter(
            (u) => u.role === 'Artisan' && u.verificationStatus === 'Approved' && !u.restricted,
          )
          .map(publicArtisan),
      );
    },
    async getArtisan(userId) {
      await pause();
      const user = find(userId);
      if (user.role !== 'Artisan' || user.verificationStatus !== 'Approved' || user.restricted)
        throw new Error('This artisan is not currently listed. Browse other available artisans.');
      return clone(publicArtisan(user));
    },
    async getProfile() {
      await pause();
      return clone(actor());
    },
    async updateProfile(input) {
      await pause();
      const current = actor(['Artisan', 'Employer']);
      const changes = {
        fullname: required(input.fullname, 'Full name', 2),
        bio: (input.bio || '').trim(),
        location: { lga: required(input.lga, 'Area') },
      };
      if (input.socialMediaLink && !/^https:\/\//.test(input.socialMediaLink))
        throw new Error('Social links must start with https://.');
      if (current.role === 'Artisan')
        Object.assign(changes, {
          businessName: required(input.businessName, 'Business name', 2),
          socialMediaLink: input.socialMediaLink || '',
          availability: Boolean(input.availability),
        });
      for (const key of ['profilePic', 'coverPhoto']) {
        if (input[key]) {
          if (
            !/^data:image\/(png|jpeg|webp);base64,/.test(input[key]) ||
            input[key].length > 1400000
          )
            throw new Error('Choose a PNG, JPEG or WebP photo under 1 MB.');
          changes[key] = { image_url: input[key] };
        }
      }
      const updated = write((next) => {
        const user = next.users.find((u) => u._id === current._id);
        Object.assign(user, changes);
        return user;
      });
      setSession(updated);
      return updated;
    },
    async createBooking(artisanId, input) {
      await pause();
      const user = actor(['Employer']);
      const artisan = find(artisanId);
      if (
        artisan.role !== 'Artisan' ||
        artisan.verificationStatus !== 'Approved' ||
        artisan.restricted ||
        !artisan.availability
      )
        throw new Error('This artisan is not accepting requests right now.');
      const parsedDate = new Date(`${input.date}T00:00:00Z`);
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(input.date || '') ||
        input.date < new Date().toISOString().slice(0, 10) ||
        Number.isNaN(parsedDate.getTime()) ||
        parsedDate.toISOString().slice(0, 10) !== input.date
      )
        throw new Error('Choose today or a future preferred date.');
      const booking = {
        _id: id('booking'),
        artisanId,
        employerId: user._id,
        serviceTitle: required(input.serviceTitle, 'Project title', 3),
        serviceDescription: required(input.serviceDescription, 'Project details', 10),
        location: required(input.location, 'Address', 5),
        phoneNumber: phone(input.phoneNumber),
        date: input.date,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };
      return write((next) => {
        next.bookings.unshift(booking);
        return booking;
      });
    },
    async listBookings() {
      await pause();
      const user = actor(['Artisan', 'Employer']);
      return clone(
        state.bookings
          .filter((b) =>
            user.role === 'Artisan' ? b.artisanId === user._id : b.employerId === user._id,
          )
          .map((b) => ({
            ...b,
            artisan: publicArtisan(find(b.artisanId)),
            employer: { _id: b.employerId, fullname: find(b.employerId).fullname },
          })),
      );
    },
    async respondToBooking(bookingId, status) {
      await pause();
      const user = actor(['Artisan']);
      if (!['Confirmed', 'Rejected'].includes(status))
        throw new Error('Choose confirm or decline.');
      return write((next) => {
        const booking = next.bookings.find((b) => b._id === bookingId && b.artisanId === user._id);
        if (!booking || booking.status !== 'Pending')
          throw new Error('This request has already been handled or is no longer available.');
        booking.status = status;
        return booking;
      });
    },
    async submitVerification(input) {
      await pause();
      const user = actor(['Artisan']);
      if (['Pending', 'Approved'].includes(user.verificationStatus))
        throw new Error('This verification is already pending or approved.');
      const verification = {
        _id: id('verification'),
        guarantorName: required(input.guarantorName, 'Guarantor name', 2),
        guarantorPhoneNumber: phone(input.guarantorPhoneNumber),
        documentName: required(input.documentName, 'Document name'),
        workCertificate: { image_url: input.image_url },
      };
      if (
        !/^data:image\/(png|jpeg|webp);base64,/.test(input.image_url || '') ||
        input.image_url.length > 1400000
      )
        throw new Error('Choose a PNG, JPEG or WebP document under 1 MB.');
      return write((next) => {
        const record = next.users.find((u) => u._id === user._id);
        record.verificationId = verification;
        record.verificationStatus = 'Pending';
        record.verificationReason = '';
        return record;
      });
    },
    async addWork(input) {
      await pause();
      const user = actor(['Artisan']);
      if (
        !/^data:image\/(png|jpeg|webp);base64,/.test(input.image_url || '') ||
        input.image_url.length > 1400000
      )
        throw new Error('Choose a PNG, JPEG or WebP photo under 1 MB.');
      const work = {
        _id: id('work'),
        title: required(input.title, 'Photo title', 3),
        image_url: input.image_url,
      };
      return write((next) => {
        const record = next.users.find((u) => u._id === user._id);
        if ((record.portfolio || []).length >= 4)
          throw new Error('The demo supports up to four work photos. Remove one to add another.');
        record.portfolio = [...(record.portfolio || []), work];
        return work;
      });
    },
    async deleteWork(workId) {
      await pause();
      const user = actor(['Artisan']);
      return write((next) => {
        const record = next.users.find((u) => u._id === user._id);
        record.portfolio = (record.portfolio || []).filter((w) => w._id !== workId);
        return record;
      });
    },
    async createReport(artisanId, reason) {
      await pause();
      const user = actor(['Employer']);
      const target = find(artisanId);
      if (target.role !== 'Artisan') throw new Error('Choose an artisan profile.');
      const report = {
        _id: id('report'),
        artisanId,
        employerId: user._id,
        reason: required(reason, 'Report details', 10),
        status: 'Open',
        createdAt: new Date().toISOString(),
      };
      return write((next) => {
        next.reports.unshift(report);
        return report;
      });
    },
    async listVerifications(status = 'Pending') {
      await pause();
      actor(['Admin']);
      return clone(
        state.users.filter((u) => u.role === 'Artisan' && u.verificationStatus === status),
      );
    },
    async reviewVerification(userId, status, reason = '') {
      await pause();
      actor(['Admin']);
      if (!['Approved', 'Declined'].includes(status)) throw new Error('Choose approve or decline.');
      if (status === 'Declined') required(reason, 'A reason for declining', 10);
      return write((next) => {
        const user = next.users.find((u) => u._id === userId && u.role === 'Artisan');
        if (!user || user.verificationStatus !== 'Pending')
          throw new Error('This review has already been handled.');
        user.verificationStatus = status;
        user.verificationReason = reason.trim();
        return user;
      });
    },
    async listReports() {
      await pause();
      actor(['Admin']);
      return clone(
        state.reports
          .filter((r) => r.status === 'Open')
          .map((r) => ({
            ...r,
            artisan: find(r.artisanId),
            employer: { fullname: find(r.employerId).fullname },
          })),
      );
    },
    async resolveReport(reportId, action) {
      await pause();
      actor(['Admin']);
      if (!['Dismissed', 'Restricted', 'Deleted'].includes(action))
        throw new Error('Choose a report action.');
      return write((next) => {
        const report = next.reports.find((r) => r._id === reportId && r.status === 'Open');
        if (!report) throw new Error('This report has already been handled.');
        report.status = action;
        if (action !== 'Dismissed') {
          const user = next.users.find((u) => u._id === report.artisanId);
          user.restricted = true;
          user.deleted = action === 'Deleted';
          next.reports
            .filter((r) => r.artisanId === user._id && r.status === 'Open')
            .forEach((r) => {
              r.status = action;
            });
        }
        return report;
      });
    },
    async listPlans() {
      await pause();
      return clone(state.plans);
    },
    async choosePlan(planId) {
      await pause();
      const user = actor(['Artisan']);
      if (!state.plans.some((p) => p._id === planId)) throw new Error('This plan is unavailable.');
      return write((next) => {
        const record = next.users.find((u) => u._id === user._id);
        record.subscription = planId;
        return record;
      });
    },
    async sendContact(input) {
      await pause();
      const message = {
        _id: id('message'),
        fullname: required(input.fullname, 'Full name', 2),
        email: email(input.email),
        message: required(input.message, 'Message', 10),
        createdAt: new Date().toISOString(),
      };
      return write((next) => {
        next.messages.push(message);
        return { reference: message._id };
      });
    },
    async previewEmailVerification() {
      await pause();
      const user = actor(['Artisan', 'Employer']);
      return write((next) => {
        const record = next.users.find((u) => u._id === user._id);
        record.emailVerified = true;
        return record;
      });
    },
    async requestPasswordReset(inputEmail) {
      await pause();
      email(inputEmail);
      return {
        simulated: true,
        message: 'Reset request previewed. No email was sent and no password was changed.',
      };
    },
    async resetDemo() {
      try {
        storage?.removeItem(DATA_KEY);
        storage?.removeItem(SESSION_KEY);
      } catch {
        throw new Error('Your browser could not reset the saved demo.');
      }
      state = createSeed();
      memorySession = null;
      sessionInMemory = !storage;
      storageWarning = storage
        ? ''
        : 'Browser storage is unavailable. Changes and your demo session will be lost on reload.';
      notify();
    },
  };
  return service;
}
