export default {
  title: 'Components/Content/Chat Bubble',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: **Chat Bubble** (Side: Them | Me). Диалоги в разделе Real Workplace English. Контейнер — `.rx-chat`, с аватарами — `.rx-chat--avatars` и `<img class="rx-bubble__avatar">`.' } } },
  argTypes: { avatars: { control: 'boolean' } },
  args: { avatars: true },
  render: ({ avatars }) => {
    const av = (n) => (avatars ? `<img alt="" class="rx-bubble__avatar" src="img/avatars/${n}.svg">` : '');
    return `<div class="rx-chat${avatars ? ' rx-chat--avatars' : ''}" style="max-width:640px;margin:0 auto">
<div class="rx-bubble rx-bubble--me">${av('designer')}<span class="rx-bubble__who">Name</span>Message text</div>
<div class="rx-bubble rx-bubble--them">${av('developer')}<span class="rx-bubble__who">Name</span>Message text</div>
<div class="rx-bubble rx-bubble--them">${av('product-manager')}<span class="rx-bubble__who">Name</span>Message text that wraps onto several lines when it is long enough.</div></div>`;
  },
};

export const WithAvatars = {};
export const WithoutAvatars = { args: { avatars: false } };
