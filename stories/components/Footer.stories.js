export default {
  title: 'Components/Layout/Footer',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', docs: { description: { component: 'Figma: **Footer**. Подпись и ссылки внизу каждой страницы.' } } },
  render: () => `<footer class="rx-footer"><div class="rx-footer__inner" style="max-width:1160px;margin:0 auto;padding-inline:24px">
  <span>Legal text</span>
  <nav><a href="#">Link</a><a href="#">Link</a><a href="#">Link</a><a href="#">Link</a></nav>
</div></footer>`,
};

export const Default = {};
