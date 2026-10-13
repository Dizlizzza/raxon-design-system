import { withSetup } from '../_lib.js';

const GROUPS = {
  'bg': ['bg-page', 'bg-surface', 'bg-subtle', 'bg-pressed', 'bg-brand', 'bg-brand-hover', 'bg-brand-pressed', 'bg-brand-soft', 'bg-success', 'bg-success-soft', 'bg-danger-soft', 'bg-inverse'],
  'text': ['text-primary', 'text-secondary', 'text-brand', 'text-success', 'text-danger', 'text-on-brand', 'text-inverse'],
  'border': ['border-default', 'border-strong', 'border-focus', 'border-focus-ring', 'border-success', 'border-danger'],
  'part': [1, 2, 3, 4, 5, 6].flatMap((n) => [`part-${n}`, `part-${n}-soft`]),
};

const swatch = (name) => `<div style="display:grid;gap:6px;width:150px">
  <div style="height:56px;border-radius:12px;background:var(--color-${name});border:1px solid var(--color-border-default)"></div>
  <code style="font:var(--text-mono-s);color:var(--color-text-primary)">--color-${name}</code>
  <span data-var="--color-${name}" style="font:var(--text-body-s);color:var(--color-text-secondary)"></span></div>`;

const showValues = (root) => {
  const cs = getComputedStyle(document.documentElement);
  root.querySelectorAll('[data-var]').forEach((s) => { s.textContent = cs.getPropertyValue(s.dataset.var).trim(); });
};

export default {
  title: 'Foundations/Colors',
  parameters: { docs: { description: { component: 'Семантические цвета из Figma Variables (`color/…`). Значения меняются вместе с темой — переключите её на панели инструментов.' } } },
};

export const Semantic = {
  name: 'Семантические цвета',
  render: () => withSetup(Object.entries(GROUPS).map(([g, list]) =>
    `<h3 style="margin:24px 0 12px">${g}</h3><div style="display:flex;flex-wrap:wrap;gap:16px">${list.map(swatch).join('')}</div>`).join(''), showValues),
};
