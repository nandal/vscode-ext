import * as vscode from 'vscode';
import { marked } from 'marked';

let isReaderMode = false;

class MarkdownReaderProvider implements vscode.CustomTextEditorProvider {
  public static readonly viewType = 'markdownReader.editor';

  constructor(private readonly context: vscode.ExtensionContext) {}

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new MarkdownReaderProvider(context);
    const providerRegistration = vscode.window.registerCustomEditorProvider(
      MarkdownReaderProvider.viewType,
      provider,
      {
        webviewOptions: {
          retainContextWhenHidden: true,
        },
      }
    );
    return providerRegistration;
  }

  async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): Promise<void> {
    webviewPanel.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this.context.extensionUri, 'media')],
    };

    const updateContent = () => {
      const markdown = document.getText();
      const html = marked(markdown);
      const cssUri = webviewPanel.webview.asWebviewUri(
        vscode.Uri.joinPath(this.context.extensionUri, 'media', 'styles.css')
      );
      webviewPanel.webview.html = this.getWebviewContent(html, cssUri);
    };

    const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(
      (e) => {
        if (e.document.uri.toString() === document.uri.toString()) {
          updateContent();
        }
      },
      null,
      this.context.subscriptions
    );

    webviewPanel.onDidDispose(() => {
      changeDocumentSubscription.dispose();
    });

    webviewPanel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.type) {
          case 'edit':
            vscode.commands.executeCommand('vscode.openWith', document.uri, 'default');
            break;
        }
      },
      null,
      this.context.subscriptions
    );

    updateContent();
  }

  private getWebviewContent(html: string, cssUri: vscode.Uri): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="${cssUri}" rel="stylesheet">
    <title>Markdown Reader</title>
    <style>
        .edit-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: 1px solid var(--vscode-button-border);
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            z-index: 1000;
            font-family: var(--vscode-font-family);
            font-size: var(--vscode-font-size);
        }
        .edit-button:hover {
            background: var(--vscode-button-hoverBackground);
        }
    </style>
</head>
<body>
    <button class="edit-button" onclick="editMode()">Edit Mode</button>
    <div class="markdown-body">
        ${html}
    </div>
    <script>
        const vscode = acquireVsCodeApi();
        function editMode() {
            vscode.postMessage({ type: 'edit' });
        }
    </script>
</body>
</html>`;
  }
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(MarkdownReaderProvider.register(context));

  const disposable = vscode.commands.registerCommand('markdownReader.toggleView', () => {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor || !activeEditor.document.fileName.endsWith('.md')) {
      vscode.window.showErrorMessage('Please open a Markdown file to use Markdown Reader.');
      return;
    }

    const uri = activeEditor.document.uri;

    if (isReaderMode) {
      vscode.commands.executeCommand('vscode.openWith', uri, 'default');
      isReaderMode = false;
    } else {
      vscode.commands.executeCommand('vscode.openWith', uri, 'markdownReader.editor');
      isReaderMode = true;
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
