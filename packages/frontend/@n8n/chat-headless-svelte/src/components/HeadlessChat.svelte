<script lang="ts" context="module">
	import type { ChatOptions } from '../types';
	import type { ChatStore } from '../stores';
</script>

<script lang="ts">
	import { setContext, onMount } from 'svelte';
	import { createChatStore } from '../stores/chat';
	import type { Snippet } from 'svelte';

	interface Props {
		options: ChatOptions;
		children: Snippet<[ChatStore]>;
	}

	let { options, children }: Props = $props();

	// Create the chat store
	const chatStore = createChatStore(options);

	// Provide the store to child components via context
	setContext('chatStore', chatStore);

	// Initialize on mount
	onMount(async () => {
		if (options.loadPreviousSession) {
			await chatStore.loadPreviousSession();
		}
		if (!options.showWelcomeScreen && !$chatStore.currentSessionId) {
			await chatStore.startNewSession();
		}
	});
</script>

{@render children(chatStore)}
