<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		renderHeader?: Snippet;
		renderBody?: Snippet;
		renderFooter?: Snippet;
	}

	let { renderHeader, renderBody, renderFooter }: Props = $props();
</script>

<div class="chat-layout">
	{#if renderHeader}
		<div class="chat-header">
			{@render renderHeader()}
		</div>
	{/if}

	{#if renderBody}
		<div class="chat-body">
			{@render renderBody()}
		</div>
	{/if}

	{#if renderFooter}
		<div class="chat-footer">
			{@render renderFooter()}
		</div>
	{/if}
</div>

<style>
	/* Minimal structural styles - user controls all styling via CSS */
	.chat-layout {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.chat-header {
		flex-shrink: 0;
	}

	.chat-body {
		flex: 1;
		overflow-y: auto;
	}

	.chat-footer {
		flex-shrink: 0;
	}
</style>
