import { withSetup } from '../_lib.js';

export default {
  title: 'Components/Actions/Segmented',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Segmented** (Tone: Neutral | Brand) + **Segmented / Item** (Selected). Выбранный пункт — `aria-pressed="true"`.' } } },
  argTypes: { tone: { control: 'inline-radio', options: ['neutral', 'brand'] }, items: { control: 'object' }, selected: { control: { type: 'number', min: 0 } } },
  args: { tone: 'neutral', items: ['Item 1', 'Item 2', 'Item 3'], selected: 0 },
  render: ({ tone, items, selected }) => withSetup(
    `<div class="rx-segmented rx-segmented--${tone}" role="group" aria-label="Segmented">${items.map((t, i) => `<button type="button" class="rx-segmented__item" aria-pressed="${i === selected}">${t}</button>`).join('')}</div>`,
    (root) => root.querySelectorAll('.rx-segmented__item').forEach((b, _, all) => b.addEventListener('click', () => all.forEach((x) => x.setAttribute('aria-pressed', x === b))))),
};

export const Neutral = {};
export const Brand = { args: { tone: 'brand', items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'], selected: 1 } };
