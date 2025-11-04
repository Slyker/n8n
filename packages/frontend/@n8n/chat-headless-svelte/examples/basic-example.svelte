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
		initialMessages: ['Hi there! 👋', 'How can I assist you today?'],
		enableStreaming: false,
	};
</script>

<div class="app">
	<HeadlessChat {options}>
		{#snippet children(chatStore)}
			<HeadlessLayout>
				{#snippet renderHeader()}
					<header class="header">
						<h1>Chat Assistant</h1>
						<p>We're here to help</p>
					</header>
				{/snippet}

				{#snippet renderBody()}
					<div class="messages">
						<HeadlessMessagesList>
							{#snippet renderMessage(message)}
								<div class="message {message.sender}">
									<div class="message-content">
										<p>{message.text}</p>
									</div>
								</div>
							{/snippet}

							{#snippet renderTyping()}
								<div class="typing">
									<span></span><span></span><span></span>
								</div>
							{/snippet}
						</HeadlessMessagesList>
					</div>
				{/snippet}

				{#snippet renderFooter()}
					<div class="input-wrapper">
						<HeadlessInput placeholder="Type your message...">
							{#snippet renderInput({ value, disabled, onInput, onKeyDown })}
								<input
									type="text"
									{value}
									{disabled}
									oninput={onInput}
									onkeydown={onKeyDown}
									placeholder="Type your message..."
									class="input"
								/>
							{/snippet}

							{#snippet renderSubmitButton({ disabled, onClick })}
								<button {disabled} onclick={onClick} class="send-btn">
									Send
								</button>
							{/snippet}
						</HeadlessInput>
					</div>
				{/snippet}
			</HeadlessLayout>
		{/snippet}
	</HeadlessChat>
</div>

<style>
	.app {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #f5f5f5;
	}

	.header {
		padding: 24px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		text-align: center;
	}

	.header h1 {
		margin: 0 0 8px 0;
		font-size: 24px;
	}

	.header p {
		margin: 0;
		opacity: 0.9;
	}

	.messages {
		padding: 20px;
		height: 500px;
		overflow-y: auto;
		background: white;
	}

	.message {
		margin-bottom: 16px;
		display: flex;
	}

	.message.user {
		justify-content: flex-end;
	}

	.message-content {
		max-width: 70%;
		padding: 12px 16px;
		border-radius: 12px;
	}

	.message.user .message-content {
		background: #667eea;
		color: white;
	}

	.message.bot .message-content {
		background: #f3f4f6;
		color: #1f2937;
	}

	.typing {
		display: flex;
		gap: 4px;
		padding: 12px;
	}

	.typing span {
		width: 8px;
		height: 8px;
		background: #9ca3af;
		border-radius: 50%;
		animation: bounce 1.4s infinite ease-in-out both;
	}

	.typing span:nth-child(1) {
		animation-delay: -0.32s;
	}

	.typing span:nth-child(2) {
		animation-delay: -0.16s;
	}

	@keyframes bounce {
		0%, 80%, 100% {
			transform: scale(0);
		}
		40% {
			transform: scale(1);
		}
	}

	.input-wrapper {
		padding: 16px;
		background: white;
		border-top: 1px solid #e5e7eb;
		display: flex;
		gap: 8px;
	}

	.input {
		flex: 1;
		padding: 12px;
		border: 1px solid #d1d5db;
		border-radius: 8px;
		font-size: 14px;
		outline: none;
	}

	.input:focus {
		border-color: #667eea;
	}

	.send-btn {
		padding: 12px 24px;
		background: #667eea;
		color: white;
		border: none;
		border-radius: 8px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s;
	}

	.send-btn:hover:not(:disabled) {
		background: #5568d3;
	}

	.send-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
