import { cx, withSetup } from '../_lib.js';

export default {
  title: 'Components/Forms/Checkbox',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Checkbox** (Checked: Unchecked | Checked | Indeterminate; State: Default | Hover | Disabled | Error). Квадрат 20px. Приглушённый вариант — `.rx-checkbox--muted`, ошибка — `.is-error`.' } } },
  argTypes: {
    label: { control: 'text' }, checked: { control: 'boolean' }, indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' }, muted: { control: 'boolean' }, error: { control: 'boolean' },
  },
  args: { label: 'Label', checked: false, indeterminate: false, disabled: false, muted: false, error: false },
  render: ({ label, checked, indeterminate, disabled, muted, error }) => withSetup(
    `<label class="${cx('rx-checkbox', muted && 'rx-checkbox--muted', error && 'is-error')}"><input class="rx-checkbox__input" type="checkbox"${checked ? ' checked' : ''}${disabled ? ' disabled' : ''}><span class="rx-checkbox__label">${label}</span></label>`,
    (root) => { root.querySelector('input').indeterminate = indeterminate; }),
};

export const Unchecked = {};
export const Checked = { args: { checked: true } };
export const Indeterminate = { args: { indeterminate: true } };
export const Disabled = { args: { disabled: true, checked: true } };
export const ErrorState = { name: 'Error', args: { error: true } };
export const Muted = { args: { muted: true, label: 'Label' } };
