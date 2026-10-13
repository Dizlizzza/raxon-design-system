import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
// Корень дизайн-системы: css/, js/, img/ лежат рядом с .storybook.
const root = path.resolve(here, '..');

/** @type { import('@storybook/html-vite').StorybookConfig } */
export default {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.js'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: { name: '@storybook/html-vite', options: {} },
  staticDirs: [{ from: path.join(root, 'img'), to: '/img' }],
  docs: { defaultName: 'Обзор' },
  async viteFinal(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = { ...(config.resolve.alias || {}), '@raxon': root };
    return config;
  },
};
