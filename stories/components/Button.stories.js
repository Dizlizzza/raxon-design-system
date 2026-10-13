import { cx } from '../_lib.js';

export default {
  title: 'Components/Actions/Button',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Button** (Style: Primary | Secondary | Inverse | Text; Size: M 48 | S 40 | XS 32; State: Default | Hover | Pressed | Disabled | Loading). Можно ставить на `<button>` или `<a>`. Загрузка: `.is-loading` + `aria-busy="true"`.' } } },
  argTypes: {
    style: { control: 'inline-radio', options: ['primary', 'secondary', 'inverse', 'text'], description: 'Style' },
    size: { control: 'inline-radio', options: ['m', 's', 'xs'], description: 'Size' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: { style: 'primary', size: 'm', label: 'Button', disabled: false, loading: false },
  render: ({ style, size, label, disabled, loading }) =>
    `<button type="button" class="${cx('rx-button', `rx-button--${style}`, `rx-button--${size}`, loading && 'is-loading')}"${disabled ? ' disabled' : ''}${loading ? ' aria-busy="true"' : ''}>${label}</button>`,
};

export const Primary = {};
export const Secondary = { args: { style: 'secondary', label: 'Button' } };
export const Inverse = {
  args: { style: 'inverse', label: 'Button' },
  render: (a) => `<div style="background:var(--color-bg-inverse);padding:24px;border-radius:16px">${Button(a)}</div>`,
};
export const Text = { args: { style: 'text', size: 's', label: 'Button' } };
export const Disabled = { args: { disabled: true } };
export const Loading = { args: { loading: true, label: 'Button' } };

export const AllSizes = {
  name: 'Все стили и размеры',
  render: () => ['primary', 'secondary', 'text'].map((s) =>
    `<div class="sb-stack" style="margin-bottom:12px">${['m', 's', 'xs'].map((z) => `<button type="button" class="rx-button rx-button--${s} rx-button--${z}">${s} ${z.toUpperCase()}</button>`).join('')}</div>`).join(''),
};

function Button({ style, size, label }) { return `<button type="button" class="rx-button rx-button--${style} rx-button--${size}">${label}</button>`; }
