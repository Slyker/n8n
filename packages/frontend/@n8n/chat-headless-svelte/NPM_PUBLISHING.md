# NPM Publishing Guide for @n8n/chat-headless-svelte

This document explains how to publish this package to NPM.

## Prerequisites

1. **NPM Account**: You need an NPM account with publish permissions for the `@n8n` scope
2. **NPM CLI**: Ensure you have npm installed (comes with Node.js)
3. **Authentication**: Login to npm using `npm login`

## Publishing Steps

### 1. Verify Package is Ready

Before publishing, ensure:
- All tests pass: `npm test`
- Type checking passes: `npm run typecheck`
- Linting passes: `npm run lint`
- Build completes successfully: `npm run build`

### 2. Update Version

Follow [semantic versioning](https://semver.org/):

```bash
# For bug fixes (0.1.0 -> 0.1.1)
npm version patch

# For new features (0.1.0 -> 0.2.0)
npm version minor

# For breaking changes (0.1.0 -> 1.0.0)
npm version major
```

This will:
- Update the version in `package.json`
- Create a git tag
- Commit the change

### 3. Build the Package

The `prepublishOnly` script will run automatically, but you can build manually:

```bash
npm run build
```

### 4. Verify Package Contents

Preview what will be published:

```bash
npm pack --dry-run
```

This shows all files that will be included in the package.

### 5. Publish to NPM

For a scoped package like `@n8n/chat-headless-svelte`, you need to publish with public access:

```bash
npm publish --access public
```

**Note**: For a test release or pre-release version, you can use a tag:

```bash
# Publish as beta
npm publish --access public --tag beta

# Users can install with: npm install @n8n/chat-headless-svelte@beta
```

### 6. Verify Publication

Check the package on NPM:

```bash
npm info @n8n/chat-headless-svelte
```

Or visit: https://www.npmjs.com/package/@n8n/chat-headless-svelte

### 7. Push Git Changes

Don't forget to push the version tag and commit:

```bash
git push origin main --tags
```

## Package Contents

The published package includes:
- `dist/` - Compiled JavaScript and TypeScript declarations
- `README.md` - Documentation
- `LICENSE.md` - License information
- `package.json` - Package metadata

Everything else (source files, tests, examples, config files) is excluded via the `files` field in package.json and `.npmignore`.

## Troubleshooting

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
