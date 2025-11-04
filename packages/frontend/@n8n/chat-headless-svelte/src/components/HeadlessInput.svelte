<script lang="ts" context="module">
	import type { ChatStore } from '../stores';
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		placeholder?: string;
		renderInput?: Snippet<[{
			value: string;
			disabled: boolean;
			onInput: (e: Event) => void;
			onKeyDown: (e: KeyboardEvent) => void;
			onSubmit: () => void;
		}]>;
		renderSubmitButton?: Snippet<[{
			disabled: boolean;
			onClick: () => void;
		}]>;
	}

	let { 
		placeholder = 'Type your message...',
		renderInput,
		renderSubmitButton 
	}: Props = $props();

	const chatStore = getContext<ChatStore>('chatStore');
	const { waitingForResponse, currentSessionId } = chatStore;

	let inputValue = $state('');
	let files: FileList | null = $state(null);

	const isSubmitDisabled = $derived(
		inputValue.trim() === '' || $waitingForResponse
	);

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement | HTMLTextAreaElement;
		inputValue = target.value;
	}

	async function handleSubmit() {
		if (isSubmitDisabled) return;

		const messageText = inputValue;
		inputValue = '';

		const fileArray = files ? Array.from(files) : [];
		files = null;

		await chatStore.sendMessage(messageText, fileArray);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	}
</script>

{#if $currentSessionId}
	{#if renderInput}
		{@render renderInput({
			value: inputValue,
			disabled: $waitingForResponse,
			onInput: handleInput,
			onKeyDown: handleKeyDown,
			onSubmit: handleSubmit,
		})}
	{:else}
		<div>
			<input
				type="text"
				bind:value={inputValue}
				disabled={$waitingForResponse}
				placeholder={placeholder}
				onkeydown={handleKeyDown}
			/>
		</div>
	{/if}

	{#if renderSubmitButton}
		{@render renderSubmitButton({
			disabled: isSubmitDisabled,
			onClick: handleSubmit,
		})}
	{:else}
		<button disabled={isSubmitDisabled} onclick={handleSubmit}>
			Send
		</button>
	{/if}
{/if}
