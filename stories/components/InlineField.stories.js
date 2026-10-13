import { cx } from '../_lib.js';

export default {
  title: 'Components/Forms/Inline Field',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Inline Field** (Type: Input | Select; State: Default | Focus | Correct | Wrong). Пропуск внутри предложения в упражнениях. Результат — `.is-correct` / `.is-wrong`.' } } },
  argTypes: { type: { control: 'inline-radio', options: ['input', 'select'] }, state: { control: 'inline-radio', options: ['default', 'correct', 'wrong'] } },
  args: { type: 'input', state: 'default' },
  render: ({ type, state }) => {
    const cls = cx('rx-inline-field', type === 'select' && 'rx-inline-field--select', state === 'correct' && 'is-correct', state === 'wrong' && 'is-wrong');
    const val = state === 'correct' ? 'Option 1' : state === 'wrong' ? 'Option 2' : '';
    const field = type === 'select'
      ? `<select class="${cls}" aria-label="Пропуск"><option value="">—</option>${['Option 1', 'Option 2', 'Option 3'].map((o) => `<option${o === val ? ' selected' : ''}>${o}</option>`).join('')}</select>`
      : `<input class="${cls}" aria-label="Пропуск" placeholder=""${val ? ` value="${val}"` : ''}>`;
    return `<p style="font:var(--text-body-l);line-height:2">Text before the field ${field} text after the field.</p>`;
  },
};

export const Input = {};
export const Select = { args: { type: 'select' } };
export const Correct = { args: { state: 'correct' } };
export const Wrong = { args: { state: 'wrong' } };
