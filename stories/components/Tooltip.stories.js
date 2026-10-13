export default {
  title: 'Components/Feedback/Tooltip',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Tooltip** и **Term Hint**. Слово в тексте с пунктирным подчёркиванием, перевод появляется при наведении или фокусе (`data-ru`). Сама подсказка отдельно — `.rx-tooltip`.' } } },
  argTypes: { term: { control: 'text' }, translation: { control: 'text' } },
  args: { term: 'Term', translation: 'Tooltip text' },
};

export const TermHint = {
  name: 'Term Hint',
  render: ({ term, translation }) => `<p style="font:var(--text-body-l);padding-top:40px">Text with a <span class="rx-term-hint" tabindex="0" data-ru="${translation}">${term}</span> inside. <span style="color:var(--color-text-secondary)">(наведите на Term)</span></p>`,
};

export const Static = {
  name: 'Tooltip (отдельно)',
  render: ({ translation }) => `<span class="rx-tooltip">${translation}</span>`,
};
