import { withSetup } from '../_lib.js';

export default {
  title: 'Components/Content/Flashcard',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Flashcard** (Open: False | True). Карточка слова: по клику показывает перевод (`aria-expanded`).' } } },
  argTypes: { term: { control: 'text' }, ipa: { control: 'text' }, translation: { control: 'text' }, open: { control: 'boolean' } },
  args: { term: 'Term', ipa: '/trænˈskrɪpʃn/', translation: 'Translation', open: false },
  render: ({ term, ipa, translation, open }) => withSetup(
    `<div style="max-width:280px"><button type="button" class="rx-flashcard" aria-expanded="${open}" data-ru="${translation}"><span class="rx-flashcard__term">${term}</span><span class="rx-flashcard__hint">${open ? 'Hide' : 'Show'}</span><span class="rx-flashcard__ipa">${ipa}</span>${open ? `<span class="rx-flashcard__translation">${translation}</span>` : ''}</button></div>`,
    (root) => { const b = root.querySelector('.rx-flashcard');
      b.addEventListener('click', () => { let r = b.querySelector('.rx-flashcard__translation');
        if (r) { r.remove(); b.querySelector('.rx-flashcard__hint').textContent = 'Show'; b.setAttribute('aria-expanded', 'false'); }
        else { r = document.createElement('span'); r.className = 'rx-flashcard__translation'; r.textContent = b.dataset.ru; b.appendChild(r); b.querySelector('.rx-flashcard__hint').textContent = 'Hide'; b.setAttribute('aria-expanded', 'true'); } }); }),
};

export const Closed = {};
export const Open = { args: { open: true } };
