const SPACING = ['2xs', 'xs', 's', 'sm', 'm', 'ml', 'l', 'xl', '2xl', '3xl'];
const RADIUS = ['s', 'm', 'l', 'xl', '2xl', '3xl', 'full'];
const ELEVATION = ['raised', 'dropdown', 'card'];

export default {
  title: 'Foundations/Spacing & Radius',
  parameters: { docs: { description: { component: 'Отступы `--spacing-*`, радиусы `--radius-*` и тени `--elevation-*` из Figma Variables.' } } },
};

export const Spacing = {
  name: 'Отступы',
  render: () => `<div style="display:grid;gap:10px">${SPACING.map((s) =>
    `<div style="display:flex;align-items:center;gap:16px"><code style="width:140px;font:var(--text-mono-s)">--spacing-${s}</code>
     <span style="height:16px;width:var(--spacing-${s});background:var(--color-bg-brand);border-radius:4px"></span></div>`).join('')}</div>`,
};

export const Radius = {
  name: 'Радиусы',
  render: () => `<div style="display:flex;flex-wrap:wrap;gap:20px">${RADIUS.map((r) =>
    `<div style="display:grid;gap:8px;justify-items:center"><div style="width:88px;height:88px;background:var(--color-bg-brand-soft);border:2px solid var(--color-bg-brand);border-radius:var(--radius-${r})"></div>
     <code style="font:var(--text-mono-s)">--radius-${r}</code></div>`).join('')}</div>`,
};

export const Elevation = {
  name: 'Тени',
  render: () => `<div style="display:flex;flex-wrap:wrap;gap:32px;padding:24px">${ELEVATION.map((e) =>
    `<div style="display:grid;gap:10px;justify-items:center"><div style="width:160px;height:100px;border-radius:var(--radius-xl);background:var(--color-bg-surface);box-shadow:var(--elevation-${e})"></div>
     <code style="font:var(--text-mono-s)">--elevation-${e}</code></div>`).join('')}</div>`,
};
