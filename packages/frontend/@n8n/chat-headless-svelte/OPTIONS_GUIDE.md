# ChatOptions Configuration Guide

Complete reference for configuring your n8n chat with `ChatOptions`.

## Overview

The `ChatOptions` interface allows you to configure every aspect of your chat's behavior, from the webhook URL to session management and file uploads.

```typescript
interface ChatOptions {
  webhookUrl: string;                           // REQUIRED
  webhookConfig?: WebhookConfig;                // Optional
  mode?: 'window' | 'fullscreen';               // Optional
  showWindowCloseButton?: boolean;              // Optional
  showWelcomeScreen?: boolean;                  // Optional
  loadPreviousSession?: boolean;                // Optional
  chatInputKey?: string;                        // Optional
  chatSessionKey?: string;                      // Optional
  defaultLanguage?: 'en';                       // Optional
  initialMessages?: string[];                   // Optional
  metadata?: Record<string, unknown>;           // Optional
  i18n?: Record<string, Record<string, string>>;// Optional
  disabled?: boolean;                           // Optional
  allowFileUploads?: boolean;                   // Optional
  allowedFilesMimeTypes?: string;               // Optional
  enableStreaming?: boolean;                    // Optional
}
```

## Required Options

### `webhookUrl` (required)

The URL of your n8n workflow webhook endpoint.

**Type:** `string`

**Usage:**
```typescript
const options: ChatOptions = {
  webhookUrl: 'https://your-n8n-instance.com/webhook/chat-trigger'
};
```

**How to get your webhook URL:**
1. Create an n8n workflow
2. Add a **Chat Trigger** node
3. Copy the **Production URL** or **Test URL**
4. Add your domain to **Allowed Origins (CORS)** in the trigger settings

**Examples:**
```typescript
// Production webhook
webhookUrl: 'https://n8n.example.com/webhook/abc123'

// Test webhook (for development)
webhookUrl: 'https://n8n.example.com/webhook-test/abc123'

// Self-hosted instance
webhookUrl: 'https://n8n.mycompany.com/webhook/customer-support'
```

## Webhook Configuration

### `webhookConfig` (optional)

Advanced webhook request configuration.

**Type:** `WebhookConfig`

```typescript
interface WebhookConfig {
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
}
```

**Default:** `{ method: 'POST' }`

**Usage:**

```typescript
// Custom HTTP method
const options: ChatOptions = {
  webhookUrl: 'https://n8n.example.com/webhook/chat',
  webhookConfig: {
    method: 'POST'  // or 'GET'
  }
};

// Custom headers (authentication, tracking, etc.)
const options: ChatOptions = {
  webhookUrl: 'https://n8n.example.com/webhook/chat',
  webhookConfig: {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer your-token-here',
      'X-Custom-Header': 'custom-value',
      'X-User-ID': userId,
      'X-Tenant': 'company-name'
    }
  }
};
```

**Use cases:**
- **Authentication**: Add API keys or bearer tokens
- **User tracking**: Send user IDs or session info
- **Multi-tenancy**: Identify the organization/tenant
- **Analytics**: Add tracking headers

## Display & UI Options

### `mode` (optional)

Display mode for the chat interface.

**Type:** `'window' | 'fullscreen'`

**Default:** `'window'`

**Usage:**
```typescript
// Window mode (embedded in page)
const options: ChatOptions = {
  webhookUrl: 'YOUR_URL',
  mode: 'window'
};

// Fullscreen mode (takes entire viewport)
const options: ChatOptions = {
  webhookUrl: 'YOUR_URL',
  mode: 'fullscreen'
};
```

**Note:** This is primarily for compatibility with @n8n/chat. In headless mode, you have full control over layout and sizing through your custom snippets.

### `showWindowCloseButton` (optional)

Whether to show a close button (relevant for window mode).

**Type:** `boolean`

**Default:** `false`

**Usage:**
```typescript
const options: ChatOptions = {
  webhookUrl: 'YOUR_URL',
  mode: 'window',
  showWindowCloseButton: true
};
```

**Note:** In headless mode, you implement your own close button in your custom UI.

### `showWelcomeScreen` (optional)

Whether to show a welcome screen before starting a chat session.

**Type:** `boolean`

**Default:** `false`

**Usage:**
```typescript
const options: ChatOptions = {
  webhookUrl: 'YOUR_URL',
  showWelcomeScreen: true
};
```

When `true`, the chat will wait for user interaction before calling `startNewSession()`.

When `false`, a session starts automatically on mount (unless `loadPreviousSession` is true).

## Session Management

### `loadPreviousSession` (optional)

Attempt to restore the previous chat session from localStorage.

**Type:** `boolean`

**Default:** `false`

**Usage:**
```typescript
const options: ChatOptions = {
  webhookUrl: 'YOUR_URL',
  loadPreviousSession: true
};
```

**How it works:**
1. On mount, checks localStorage for a saved session ID
2. If found, calls the webhook to restore previous messages
3. If not found or fails, starts a new session

**Use cases:**
- Allow users to continue conversations across page reloads
- Maintain context in single-page applications
- Persist chat history locally

### `chatInputKey` (optional)

localStorage key for storing chat input draft.

**Type:** `string`

**Default:** `'n8n-chat-input'`

**Usage:**
```typescript
const options: ChatOptions = {
  webhookUrl: 'YOUR_URL',
  chatInputKey: 'my-app-chat-input'
};
```

**What it does:**
- Saves user's typed message as they type
- Restores draft message on page reload
- Prevents message loss if user accidentally navigates away

**Use cases:**
- Multiple chat instances on same domain (use unique keys)
- Custom namespace for your application
- Avoiding conflicts with other libraries

### `chatSessionKey` (optional)

localStorage key for storing chat session ID.

**Type:** `string`

**Default:** `'n8n-chat-session-id'`

**Usage:**
```typescript
const options: ChatOptions = {
  webhookUrl: 'YOUR_URL',
  chatSessionKey: 'my-app-chat-session'
};
```

**What it does:**
- Stores the current session ID in localStorage
- Used by `loadPreviousSession` to restore chats

**Use cases:**
- Multiple chat widgets (different sessions per widget)
- User-specific session storage (include user ID in key)
- Preventing session conflicts

**Example - Multi-chat app:**
```typescript
// Support chat
const supportOptions: ChatOptions = {
  webhookUrl: 'YOUR_URL',
  chatSessionKey: 'support-chat-session',
  chatInputKey: 'support-chat-input'
};

// Sales chat
const salesOptions: ChatOptions = {
  webhookUrl: 'YOUR_URL',
  chatSessionKey: 'sales-chat-session',
  chatInputKey: 'sales-chat-input'
};
```

## Content & Messages

### `defaultLanguage` (optional)

Default language for the chat interface.

**Type:** `'en'`

**Default:** `'en'`

**Usage:**
```typescript
const options: ChatOptions = {
  webhookUrl: 'YOUR_URL',
  defaultLanguage: 'en'
};
```

**Note:** Currently only 'en' (English) is supported. Used with `i18n` for internationalization.

### `initialMessages` (optional)

Messages to display when chat first loads.

**Type:** `string[]`

**Default:** `[]`

**Usage:**
```typescript
const options: ChatOptions = {
  webhookUrl: 'YOUR_URL',
  initialMessages: [
    'Hello! 👋',
    'Welcome to our support chat.',
    'How can I help you today?'
  ]
};
```

**What it does:**
- Displays messages as if they came from the bot
- Shown immediately when chat loads
- Not sent to the workflow (they're UI-only)

**Use cases:**
- Welcome messages
- Instructions or guidance
- Setting expectations ("Typical response time: 2 minutes")
- Prompting user action

**Example - Support chat:**
```typescript
initialMessages: [
  'Hi! I\'m your AI assistant.',
  'I can help with:',
  '• Account questions',
  '• Technical support',
  '• Billing inquiries',
  '',
  'What can I help you with?'
]
```

### `i18n` (optional)

Internationalization strings for custom messages.

**Type:** `Record<string, Record<string, string>>`

**Default:** `{}`

**Usage:**
```typescript
const options: ChatOptions = {
  webhookUrl: 'YOUR_URL',
  defaultLanguage: 'en',
  i18n: {
    en: {
      'input.placeholder': 'Type your message...',
      'button.send': 'Send',
      'typing.indicator': 'AI is typing...',
      'error.network': 'Connection error. Please try again.',
      'session.new': 'New conversation started'
    },
    // Future: other languages
    // es: { ... },
    // fr: { ... }
  }
};
```

**Note:** This is for future extensibility. Currently, headless components don't use these strings directly - you define all text in your custom snippets.

## Metadata & Tracking

### `metadata` (optional)

Custom data to send with every message to your workflow.

**Type:** `Record<string, unknown>`

**Default:** `{}`

**Usage:**
```typescript
const options: ChatOptions = {
  webhookUrl: 'YOUR_URL',
  metadata: {
    userId: '12345',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    department: 'sales',
    plan: 'premium',
    pageUrl: window.location.href,
    referrer: document.referrer,
    timestamp: Date.now()
  }
};
```

**What it does:**
- Sent with EVERY message to your n8n workflow
- Available in your workflow for:
  - User identification
  - Analytics
  - Routing logic
  - Personalization
  - Logging

**n8n workflow access:**
```javascript
// In your n8n workflow
const userId = $input.item.json.metadata.userId;
const userPlan = $input.item.json.metadata.plan;

if (userPlan === 'premium') {
  // Route to priority queue
}
```

**Use cases:**

**User Identification:**
```typescript
metadata: {
  userId: currentUser.id,
  email: currentUser.email,
  name: currentUser.fullName
}
```

**Analytics & Tracking:**
```typescript
metadata: {
  sessionId: analytics.sessionId,
  source: 'homepage',
  campaign: 'summer-promo',
  device: 'mobile'
}
```

**Context for AI:**
```typescript
metadata: {
  userLanguage: navigator.language,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  accountType: 'business',
  industry: 'healthcare'
}
```

**Multi-tenancy:**
```typescript
metadata: {
  tenantId: organization.id,
  tenantName: organization.name,
  environment: 'production'
}
```

## Features & Capabilities

### `disabled` (optional)

Disable the entire chat interface.

**Type:** `boolean`

**Default:** `false`

**Usage:**
```typescript
const options: ChatOptions = {
  webhookUrl: 'YOUR_URL',
  disabled: true  // Chat is non-interactive
};
```

**What it does:**
- Disables message sending
- Disables input field
- Shows chat in read-only mode

**Use cases:**
- Maintenance mode
- User has no chat permissions
- Chat quota exceeded
- Outside business hours

**Example - Business hours:**
```typescript
<script>
  const isBusinessHours = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    return day >= 1 && day <= 5 && hour >= 9 && hour < 17;
  };
  
  const options: ChatOptions = {
    webhookUrl: 'YOUR_URL',
    disabled: !isBusinessHours(),
    initialMessages: isBusinessHours() 
      ? ['How can I help you?']
      : ['We\'re currently offline. Business hours: Mon-Fri 9AM-5PM']
  };
</script>
```

### `allowFileUploads` (optional)

Enable file upload functionality in chat.

**Type:** `boolean`

**Default:** `false`

**Usage:**
```typescript
const options: ChatOptions = {
  webhookUrl: 'YOUR_URL',
  allowFileUploads: true
};
```

**What it does:**
- Allows users to attach files to messages
- Files are sent to your n8n workflow
- You handle file processing in your workflow

**Example with file type restrictions:**
```typescript
const options: ChatOptions = {
  webhookUrl: 'YOUR_URL',
  allowFileUploads: true,
  allowedFilesMimeTypes: 'image/*,application/pdf,.doc,.docx'
};
```

**n8n workflow - accessing uploaded files:**
```javascript
// Files are in the message data
const files = $input.item.json.files;

files.forEach(file => {
  // file.name
  // file.size
  // file.type
  // file.data (base64)
});
```

### `allowedFilesMimeTypes` (optional)

Restrict which file types can be uploaded.

**Type:** `string`

**Default:** `undefined` (all types allowed)

**Usage:**
```typescript
// Images only
allowedFilesMimeTypes: 'image/*'

// Images and PDFs
allowedFilesMimeTypes: 'image/*,application/pdf'

// Specific file extensions
allowedFilesMimeTypes: '.pdf,.doc,.docx,.txt'

// Common document types
allowedFilesMimeTypes: 'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
```

**Common MIME types:**
- Images: `image/*`, `image/png`, `image/jpeg`, `image/gif`
- Documents: `application/pdf`, `.doc`, `.docx`, `.xls`, `.xlsx`
- Text: `text/plain`, `.txt`, `.csv`
- Archives: `.zip`, `.rar`, `application/zip`

### `enableStreaming` (optional)

Enable real-time streaming of bot responses.

**Type:** `boolean`

**Default:** `false`

**Usage:**
```typescript
const options: ChatOptions = {
  webhookUrl: 'YOUR_URL',
  enableStreaming: true
};
```

**What it does:**
- Messages appear word-by-word as they're generated
- Uses WebSocket or Server-Sent Events
- Better UX for AI-generated responses

**Requirements:**
1. Enable **Streaming response** in your Chat Trigger node
2. Your n8n workflow must support streaming (e.g., using OpenAI, Anthropic nodes)

**Use cases:**
- AI chat (GPT, Claude, etc.)
- Long-form responses
- Better perceived performance

**Without streaming:**
```
User: "Explain quantum computing"
[Wait 5 seconds...]
Bot: [Full response appears instantly]
```

**With streaming:**
```
User: "Explain quantum computing"
Bot: "Quantum computing is..."
Bot: "Quantum computing is a revolutionary..."
Bot: "Quantum computing is a revolutionary approach..."
[Response builds in real-time]
```

## Complete Configuration Examples

### Example 1: Basic Chat

```typescript
const options: ChatOptions = {
  webhookUrl: 'https://n8n.example.com/webhook/chat',
  initialMessages: ['Hello! How can I help you?']
};
```

### Example 2: AI Assistant with Streaming

```typescript
const options: ChatOptions = {
  webhookUrl: 'https://n8n.example.com/webhook/ai-chat',
  enableStreaming: true,
  initialMessages: [
    'Hi! I\'m your AI assistant.',
    'Ask me anything!'
  ],
  loadPreviousSession: true,
  metadata: {
    aiModel: 'gpt-4',
    userId: currentUser.id
  }
};
```

### Example 3: Support Chat with File Uploads

```typescript
const options: ChatOptions = {
  webhookUrl: 'https://n8n.example.com/webhook/support',
  allowFileUploads: true,
  allowedFilesMimeTypes: 'image/*,application/pdf,.doc,.docx',
  initialMessages: [
    'Welcome to Customer Support!',
    'You can attach screenshots or documents to your messages.'
  ],
  metadata: {
    userId: user.id,
    accountPlan: user.plan,
    supportTier: user.plan === 'enterprise' ? 'priority' : 'standard'
  }
};
```

### Example 4: Authenticated Chat

```typescript
const options: ChatOptions = {
  webhookUrl: 'https://n8n.example.com/webhook/authenticated-chat',
  webhookConfig: {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'X-User-ID': userId,
      'X-Tenant': tenantId
    }
  },
  loadPreviousSession: true,
  chatSessionKey: `chat-session-${userId}`,
  chatInputKey: `chat-input-${userId}`,
  metadata: {
    userId,
    tenantId,
    userRole: user.role,
    permissions: user.permissions
  }
};
```

### Example 5: Multi-Language Chat

```typescript
const userLanguage = navigator.language.split('-')[0]; // 'en', 'es', 'fr'

const options: ChatOptions = {
  webhookUrl: 'https://n8n.example.com/webhook/multilingual-chat',
  defaultLanguage: 'en',
  initialMessages: 
    userLanguage === 'es' ? ['¡Hola! ¿Cómo puedo ayudarte?'] :
    userLanguage === 'fr' ? ['Bonjour! Comment puis-je vous aider?'] :
    ['Hello! How can I help you?'],
  metadata: {
    userLanguage,
    detectLanguage: true
  },
  i18n: {
    en: {
      'placeholder': 'Type a message...',
      'send': 'Send'
    }
  }
};
```

### Example 6: Business Hours Aware

```typescript
const isBusinessHours = () => {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0 = Sunday
  return day >= 1 && day <= 5 && hour >= 9 && hour < 17;
};

const options: ChatOptions = {
  webhookUrl: 'https://n8n.example.com/webhook/support',
  disabled: !isBusinessHours(),
  initialMessages: isBusinessHours()
    ? ['Welcome! How can we help you today?']
    : [
        'Thank you for contacting us!',
        'Our business hours are Monday-Friday, 9 AM - 5 PM EST.',
        'Please leave a message and we\'ll respond when we\'re back online.'
      ],
  metadata: {
    messageType: isBusinessHours() ? 'live' : 'offline',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  }
};
```

## Configuration Best Practices

### ✅ DO

- **Always** provide a valid `webhookUrl`
- Use `metadata` to send user context
- Enable `loadPreviousSession` for better UX
- Set meaningful `initialMessages`
- Use unique session keys for multiple chats
- Validate file types with `allowedFilesMimeTypes`
- Test streaming before enabling in production

### ❌ DON'T

- Don't expose sensitive data in `metadata`
- Don't use same session keys for different chats
- Don't forget to enable streaming in n8n if using `enableStreaming`
- Don't set huge `initialMessages` arrays (keep it short)
- Don't rely on `i18n` for headless (you control all text)

## Troubleshooting

### Chat not connecting
**Check:**
- Is `webhookUrl` correct and accessible?
- Is CORS configured in Chat Trigger node?
- Are custom headers causing authentication issues?

### Session not restoring
**Check:**
- Is `loadPreviousSession` set to `true`?
- Is localStorage available and not cleared?
- Does your n8n workflow support session restoration?
- Are session keys unique per chat instance?

### Streaming not working
**Check:**
- Is `enableStreaming` set to `true`?
- Is **Streaming response** enabled in Chat Trigger node?
- Does your workflow use a streaming-capable node (OpenAI, etc.)?
- Check browser console for WebSocket errors

### Files not uploading
**Check:**
- Is `allowFileUploads` set to `true`?
- Are file types allowed by `allowedFilesMimeTypes`?
- Does your n8n workflow handle file data?
- Check file size limits

## Summary

`ChatOptions` gives you complete control over:

- ✅ **Connection**: Where messages go (`webhookUrl`, `webhookConfig`)
- ✅ **Sessions**: How conversations persist (`loadPreviousSession`, session keys)
- ✅ **Content**: Initial messages and language
- ✅ **Features**: File uploads, streaming, disabled state
- ✅ **Context**: User data and metadata sent to workflow
- ✅ **Behavior**: Display modes and UI preferences

Configure these options to create the perfect chat experience for your use case! 🚀
