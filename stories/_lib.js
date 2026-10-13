/** Helpers for Raxon stories. */

/** Turn markup into a DOM node (one root element or a wrapper div). */
export function el(markup) {
  const d = document.createElement('div');
  d.innerHTML = markup.trim();
  return d.childElementCount === 1 ? d.firstElementChild : d;
}

/** Join class names, skipping empty ones. */
export const cx = (...a) => a.filter(Boolean).join(' ');

/**
 * Run a site script (rx-select.js, rx-match.js, rx-builder.js) only inside `root`.
 * The scripts search the page with document.querySelectorAll; here `document` is a proxy
 * whose queries are limited to the story, so several stories on one Docs page don't interfere.
 */
export function runScoped(code, root) {
  const scoped = new Proxy(document, {
    get(target, prop) {
      if (prop === 'querySelectorAll') return (s) => root.querySelectorAll(s);
      if (prop === 'querySelector') return (s) => root.querySelector(s);
      if (prop === 'getElementById') return (id) => root.querySelector('#' + CSS.escape(id));
      const v = Reflect.get(target, prop);
      return typeof v === 'function' ? v.bind(target) : v;
    },
  });
  // eslint-disable-next-line no-new-func
  new Function('document', code)(scoped);
}

/** Return markup as a node and enhance it with a site script after it is in the page. */
export function withScript(markup, code) {
  const root = el(`<div>${markup}</div>`);
  const start = () => (root.isConnected ? runScoped(code, root) : requestAnimationFrame(start));
  requestAnimationFrame(start);
  return root;
}

/** Return markup as a node and call `setup(root)` after it is in the page. */
export function withSetup(markup, setup) {
  const root = el(`<div>${markup}</div>`);
  const start = () => (root.isConnected ? setup(root) : requestAnimationFrame(start));
  requestAnimationFrame(start);
  return root;
}
