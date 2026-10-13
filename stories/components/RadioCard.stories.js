import { cx } from '../_lib.js';

const OPTS = [['a', 'Label'], ['b', 'Label'], ['c', 'Label']];

export default {
  title: 'Components/Selection/Radio Card',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Radio Card** (State: Default | Hover | Selected | Correct | Wrong). Вариант ответа в тесте. Группа — `.rx-radio-group`.' } } },
  argTypes: { selected: { control: 'inline-radio', options: ['—', 'a', 'b', 'c'] }, result: { control: 'inline-radio', options: ['none', 'correct', 'wrong'] } },
  args: { selected: '—', result: 'none' },
  render: ({ selected, result }) => `<div class="rx-radio-group" style="max-width:560px">${OPTS.map(([v, t]) =>
    `<label class="${cx('rx-radio-card', v === selected && result === 'correct' && 'is-correct', v === selected && result === 'wrong' && 'is-wrong')}"><input class="rx-radio-card__input" type="radio" name="sb-q" value="${v}"${v === selected ? ' checked' : ''}><span class="rx-radio-card__label">${t}</span></label>`).join('')}</div>`,
};

export const Default = {};
export const Selected = { args: { selected: 'a' } };
export const Correct = { args: { selected: 'a', result: 'correct' } };
export const Wrong = { args: { selected: 'b', result: 'wrong' } };
