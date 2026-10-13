# Raxon Design System в коде

Источник правды — Figma-файл **Raxon Design System**: <https://www.figma.com/design/9lBTYbT9dGLGaxuvorSktA/Raxon-Design-System>.
Код повторяет его один к одному: те же имена токенов, компонентов, вариантов и размеров. Этот репозиторий — источник правды для кода: сайт учебника получает отсюда копии файлов командой `npm run sync`. Storybook подключает эти же файлы; как запустить — в README.md.

## Файлы

| Файл | Что внутри |
| --- | --- |
| `css/tokens.css` | Токены из Figma Variables: цвета (Light/Dark), отступы, радиусы, шрифты, эффекты. Генерируется скриптом, руками не править. |
| `css/rx/base.css` | Сброс, базовая типографика, контекст цвета части (`.rx-part-1…6`), иконки. |
| `css/rx/<component>.css` | По одному файлу на компонент Figma. В шапке файла — разметка и варианты. |
| `css/rx.css` | Подключает токены, base и все компоненты. Его подключает каждая страница. |
| `js/rx-select.js` | Поведение компонента Select (выпадающий список под полем, клавиатура). |
| `js/rx-match.js` | Поведение компонента Match: пары кликом или тапом, перетаскивание мышью, линии-связи, на телефоне — список определений под термином. Источник правды — скрытый `<select>` в каждом термине. |
| `js/rx-builder.js` | Поведение компонента Sentence Builder: слова переносятся тапом из набора в строку ответа и обратно. Источник правды — скрытый `<input>` с текстом ответа. |
| `img/avatars/*.svg` | Аватары для Chat Bubble. |
| `tokens/tokens.json`, `tokens/gen_tokens.py` | Выгрузка переменных из Figma и генератор `css/tokens.css`. |

## Токены

Имя в Figma → CSS-переменная: `/` заменяется на `-`.

- `color/bg/surface` → `--color-bg-surface`, `color/text/secondary` → `--color-text-secondary`
- `spacing/m` → `--spacing-m`, `radius/2xl` → `--radius-2xl`
- текстовый стиль `Heading/M` → `--text-heading-m` (шорткат `font`) и класс `.rx-text-heading-m`
- эффект `Elevation/Dropdown` → `--elevation-dropdown`
- цвет части учебника: `--part` / `--part-soft`, задаётся классом `.rx-part-N` на любом предке

Тёмная тема включается по системной настройке или через `<html data-theme="dark">`.

## Компоненты

Варианты Figma → модификаторы `--`, состояния → `.is-*` или ARIA-атрибуты.

| Figma | Класс | Варианты в коде |
| --- | --- | --- |
| Button | `.rx-button` | `--primary` `--secondary` `--inverse` `--text` · `--m` (48) `--s` (40) `--xs` (32) · `:disabled`, `.is-loading` |
| Toggle Button | `.rx-toggle-button` | `--brand` `--success` · `[aria-pressed]` |
| Badge | `.rx-badge` | `--neutral` `--brand` `--accent` `--solid` `--code` · `--s` `--m` |
| Chip | `.rx-chip` + `__input` `__label` | выбранный: `input:checked` или `[aria-pressed=true]`; результат: `.is-correct` `.is-wrong` |
| Segmented / Item | `.rx-segmented` + `__item` | `--neutral` `--brand` · `[aria-pressed]` |
| Input, Textarea | `.rx-field` + `__label` `__help` `__counter`, `.rx-input`, `.rx-textarea` | `.rx-input--m` `--s` · ошибка: `.rx-field.is-error` |
| Select, Option, Dropdown | `.rx-select` + `__native` `__button` `__dropdown`, `.rx-option` | `--m` · `.is-open` · опция `.is-active`, `[aria-selected]` |
| Checkbox | `.rx-checkbox` + `__input` `__label` | `--muted` · `.is-error` |
| Inline Field | `.rx-inline-field` | `--select` · `.is-correct` `.is-wrong` |
| Radio Card | `.rx-radio-card` + `__input` `__label` | `.is-correct` `.is-wrong` |
| Match (связи блоков) · только в коде, в Figma пока нет | `.rx-match` + `__terms` `__defs` `__term` `__def` `__slot` `__letter` `__remove` `__num` `__lines` `__line` `__dot` `__sheet` `__option`; поведение `js/rx-match.js` | `__line--temp` · термин `.is-paired`, определение `.is-used` (серое) · `.is-picked` `.is-over` · `.is-correct` `.is-wrong` |
| Sentence Builder (конструктор фраз) · только в коде, в Figma пока нет | `.rx-builder` + `__answer` `__pool` `__tile` `__value`; поведение `js/rx-builder.js` | `__tile--placed` · слово в наборе `.is-used` · результат `.ok` / `.no` на вопросе или `.is-correct` `.is-wrong` |
| Modal (диалоговое окно) · только в коде, в Figma пока нет | `.rx-modal` (элемент `<dialog>`) + `__box` `__close` `__icon` `__title` `__list` `__note` `__actions` | открывается `showModal()`, закрывается по ×, Esc и клику по фону. Пример на сайте: заглушка «Войти» (`js/login-modal.js` в репозитории сайта) |
| Accordion | `.rx-accordion` + `__summary` `__body` | `--m` (FAQ) `--s` (ключи ответов) |
| Progress | `.rx-progress` + `__bar` | `--s` `--m` |
| Table / Vocabulary | `.rx-table` | `--vocab` `--kv`, строка группы `.rx-table__group` |
| Alert | `.rx-alert` | `--success` `--danger` · `--titled` + `__title` |
| Tooltip, Term Hint | `.rx-term-hint[data-ru]` | — |
| Chat Bubble | `.rx-bubble` + `__who` | `--me` `--them` |
| Breadcrumbs | `.rx-breadcrumbs` | текущая страница `[aria-current]` |
| Nav Item | `.rx-nav-item` + `__tick`, `.rx-nav-group` | `.is-active` `.is-done` |
| Part Tab | `.rx-part-tab` + `__number` `__name` | `[aria-selected]` `.is-soon` |
| Goal Card | `.rx-goal-card` + `__chapter` `__title` `__action` `__icon` | `.is-soon` |
| Flashcard | `.rx-flashcard` + `__term` `__ipa` `__hint` `__translation` | `[aria-expanded]` |
| Term Card | `.rx-term-card` + `__main` `__term` `__ipa` `__translation` `__example` `__meta` | `.is-known` |
| Card / Feature | `.rx-card` + `__eyebrow` | `--m` `--s` |
| Header, Logo | `.rx-header` + `__inner` `__menu` `__actions`, `.rx-logo` + `__mark` | — |
| Footer | `.rx-footer` + `__inner` | — |

Checkbox, Radio и Toggle из Raxon есть в Figma в одном размере. Radio и Toggle на сайте сейчас не используются.

## Как обновить токены после правок в Figma

1. Выгрузите переменные в `tokens/tokens.json` (формат описан в `tokens/gen_tokens.py`).
2. Запустите `npm run tokens` — обновится `css/tokens.css`.
3. Проверьте в Storybook и перенесите на сайт: `npm run sync`.
