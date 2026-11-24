import test from 'node:test';
import assert from 'node:assert/strict';
import { browserApp } from './helpers/browser.js';

const { start } = await browserApp({ apiUrl: 'https://api.example.test/v1' });
const atRest = (element) => !element.style.transform || element.style.transform === 'none';
const mockCategories = [
  { name: 'Carpentry Services', label: 'Carpentry', icon: 'Hammer', description: 'Woodwork' },
  { name: 'Home Cleaning Services', label: 'Home cleaning', icon: 'Sparkles', description: 'Cleaning' },
  { name: 'Electrical Services', label: 'Electrical', icon: 'Zap', description: 'Wiring' },
  { name: 'Painting Services', label: 'Painting', icon: 'Paintbrush', description: 'Painting' },
  { name: 'Plumbing Services', label: 'Plumbing', icon: 'Wrench', description: 'Plumbing' },
  { name: 'Gardening Services', label: 'Gardening', icon: 'Sprout', description: 'Gardening' },
  { name: 'Laundry Services', label: 'Laundry', icon: 'Shirt', description: 'Laundry' },
];
const mockTeam = [
  { name: 'Member 1', role: 'Designer' },
  { name: 'Member 2', role: 'Developer' },
  { name: 'Member 3', role: 'Engineer' },
  { name: 'Member 4', role: 'Architect' },
];
const fetcher = async (url) => {
  if (url.endsWith('/categories')) return new Response(JSON.stringify({ data: mockCategories }));
  if (url.endsWith('/locations')) return new Response(JSON.stringify({ data: ['Ikeja'] }));
  if (url.endsWith('/team')) return new Response(JSON.stringify({ data: mockTeam }));
  if (url.endsWith('/artisans')) return new Response(JSON.stringify({ data: [] }));
  return new Response(JSON.stringify({ data: [] }));
};

function motionBrowser({ reduced = false, observer = true } = {}) {
  const observers = [];
  const mediaQueries = [];
  const setup = (window) => {
    window.matchMedia = (query) => {
      const listeners = new Set();
      const media = {
        matches: query.includes('prefers-reduced-motion') && reduced,
        media: query,
        addEventListener: (_, listener) => listeners.add(listener),
        removeEventListener: (_, listener) => listeners.delete(listener),
        change(value) {
          if (!query.includes('prefers-reduced-motion')) return;
          media.matches = value;
          listeners.forEach((listener) => listener(media));
        },
      };
      mediaQueries.push(media);
      return media;
    };
    if (observer) {
      window.IntersectionObserver = class {
        constructor(callback) {
          this.callback = callback;
          this.targets = new Set();
          observers.push(this);
        }
        observe(target) {
          this.targets.add(target);
        }
        unobserve(target) {
          this.targets.delete(target);
        }
        disconnect() {
          this.targets.clear();
        }
        emit(target, visible) {
          if (!this.targets.has(target)) return;
          this.callback([{ target, isIntersecting: visible, intersectionRatio: visible ? 1 : 0 }]);
        }
      };
    }
  };
  return {
    setup,
    observers,
    enter: (element) => observers.forEach((item) => item.emit(element, true)),
    leave: (element) => observers.forEach((item) => item.emit(element, false)),
    reduce: () => {
      reduced = true;
      mediaQueries.forEach((media) => media.change(true));
    },
    observing: (element) => observers.some((item) => item.targets.has(element)),
  };
}

test('Scroll reveals keep content visible, settle on entry and never replay on leaving', async () => {
  const motion = motionBrowser();
  const app = await start('/', { setup: motion.setup, fetcher });
  try {
    await app.wait(() => app.document.querySelector('.service-grid a'), 'Categories did not render');
    const grid = app.document.querySelector('.service-grid');
    assert(grid.textContent.includes('Carpentry'));
    assert.notEqual(grid.style.opacity, '0');
    assert(!grid.hasAttribute('aria-hidden'));
    assert.equal(grid.tagName, 'DIV');
    assert.equal(grid.children.length, 6);
    assert([...grid.children].every((child) => child.tagName === 'A'));
    await app.wait(() => motion.observing(grid), 'Scroll observer did not register');
    assert.equal(motion.observers.length, 1, 'Section reveals should share a viewport observer');
    assert(!atRest(grid));
    for (let attempt = 0; attempt < 20 && !atRest(grid); attempt += 1) {
      motion.enter(grid);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    await app.wait(() => atRest(grid), 'Section did not settle after entering');
    motion.leave(grid);
    await new Promise((resolve) => setTimeout(resolve, 500));
    assert(atRest(grid), 'Section moved back out after leaving');
    assert(!app.document.querySelector('form.motion-reveal, nav.motion-reveal'));
    assert.deepEqual(app.errors, []);
  } finally {
    app.dom.window.close();
  }
});

test('Keyboard focus bypasses a pending reveal without delaying category navigation', async () => {
  const motion = motionBrowser();
  const app = await start('/', { setup: motion.setup, fetcher });
  try {
    await app.wait(() => app.document.querySelector('.service-grid a'), 'Categories did not render');
    const grid = app.document.querySelector('.service-grid');
    await app.wait(() => motion.observing(grid), 'Scroll observer did not register');
    const link = grid.querySelector('a');
    link.focus();
    assert.equal(app.document.activeElement, link);
    await app.wait(() => atRest(grid), 'Focused grid kept moving');
    const destination = new URL(link.href).pathname;
    link.click();
    await app.wait(
      () => app.window.location.pathname === destination,
      'Category navigation was delayed',
    );
    assert.deepEqual(app.errors, []);
  } finally {
    app.dom.window.close();
  }
});

test('Reduced motion shows every contributor immediately without reveal observers or delays', async () => {
  const motion = motionBrowser({ reduced: true });
  const app = await start('/meetTeam', { setup: motion.setup, fetcher });
  try {
    await app.wait(
      () => app.document.querySelectorAll('article.team-card').length === 4,
      'Team did not render',
    );
    const cards = [...app.document.querySelectorAll('article.team-card')];
    assert.equal(cards.length, 4);
    assert(cards.every((card) => card.tagName === 'ARTICLE' && atRest(card)));
    assert([...app.document.querySelectorAll('.motion-reveal')].every(atRest));
    assert.equal(motion.observers.length, 0);
    assert.deepEqual(app.errors, []);
  } finally {
    app.dom.window.close();
  }
});

test('Changing reduced-motion preference settles pending sections while the page is open', async () => {
  const motion = motionBrowser();
  const app = await start('/meetTeam', { setup: motion.setup, fetcher });
  try {
    await app.wait(
      () => app.document.querySelectorAll('article.team-card').length === 4,
      'Team did not render',
    );
    const cards = [...app.document.querySelectorAll('article.team-card')];
    await app.wait(() => motion.observing(cards[0]), 'Scroll observer did not register');
    assert(cards.some((card) => !atRest(card)));
    motion.reduce();
    await app.wait(() => cards.every(atRest), 'Reduced-motion change did not settle sections');
    assert.deepEqual(app.errors, []);
  } finally {
    app.dom.window.close();
  }
});

test('Without IntersectionObserver, content and public navigation remain usable at rest', async () => {
  const app = await start('/category', { fetcher });
  try {
    await app.wait(() => app.document.querySelector('.category-page-grid a'), 'Categories did not render');
    const grid = app.document.querySelector('.category-page-grid');
    assert.equal(grid.children.length, 7);
    assert([...app.document.querySelectorAll('.motion-reveal')].every(atRest));
    grid.querySelector('a').click();
    await app.wait(
      () => app.window.location.pathname.startsWith('/category/'),
      'Fallback category link did not navigate',
    );
    assert.deepEqual(app.errors, []);
  } finally {
    app.dom.window.close();
  }
});
