# Side-by-Side Comparison: Vue @n8n/chat vs Svelte @n8n/chat-headless-svelte

This document shows how the same chat functionality is implemented in both packages.

## Example: Basic Chat with Custom Message Styling

### Vue (@n8n/chat)

```html
<!-- App.vue -->
<script setup lang="ts">
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';
import { onMounted } from 'vue';

onMounted(() => {
  createChat({
    webhookUrl: 'YOUR_WEBHOOK_URL',
    initialMessages: ['Hello! How can I help?'],
    mode: 'fullscreen'
  });
});
</script>

<template>
  <div id="n8n-chat"></div>
</template>

<style>
/* Override CSS variables for customization */
:root {
  --chat--color--primary: #667eea;
  --chat--message--bot--background: #f3f4f6;
  --chat--message--user--background: #667eea;
  --chat--message--padding: 12px 16px;
  --chat--message--border-radius: 12px;
}

/* Limited ability to customize structure */
.chat-message-from-user {
  max-width: 70% !important;
}
</style>
```

**Pros:**
- Quick setup with `createChat()`
- Pre-styled, looks good out of the box
- CSS variable theming

**Cons:**
- Limited customization
- Need `!important` to override some styles
- Bundle includes all styles whether you use them or not
- Tied to Vue framework

### Svelte (@n8n/chat-headless-svelte)

```svelte
<!-- Chat.svelte -->
<script lang="ts">
  import {
    HeadlessChat,
    HeadlessLayout,
    HeadlessMessagesList,
    HeadlessInput,
  } from '@n8n/chat-headless-svelte';
  import type { ChatOptions } from '@n8n/chat-headless-svelte';

  const options: ChatOptions = {
    webhookUrl: 'YOUR_WEBHOOK_URL',
    initialMessages: ['Hello! How can I help?'],
  };
</script>

<HeadlessChat {options}>
  {#snippet children(chatStore)}
    <HeadlessLayout>
      {#snippet renderHeader()}
        <header class="header">
          <h1>Chat Support</h1>
          <p>We're here to help</p>
        </header>
      {/snippet}

      {#snippet renderBody()}
        <div class="messages-container">
          <HeadlessMessagesList>
            {#snippet renderMessage(message)}
              <div class="message {message.sender}">
                <div class="avatar">
                  {#if message.sender === 'bot'}
                    🤖
                  {:else}
                    👤
                  {/if}
                </div>
                <div class="bubble">
                  <p>{message.text}</p>
                </div>
              </div>
            {/snippet}

            {#snippet renderTyping()}
              <div class="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            {/snippet}
          </HeadlessMessagesList>
        </div>
      {/snippet}

      {#snippet renderFooter()}
        <div class="input-area">
          <HeadlessInput>
            {#snippet renderInput({ value, disabled, onInput, onKeyDown })}
              <input
                type="text"
                {value}
                {disabled}
                oninput={onInput}
                onkeydown={onKeyDown}
                placeholder="Type a message..."
                class="message-input"
              />
            {/snippet}

            {#snippet renderSubmitButton({ disabled, onClick })}
              <button {disabled} onclick={onClick} class="send-button">
                Send
              </button>
            {/snippet}
          </HeadlessInput>
        </div>
      {/snippet}
    </HeadlessLayout>
  {/snippet}
</HeadlessChat>

<style>
  /* Complete control over all styles */
  .header {
    padding: 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
  }

  .header h1 {
    margin: 0 0 8px 0;
    font-size: 24px;
    font-weight: 600;
  }

  .messages-container {
    padding: 20px;
    height: 500px;
    overflow-y: auto;
    background: white;
  }

  .message {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    align-items: flex-start;
  }

  .message.user {
    flex-direction: row-reverse;
  }

  .avatar {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .bubble {
    max-width: 70%;
    padding: 12px 16px;
    border-radius: 12px;
  }

  .message.user .bubble {
    background: #667eea;
    color: white;
    border-bottom-right-radius: 4px;
  }

  .message.bot .bubble {
    background: #f3f4f6;
    color: #1f2937;
    border-bottom-left-radius: 4px;
  }

  .typing-indicator {
    display: flex;
    gap: 4px;
    padding: 12px;
  }

  .typing-indicator span {
    width: 8px;
    height: 8px;
    background: #9ca3af;
    border-radius: 50%;
    animation: bounce 1.4s infinite;
  }

  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }

  .input-area {
    padding: 16px;
    background: white;
    border-top: 1px solid #e5e7eb;
    display: flex;
    gap: 8px;
  }

  .message-input {
    flex: 1;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
  }

  .message-input:focus {
    outline: none;
    border-color: #667eea;
  }

  .send-button {
    padding: 12px 24px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
  }

  .send-button:hover:not(:disabled) {
    background: #5568d3;
  }

  .send-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
```

**Pros:**
- Complete control over HTML structure
- No CSS conflicts or overrides needed
- Can add avatars, timestamps, custom layouts easily
- Smaller bundle (no unused styles)
- Framework agnostic (Svelte)

**Cons:**
- More verbose setup
- Need to write all styles yourself
- Takes more time initially

## Feature Comparison

| Feature | @n8n/chat | @n8n/chat-headless-svelte |
|---------|-----------|---------------------------|
| Setup time | ⚡ Fast | 🐌 Slower |
| Customization | 🔧 Limited | 🎨 Complete |
| Bundle size | 📦 ~150KB | 📦 ~30KB |
| Styling approach | CSS variables | Custom CSS |
| Structure changes | ❌ Difficult | ✅ Easy |
| Design system fit | 🎯 Generic | 🎯 Perfect match |
| Learning curve | 📚 Low | 📚 Medium |

## When to Use Which?

### Use @n8n/chat if:
- You need a working chat in 5 minutes
- Default design is acceptable
- You're already using Vue
- You want something that "just works"

### Use @n8n/chat-headless-svelte if:
- You have specific design requirements
- You need to match existing design system
- You want maximum flexibility
- Bundle size matters
- You're using Svelte or want framework flexibility

## Migration Example

If you start with @n8n/chat and later need more customization, here's how to migrate:

1. **Identify your current customizations** (CSS variables, overrides)
2. **Map Vue templates to Svelte snippets**
3. **Recreate styles** with full control
4. **Test all interactions** (send, typing, files, etc.)

The API and functionality remain the same, only the rendering layer changes.
