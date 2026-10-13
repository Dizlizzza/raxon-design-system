export default {
  title: 'Components/Content/Accordion',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Accordion** (Size: M | S; Open: False | True). На элементе `<details>`: M — FAQ, S — ключи ответов и подсказки.' } } },
  argTypes: { size: { control: 'inline-radio', options: ['m', 's'] }, open: { control: 'boolean' }, question: { control: 'text' }, answer: { control: 'text' } },
  args: { size: 'm', open: false, question: 'Title', answer: 'Content text' },
  render: ({ size, open, question, answer }) => `<details class="rx-accordion rx-accordion--${size}"${open ? ' open' : ''} style="max-width:640px"><summary class="rx-accordion__summary">${question}</summary><div class="rx-accordion__body"><p>${answer}</p></div></details>`,
};

export const Medium = {};
export const MediumOpen = { args: { open: true } };
export const Small = { args: { size: 's', question: 'Title', answer: 'Content text' } };
