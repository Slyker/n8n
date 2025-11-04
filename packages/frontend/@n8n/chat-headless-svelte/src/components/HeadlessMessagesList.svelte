<script lang="ts" context="module">
	import type { ChatMessage } from '../types';
	import type { ChatStore } from '../stores';
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		renderMessage?: Snippet<[ChatMessage]>;
		renderTyping?: Snippet;
		renderEmpty?: Snippet;
	}

	let { renderMessage, renderTyping, renderEmpty }: Props = $props();

	const chatStore = getContext<ChatStore>('chatStore');
	const { messages, waitingForResponse, initialMessages } = chatStore;

	// Combine initial messages with chat messages
	const allMessages = $derived([...$initialMessages, ...$messages]);
</script>

{#if allMessages.length === 0}
	{#if renderEmpty}
		{@render renderEmpty()}
	{:else}
		<div>No messages yet</div>
	{/if}
{:else}
	{#each allMessages as message (message.id)}
		{#if renderMessage}
			{@render renderMessage(message)}
		{:else}
			<div>
				<strong>{message.sender}:</strong> {message.text}
			</div>
		{/if}
	{/each}
	
	{#if $waitingForResponse}
		{#if renderTyping}
			{@render renderTyping()}
		{:else}
			<div>Typing...</div>
		{/if}
	{/if}
{/if}
