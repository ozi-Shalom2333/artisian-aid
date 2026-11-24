import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { JSDOM, VirtualConsole } from 'jsdom';
export async function browserApp({ apiUrl } = {}) {
  const output = await build({
    entryPoints: ['src/main.jsx'],
    bundle: true,
    write: false,
    format: 'iife',
    jsx: 'automatic',
    define: {
      'import.meta.env': JSON.stringify({ VITE_API_BASE_URL: apiUrl }),
    },
    loader: { '.css': 'empty', '.svg': 'dataurl' },
    alias: { '@': './src' },
    logLevel: 'silent',
  });
  const code = output.outputFiles[0].text;
  async function start(
    path = '/',
    { storageUnavailable = false, stored = {}, fetcher, hostname = 'localhost', setup } = {},
  ) {
    const errors = [];
    const requests = [];
    const virtualConsole = new VirtualConsole();
    virtualConsole.on('jsdomError', (e) => errors.push(e.message));
    virtualConsole.on('error', (...args) => errors.push(args.join(' ')));
    const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
      url: `http://${hostname}${path}`,
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
    if (!storageUnavailable)
      Object.entries(stored).forEach(([key, value]) => window.localStorage.setItem(key, value));
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
      if (fetcher) return fetcher(...args);
      throw new window.TypeError('Network is unavailable during this test');
    };
    setup?.(window);
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

  return { start, code };
}
