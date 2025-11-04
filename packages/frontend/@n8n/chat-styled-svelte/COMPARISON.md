# Package Comparison - n8n Chat Libraries

## Overview of All Three Packages

| Package | Framework | Style | Bundle Size | Customization | Best For |
|---------|-----------|-------|-------------|---------------|----------|
| @n8n/chat | Vue 3 | Pre-styled | ~150KB | CSS variables | Vue apps, quick setup |
| @n8n/chat-headless-svelte | Svelte 5 | Unstyled | ~30KB | Full control | Custom designs |
| **@n8n/chat-styled-svelte** | **Svelte 5** | **Professional** | **~60KB** | **CSS variables** | **Ready-to-use AI chat** |

---

## Detailed Comparison

### @n8n/chat (Vue 3)
**The Original**

```vue
<script setup>
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';

onMounted(() => {
  createChat({ webhookUrl: 'URL' });
});
</script>
<template><div id="n8n-chat"></div></template>
```

**Pros:**
- ✅ Mature and tested
- ✅ Vue ecosystem integration
- ✅ Good default styling
- ✅ CSS variable theming

**Cons:**
- ❌ Larger bundle (~150KB)
- ❌ Limited structural customization
- ❌ Tied to Vue framework
- ❌ Need !important to override some styles

---

### @n8n/chat-headless-svelte
**The Foundation**

```svelte
<script lang="ts">
import { HeadlessChat, HeadlessMessagesList, HeadlessInput } from '@n8n/chat-headless-svelte';
</script>

<HeadlessChat {options}>
  {#snippet children(chatStore)}
    <HeadlessMessagesList>
      {#snippet renderMessage(message)}
        <div class="my-custom-message">
          {message.text}
        </div>
      {/snippet}
    </HeadlessMessagesList>
    <HeadlessInput />
  {/snippet}
</HeadlessChat>
```

**Pros:**
- ✅ Smallest bundle (~30KB)
- ✅ Complete design control
- ✅ No CSS conflicts
- ✅ Svelte 5 with snippets
- ✅ Perfect for custom design systems

**Cons:**
- ❌ Requires writing all CSS
- ❌ More setup time
- ❌ Need design skills
- ❌ No default UI

---

### @n8n/chat-styled-svelte
**The Professional Solution** ⭐

```svelte
<script lang="ts">
import { AIChat } from '@n8n/chat-styled-svelte';
</script>

<AIChat {options} title="AI Assistant" theme="light" />
```

**Pros:**
- ✅ Professional design out-of-box
- ✅ Modern AI chat aesthetics
- ✅ Light & dark themes
- ✅ Medium bundle size (~60KB)
- ✅ Easy customization via CSS vars
- ✅ Built on headless (best of both worlds)
- ✅ Smooth animations
- ✅ Accessible

**Cons:**
- ❌ Less flexible than headless
- ❌ Requires Svelte 5
- ❌ Specific design style

---

## Visual Comparison

### Message Layout

**@n8n/chat (Vue)**
```
┌─────────────────────────┐
│ Bot message here        │
└─────────────────────────┘
              ┌─────────────────────────┐
              │ User message here       │
              └─────────────────────────┘
```
Simple bubbles with CSS variable colors

**@n8n/chat-headless-svelte**
```
Whatever you design!
Complete freedom.
```

**@n8n/chat-styled-svelte**
```
┌──────────────────────────────────┐
│ [🤖] Bot message here            │
│     └─ with gradient avatar      │
└──────────────────────────────────┘
            ┌──────────────────────────────────┐
            │           User message here  [👤]│
            │      gradient background ─┘      │
            └──────────────────────────────────┘
```
Professional with avatars and gradients

---

## Code Comparison

### Simple "Hello World" Chat

#### @n8n/chat
```html
<!-- index.html -->
<link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />
<script type="module">
  import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
  createChat({ webhookUrl: 'YOUR_URL' });
</script>
<div id="n8n-chat"></div>
```
**Lines of code: ~8**

#### @n8n/chat-headless-svelte
```svelte
<!-- Chat.svelte -->
<script lang="ts">
  import { HeadlessChat, HeadlessMessagesList, HeadlessInput } from '@n8n/chat-headless-svelte';
  const options = { webhookUrl: 'YOUR_URL' };
</script>

<HeadlessChat {options}>
  {#snippet children(chatStore)}
    <div class="chat">
      <HeadlessMessagesList>
        {#snippet renderMessage(message)}
          <div class="msg {message.sender}">{message.text}</div>
        {/snippet}
      </HeadlessMessagesList>
      <HeadlessInput />
    </div>
  {/snippet}
</HeadlessChat>

<style>
  .chat { height: 600px; display: flex; flex-direction: column; }
  .msg { padding: 10px; margin: 5px; border-radius: 8px; }
  .msg.user { background: blue; color: white; margin-left: auto; }
  .msg.bot { background: #f0f0f0; }
</style>
```
**Lines of code: ~30 (with minimal styling)**

#### @n8n/chat-styled-svelte
```svelte
<!-- Chat.svelte -->
<script lang="ts">
  import { AIChat } from '@n8n/chat-styled-svelte';
  const options = { webhookUrl: 'YOUR_URL' };
</script>

<div style="height: 600px;">
  <AIChat {options} />
</div>
```
**Lines of code: ~9**

---

## Feature Matrix

| Feature | Vue Chat | Headless | Styled |
|---------|----------|----------|--------|
| Message display | ✅ | ⚙️ DIY | ✅ |
| Typing indicator | ✅ | ⚙️ DIY | ✅ |
| File uploads | ✅ | ⚙️ DIY | ✅ |
| Streaming | ✅ | ✅ | ✅ |
| WebSocket | ✅ | ✅ | ✅ |
| Dark mode | ⚙️ Custom | ⚙️ DIY | ✅ |
| Animations | Basic | ⚙️ DIY | ✅ Smooth |
| Avatars | ❌ | ⚙️ DIY | ✅ |
| Empty state | Basic | ⚙️ DIY | ✅ |
| Responsive | ✅ | ⚙️ DIY | ✅ |
| Accessibility | ✅ | ⚙️ DIY | ✅ |

✅ = Included, ⚙️ = You build it, ❌ = Not included

---

## Decision Guide

### Choose @n8n/chat if:
- ✅ You're using Vue 3
- ✅ You want something that works in 5 minutes
- ✅ Default design is acceptable
- ✅ You're okay with larger bundle

### Choose @n8n/chat-headless-svelte if:
- ✅ You have specific design requirements
- ✅ You need to match existing design system
- ✅ Bundle size is critical
- ✅ You have design/frontend resources
- ✅ You want maximum flexibility

### Choose @n8n/chat-styled-svelte if:
- ✅ You want professional AI chat UI
- ✅ You're using Svelte
- ✅ You want modern design out-of-box
- ✅ You want easy customization
- ✅ You value setup speed + quality
- ✅ You need light/dark themes

---

## Migration Path

### From @n8n/chat (Vue) → @n8n/chat-styled-svelte

1. **Replace imports**
```diff
- import { createChat } from '@n8n/chat';
+ import { AIChat } from '@n8n/chat-styled-svelte';
```

2. **Update template**
```diff
- <div id="n8n-chat"></div>
+ <AIChat {options} />
```

3. **Port options**
```typescript
// Same options work!
const options = {
  webhookUrl: 'YOUR_URL',
  initialMessages: [...],
  enableStreaming: true,
};
```

### From @n8n/chat-headless-svelte → @n8n/chat-styled-svelte

If your custom design becomes too much work:

```diff
- import { HeadlessChat, ... } from '@n8n/chat-headless-svelte';
+ import { AIChat } from '@n8n/chat-styled-svelte';

- <HeadlessChat {options}>
-   {#snippet children(chatStore)}
-     <!-- All your custom rendering -->
-   {/snippet}
- </HeadlessChat>
+ <AIChat {options} />
```

Delete all your custom CSS! 🎉

---

## Summary

- **Quick & Vue**: @n8n/chat
- **Full Control**: @n8n/chat-headless-svelte  
- **Professional & Fast**: @n8n/chat-styled-svelte ⭐

All three share the same backend API and work with n8n Chat Trigger workflows!
