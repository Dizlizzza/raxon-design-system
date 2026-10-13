// Raxon: tokens + base + all components — the same file every page of the site uses.
import '@raxon/css/rx.css';

/** Toolbar: theme and textbook part colour. */
export const globalTypes = {
  theme: {
    description: 'Тема',
    toolbar: {
      title: 'Тема', icon: 'mirror', dynamicTitle: true,
      items: [
        { value: 'light', title: 'Светлая', icon: 'sun' },
        { value: 'dark', title: 'Тёмная', icon: 'moon' },
      ],
    },
  },
  part: {
    description: 'Цвет части учебника (--part)',
    toolbar: {
      title: 'Часть', icon: 'paintbrush', dynamicTitle: true,
      items: [1, 2, 3, 4, 5, 6].map((n) => ({ value: String(n), title: `Part ${n}` })),
    },
  },
};

export const initialGlobals = { theme: 'light', part: '1' };

const withRaxon = (storyFn, context) => {
  const { theme = 'light', part = '1' } = context.globals;
  document.documentElement.dataset.theme = theme;
  for (let i = 1; i <= 6; i++) document.body.classList.toggle(`rx-part-${i}`, String(i) === part);
  return storyFn();
};

/** @type { import('@storybook/html').Preview } */
export default {
  decorators: [withRaxon],
  parameters: {
    layout: 'padded',
    controls: { expanded: true, sort: 'requiredFirst' },
    backgrounds: { disable: true },
    docs: { source: { language: 'html' } },
    options: {
      storySort: { order: ['Introduction', 'Foundations', 'Components', ['Actions', 'Forms', 'Selection', 'Feedback', 'Content', 'Navigation', 'Layout', 'Exercises']] },
    },
  },
};
