# Import Guide for @n8n/chat-headless-svelte

This guide shows how to import the `@n8n/chat-headless-svelte` package in different scenarios.

## Within the n8n Monorepo

If you're working within the n8n monorepo, you can use this package as a workspace dependency:

### Add to your package.json

```json
{
  "dependencies": {
    "@n8n/chat-headless-svelte": "workspace:*"
  }
}
```

Then run:
```bash
pnpm install
```

### Import in your code

```typescript
import { HeadlessChat, HeadlessMessagesList, HeadlessInput } from '@n8n/chat-headless-svelte';
import type { ChatOptions } from '@n8n/chat-headless-svelte';
```

## From External Projects via Git

If you want to use this package from outside the monorepo, you have several options:

### Option 1: Using workspace dependencies (Best for monorepo)

If you're also using a pnpm workspace or working within the n8n monorepo:

```json
{
  "dependencies": {
    "@n8n/chat-headless-svelte": "workspace:*"
  }
}
```

### Option 2: Git URL with subdirectory (Recommended)

Some package managers support installing from a subdirectory in a Git repository:

**Using npm (v7+):**
```bash
npm install "Slyker/n8n#copilot/add-chat-library-import:packages/frontend/@n8n/chat-headless-svelte"
```

Or in package.json:
```json
{
  "dependencies": {
    "@n8n/chat-headless-svelte": "Slyker/n8n#copilot/add-chat-library-import:packages/frontend/@n8n/chat-headless-svelte"
  }
}
```

**Using the original branch:**
```json
{
  "dependencies": {
    "@n8n/chat-headless-svelte": "Slyker/n8n#copilot/create-headless-chat-library:packages/frontend/@n8n/chat-headless-svelte"
  }
}
```

### Option 3: Git URL (installs full monorepo)

Install using the full git URL - note this will clone the entire n8n monorepo:

```bash
pnpm add "git+https://github.com/Slyker/n8n.git#copilot/add-chat-library-import"
npm install "git+https://github.com/Slyker/n8n.git#copilot/add-chat-library-import"
```

Or in package.json:
```json
{
  "dependencies": {
    "@n8n/chat-headless-svelte": "git+https://github.com/Slyker/n8n.git#copilot/add-chat-library-import"
  }
}
```

**Important:** With this approach, you're installing the entire n8n repository. The package manager will look for `@n8n/chat-headless-svelte` in the workspace packages defined in `pnpm-workspace.yaml`.

### Option 4: Local installation (for development)

Clone the repository and install locally:

```bash
git clone https://github.com/Slyker/n8n.git
cd n8n
git checkout copilot/add-chat-library-import
cd packages/frontend/@n8n/chat-headless-svelte
pnpm install
pnpm build
```

Then in your project:
```bash
pnpm add /path/to/n8n/packages/frontend/@n8n/chat-headless-svelte
```

### Option 5: Publish to a registry (Production recommended)

For production use, the best approach is to publish the package to npm or a private registry:

1. Build the package:
   ```bash
   cd packages/frontend/@n8n/chat-headless-svelte
   pnpm build
   ```

2. Publish to npm (or private registry):
   ```bash
   npm publish
   # or for scoped packages
   npm publish --access public
   ```

3. Then install normally:
   ```bash
   pnpm add @n8n/chat-headless-svelte
   ```

## Important Notes

### Git Installation Limitations

When installing from Git:
- The entire repository will be cloned (including all packages in the monorepo)
- You'll need to have Git installed
- The build process will run automatically if there's a `prepare` or `postinstall` script
- Dependencies defined in the package will be installed

### Build Requirements

The package requires the following to build:
- Node.js >= 22.16 (as specified in the monorepo)
- pnpm >= 10.18.3
- TypeScript
- Vite
- Svelte 5.x

### For Production Use

For production deployments, consider:
1. Publishing the package to npm or a private registry
2. Using a specific commit SHA instead of a branch name for stability:
   ```json
   "@n8n/chat-headless-svelte": "git+https://github.com/Slyker/n8n.git#<commit-sha>"
   ```

## Example Usage

Once installed, you can use the package as shown in the main [README.md](./README.md):

```svelte
<script lang="ts">
  import { HeadlessChat, HeadlessMessagesList, HeadlessInput } from '@n8n/chat-headless-svelte';
  import type { ChatOptions } from '@n8n/chat-headless-svelte';

  const options: ChatOptions = {
    webhookUrl: 'YOUR_PRODUCTION_WEBHOOK_URL',
    initialMessages: ['Hi there! 👋', 'How can I assist you today?'],
  };
</script>

<HeadlessChat {options}>
  {#snippet children(chatStore)}
    <div class="chat-container">
      <HeadlessMessagesList>
        {#snippet renderMessage(message)}
          <div class="message {message.sender}">
            <p>{message.text}</p>
          </div>
        {/snippet}
      </HeadlessMessagesList>
      <HeadlessInput placeholder="Type your message..." />
    </div>
  {/snippet}
</HeadlessChat>
```
