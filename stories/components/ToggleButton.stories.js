import { withSetup } from '../_lib.js';

export default {
  title: 'Components/Actions/Toggle Button',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Toggle Button** (Tone: Brand | Success; Pressed: False | True). Состояние — `aria-pressed`. Кликните, чтобы переключить.' } } },
  argTypes: { tone: { control: 'inline-radio', options: ['brand', 'success'] }, pressed: { control: 'boolean' }, label: { control: 'text' } },
  args: { tone: 'brand', pressed: false, label: 'Label' },
  render: ({ tone, pressed, label }) => withSetup(
    `<button type="button" class="rx-toggle-button rx-toggle-button--${tone}" aria-pressed="${pressed}">${label}</button>`,
    (root) => root.querySelector('button').addEventListener('click', (e) => e.currentTarget.setAttribute('aria-pressed', e.currentTarget.getAttribute('aria-pressed') !== 'true'))),
};

export const Brand = {};
export const BrandPressed = { args: { pressed: true } };
export const Success = { args: { tone: 'success', label: 'Label' } };
export const SuccessPressed = { args: { tone: 'success', label: 'Label', pressed: true } };
