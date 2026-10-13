export default {
  title: 'Components/Layout/Header',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', docs: { description: { component: 'Figma: **Header** и **Logo**. Логотип `.rx-logo` со знаком `.rx-logo__mark`, меню `.rx-header__menu` (скрывается до 860px) и действия `.rx-header__actions`. Класс `.wrap` (ширина контента) задаётся раскладкой сайта, в Storybook он заменён inline-стилем.' } } },
  argTypes: { cta: { control: 'boolean', description: 'Кнопка Primary' } },
  args: { cta: true },
  render: ({ cta }) => `<header class="rx-header"><div class="rx-header__inner" style="max-width:1160px;margin:0 auto;padding-inline:24px">
  <a class="rx-logo" href="#"><i class="rx-logo__mark">Aa</i>UX/UI English</a>
  <nav class="rx-header__menu" aria-label="Разделы"><a href="#">Link</a><a href="#">Link</a><a href="#">Link</a><a href="#">Link</a></nav>
  <div class="rx-header__actions"><a class="rx-button rx-button--text rx-button--s" href="#">Secondary</a>${cta ? '<a class="rx-button rx-button--primary rx-button--s" href="#">Primary</a>' : ''}</div>
</div></header>`,
};

export const Default = {};
export const ChapterPage = { name: 'Страница главы', args: { cta: false } };
