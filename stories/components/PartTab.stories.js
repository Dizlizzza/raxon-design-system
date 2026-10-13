import { cx } from '../_lib.js';

const PARTS = [1, 2, 3, 4, 5, 6].map(() => ['Overline', 'Label']);

export default {
  title: 'Components/Navigation/Part Tab',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Part Tab** (State: Default | Selected | Soon). Цвет — класс `.rx-part-N` на самой вкладке. Выбранная — `aria-selected="true"`, недоступная — `.is-soon`.' } } },
  argTypes: { part: { control: { type: 'range', min: 1, max: 6, step: 1 } }, selected: { control: 'boolean' }, soon: { control: 'boolean' } },
  args: { part: 1, selected: true, soon: false },
  render: ({ part, selected, soon }) => `<button type="button" role="tab" class="${cx('rx-part-tab', `rx-part-${part}`, soon && 'is-soon')}" aria-selected="${selected}"><span class="rx-part-tab__number">${PARTS[part - 1][0]}</span><span class="rx-part-tab__name">${PARTS[part - 1][1]}</span></button>`,
};

export const Selected = {};
export const Soon = { args: { part: 2, selected: false, soon: true } };
export const AllParts = {
  name: 'Все цвета',
  render: () => `<div role="tablist" class="sb-stack">${PARTS.map(([n, t], i) => `<button type="button" role="tab" class="${cx('rx-part-tab', `rx-part-${i + 1}`, i > 0 && 'is-soon')}" aria-selected="${i === 0}"><span class="rx-part-tab__number">${n}</span><span class="rx-part-tab__name">${t}</span></button>`).join('')}</div>`,
};
