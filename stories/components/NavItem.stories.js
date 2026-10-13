import { cx } from '../_lib.js';

export default {
  title: 'Components/Navigation/Nav Item',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Nav Item** (State: Default | Hover | Active; Done: False | True). Боковое меню главы и теста. **Только в коде:** кольцо прогресса — `.is-partial` + `style="--progress: 0…1"`, счётчик `.rx-nav-item__count`, режим результата `.is-scored` с цветом `--ring`.' } } },
  argTypes: {
    label: { control: 'text' }, active: { control: 'boolean' }, done: { control: 'boolean' },
    progress: { control: { type: 'range', min: 0, max: 1, step: 0.05 }, description: '0 — пусто, 1 — готово' },
    count: { control: 'text' },
  },
  args: { label: 'Label', active: false, done: false, progress: 0, count: '' },
  render: ({ label, active, done, progress, count }) => {
    const partial = !done && progress > 0 && progress < 1;
    return `<ol class="rx-nav-list" style="max-width:280px"><li><a href="#" class="${cx('rx-nav-item', active && 'is-active', (done || progress >= 1) && 'is-done', partial && 'is-partial')}"${partial ? ` style="--progress:${progress}"` : ''}><span aria-hidden="true" class="rx-nav-item__tick"></span>${label}${count ? `<span class="rx-nav-item__count">${count}</span>` : ''}</a></li></ol>`;
  },
};

export const Default = {};
export const Active = { args: { active: true } };
export const Done = { args: { done: true, count: '40/40' } };
export const InProgress = { name: 'В процессе', args: { progress: 0.3, count: '12/40' } };

export const TestMenu = {
  name: 'Меню теста',
  render: () => `<div style="max-width:280px"><ol class="rx-nav-list">
<li><a href="#" class="rx-nav-item is-partial is-active" style="--progress:.75"><span class="rx-nav-item__tick"></span>Label<span class="rx-nav-item__count">30/40</span></a></li>
<li><a href="#" class="rx-nav-item is-done"><span class="rx-nav-item__tick"></span>Label<span class="rx-nav-item__count">10/10</span></a></li>
<li><a href="#" class="rx-nav-item is-partial" style="--progress:.2"><span class="rx-nav-item__tick"></span>Label<span class="rx-nav-item__count">2/10</span></a></li>
<li><a href="#" class="rx-nav-item"><span class="rx-nav-item__tick"></span>Label<span class="rx-nav-item__count">0/5</span></a></li>
<li><a href="#" class="rx-nav-item"><span class="rx-nav-item__tick"></span>Label</a></li></ol></div>`,
};

export const Scored = {
  name: 'Результат проверки',
  render: () => `<div style="max-width:280px"><ol class="rx-nav-list">${[['Label', 34, 40], ['Label', 12, 20], ['Label', 5, 10]].map(([l, g, m]) => {
    const x = g / m; const ring = x >= 0.85 ? 'var(--color-text-success)' : x >= 0.6 ? 'var(--part)' : 'var(--color-text-danger)';
    return `<li><a href="#" class="rx-nav-item is-partial is-scored" style="--progress:${x};--ring:${ring}"><span class="rx-nav-item__tick"></span>${l}<span class="rx-nav-item__count">${g}/${m}</span></a></li>`; }).join('')}</ol></div>`,
};
