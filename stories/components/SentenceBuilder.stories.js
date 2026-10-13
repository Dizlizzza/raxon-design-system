import { withScript } from '../_lib.js';
import { builderJs } from '../_scripts.js';

export default {
  title: 'Components/Exercises/Sentence Builder',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Конструктор фраз: ответ собирается из плиток — слов или частей фразы. **Только в коде, в Figma пока нет.** Тап по плитке переносит её в строку ответа и обратно. Текст ответа хранится в скрытом `<input class="rx-builder__value">`; поведение — `js/rx-builder.js`.' } } },
  argTypes: { tiles: { control: 'object' }, placeholder: { control: 'text' } },
  render: ({ tiles, placeholder }) => withScript(`<div style="max-width:640px"><div class="rx-builder">
  <div class="rx-builder__answer" aria-label="Ваш ответ" data-placeholder="${placeholder}"></div>
  <div class="rx-builder__pool">${tiles.map((t) => `<button type="button" class="rx-builder__tile">${t}</button>`).join('')}</div>
  <input type="hidden" class="rx-builder__value"></div></div>`, builderJs),
};

export const Words = {
  name: 'Из слов',
  args: { placeholder: 'Placeholder', tiles: ['Word', 'Word', 'Word', 'Word', 'Word', 'Word'] },
};

export const Chunks = {
  name: 'Из частей фразы',
  args: { placeholder: 'Placeholder', tiles: ['Chunk of text', 'Chunk', 'Longer chunk of text', 'Chunk of text', 'Chunk'] },
};
