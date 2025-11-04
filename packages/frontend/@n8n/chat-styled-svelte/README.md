# @n8n/chat-styled-svelte

A professional AI chat UI built on top of [@n8n/chat-headless-svelte](../chat-headless-svelte) with modern, polished design. Perfect for integrating AI-powered chat into your applications with zero configuration.

![AI Chat Interface](https://img.shields.io/badge/style-modern-blue) ![Built with Svelte](https://img.shields.io/badge/svelte-5-orange)

## Features

- 🎨 **Professional Design** - Modern, polished AI chat interface
- 🌓 **Light & Dark Theme** - Automatic theme support
- 💬 **Smooth Animations** - Delightful micro-interactions
- 📱 **Responsive** - Works on all screen sizes
- ♿ **Accessible** - ARIA labels and keyboard navigation
- 🎯 **Built on Headless** - Uses @n8n/chat-headless-svelte under the hood
- 🔧 **Customizable** - Easy to theme via CSS variables

## Quick Start

### Installation

```bash
npm install @n8n/chat-styled-svelte
# or
pnpm add @n8n/chat-styled-svelte
```

### Basic Usage

```svelte
<script lang="ts">
  import { AIChat } from '@n8n/chat-styled-svelte';
  import type { ChatOptions } from '@n8n/chat-styled-svelte';

  const options: ChatOptions = {
    webhookUrl: 'YOUR_PRODUCTION_WEBHOOK_URL',
    initialMessages: ['Hi! How can I help you today?'],
    enableStreaming: true,
  };
</script>

<div style="height: 600px; max-width: 800px;">
  <AIChat {options} title="AI Assistant" subtitle="Powered by n8n" />
</div>
```

That's it! You get a fully-styled, professional AI chat interface.

## Props

### `options` (required)
ChatOptions object - Same as [@n8n/chat-headless-svelte](../chat-headless-svelte/README.md#chatoptions)

```typescript
interface ChatOptions {
  webhookUrl: string;
  webhookConfig?: {
    method?: 'GET' | 'POST';
    headers?: Record<string, string>;
  };
  initialMessages?: string[];
  enableStreaming?: boolean;
  allowFileUploads?: boolean;
  // ... see full options in @n8n/chat-headless-svelte docs
}
```

### `title` (optional)
- Type: `string`
- Default: `'AI Assistant'`
- The title shown in the chat header

### `subtitle` (optional)
- Type: `string`
- Default: `'Powered by n8n'`
- The subtitle shown in the chat header

### `theme` (optional)
- Type: `'light' | 'dark'`
- Default: `'light'`
- Visual theme of the chat interface

## Examples

### Dark Theme

```svelte
<AIChat 
  {options} 
  title="Support Bot" 
  subtitle="24/7 Assistance"
  theme="dark" 
/>
```

### With Streaming

```svelte
<script lang="ts">
  const options: ChatOptions = {
    webhookUrl: 'YOUR_WEBHOOK_URL',
    enableStreaming: true,
    initialMessages: [
      'Hello! I\'m your AI assistant.',
      'I can help you with various tasks. What would you like to know?'
    ],
  };
</script>

<AIChat {options} />
```

### With File Uploads

```svelte
<script lang="ts">
  const options: ChatOptions = {
    webhookUrl: 'YOUR_WEBHOOK_URL',
    allowFileUploads: true,
    allowedFilesMimeTypes: 'image/*,application/pdf',
  };
</script>

<AIChat {options} title="Document Assistant" />
```

### Full-Screen Chat

```svelte
<div style="position: fixed; inset: 0;">
  <AIChat {options} />
</div>
```

## Customization

### CSS Variables

You can customize colors by overriding CSS variables:

```css
:global(.ai-chat-container) {
  --ai-primary: #your-primary-color;
  --ai-primary-dark: #your-primary-dark;
  --ai-secondary: #your-secondary-color;
  
  /* Backgrounds */
  --ai-bg-primary: #ffffff;
  --ai-bg-secondary: #f8f9fa;
  --ai-bg-tertiary: #f3f4f6;
  
  /* Text */
  --ai-text-primary: #1f2937;
  --ai-text-secondary: #6b7280;
  --ai-text-tertiary: #9ca3af;
  
  /* Borders & Shadows */
  --ai-border: #e5e7eb;
  --ai-shadow: rgba(0, 0, 0, 0.1);
  --ai-shadow-lg: rgba(0, 0, 0, 0.15);
}
```

### Custom Brand Colors

```svelte
<div class="custom-chat">
  <AIChat {options} />
</div>

<style>
  .custom-chat :global(.ai-chat-container) {
    --ai-primary: #10b981; /* Green */
    --ai-primary-dark: #059669;
    --ai-secondary: #3b82f6; /* Blue */
  }
</style>
```

## Design Features

### Message Avatars
- Bot messages have a gradient avatar with AI icon
- User messages have a simple user icon

### Typing Indicator
Beautiful animated dots when the bot is typing

### Empty State
Welcoming empty state when no messages exist

### File Support
Clean file badges for uploaded files

### Smooth Animations
- Slide-in animation for new messages
- Hover effects on buttons
- Smooth scrolling

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Proper focus management

## Comparison with Other Packages

| Package | Style | Bundle Size | Customization | Use Case |
|---------|-------|-------------|---------------|----------|
| @n8n/chat | Pre-styled (Vue) | ~150KB | CSS variables | Quick Vue integration |
| @n8n/chat-headless-svelte | Unstyled | ~30KB | Full control | Custom designs |
| **@n8n/chat-styled-svelte** | **Professional** | **~60KB** | **CSS variables** | **Ready-to-use AI chat** |

## Architecture

```
@n8n/chat-styled-svelte
    ↓ uses
@n8n/chat-headless-svelte
    ↓ connects to
n8n Chat Trigger Workflow
```

This package is a thin styling layer on top of the headless components, providing:
- Professional UI components
- Gradient themes
- Smooth animations
- Modern design patterns

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Prerequisites

You need:
1. A running n8n instance
2. A workflow with a Chat Trigger node
3. The webhook URL from that trigger

See the [n8n chat documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/) for setting up your workflow.

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run in development mode
npm run dev

# Run tests
npm test

# Type check
npm run typecheck

# Lint code
npm run lint
```

## Publishing to NPM

This package is designed to be published to NPM as a standalone package. To publish:

1. **Update the version** in `package.json` following [semver](https://semver.org/):
   ```bash
   npm version patch  # for bug fixes
   npm version minor  # for new features
   npm version major  # for breaking changes
   ```

2. **Build the package**:
   ```bash
   npm run build
   ```

3. **Publish to NPM**:
   ```bash
   npm publish --access public
   ```

   Note: You need to be logged in to npm (`npm login`) and have publish permissions for the `@n8n` scope.

4. **Verify the publication**:
   ```bash
   npm info @n8n/chat-styled-svelte
   ```

### What Gets Published

The NPM package includes:
- `dist/` - Compiled JavaScript, CSS, and TypeScript declarations
- `README.md` - Documentation
- `LICENSE.md` - License information
- `package.json` - Package metadata

Everything else (source files, tests, demo, etc.) is excluded from the NPM package.

## License

Same as n8n - see [LICENSE.md](./LICENSE.md)

## Related Packages

- [@n8n/chat](../chat) - Vue 3 pre-styled chat widget
- [@n8n/chat-headless-svelte](../chat-headless-svelte) - Headless Svelte components

---

**Built with ❤️ for the n8n community**
