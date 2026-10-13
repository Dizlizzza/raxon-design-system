import { cx } from '../_lib.js';

let uid = 0;
export default {
  title: 'Components/Forms/Input',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Input** (Size: S | M; State: Default | Focus | Filled | Error | Disabled). Поле в обёртке `.rx-field` с подписью, подсказкой и счётчиком. Ошибка — `.rx-field.is-error`.' } } },
  argTypes: {
    size: { control: 'inline-radio', options: ['m', 's'] },
    state: { control: 'inline-radio', options: ['default', 'filled', 'error', 'disabled'] },
    label: { control: 'text' }, placeholder: { control: 'text' }, help: { control: 'text' },
    optional: { control: 'boolean' }, counter: { control: 'boolean' },
  },
  args: { size: 'm', state: 'default', label: 'Label', placeholder: 'Placeholder', help: 'Helper text', optional: true, counter: false },
  render: ({ size, state, label, placeholder, help, optional, counter }) => {
    const id = `sb-input-${++uid}`;
    const value = state === 'filled' || state === 'error' ? 'Value' : '';
    const helpText = state === 'error' ? 'Error text' : help;
    return `<div class="${cx('rx-field', state === 'error' && 'is-error')}" style="max-width:420px">
  <label class="rx-field__label" for="${id}">${label}${optional ? ' <span class="rx-field__optional">(optional)</span>' : ''}</label>
  <input class="rx-input rx-input--${size}" id="${id}" placeholder="${placeholder}"${value ? ` value="${value}"` : ''}${state === 'disabled' ? ' disabled' : ''}>
  <div class="rx-field__help"><span>${helpText}</span>${counter ? `<span class="rx-field__counter">${value.length}/64</span>` : ''}</div>
</div>`;
  },
};

export const Default = {};
export const Filled = { args: { state: 'filled' } };
export const ErrorState = { name: 'Error', args: { state: 'error', optional: false } };
export const Disabled = { args: { state: 'disabled' } };
export const SizeS = { name: 'Size S', args: { size: 's' } };
