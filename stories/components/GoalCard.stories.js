export default {
  title: 'Components/Content/Goal Card',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Goal Card** (Status: Open | Soon). Навигация по целям на главной. Цвет — акцентный (`.rx-part-N`).' } } },
  argTypes: { chapter: { control: 'text' }, title: { control: 'text' }, soon: { control: 'boolean' }, part: { control: 'select', options: ['', 'rx-part-2', 'rx-part-3', 'rx-part-4', 'rx-part-5', 'rx-part-6'] } },
  args: { chapter: 'Eyebrow', title: 'Title', soon: false, part: '' },
  render: ({ chapter, title, soon, part }) => `<div style="max-width:320px">${soon
    ? `<div class="${part} rx-goal-card is-soon"><div class="rx-goal-card__chapter">${chapter} <span class="rx-badge rx-badge--accent rx-badge--s">Label</span></div><h3 class="rx-goal-card__title">${title}</h3><div class="rx-goal-card__action">Action</div></div>`
    : `<a class="${part} rx-goal-card" href="#"><div class="rx-goal-card__chapter">${chapter}</div><h3 class="rx-goal-card__title">${title}</h3><div class="rx-goal-card__action">Action <span class="rx-goal-card__icon">→</span></div></a>`}</div>`,
};

export const Open = {};
export const Soon = { args: { chapter: 'Eyebrow', title: 'Title', soon: true, part: 'rx-part-5' } };
