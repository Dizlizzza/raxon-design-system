// Копирует файлы дизайн-системы на сайт учебника.
//   npm run sync          — скопировать
//   npm run sync:check    — только показать, какие файлы отличаются
// Папка сайта по умолчанию: ../website/landing. Другую можно указать так:
//   SITE=/путь/к/landing npm run sync
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.resolve(process.env.SITE || path.join(root, '..', 'website', 'landing'));
const check = process.argv.includes('--check');

if (!fs.existsSync(path.join(site, 'index.html'))) {
  console.error(`Не нашла сайт в папке ${site}. Укажите путь: SITE=/путь/к/landing npm run sync`);
  process.exit(1);
}

const list = (dir, test) => fs.readdirSync(path.join(root, dir)).filter(test).map((f) => path.join(dir, f));
const files = [
  'css/tokens.css',
  'css/rx.css',
  ...list('css/rx', (f) => f.endsWith('.css')),
  ...list('js', (f) => /^rx-.*\.js$/.test(f)),
  ...list('img/avatars', (f) => f.endsWith('.svg')),
];

let changed = 0;
for (const f of files) {
  const from = path.join(root, f);
  const to = path.join(site, f);
  const same = fs.existsSync(to) && fs.readFileSync(from).equals(fs.readFileSync(to));
  if (same) continue;
  changed++;
  console.log(`${fs.existsSync(to) ? 'обновлён' : 'новый   '}  ${f}`);
  if (!check) { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); }
}
console.log(changed === 0 ? 'Сайт уже совпадает с дизайн-системой.'
  : check ? `Отличается файлов: ${changed}. Запустите npm run sync, чтобы скопировать.`
  : `Скопировано файлов: ${changed} → ${site}`);
