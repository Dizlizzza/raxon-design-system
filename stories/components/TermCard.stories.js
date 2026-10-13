import { withSetup } from '../_lib.js';

export default {
  title: 'Components/Content/Term Card',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Term Card** (Known: False | True). Карточка слова в словаре. Внутри — Badge и Toggle Button «Знаю».' } } },
  argTypes: { term: { control: 'text' }, ipa: { control: 'text' }, translation: { control: 'text' }, example: { control: 'text' }, known: { control: 'boolean' } },
  args: { term: 'Term', ipa: '/trænˈskrɪpʃn/', translation: 'Translation', example: 'Example sentence.', known: false },
  render: ({ term, ipa, translation, example, known }) => withSetup(`<ul style="list-style:none;margin:0;padding:0;max-width:640px"><li class="rx-term-card${known ? ' is-known' : ''}">
  <div class="rx-term-card__main"><div class="rx-term-card__term"><b>${term}</b><span class="rx-term-card__ipa">${ipa}</span></div>
  <div class="rx-term-card__translation">${translation}</div><p class="rx-term-card__example">${example}</p>
  <div class="rx-term-card__meta"><a class="rx-badge rx-badge--brand rx-badge--s" href="#">Label</a><span class="rx-badge rx-badge--neutral rx-badge--s">Label</span></div></div>
  <button type="button" class="rx-toggle-button rx-toggle-button--success" aria-pressed="${known}">Label</button></li></ul>`,
  (root) => { const li = root.querySelector('.rx-term-card'); const b = root.querySelector('button');
    b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); li.classList.toggle('is-known', on); }); }),
};

export const Default = {};
export const Known = { args: { known: true } };
