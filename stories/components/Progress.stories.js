export default {
  title: 'Components/Feedback/Progress',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Progress** (Size: S 6px | M 8px). Ширина заполнения — inline-стиль `width` у `.rx-progress__bar`, цвет — акцентный (`--part`).' } } },
  argTypes: { size: { control: 'inline-radio', options: ['s', 'm'] }, value: { control: { type: 'range', min: 0, max: 100, step: 1 } } },
  args: { size: 'm', value: 38 },
  render: ({ size, value }) => `<div style="max-width:420px"><div class="rx-progress rx-progress--${size}" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"><span class="rx-progress__bar" style="width:${value}%"></span></div></div>`,
};

export const Medium = {};
export const Small = { args: { size: 's', value: 70 } };
