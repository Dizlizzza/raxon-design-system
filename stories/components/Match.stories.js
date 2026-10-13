import { withScript } from '../_lib.js';
import { matchJs } from '../_scripts.js';

const TERMS = [['Term 1', 'd'], ['Term 2', 'e'], ['Term 3', 'a'], ['Term 4', 'b'], ['Term 5', 'c']];
const DEFS = ['Definition text', 'Definition text', 'Definition text that wraps onto two lines', 'Definition text', 'Definition text'];
const L = 'abcde';

export default {
  title: 'Components/Exercises/Match',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Сопоставление блоков связями. **Только в коде, в Figma пока нет.** Пары составляются кликом или тапом, перетаскиванием мышью и с клавиатуры (Enter/Space, Delete, Esc). Связи серые, последняя пара и пара под курсором — акцентным цветом. На экранах до 700px определения открываются списком под термином. Источник правды — скрытый `<select>` в каждом термине; поведение — `js/rx-match.js`.' } } },
  render: () => withScript(`<div class="rx-match" style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);column-gap:72px;align-items:start;max-width:900px">
  <div class="rx-match__defs" style="order:2"><p class="sb-label">Definitions</p><ol style="list-style:none;margin:0;padding:0;display:grid;gap:8px">${DEFS.map((d, i) => `<li><b>${L[i]})</b> ${d}</li>`).join('')}</ol></div>
  <div class="rx-match__terms" style="order:1;display:grid;gap:8px"><p class="sb-label">Terms</p>${TERMS.map(([t], i) => `<label data-rx-match-term><span>${i + 1}. ${t}</span><select aria-label="${t}"><option value="">—</option>${[...L].map((x) => `<option value="${x}">${x}</option>`).join('')}</select></label>`).join('')}</div>
</div>`, matchJs),
};

export const Default = {};
