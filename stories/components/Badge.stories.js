export default {
  title: 'Components/Feedback/Badge',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Badge** (Style: Neutral | Brand | Accent | Solid | Code; Size: S | M). Brand, Accent и Solid берут акцентный цвет (`--part` / `--part-soft`) — переключите «Акцент» на панели.' } } },
  argTypes: { style: { control: 'inline-radio', options: ['neutral', 'brand', 'accent', 'solid', 'code'] }, size: { control: 'inline-radio', options: ['s', 'm'] }, label: { control: 'text' } },
  args: { style: 'brand', size: 's', label: 'Label' },
  render: ({ style, size, label }) => `<span class="rx-badge rx-badge--${style} rx-badge--${size}">${label}</span>`,
};

export const Brand = {};
export const Neutral = { args: { style: 'neutral', label: 'Label' } };
export const Accent = { args: { style: 'accent', size: 'm', label: 'Label' } };
export const Solid = { args: { style: 'solid', label: 'Label' } };
export const Code = { args: { style: 'code', label: 'Label' } };
export const All = {
  name: 'Все стили',
  render: () => `<div class="sb-stack">${['neutral', 'brand', 'accent', 'solid', 'code'].flatMap((s) => ['s', 'm'].map((z) => `<span class="rx-badge rx-badge--${s} rx-badge--${z}">${s} ${z.toUpperCase()}</span>`)).join('')}</div>`,
};
