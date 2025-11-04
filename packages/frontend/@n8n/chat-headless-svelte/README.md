# @n8n/chat-headless-svelte

A headless Svelte chat library based on [@n8n/chat](../chat) with full styling control via Svelte 5 snippets. This library provides the chat functionality and state management while giving you complete control over the UI through snippets.

## Features

- 🎨 **Headless Components** - Full styling control using Svelte 5 snippets
- 🔄 **Streaming Support** - Real-time streaming responses from n8n workflows
- 💬 **WebSocket Support** - Live chat with n8n Chat nodes
- 📁 **File Upload** - Support for file uploads in chat
- 💾 **Session Management** - Automatic session persistence with localStorage
- 🎯 **TypeScript** - Fully typed with TypeScript
- 🪶 **Lightweight** - Minimal dependencies, zero styling opinions

## Prerequisites

Create an n8n workflow triggered by a **Chat Trigger** node. Add your domain to the **Allowed Origins (CORS)** field.

[See example workflow](https://github.com/n8n-io/n8n/blob/master/packages/%40n8n/chat/resources/workflow.json)

For streaming responses, enable **Streaming response** in the Chat Trigger node.

## Installation

```bash
npm install @n8n/chat-headless-svelte
# or
pnpm add @n8n/chat-headless-svelte
```

## Usage

### Basic Example

```svelte
<script lang="ts">
	import { HeadlessChat, HeadlessMessagesList, HeadlessInput } from '@n8n/chat-headless-svelte';
	import type { ChatOptions } from '@n8n/chat-headless-svelte';

	const options: ChatOptions = {
		webhookUrl: 'YOUR_PRODUCTION_WEBHOOK_URL',
		initialMessages: ['Hi there! 👋', 'How can I assist you today?'],
	};
</script>

<HeadlessChat {options}>
	{#snippet children(chatStore)}
		<div class="chat-container">
			<HeadlessMessagesList>
				{#snippet renderMessage(message)}
					<div class="message {message.sender}">
						<p>{message.text}</p>
					</div>
				{/snippet}
				
				{#snippet renderTyping()}
					<div class="typing-indicator">Typing...</div>
				{/snippet}
			</HeadlessMessagesList>

			<HeadlessInput placeholder="Type your message..." />
		</div>
	{/snippet}
</HeadlessChat>

<style>
	.chat-container {
		height: 600px;
		display: flex;
		flex-direction: column;
		border: 1px solid #ddd;
		border-radius: 8px;
	}

	.message {
		padding: 12px;
		margin: 8px;
		border-radius: 8px;
	}

	.message.user {
		background: #007bff;
		color: white;
		margin-left: auto;
		max-width: 70%;
	}

	.message.bot {
		background: #f1f1f1;
		max-width: 70%;
	}

	.typing-indicator {
		padding: 12px;
		color: #888;
		font-style: italic;
	}
</style>
```

### Advanced Example with Layout

```svelte
<script lang="ts">
	import {
		HeadlessChat,
		HeadlessLayout,
		HeadlessMessagesList,
		HeadlessInput,
	} from '@n8n/chat-headless-svelte';
	import type { ChatOptions } from '@n8n/chat-headless-svelte';

	const options: ChatOptions = {
		webhookUrl: 'YOUR_PRODUCTION_WEBHOOK_URL',
		enableStreaming: true,
		allowFileUploads: true,
		initialMessages: ['Welcome! How can I help you?'],
	};
</script>

<HeadlessChat {options}>
	{#snippet children(chatStore)}
		<HeadlessLayout>
			{#snippet renderHeader()}
				<div class="chat-header">
					<h1>Customer Support</h1>
					<p>We're here to help 24/7</p>
				</div>
			{/snippet}

			{#snippet renderBody()}
				<div class="messages-container">
					<HeadlessMessagesList>
						{#snippet renderMessage(message)}
							<div class="message-wrapper {message.sender}">
								<div class="message-content">
									{@html message.text}
								</div>
								{#if message.files && message.files.length > 0}
									<div class="message-files">
										{#each message.files as file}
											<span class="file-badge">{file.name}</span>
										{/each}
									</div>
								{/if}
							</div>
						{/snippet}

						{#snippet renderTyping()}
							<div class="typing">
								<span></span><span></span><span></span>
							</div>
						{/snippet}

						{#snippet renderEmpty()}
							<div class="empty-state">
								<p>No messages yet. Start a conversation!</p>
							</div>
						{/snippet}
					</HeadlessMessagesList>
				</div>
			{/snippet}

			{#snippet renderFooter()}
				<div class="input-container">
					<HeadlessInput placeholder="Type your message...">
						{#snippet renderInput({ value, disabled, onInput, onKeyDown })}
							<textarea
								{value}
								{disabled}
								oninput={onInput}
								onkeydown={onKeyDown}
								placeholder="Type your message..."
								rows="2"
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
	/* Your custom styles here */
	.chat-header {
		padding: 20px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}

	.messages-container {
		padding: 16px;
		flex: 1;
		overflow-y: auto;
	}

	.message-wrapper {
		margin-bottom: 16px;
		display: flex;
	}

	.message-wrapper.user {
		justify-content: flex-end;
	}

	.message-content {
		max-width: 70%;
		padding: 12px 16px;
		border-radius: 12px;
	}

	.message-wrapper.user .message-content {
		background: #667eea;
		color: white;
	}

	.message-wrapper.bot .message-content {
		background: #f3f4f6;
	}

	.input-container {
		padding: 16px;
		border-top: 1px solid #e5e7eb;
	}

	.send-button {
		padding: 10px 20px;
		background: #667eea;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}

	.send-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
```

## API Reference

### Components

#### HeadlessChat

The main wrapper component that initializes the chat store and provides context to child components.

**Props:**
- `options: ChatOptions` - Chat configuration options
- `children: Snippet<[ChatStore]>` - Render function that receives the chat store

#### HeadlessMessagesList

Renders the list of messages with full control over message rendering.

**Snippets:**
- `renderMessage?: Snippet<[ChatMessage]>` - Render function for each message
- `renderTyping?: Snippet` - Render function for typing indicator
- `renderEmpty?: Snippet` - Render function when no messages exist

#### HeadlessInput

Handles message input with customizable rendering.

**Props:**
- `placeholder?: string` - Input placeholder text

**Snippets:**
- `renderInput?: Snippet<[InputProps]>` - Custom input rendering
- `renderSubmitButton?: Snippet<[ButtonProps]>` - Custom submit button rendering

#### HeadlessLayout

Provides basic layout structure with header, body, and footer sections.

**Snippets:**
- `renderHeader?: Snippet` - Custom header rendering
- `renderBody?: Snippet` - Custom body rendering
- `renderFooter?: Snippet` - Custom footer rendering

### Types

#### ChatOptions

```typescript
interface ChatOptions {
	webhookUrl: string;
	webhookConfig?: {
		method?: 'GET' | 'POST';
		headers?: Record<string, string>;
	};
	mode?: 'window' | 'fullscreen';
	showWelcomeScreen?: boolean;
	loadPreviousSession?: boolean;
	chatInputKey?: string;
	chatSessionKey?: string;
	defaultLanguage?: 'en';
	initialMessages?: string[];
	metadata?: Record<string, unknown>;
	i18n?: Record<string, Record<string, string>>;
	disabled?: boolean;
	allowFileUploads?: boolean;
	allowedFilesMimeTypes?: string;
	enableStreaming?: boolean;
}
```

#### ChatMessage

```typescript
interface ChatMessage {
	id: string;
	text?: string;
	sender: 'user' | 'bot';
	files?: File[];
	transparent?: boolean;
	type?: 'text' | 'component';
}
```

#### ChatStore

```typescript
interface ChatStore {
	// Stores
	messages: Writable<ChatMessage[]>;
	currentSessionId: Writable<string | null>;
	waitingForResponse: Writable<boolean>;
	initialMessages: Readable<ChatMessage[]>;
	ws: Writable<WebSocket | null>;

	// Methods
	loadPreviousSession(): Promise<string | undefined>;
	startNewSession(): Promise<void>;
	sendMessage(text: string, files?: File[]): Promise<SendMessageResponse | null>;
	closeWebSocket(): void;
}
```

## Accessing the Chat Store

The `HeadlessChat` component provides access to the chat store through its children snippet:

```svelte
<HeadlessChat {options}>
	{#snippet children(chatStore)}
		<!-- Access store values with $ prefix -->
		<p>Session ID: {$chatStore.currentSessionId}</p>
		<p>Messages: {$chatStore.messages.length}</p>
		
		<!-- Call store methods -->
		<button onclick={() => chatStore.startNewSession()}>
			New Session
		</button>
	{/snippet}
</HeadlessChat>
```

## Comparison with @n8n/chat

| Feature | @n8n/chat | @n8n/chat-headless-svelte |
|---------|-----------|---------------------------|
| Framework | Vue 3 | Svelte 5 |
| Styling | CSS Variables | Fully custom via snippets |
| Components | Pre-styled | Headless (unstyled) |
| Customization | CSS overrides | Complete control |
| Bundle Size | Larger (includes Vue + styles) | Smaller (no styling) |
| Use Case | Quick integration | Full design control |

## Examples

See the `examples/` directory for more examples:
- Basic chat
- Custom styled chat
- File upload chat
- Streaming chat
- Multi-theme chat

## Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Run tests
pnpm test

# Type check
pnpm typecheck
```

## License

Same license as n8n - see [LICENSE](https://github.com/n8n-io/n8n/blob/master/README.md#license)
