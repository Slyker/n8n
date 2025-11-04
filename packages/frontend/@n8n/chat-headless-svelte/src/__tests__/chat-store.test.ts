import { describe, it, expect } from 'vitest';
import { createChatStore } from '../stores/chat';
import type { ChatOptions } from '../types';

describe('ChatStore', () => {
	it('should create a chat store with initial state', () => {
		const options: ChatOptions = {
			webhookUrl: 'http://localhost:5678/webhook/test',
			initialMessages: ['Hello!'],
		};

		const store = createChatStore(options);

		expect(store).toBeDefined();
		expect(store.messages).toBeDefined();
		expect(store.currentSessionId).toBeDefined();
		expect(store.waitingForResponse).toBeDefined();
	});

	it('should start a new session', async () => {
		const options: ChatOptions = {
			webhookUrl: 'http://localhost:5678/webhook/test',
		};

		const store = createChatStore(options);
		
		await store.startNewSession();

		// Get the current value from the store
		let sessionId: string | null = null;
		store.currentSessionId.subscribe((value) => {
			sessionId = value;
		})();

		expect(sessionId).toBeTruthy();
		expect(typeof sessionId).toBe('string');
	});
});
