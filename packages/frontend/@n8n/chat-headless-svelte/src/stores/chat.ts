import { writable, derived, get } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import * as api from '../api';
import type {
	ChatMessage,
	ChatMessageText,
	ChatOptions,
	SendMessageResponse,
} from '../types';

const LOCAL_STORAGE_SESSION_ID_KEY = 'n8n-chat-session-id';

/**
 * Creates a user message
 */
function createUserMessage(text: string, files: File[] = []): ChatMessage {
	return {
		id: uuidv4(),
		text,
		sender: 'user',
		files,
	};
}

/**
 * Creates a bot message
 */
function createBotMessage(text: string = ''): ChatMessageText {
	return {
		id: uuidv4(),
		text,
		sender: 'bot',
	};
}

/**
 * Process message response
 */
function processMessageResponse(response: SendMessageResponse): string {
	let textMessage = response.output ?? response.text ?? response.message ?? '';

	if (textMessage === '' && Object.keys(response).length > 0) {
		try {
			textMessage = JSON.stringify(response, null, 2);
		} catch (e) {
			// Failed to stringify, keep empty
		}
	}

	return textMessage;
}

/**
 * Create the chat store
 */
export function createChatStore(options: ChatOptions) {
	// Internal state
	const messages = writable<ChatMessage[]>([]);
	const currentSessionId = writable<string | null>(null);
	const waitingForResponse = writable(false);
	const ws = writable<WebSocket | null>(null);

	// Derived state
	const initialMessages = derived([], () => 
		(options.initialMessages ?? []).map((text) => createBotMessage(text))
	);

	/**
	 * Load previous session from server
	 */
	async function loadPreviousSession(): Promise<string | undefined> {
		if (!options.loadPreviousSession) {
			return;
		}

		const sessionId = localStorage.getItem(LOCAL_STORAGE_SESSION_ID_KEY) ?? uuidv4();
		const previousMessagesResponse = await api.loadPreviousSession(sessionId, options);

		const loadedMessages = (previousMessagesResponse?.data || []).map((message, index) => ({
			id: `${index}`,
			text: message.kwargs.content,
			sender: message.id.includes('HumanMessage') ? 'user' as const : 'bot' as const,
		}));

		messages.set(loadedMessages);

		if (loadedMessages.length) {
			currentSessionId.set(sessionId);
		}

		return sessionId;
	}

	/**
	 * Start a new session
	 */
	async function startNewSession(): Promise<void> {
		const newSessionId = uuidv4();
		currentSessionId.set(newSessionId);
		localStorage.setItem(LOCAL_STORAGE_SESSION_ID_KEY, newSessionId);
	}

	/**
	 * Send a message
	 */
	async function sendMessage(
		text: string,
		files: File[] = [],
	): Promise<SendMessageResponse | null> {
		const sentMessage = createUserMessage(text, files);
		messages.update((m) => [...m, sentMessage]);
		waitingForResponse.set(true);

		const sessionId = get(currentSessionId);
		if (!sessionId) {
			throw new Error('No active session');
		}

		try {
			if (options?.enableStreaming) {
				// Handle streaming
				const receivedMessage = createBotMessage();
				messages.update((m) => [...m, receivedMessage]);

				const handlers: api.StreamingEventHandlers = {
					onChunk: (chunk: string) => {
						messages.update((m) => {
							const lastMsg = m[m.length - 1];
							if (lastMsg && lastMsg.sender === 'bot' && 'text' in lastMsg) {
								lastMsg.text = (lastMsg.text || '') + chunk;
							}
							return [...m];
						});
					},
					onBeginMessage: () => {},
					onEndMessage: () => {},
				};

				const { hasReceivedChunks } = await api.sendMessageStreaming(
					text,
					files,
					sessionId,
					options,
					handlers,
				);

				if (!hasReceivedChunks) {
					messages.update((m) => {
						const lastMsg = m[m.length - 1];
						if (lastMsg && lastMsg.sender === 'bot' && 'text' in lastMsg) {
							lastMsg.text = '[No response received. This could happen if streaming is enabled in the trigger but disabled in agent node(s)]';
						}
						return [...m];
					});
				}
			} else {
				// Handle non-streaming
				const sendMessageResponse = await api.sendMessage(text, files, sessionId, options);

				if (sendMessageResponse?.executionStarted) {
					waitingForResponse.set(false);
					return sendMessageResponse;
				}

				const receivedMessage = createBotMessage();
				receivedMessage.text = processMessageResponse(sendMessageResponse);
				messages.update((m) => [...m, receivedMessage]);
			}
		} catch (error) {
			const errorMessage = createBotMessage('Error: Failed to receive response');
			messages.update((m) => [...m, errorMessage]);
			console.error('Chat API error:', error);
		} finally {
			waitingForResponse.set(false);
		}

		return null;
	}

	/**
	 * Close websocket connection
	 */
	function closeWebSocket() {
		const currentWs = get(ws);
		if (currentWs) {
			currentWs.close();
			ws.set(null);
		}
	}

	return {
		// Stores
		messages,
		currentSessionId,
		waitingForResponse,
		initialMessages,
		ws,

		// Methods
		loadPreviousSession,
		startNewSession,
		sendMessage,
		closeWebSocket,
	};
}

export type ChatStore = ReturnType<typeof createChatStore>;
