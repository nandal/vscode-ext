# MarkDown Reader - Nandal

A VS Code extension that provides a beautiful, readable view for Markdown files with a simple key combination toggle.

[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-blue)](https://marketplace.visualstudio.com/items?itemName=nandal.markdown-reader)

## Features

- Toggle between editing and reading mode for Markdown files
- Beautiful, GitHub-style rendering in the same editor tab
- Real-time updates as you edit
- Key combination: `Ctrl+Shift+M` (Windows/Linux) or `Cmd+Shift+M` (Mac)
- "Edit Mode" button in the top-right corner to switch back

## Usage

1. Open any `.md` file in VS Code
2. Press `Ctrl+Shift+M` (or `Cmd+Shift+M` on Mac) to toggle to readable view
3. The same editor tab will show the beautifully rendered markdown
4. Click the "Edit Mode" button in the top-right or press the key combination again to return to editing
5. Changes are reflected in real-time

## Installation

**From Marketplace:** Search "MarkDown Reader - Nandal" in VS Code Extensions, or install via:
```bash
code --install-extension nandal.markdown-reader
```

**From source:**
1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run compile` to build the extension
4. Press F5 to run in development mode

## Development

- `npm run compile` - Compile TypeScript
- `npm run watch` - Watch for changes and compile
- `npm test` - Run tests

## Requirements

- VS Code 1.74.0 or higher

## License

MIT
