import { cx } from '../_lib.js';

export default {
  title: 'Components/Feedback/Alert',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Alert** (Tone: Success | Danger; Title: False | True). Сообщение о результате действия.' } } },
  argTypes: { tone: { control: 'inline-radio', options: ['success', 'danger'] }, title: { control: 'text' }, text: { control: 'text' } },
  args: { tone: 'success', title: '', text: 'Message' },
  render: ({ tone, title, text }) => title
    ? `<div class="${cx('rx-alert', `rx-alert--${tone}`, 'rx-alert--titled')}" role="status"><span class="rx-alert__title">${title}</span><p>${text}</p></div>`
    : `<div class="rx-alert rx-alert--${tone}" role="status">${text}</div>`,
};

export const Success = {};
export const Danger = { args: { tone: 'danger', text: 'Message' } };
export const WithTitle = { args: { tone: 'danger', title: 'Title', text: 'Message' } };
