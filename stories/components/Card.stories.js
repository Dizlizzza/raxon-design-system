export default {
  title: 'Components/Content/Card',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Card / Feature** (Size: S | M). Карточка с необязательным eyebrow-заголовком.' } } },
  argTypes: { size: { control: 'inline-radio', options: ['m', 's'] }, eyebrow: { control: 'text' }, title: { control: 'text' }, text: { control: 'text' } },
  args: { size: 'm', eyebrow: 'Eyebrow', title: 'Title', text: 'Description text that wraps onto several lines. Use it to explain the card in a few words.' },
  render: ({ size, eyebrow, title, text }) => `<article class="rx-card rx-card--${size}" style="max-width:380px">${eyebrow ? `<span class="rx-card__eyebrow">${eyebrow}</span>` : ''}<h3>${title}</h3><p>${text}</p></article>`,
};

export const Medium = {};
export const Small = { args: { size: 's', eyebrow: '' } };
