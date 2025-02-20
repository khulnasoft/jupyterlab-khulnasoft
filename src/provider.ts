import {
  CompletionHandler,
  IInlineCompletionContext,
  IInlineCompletionProvider
} from '@jupyterlab/completer';

import { IEditorLanguageRegistry } from '@jupyterlab/codemirror';

import { getKhulnasoftCompletions, simplifyCompletions } from './khulnasoft';

export class KhulnasoftProvider implements IInlineCompletionProvider {
  readonly identifier = 'khulnasoft';
  readonly name = 'Khulnasoft';

  constructor(options: KhulnasoftProvider.IOptions) {
    this._editorLanguageRegistry = options.editorLanguageRegistry;
  }

  set apiKey(apiKey: string) {
    this._apiKey = apiKey;
  }

  async fetch(
    request: CompletionHandler.IRequest,
    context: IInlineCompletionContext
  ) {
    const { text, offset: cursorOffset, mimeType } = request;
    const language = this._editorLanguageRegistry.findByMIME(mimeType ?? '');
    const results = await getKhulnasoftCompletions({
      text,
      cursorOffset,
      config: {
        apiKey: this._apiKey,
        language: language?.support?.language.name
      },
      otherDocuments: []
    });

    const simplified = simplifyCompletions(results).map(part => ({
      from: Number(part.offset),
      to: Number(part.offset),
      insert: part.text
    }));

    return {
      items: simplified.map(part => ({ insertText: part.insert }))
    };
  }

  private _apiKey = '';
  private _editorLanguageRegistry: IEditorLanguageRegistry;
}

export namespace KhulnasoftProvider {
  export interface IOptions {
    editorLanguageRegistry: IEditorLanguageRegistry;
  }
}
