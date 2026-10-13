import { withScript } from '../_lib.js';
import { selectJs } from '../_scripts.js';

let uid = 0;
export default {
  title: 'Components/Forms/Select',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Select** (M) + **Dropdown / M** + **Option** (Default | Hover | Selected | Disabled). Нативный `<select class="rx-select__native">` остаётся в форме, `js/rx-select.js` рисует поверх кнопку и список. Работает с клавиатуры: стрелки, Enter, Esc.' } } },
  argTypes: { label: { control: 'text' }, options: { control: 'object' }, selected: { control: { type: 'number', min: 0 } } },
  args: { label: 'Label', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'], selected: 0 },
  render: ({ label, options, selected }) => {
    const id = `sb-select-${++uid}`;
    return withScript(`<div class="rx-field" style="max-width:420px;min-height:320px;align-content:start">
  <label class="rx-field__label" for="${id}">${label}</label>
  <div class="rx-select rx-select--m"><select class="rx-select__native" id="${id}">${options.map((o, i) => `<option${i === selected ? ' selected' : ''}>${o}</option>`).join('')}</select></div>
</div>`, selectJs);
  },
};

export const Default = {};
