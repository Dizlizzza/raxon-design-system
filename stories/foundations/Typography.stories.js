const STYLES = [
  ['display-xl', 'Display / XL'], ['display-l', 'Display / L'], ['display-m', 'Display / M'], ['display-s', 'Display / S'], ['display-xs', 'Display / XS'],
  ['heading-xl', 'Heading / XL'], ['heading-l', 'Heading / L'], ['heading-m', 'Heading / M'], ['heading-s', 'Heading / S'],
  ['body-l', 'Body / L'], ['body-m', 'Body / M'], ['body-s', 'Body / S'],
  ['label-l', 'Label / L'], ['label-m', 'Label / M'], ['label-s', 'Label / S'],
  ['eyebrow', 'Eyebrow'], ['mono-m', 'Mono / M'], ['mono-s', 'Mono / S'],
];

export default {
  title: 'Foundations/Typography',
  parameters: { docs: { description: { component: 'Текстовые стили из Figma: переменная `--text-<style>` (шорткат `font`) и класс `.rx-text-<style>`. Шрифты: Unbounded (display), Onest (body), JetBrains Mono (code).' } } },
};

export const TextStyles = {
  name: 'Текстовые стили',
  render: () => `<div style="display:grid;gap:18px">${STYLES.map(([k, n]) =>
    `<div style="display:grid;grid-template-columns:180px 1fr;gap:16px;align-items:baseline;border-bottom:1px solid var(--color-border-default);padding-bottom:14px">
      <code style="font:var(--text-mono-s);color:var(--color-text-secondary)">.rx-text-${k}</code>
      <span class="rx-text-${k}">${n.replace(/ \/ /g, '/')}</span></div>`).join('')}</div>`,
};
