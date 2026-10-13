import { withSetup } from '../_lib.js';

const box = ({ title, text }) => `<div class="rx-modal__box">
  <button type="button" class="rx-modal__close" aria-label="Закрыть">×</button>
  <span class="rx-modal__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg></span>
  <h2 class="rx-modal__title">${title}</h2>
  <p>${text}</p>
  <ul class="rx-modal__list"><li>List item</li><li>List item</li></ul>
  <p class="rx-modal__note">Note text</p>
  <div class="rx-modal__actions"><button type="button" class="rx-button rx-button--primary rx-button--m" data-close>Primary</button><button type="button" class="rx-button rx-button--secondary rx-button--m" data-close>Secondary</button></div>
</div>`;

export default {
  title: 'Components/Feedback/Modal',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Диалоговое окно на элементе `<dialog class="rx-modal">`. Открывается `showModal()`, закрывается по ×, Esc и клику по фону. **Только в коде, в Figma пока нет.** Пример — заглушка кнопки «Войти» (`js/login-modal.js`).' } } },
  argTypes: { title: { control: 'text' }, text: { control: 'text' } },
  args: { title: 'Title', text: 'Description' },
};

export const Interactive = {
  name: 'Открыть по кнопке',
  render: (args) => withSetup(`<button type="button" class="rx-button rx-button--primary rx-button--m" data-open>Button</button>
<dialog class="rx-modal" aria-label="${args.title}">${box(args)}</dialog>`, (root) => {
    const d = root.querySelector('dialog');
    root.querySelector('[data-open]').addEventListener('click', () => d.showModal());
    root.querySelectorAll('[data-close], .rx-modal__close').forEach((b) => b.addEventListener('click', () => d.close()));
    d.addEventListener('click', (e) => { if (e.target === d) d.close(); });
  }),
};

export const Static = {
  name: 'Окно (без затемнения)',
  render: (args) => `<div class="rx-modal" style="display:block;position:static;margin:0">${box(args)}</div>`,
};
