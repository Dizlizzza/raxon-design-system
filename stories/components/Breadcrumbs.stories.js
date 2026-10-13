export default {
  title: 'Components/Navigation/Breadcrumbs',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Breadcrumbs**. Текущая страница — `aria-current="page"`.' } } },
  render: () => `<nav class="rx-breadcrumbs" aria-label="Навигация"><a href="#">Link</a><span>›</span><a href="#">Link</a><span>›</span><span aria-current="page">Current page</span></nav>`,
};

export const Default = {};
