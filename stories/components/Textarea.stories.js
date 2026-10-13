export default {
  title: 'Components/Forms/Textarea',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Textarea** (M). Та же обёртка `.rx-field`, счётчик символов в `.rx-field__counter`.' } } },
  argTypes: { label: { control: 'text' }, placeholder: { control: 'text' }, max: { control: 'number' }, disabled: { control: 'boolean' } },
  args: { label: 'Label', placeholder: 'Placeholder', max: 1000, disabled: false },
  render: ({ label, placeholder, max, disabled }) => `<div class="rx-field" style="max-width:520px">
  <label class="rx-field__label" for="sb-textarea">${label}</label>
  <textarea class="rx-textarea" id="sb-textarea" rows="4" maxlength="${max}" placeholder="${placeholder}"${disabled ? ' disabled' : ''}></textarea>
  <div class="rx-field__help"><span></span><span class="rx-field__counter">0/${max}</span></div>
</div>`,
};

export const Default = {};
export const Disabled = { args: { disabled: true } };
