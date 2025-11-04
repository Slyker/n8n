# Quick Start Guide

Get up and running with @n8n/chat-headless-svelte in 5 minutes.

## Prerequisites

1. A running n8n instance with a Chat Trigger workflow
2. The webhook URL from your Chat Trigger node
3. A Svelte 5 project (or create one)

## Step 1: Install the Package

```bash
npm install @n8n/chat-headless-svelte
# or
pnpm add @n8n/chat-headless-svelte
```

## Step 2: Create a Basic Chat Component

Create a new file `Chat.svelte`:

```svelte
<script lang="ts">
  import { HeadlessChat, HeadlessMessagesList, HeadlessInput } from '@n8n/chat-headless-svelte';
  import type { ChatOptions } from '@n8n/chat-headless-svelte';

  const options: ChatOptions = {
    webhookUrl: 'YOUR_WEBHOOK_URL_HERE', // Replace with your webhook URL
    initialMessages: ['Hi! How can I help you today?'],
  };
</script>

<div class="chat-container">
  <HeadlessChat {options}>
    {#snippet children(chatStore)}
      <div class="chat-box">
        <HeadlessMessagesList>
          {#snippet renderMessage(message)}
            <div class="message {message.sender}">
              {message.text}
            </div>
          {/snippet}
        </HeadlessMessagesList>

        <HeadlessInput placeholder="Type your message..." />
      </div>
    {/snippet}
  </HeadlessChat>
</div>

<style>
  .chat-container {
    max-width: 600px;
    margin: 0 auto;
    height: 600px;
  }

  .chat-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }

  .message {
    padding: 10px;
    margin: 5px;
    border-radius: 8px;
    max-width: 70%;
  }

  .message.user {
    background: #007bff;
    color: white;
    margin-left: auto;
  }

  .message.bot {
    background: #f1f1f1;
  }
</style>
```

## Step 3: Use the Component

In your main app file (e.g., `App.svelte`):

```svelte
<script>
  import Chat from './Chat.svelte';
</script>

<main>
  <h1>My Chat App</h1>
  <Chat />
</main>
```

## Step 4: Configure Your n8n Workflow

1. Open your n8n workflow
2. Add a **Chat Trigger** node
3. Add your domain to **Allowed Origins (CORS)**
4. Activate the workflow
5. Copy the webhook URL
6. Replace `YOUR_WEBHOOK_URL_HERE` in your Chat component

## Next Steps

### Add Streaming Responses

```svelte
<script lang="ts">
  const options: ChatOptions = {
    webhookUrl: 'YOUR_WEBHOOK_URL_HERE',
    enableStreaming: true, // Enable streaming
    initialMessages: ['Hi! How can I help you today?'],
  };
</script>
```

### Add File Uploads

```svelte
<script lang="ts">
  const options: ChatOptions = {
    webhookUrl: 'YOUR_WEBHOOK_URL_HERE',
    allowFileUploads: true, // Enable file uploads
    allowedFilesMimeTypes: 'image/*,application/pdf', // Optional: restrict file types
  };
</script>
```

### Customize the Layout

Add a header and footer:

```svelte
<HeadlessChat {options}>
  {#snippet children(chatStore)}
    <HeadlessLayout>
      {#snippet renderHeader()}
        <div class="header">
          <h2>Customer Support</h2>
        </div>
      {/snippet}

      {#snippet renderBody()}
        <HeadlessMessagesList>
          {#snippet renderMessage(message)}
            <div class="message {message.sender}">
              {message.text}
            </div>
          {/snippet}
        </HeadlessMessagesList>
      {/snippet}

      {#snippet renderFooter()}
        <HeadlessInput placeholder="Type your message..." />
      {/snippet}
    </HeadlessLayout>
  {/snippet}
</HeadlessChat>
```

### Add a Typing Indicator

```svelte
<HeadlessMessagesList>
  {#snippet renderMessage(message)}
    <div class="message {message.sender}">
      {message.text}
    </div>
  {/snippet}

  {#snippet renderTyping()}
    <div class="typing">
      <span>.</span><span>.</span><span>.</span>
    </div>
  {/snippet}
</HeadlessMessagesList>
```

## Common Issues

### CORS Errors
Make sure you've added your domain to the **Allowed Origins** in your Chat Trigger node.

### Messages Not Appearing
1. Check the browser console for errors
2. Verify your webhook URL is correct
3. Make sure your workflow is activated

### Streaming Not Working
1. Enable streaming in both the Chat Trigger node AND this library
2. Check that your n8n version supports streaming

## Advanced Usage

See the full [README.md](./README.md) for:
- Complete API reference
- Advanced examples
- TypeScript types
- State management details

## Get Help

- [n8n Community](https://community.n8n.io/)
- [n8n Documentation](https://docs.n8n.io/)
- [GitHub Issues](https://github.com/n8n-io/n8n/issues)
