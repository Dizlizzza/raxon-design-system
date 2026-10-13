# Raxon Design System

Дизайн-система сайта учебника «English for UX/UI & Product Designers»: токены, CSS-компоненты, скрипты поведения и Storybook.

- Источник правды по дизайну — Figma-файл [Raxon Design System](https://www.figma.com/design/9lBTYbT9dGLGaxuvorSktA/Raxon-Design-System).
- Источник правды по коду — этот репозиторий. Сайт учебника хранит копии файлов и получает их командой `npm run sync`.
- Описание токенов и компонентов — в [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

## Структура

| Папка | Что внутри |
| --- | --- |
| `css/tokens.css` | Токены из Figma Variables (генерируется, руками не править) |
| `css/rx.css`, `css/rx/*.css` | Базовые стили и по файлу на компонент |
| `js/rx-*.js` | Поведение Select, Match, Sentence Builder |
| `img/avatars/` | Аватары для Chat Bubble |
| `tokens/` | Выгрузка переменных из Figma и генератор токенов |
| `.storybook/`, `stories/` | Storybook (HTML + Vite) |
| `scripts/sync.mjs` | Копирование файлов на сайт |

## Первый запуск (один раз)

1. Установите Node.js LTS (20 или новее): https://nodejs.org.
2. В Терминале перейдите в папку: `cd ~/Documents/English_book/raxon-design-system`
3. Установите зависимости: `npm install` (1–3 минуты, нужен интернет).

## Команды

| Команда | Что делает |
| --- | --- |
| `npm run storybook` | Storybook на http://localhost:6006 (остановить — Ctrl + C) |
| `npm run build-storybook` | Статичная сборка в `storybook-static` — её можно выложить на Netlify, GitHub Pages или поддомен |
| `npm run sync:check` | Показывает, какие файлы на сайте отличаются от дизайн-системы |
| `npm run sync` | Копирует файлы на сайт (по умолчанию в `../website/landing`) |
| `npm run tokens` | Пересобирает `css/tokens.css` из `tokens/tokens.json` |

Если сайт лежит в другом месте: `SITE=/путь/к/landing npm run sync`.

## Как менять компонент

1. Правите файл здесь (`css/rx/<component>.css` или `js/rx-*.js`).
2. Проверяете в Storybook: обе темы, разные цвета частей.
3. `npm run sync` — изменения попадают на сайт.
4. Коммитите оба репозитория.

Не правьте эти файлы прямо в папке сайта: следующий `npm run sync` перезапишет их. Если всё же поправили там — перенесите правку сюда; `npm run sync:check` покажет расхождения.
