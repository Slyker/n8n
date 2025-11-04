# NPM Publishing Guide for @n8n/chat-styled-svelte

This document explains how to publish this package to NPM.

## Important: Publish Order

**This package depends on `@n8n/chat-headless-svelte`.**

Before publishing this package, you MUST ensure that `@n8n/chat-headless-svelte` is already published to NPM at the version specified in this package's `package.json`.

## Prerequisites

1. **NPM Account**: You need an NPM account with publish permissions for the `@n8n` scope
2. **NPM CLI**: Ensure you have npm installed (comes with Node.js)
3. **Authentication**: Login to npm using `npm login`
4. **Dependency Published**: `@n8n/chat-headless-svelte` must be published first

## Publishing Steps

### 1. Verify Dependency is Published

Check that the headless package is available on NPM:

```bash
npm info @n8n/chat-headless-svelte
```

Ensure the version matches or is compatible with the version in this package's `dependencies`.

### 2. Verify Package is Ready

Before publishing, ensure:
- All tests pass: `npm test`
- Type checking passes: `npm run typecheck`
- Linting passes: `npm run lint`
- Build completes successfully: `npm run build`

### 3. Update Version

Follow [semantic versioning](https://semver.org/):

```bash
# For bug fixes (0.1.0 -> 0.1.1)
npm version patch

# For new features (0.1.0 -> 0.2.0)
npm version minor

# For breaking changes (0.1.0 -> 1.0.0)
npm version major
```

**Note**: If the headless package version changes, update the dependency version in `package.json`:

```json
{
  "dependencies": {
    "@n8n/chat-headless-svelte": "^0.2.0"  // Update to match headless version
  }
}
```

### 4. Build the Package

The `prepublishOnly` script will run automatically, but you can build manually:

```bash
npm run build
```

### 5. Verify Package Contents

Preview what will be published:

```bash
npm pack --dry-run
```

This shows all files that will be included in the package.

### 6. Publish to NPM

For a scoped package like `@n8n/chat-styled-svelte`, you need to publish with public access:

```bash
npm publish --access public
```

**Note**: For a test release or pre-release version, you can use a tag:

```bash
# Publish as beta
npm publish --access public --tag beta

# Users can install with: npm install @n8n/chat-styled-svelte@beta
```

### 7. Verify Publication

Check the package on NPM:

```bash
npm info @n8n/chat-styled-svelte
```

Or visit: https://www.npmjs.com/package/@n8n/chat-styled-svelte

### 8. Push Git Changes

Don't forget to push the version tag and commit:

```bash
git push origin main --tags
```

## Package Contents

The published package includes:
- `dist/` - Compiled JavaScript, CSS, and TypeScript declarations
- `README.md` - Documentation
- `LICENSE.md` - License information
- `package.json` - Package metadata

Everything else (source files, tests, demo, config files) is excluded via the `files` field in package.json and `.npmignore`.

## Version Management

When updating this package:

1. **Patch updates** (bug fixes): Increment this package's patch version
2. **Minor updates** (new features): Increment this package's minor version
3. **Major updates** (breaking changes): Increment this package's major version

When the headless package updates:

1. **Headless patch update**: No change needed (covered by `^` in dependency)
2. **Headless minor update**: No change needed (covered by `^` in dependency)
3. **Headless major update**: Update dependency version and increment this package's major version

## Troubleshooting

### Dependency Not Found

If you get an error about `@n8n/chat-headless-svelte` not being found:
1. Verify it's published: `npm info @n8n/chat-headless-svelte`
2. Check the version in your `dependencies` matches an available version
3. Publish the headless package first if needed

### Permission Denied

If you get a permission error:
1. Ensure you're logged in: `npm whoami`
2. Check you have permissions for the `@n8n` scope
3. Contact the organization admin to grant publish permissions

### Build Errors

If the build fails:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Try building again

### Version Already Published

If the version already exists on NPM:
1. Increment the version using `npm version patch/minor/major`
2. Publish again

## Additional Resources

- [NPM Publishing Documentation](https://docs.npmjs.com/cli/v10/commands/npm-publish)
- [Semantic Versioning](https://semver.org/)
- [NPM Scoped Packages](https://docs.npmjs.com/cli/v10/using-npm/scope)
