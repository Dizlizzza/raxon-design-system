import { cx, withSetup } from '../_lib.js';

export default {
  title: 'Components/Selection/Chip',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Chip** (Selected: False | True; State: Default | Hover | Focus | Disabled). Два вида: выбор ответа (`<label>` с radio) и фильтр (`<button aria-pressed>`). Группа — `.rx-chip-group`. Результат проверки — `.is-correct` / `.is-wrong` на выбранном чипе.' } } },
};

const words = ['Label 1', 'Label 2', 'Label 3', 'Label 4'];

export const Choice = {
  name: 'Выбор ответа',
  argTypes: { selected: { control: 'select', options: ['—', ...words] }, result: { control: 'inline-radio', options: ['none', 'correct', 'wrong'] }, disabled: { control: 'boolean' } },
  args: { selected: '—', result: 'none', disabled: false },
  render: ({ selected, result, disabled }) => `<div class="rx-chip-group">${words.map((w) =>
    `<label class="${cx('rx-chip', w === selected && result === 'correct' && 'is-correct', w === selected && result === 'wrong' && 'is-wrong')}"><input class="rx-chip__input" type="radio" name="sb-odd" value="${w}"${w === selected ? ' checked' : ''}${disabled ? ' disabled' : ''}><span class="rx-chip__label">${w}</span></label>`).join('')}</div>`,
};

export const Correct = { ...Choice, name: 'Верный ответ', args: { selected: 'Label 4', result: 'correct', disabled: false } };
export const Wrong = { ...Choice, name: 'Неверный ответ', args: { selected: 'Label 3', result: 'wrong', disabled: false } };

export const Filter = {
  name: 'Фильтр',
  render: () => withSetup(`<div class="rx-chip-group">${['Label', 'Label', 'Label', 'Label', 'Label'].map((t, i) =>
    `<button type="button" class="rx-chip" aria-pressed="${i === 0}"><span class="rx-chip__label">${t}</span></button>`).join('')}</div>`,
  (root) => root.querySelectorAll('button.rx-chip').forEach((b, _, all) => b.addEventListener('click', () => all.forEach((x) => x.setAttribute('aria-pressed', x === b))))),
};
