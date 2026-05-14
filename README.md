# VS Code Extensions Monorepo

A monorepo for multiple VS Code extensions.

## Extensions

| Extension | Description |
|-----------|-------------|
| [markdown-reader](./markdown-reader) | View Markdown files in a beautiful readable mode | [![Marketplace](https://img.shields.io/badge/Marketplace-nandal.markdown--reader-blue)](https://marketplace.visualstudio.com/items?itemName=nandal.markdown-reader) |

## Development

```bash
# Install all dependencies
npm install

# Compile all extensions
npm run compile

# Watch all extensions
npm run watch

# Lint all extensions
npm run lint
```

## Adding a new extension

1. Create a new folder under the root
2. Add its `package.json` with proper name and scripts
3. Add the folder to `workspaces` in the root `package.json`
