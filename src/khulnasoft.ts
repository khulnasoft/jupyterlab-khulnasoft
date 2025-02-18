// Some of this code is based on the code from https://github.com/val-town/codemirror-khulnasoft/blob/main/src/khulnasoft.ts
// licensed under the ISC License: https://github.com/val-town/codemirror-khulnasoft/blob/main/LICENSE

import { UUID } from '@lumino/coreutils';

import { createPromiseClient } from '@connectrpc/connect';
import { LanguageServerService } from './api/proto/exa/language_server_pb/language_server_connect';
import { Language } from './api/proto/exa/khulnasoft_common_pb/khulnasoft_common_pb';
import { createConnectTransport } from '@connectrpc/connect-web';
import {
  Document,
  GetCompletionsResponse
} from './api/proto/exa/language_server_pb/language_server_pb';
import { IKhulnasoftConfig } from './config';
import { type PartialMessage } from '@bufbuild/protobuf';

const transport = createConnectTransport({
  baseUrl: 'https://server.khulnasoft.com',
  useBinaryFormat: true
});

const client = createPromiseClient(LanguageServerService, transport);

const sessionId = UUID.uuid4();

export async function getKhulnasoftCompletions({
  text,
  cursorOffset,
  config,
  otherDocuments
}: {
  text: string;
  cursorOffset: number;
  config: IKhulnasoftConfig;
  otherDocuments: PartialMessage<Document>[];
}) {
  const lang = config.language;
  const language = Language[lang?.toUpperCase() as keyof typeof Language];
  return await client.getCompletions(
    {
      metadata: {
        // TODO: read metadata from app
        ideName: 'web',
        ideVersion: '0.0.5',
        extensionName: 'TODO',
        extensionVersion: '1.0.0',
        apiKey: config.apiKey,
        sessionId: sessionId,
        authSource: config.authSource
      },
      document: {
        text: text,
        cursorOffset: BigInt(cursorOffset),
        language,
        editorLanguage: lang ?? 'python',
        lineEnding: '\n'
      },
      editorOptions: {
        tabSize: 2n,
        insertSpaces: true
      },
      otherDocuments: otherDocuments,
      multilineConfig: undefined
    },
    {
      // signal,
      headers: {
        Authorization: `Basic ${config.apiKey}-${sessionId}`
      }
    }
  );
}

export function simplifyCompletions(completions: GetCompletionsResponse) {
  return completions.completionItems[0]!.completionParts.filter(part => {
    // Type 3 overwrites existing text. Maybe we need this eventually,
    // but not right now and it usually is duplicative.
    return part.type !== 3;
  }).map(part => {
    return {
      ...part,
      offset: Number(part.offset),
      text: part.type === 2 ? `\n${part.text}` : part.text
    };
  });
}
