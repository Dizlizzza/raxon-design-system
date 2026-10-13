export default {
  title: 'Components/Content/Table',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Table / Vocabulary**. Словарь главы (`.rx-table--vocab`, строка группы `.rx-table__group`) и таблица «ключ — значение» (`.rx-table--kv`).' } } },
};

export const Vocabulary = {
  render: () => `<div class="rx-table"><table class="rx-table--vocab"><thead><tr><th>Column 1</th><th>Column 2</th><th>Column 3</th></tr></thead><tbody>
<tr class="rx-table__group"><td colspan="3">Group title</td></tr>
<tr><td>Cell</td><td>Cell</td><td>Cell</td></tr>
<tr><td>Cell</td><td>Cell</td><td>Cell</td></tr>
<tr><td>Cell</td><td>Cell</td><td>Cell</td></tr>
<tr class="rx-table__group"><td colspan="3">Group title</td></tr>
<tr><td>Cell</td><td>Cell</td><td>Cell</td></tr></tbody></table></div>`,
};

export const KeyValue = {
  name: 'Key — Value',
  render: () => `<div class="rx-table"><table class="rx-table--kv"><thead><tr><th>Column 1</th><th>Column 2</th><th>Column 3</th></tr></thead><tbody>
<tr><td>Cell</td><td>Cell</td><td>Cell</td></tr>
<tr><td>Cell</td><td>Cell</td><td>Cell</td></tr>
<tr><td>Cell</td><td>Cell</td><td>Cell</td></tr></tbody></table></div>`,
};
