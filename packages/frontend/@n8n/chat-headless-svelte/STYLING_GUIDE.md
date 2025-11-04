# Styling Guide - Headless Components with Svelte 5 Snippets

## What is "Headless"?

A **headless component** provides functionality and state management without any built-in styling or UI. Instead of giving you a pre-styled chat interface, `@n8n/chat-headless-svelte` gives you:

- ✅ **Logic**: Message handling, API integration, session management
- ✅ **State**: Reactive stores for messages, loading states, etc.
- ✅ **Structure**: Component hierarchy and data flow
- ❌ **NO Styling**: Zero CSS, no opinions on how things should look

This means **YOU** have complete control over every pixel of your chat interface.

## Why Headless?

### Traditional Styled Components
```svelte
<!-- Pre-styled component - limited customization -->
<StyledChat theme="blue" />
<!-- You're stuck with their design choices -->
```

### Headless Components
```svelte
<!-- Headless component - infinite customization -->
<HeadlessChat>
  {#snippet children(chatStore)}
    <!-- Build ANY design you want -->
    <YourCustomUI />
  {/snippet}
</HeadlessChat>
```

**Benefits:**
- 🎨 Complete design freedom
- 📦 Smaller bundle size (no CSS included)
- 🎯 Perfect design system integration
- 🔄 Easy theme switching
- 🏢 Match your brand exactly

## How Svelte 5 Snippets Work

Svelte 5 introduced **snippets** as a powerful way to render custom UI within components. Think of snippets as "render props" or "slots with parameters".

### Basic Snippet Syntax

```svelte
<Component>
  {#snippet snippetName(parameter)}
    <!-- Your custom HTML using parameter -->
    <div>{parameter.value}</div>
  {/snippet}
</Component>
```

### In Chat Context

```svelte
<HeadlessMessagesList>
  {#snippet renderMessage(message)}
    <!-- 'message' is passed to you by the component -->
    <div class="my-custom-message">
      <p>{message.text}</p>
      <span>{message.sender}</span>
    </div>
  {/snippet}
</HeadlessMessagesList>
```

The component handles **WHEN** to render (logic), you control **HOW** to render (styling).

## Complete Styling Control

### Level 1: Minimal Styling (Quick Start)

```svelte
<script lang="ts">
  import { HeadlessChat, HeadlessMessagesList, HeadlessInput } 
    from '@n8n/chat-headless-svelte';
  
  const options = { webhookUrl: 'YOUR_URL' };
</script>

<HeadlessChat {options}>
  {#snippet children(chatStore)}
    <div style="max-width: 600px; margin: auto;">
      
      <HeadlessMessagesList>
        {#snippet renderMessage(message)}
          <p>{message.text}</p>
        {/snippet}
      </HeadlessMessagesList>
      
      <HeadlessInput />
      
    </div>
  {/snippet}
</HeadlessChat>

<style>
  /* Minimal inline or scoped styles */
</style>
```

### Level 2: Custom Styled (Recommended)

```svelte
<script lang="ts">
  import { HeadlessChat, HeadlessMessagesList, HeadlessInput } 
    from '@n8n/chat-headless-svelte';
  
  const options = { webhookUrl: 'YOUR_URL' };
</script>

<HeadlessChat {options}>
  {#snippet children(chatStore)}
    
    <div class="chat-container">
      <HeadlessMessagesList>
        {#snippet renderMessage(message)}
          <div class="message message--{message.sender}">
            <div class="message__avatar">
              {message.sender === 'user' ? '👤' : '🤖'}
            </div>
            <div class="message__bubble">
              <p class="message__text">{message.text}</p>
              <time class="message__time">
                {new Date().toLocaleTimeString()}
              </time>
            </div>
          </div>
        {/snippet}
        
        {#snippet renderTyping()}
          <div class="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        {/snippet}
      </HeadlessMessagesList>
      
      <HeadlessInput placeholder="Type a message...">
        {#snippet renderInput({ value, disabled, onInput, onKeyDown })}
          <input 
            class="chat-input"
            type="text"
            {value}
            {disabled}
            oninput={onInput}
            onkeydown={onKeyDown}
            placeholder="Type a message..."
          />
        {/snippet}
        
        {#snippet renderSubmitButton({ disabled, onClick })}
          <button 
            class="send-button"
            {disabled} 
            onclick={onClick}
          >
            <svg><!-- Send icon --></svg>
          </button>
        {/snippet}
      </HeadlessInput>
      
    </div>
    
  {/snippet}
</HeadlessChat>

<style>
  .chat-container {
    /* Your CSS framework classes or custom styles */
    /* Tailwind, Bootstrap, Material, custom CSS - anything! */
  }
  
  .message {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .message--user {
    flex-direction: row-reverse;
  }
  
  .message__bubble {
    background: white;
    border-radius: 12px;
    padding: 12px 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .message--user .message__bubble {
    background: #007bff;
    color: white;
  }
  
  /* ... more custom styles ... */
</style>
```

### Level 3: Design System Integration

```svelte
<script lang="ts">
  import { HeadlessChat, HeadlessMessagesList, HeadlessInput } 
    from '@n8n/chat-headless-svelte';
  import { Card, Avatar, Input, Button } from '$lib/design-system';
  
  const options = { webhookUrl: 'YOUR_URL' };
</script>

<HeadlessChat {options}>
  {#snippet children(chatStore)}
    
    <Card variant="elevated" class="h-screen flex flex-col">
      
      <HeadlessMessagesList>
        {#snippet renderMessage(message)}
          <div class="flex gap-3 {message.sender === 'user' ? 'flex-row-reverse' : ''}">
            <Avatar 
              src={message.sender === 'user' ? userAvatar : botAvatar}
              size="sm"
            />
            <Card 
              variant={message.sender === 'user' ? 'primary' : 'secondary'}
              class="max-w-[70%]"
            >
              {message.text}
            </Card>
          </div>
        {/snippet}
      </HeadlessMessagesList>
      
      <HeadlessInput>
        {#snippet renderInput(props)}
          <Input {...props} variant="chat" />
        {/snippet}
        
        {#snippet renderSubmitButton(props)}
          <Button {...props} variant="primary" icon="send" />
        {/snippet}
      </HeadlessInput>
      
    </Card>
    
  {/snippet}
</HeadlessChat>
```

## Available Snippets by Component

### HeadlessChat

**Children Snippet:**
```svelte
{#snippet children(chatStore)}
  <!-- Access the entire chat store -->
  <div>Messages: {$chatStore.messages.length}</div>
  <button onclick={() => chatStore.startNewSession()}>New Chat</button>
{/snippet}
```

**Provided Data:**
- `chatStore` - Complete reactive store with messages, session, methods

### HeadlessMessagesList

**renderMessage Snippet:**
```svelte
{#snippet renderMessage(message)}
  <!-- message: ChatMessage object -->
  <div>
    <p>{message.text}</p>
    <small>{message.sender}</small>
    {#if message.files}
      <FileList files={message.files} />
    {/if}
  </div>
{/snippet}
```

**Provided Data:**
- `message.id` - Unique message ID
- `message.text` - Message content
- `message.sender` - 'user' | 'bot'
- `message.files` - Attached files (if any)

**renderTyping Snippet:**
```svelte
{#snippet renderTyping()}
  <!-- Show when bot is typing -->
  <div class="typing-animation">...</div>
{/snippet}
```

**renderEmpty Snippet:**
```svelte
{#snippet renderEmpty()}
  <!-- Show when no messages -->
  <div>No messages yet. Start chatting!</div>
{/snippet}
```

### HeadlessInput

**renderInput Snippet:**
```svelte
{#snippet renderInput({ value, disabled, onInput, onKeyDown })}
  <input
    type="text"
    {value}
    {disabled}
    oninput={onInput}
    onkeydown={onKeyDown}
  />
{/snippet}
```

**Provided Data:**
- `value` - Current input value
- `disabled` - Whether input is disabled
- `onInput` - Input change handler
- `onKeyDown` - Key press handler (handles Enter)

**renderSubmitButton Snippet:**
```svelte
{#snippet renderSubmitButton({ disabled, onClick })}
  <button {disabled} onclick={onClick}>
    Send
  </button>
{/snippet}
```

**Provided Data:**
- `disabled` - Whether button is disabled
- `onClick` - Click handler to send message

### HeadlessLayout

**renderHeader Snippet:**
```svelte
{#snippet renderHeader()}
  <header>
    <h1>Chat</h1>
  </header>
{/snippet}
```

**renderBody Snippet:**
```svelte
{#snippet renderBody()}
  <main>
    <!-- Put HeadlessMessagesList here -->
  </main>
{/snippet}
```

**renderFooter Snippet:**
```svelte
{#snippet renderFooter()}
  <footer>
    <!-- Put HeadlessInput here -->
  </footer>
{/snippet}
```

## Styling Examples

### Example 1: Minimal Chat (No CSS Framework)

```svelte
<script lang="ts">
  import { HeadlessChat, HeadlessMessagesList, HeadlessInput } 
    from '@n8n/chat-headless-svelte';
  
  const options = { webhookUrl: 'YOUR_URL' };
</script>

<HeadlessChat {options}>
  {#snippet children(chatStore)}
    <div class="chat">
      <HeadlessMessagesList>
        {#snippet renderMessage(message)}
          <div class="msg {message.sender}">
            {message.text}
          </div>
        {/snippet}
      </HeadlessMessagesList>
      <HeadlessInput />
    </div>
  {/snippet}
</HeadlessChat>

<style>
  .chat {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .msg { padding: 8px; margin: 4px; border-radius: 4px; }
  .msg.user { background: #007bff; color: white; margin-left: auto; }
  .msg.bot { background: #f0f0f0; margin-right: auto; }
</style>
```

### Example 2: Tailwind CSS

```svelte
<HeadlessChat {options}>
  {#snippet children(chatStore)}
    <div class="flex flex-col h-screen bg-gray-100">
      
      <HeadlessMessagesList>
        {#snippet renderMessage(message)}
          <div class="flex {message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4">
            <div class="max-w-xs px-4 py-2 rounded-lg {
              message.sender === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-800 shadow'
            }">
              {message.text}
            </div>
          </div>
        {/snippet}
      </HeadlessMessagesList>
      
      <HeadlessInput>
        {#snippet renderInput(props)}
          <input {...props} class="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {/snippet}
        
        {#snippet renderSubmitButton(props)}
          <button {...props} class="px-6 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 disabled:opacity-50">
            Send
          </button>
        {/snippet}
      </HeadlessInput>
      
    </div>
  {/snippet}
</HeadlessChat>
```

### Example 3: Material Design (Custom)

```svelte
<HeadlessChat {options}>
  {#snippet children(chatStore)}
    <div class="mdc-chat">
      
      <HeadlessMessagesList>
        {#snippet renderMessage(message)}
          <div class="mdc-message mdc-elevation--2 {message.sender}">
            <div class="mdc-message__avatar">
              <span class="material-icons">
                {message.sender === 'user' ? 'person' : 'smart_toy'}
              </span>
            </div>
            <div class="mdc-message__content">
              <div class="mdc-typography--body1">{message.text}</div>
            </div>
          </div>
        {/snippet}
        
        {#snippet renderTyping()}
          <div class="mdc-linear-progress mdc-linear-progress--indeterminate">
            <div class="mdc-linear-progress__bar"></div>
          </div>
        {/snippet}
      </HeadlessMessagesList>
      
      <HeadlessInput>
        {#snippet renderInput(props)}
          <div class="mdc-text-field mdc-text-field--filled">
            <input class="mdc-text-field__input" {...props} />
            <label class="mdc-floating-label">Type a message</label>
          </div>
        {/snippet}
        
        {#snippet renderSubmitButton(props)}
          <button class="mdc-button mdc-button--raised" {...props}>
            <span class="material-icons">send</span>
          </button>
        {/snippet}
      </HeadlessInput>
      
    </div>
  {/snippet}
</HeadlessChat>

<style>
  /* Material Design CSS */
  @import '@material/button/mdc-button.css';
  @import '@material/textfield/mdc-text-field.css';
  /* ... */
</style>
```

## Advanced Styling Patterns

### Pattern 1: Theme Switching

```svelte
<script lang="ts">
  import { HeadlessChat, HeadlessMessagesList, HeadlessInput } 
    from '@n8n/chat-headless-svelte';
  
  let theme = $state<'light' | 'dark'>('light');
  
  const options = { webhookUrl: 'YOUR_URL' };
</script>

<div class="chat-wrapper theme-{theme}">
  <button onclick={() => theme = theme === 'light' ? 'dark' : 'light'}>
    Toggle Theme
  </button>
  
  <HeadlessChat {options}>
    {#snippet children(chatStore)}
      <HeadlessMessagesList>
        {#snippet renderMessage(message)}
          <div class="message {message.sender}">
            {message.text}
          </div>
        {/snippet}
      </HeadlessMessagesList>
      <HeadlessInput />
    {/snippet}
  </HeadlessChat>
</div>

<style>
  .theme-light { --bg: white; --text: black; --accent: #007bff; }
  .theme-dark { --bg: #1a1a1a; --text: white; --accent: #4dabf7; }
  
  .chat-wrapper {
    background: var(--bg);
    color: var(--text);
  }
  
  .message { background: var(--accent); }
</style>
```

### Pattern 2: Responsive Design

```svelte
<HeadlessChat {options}>
  {#snippet children(chatStore)}
    <div class="chat-container">
      
      <HeadlessMessagesList>
        {#snippet renderMessage(message)}
          <div class="message {message.sender}">
            <div class="message-content">
              {message.text}
            </div>
          </div>
        {/snippet}
      </HeadlessMessagesList>
      
      <HeadlessInput />
      
    </div>
  {/snippet}
</HeadlessChat>

<style>
  .chat-container {
    height: 100vh;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .message-content {
    max-width: 70%;
  }
  
  @media (max-width: 768px) {
    .chat-container {
      max-width: 100%;
    }
    
    .message-content {
      max-width: 85%;
    }
  }
  
  @media (max-width: 480px) {
    .message-content {
      max-width: 90%;
      font-size: 14px;
    }
  }
</style>
```

### Pattern 3: Animation

```svelte
<HeadlessMessagesList>
  {#snippet renderMessage(message)}
    <div class="message animate-slide-in" data-sender={message.sender}>
      {message.text}
    </div>
  {/snippet}
  
  {#snippet renderTyping()}
    <div class="typing-indicator animate-fade-in">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  {/snippet}
</HeadlessMessagesList>

<style>
  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
  
  .animate-slide-in {
    animation: slide-in 0.3s ease-out;
  }
  
  .animate-fade-in {
    animation: fade-in 0.5s ease-in;
  }
  
  .typing-indicator {
    display: flex;
    gap: 4px;
  }
  
  .dot {
    width: 8px;
    height: 8px;
    background: #999;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
  }
  
  .dot:nth-child(1) { animation-delay: -0.32s; }
  .dot:nth-child(2) { animation-delay: -0.16s; }
  .dot:nth-child(3) { animation-delay: 0s; }
</style>
```

## Best Practices

### ✅ DO

- Use semantic HTML in your snippets
- Keep styling in `<style>` blocks or CSS modules
- Use CSS variables for theming
- Make your chat responsive
- Add accessibility attributes (ARIA)
- Test with different content lengths

### ❌ DON'T

- Don't use inline styles unless necessary
- Don't fight the component's data flow
- Don't mutate the message objects directly
- Don't forget loading and empty states
- Don't skip responsive design

## Comparison: Styled vs Headless

### Styled Component Approach (@n8n/chat)
```svelte
<Chat theme="blue" />
<!-- You get this exact design, limited customization -->
```

### Headless Component Approach (@n8n/chat-headless-svelte)
```svelte
<HeadlessChat>
  {#snippet children(chatStore)}
    <!-- Build ANYTHING you want -->
    <YourCustomDesign />
  {/snippet}
</HeadlessChat>
```

**When to use Headless:**
- You have a design system to follow
- You need pixel-perfect brand alignment
- You want full control over UX/UI
- You're building a custom chat experience

**When to use Styled:**
- You want quick integration
- You're okay with the default design
- You only need minor customization via CSS variables

## Summary

**Headless components with Svelte 5 snippets give you:**

1. **Complete Control**: Style every element exactly how you want
2. **Framework Agnostic**: Works with Tailwind, Bootstrap, Material, or custom CSS
3. **Smaller Bundles**: No CSS included means smaller package size
4. **Better Integration**: Matches your existing design system perfectly
5. **Future Proof**: Easy to update styles without touching the library

The library handles the **logic**, you handle the **look**. Perfect separation of concerns! 🎨
