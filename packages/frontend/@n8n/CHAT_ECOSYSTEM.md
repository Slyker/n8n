# n8n Chat Package Ecosystem - Complete Overview

## Three Complementary Packages

We now have a complete ecosystem of chat libraries for n8n:

### 1. @n8n/chat (Vue 3) - The Original
**Quick integration for Vue applications**

- **Framework:** Vue 3
- **Bundle:** ~150KB
- **Styling:** Pre-styled with CSS variables
- **Setup Time:** 5 minutes
- **Best For:** Vue apps, rapid deployment

### 2. @n8n/chat-headless-svelte (Svelte 5) - The Foundation
**Headless components for maximum flexibility**

- **Framework:** Svelte 5
- **Bundle:** ~30KB
- **Styling:** None (snippets for full control)
- **Setup Time:** 15-30 minutes
- **Best For:** Custom designs, design systems

### 3. @n8n/chat-styled-svelte (Svelte 5) - The Professional ⭐
**Ready-to-use AI chat with professional design**

- **Framework:** Svelte 5
- **Bundle:** ~60KB
- **Styling:** Professional AI chat design
- **Setup Time:** 5 minutes
- **Best For:** Professional AI chat UIs

---

## Architecture

```
┌─────────────────────────────────────────┐
│         @n8n/chat (Vue 3)               │
│         Pre-styled Component            │
└─────────────────────────────────────────┘
              │
              ↓ Same API
              ↓
┌─────────────────────────────────────────┐
│   @n8n/chat-headless-svelte (Svelte)    │
│      Headless Components                │
└─────────────────────────────────────────┘
              │
              ↓ Built on top
              ↓
┌─────────────────────────────────────────┐
│   @n8n/chat-styled-svelte (Svelte)      │
│    Professional Styled UI               │
└─────────────────────────────────────────┘
              │
              ↓ All connect to
              ↓
┌─────────────────────────────────────────┐
│       n8n Chat Trigger Workflow         │
└─────────────────────────────────────────┘
```

---

## Quick Comparison

| Feature | Vue | Headless | Styled |
|---------|-----|----------|--------|
| **Setup Time** | 5 min | 30 min | 5 min |
| **Bundle Size** | 150KB | 30KB | 60KB |
| **Customization** | Medium | Full | Medium |
| **Design Quality** | Good | DIY | Excellent |
| **Avatars** | No | DIY | Yes |
| **Themes** | CSS vars | DIY | Light/Dark |
| **Animations** | Basic | DIY | Smooth |
| **Empty State** | Basic | DIY | Beautiful |

---

## Use Case Guide

### Choose @n8n/chat if:
- Using Vue 3
- Need quick integration
- Default design works
- Existing Vue ecosystem

### Choose @n8n/chat-headless-svelte if:
- Need specific design
- Have design system
- Want smallest bundle
- Maximum flexibility needed

### Choose @n8n/chat-styled-svelte if:
- Want professional AI chat
- Using Svelte
- Need it to look great immediately
- Want light/dark themes
- Don't want to write CSS

---

## Code Examples

### @n8n/chat (Vue)
```javascript
import { createChat } from '@n8n/chat';
createChat({ webhookUrl: 'URL' });
```

### @n8n/chat-headless-svelte
```svelte
<HeadlessChat {options}>
  {#snippet children(chatStore)}
    <HeadlessMessagesList>
      {#snippet renderMessage(message)}
        <div class="custom">{message.text}</div>
      {/snippet}
    </HeadlessMessagesList>
    <HeadlessInput />
  {/snippet}
</HeadlessChat>
```

### @n8n/chat-styled-svelte
```svelte
<AIChat {options} title="AI Assistant" theme="light" />
```

---

## Visual Comparison

### @n8n/chat (Vue)
```
┌─────────────────────┐
│ Chat Widget         │
├─────────────────────┤
│ Bot: Hello          │
│         User: Hi    │
└─────────────────────┘
```
Clean, functional

### @n8n/chat-headless-svelte
```
Whatever you design!
Complete freedom.
```

### @n8n/chat-styled-svelte
```
┌─────────────────────────┐
│ ╔═══════════════════╗  │
│ ║ [⚡] AI Assistant  ║  │
│ ╚═══════════════════╝  │
│ ┌───────────────────┐  │
│ │ [🤖] Hello!       │  │
│ │      User: Hi [👤]│  │
│ └───────────────────┘  │
│ [Message...]    [📤]   │
└─────────────────────────┘
```
Professional, polished

---

## Migration Paths

### Vue → Headless
Learn Svelte, rebuild UI with full control

### Vue → Styled
Quick switch for better design

### Headless → Styled
Replace custom CSS with professional design

### Styled → Headless
Need more customization? Drop down to headless

---

## File Locations

```
packages/frontend/@n8n/
├── chat/                      # Vue 3 original
├── chat-headless-svelte/      # Headless foundation
└── chat-styled-svelte/        # Professional styled
```

---

## Package Relationships

1. **@n8n/chat** - Independent, Vue-based
2. **@n8n/chat-headless-svelte** - Independent, Svelte-based
3. **@n8n/chat-styled-svelte** - Depends on headless

All three work with the same n8n Chat Trigger workflows!

---

## Statistics

| Metric | Vue | Headless | Styled |
|--------|-----|----------|--------|
| **Files** | ~25 | ~19 | ~12 |
| **Components** | ~12 | 4 | 1 |
| **CSS** | ~50KB | 0KB | ~15KB |
| **Docs** | Medium | Extensive | Complete |
| **Examples** | Basic | Advanced | Interactive |

---

## Decision Tree

```
Need chat for n8n?
    │
    ├─ Using Vue 3?
    │   └─ Yes → @n8n/chat
    │
    ├─ Need custom design?
    │   └─ Yes → @n8n/chat-headless-svelte
    │
    └─ Want professional AI chat?
        └─ Yes → @n8n/chat-styled-svelte ⭐
```

---

## Summary

Three packages, one goal: Make it easy to integrate n8n chat workflows into any application.

- **@n8n/chat** - Vue 3, quick setup
- **@n8n/chat-headless-svelte** - Full control
- **@n8n/chat-styled-svelte** - Professional & fast ⭐

Choose based on your framework, time, and customization needs!
