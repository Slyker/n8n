<script lang="ts">
	import { AIChat } from '../src/index';
	import type { ChatOptions } from '../src/index';

	const lightOptions: ChatOptions = {
		webhookUrl: 'YOUR_PRODUCTION_WEBHOOK_URL',
		initialMessages: [
			'Hello! 👋',
			'I\'m your AI assistant. How can I help you today?',
		],
		enableStreaming: true,
		loadPreviousSession: false,
	};

	const darkOptions: ChatOptions = {
		webhookUrl: 'YOUR_PRODUCTION_WEBHOOK_URL',
		initialMessages: [
			'Welcome to Dark Mode! 🌙',
			'I\'m here to assist you. What would you like to know?',
		],
		enableStreaming: true,
		loadPreviousSession: false,
	};

	let selectedDemo = $state<'light' | 'dark' | 'custom'>('light');
</script>

<div class="demo-container">
	<header class="demo-header">
		<h1>@n8n/chat-styled-svelte Demo</h1>
		<p>Professional AI Chat Interface for n8n</p>
	</header>

	<div class="demo-controls">
		<button 
			class="demo-btn {selectedDemo === 'light' ? 'active' : ''}" 
			onclick={() => selectedDemo = 'light'}
		>
			Light Theme
		</button>
		<button 
			class="demo-btn {selectedDemo === 'dark' ? 'active' : ''}" 
			onclick={() => selectedDemo = 'dark'}
		>
			Dark Theme
		</button>
		<button 
			class="demo-btn {selectedDemo === 'custom' ? 'active' : ''}" 
			onclick={() => selectedDemo = 'custom'}
		>
			Custom Colors
		</button>
	</div>

	<div class="demo-content">
		{#if selectedDemo === 'light'}
			<div class="chat-wrapper">
				<AIChat 
					options={lightOptions} 
					title="AI Assistant" 
					subtitle="Powered by n8n"
					theme="light" 
				/>
			</div>
		{:else if selectedDemo === 'dark'}
			<div class="chat-wrapper">
				<AIChat 
					options={darkOptions} 
					title="Night Assistant" 
					subtitle="24/7 Support"
					theme="dark" 
				/>
			</div>
		{:else}
			<div class="chat-wrapper custom-theme">
				<AIChat 
					options={lightOptions} 
					title="Custom Assistant" 
					subtitle="Your Brand"
					theme="light" 
				/>
			</div>
		{/if}
	</div>

	<footer class="demo-footer">
		<p>
			Built with <a href="https://github.com/n8n-io/n8n" target="_blank">n8n</a> 
			and <a href="https://svelte.dev" target="_blank">Svelte 5</a>
		</p>
	</footer>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
		background: #f5f7fa;
	}

	.demo-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.demo-header {
		padding: 40px 20px;
		text-align: center;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}

	.demo-header h1 {
		margin: 0 0 10px;
		font-size: 32px;
		font-weight: 700;
	}

	.demo-header p {
		margin: 0;
		font-size: 18px;
		opacity: 0.9;
	}

	.demo-controls {
		display: flex;
		justify-content: center;
		gap: 12px;
		padding: 30px 20px;
	}

	.demo-btn {
		padding: 12px 24px;
		border: 2px solid #667eea;
		background: white;
		color: #667eea;
		border-radius: 8px;
		font-size: 15px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
	}

	.demo-btn:hover {
		background: #f0f4ff;
	}

	.demo-btn.active {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border-color: transparent;
	}

	.demo-content {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
	}

	.chat-wrapper {
		width: 100%;
		max-width: 500px;
		height: 700px;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}

	/* Custom theme override */
	.custom-theme :global(.ai-chat-container) {
		--ai-primary: #10b981;
		--ai-primary-dark: #059669;
		--ai-secondary: #3b82f6;
	}

	.demo-footer {
		padding: 30px 20px;
		text-align: center;
		background: white;
		border-top: 1px solid #e5e7eb;
	}

	.demo-footer p {
		margin: 0;
		color: #6b7280;
	}

	.demo-footer a {
		color: #667eea;
		text-decoration: none;
		font-weight: 500;
	}

	.demo-footer a:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.demo-controls {
			flex-direction: column;
			align-items: stretch;
			padding: 20px;
		}

		.chat-wrapper {
			height: 600px;
		}
	}
</style>
