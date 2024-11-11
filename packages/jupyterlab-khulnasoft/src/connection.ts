// Disclaimer/acknowledgement: Fragments are based on LspWsConnection, which is copyright of wylieconlon and contributors and ISC licenced.
// ISC licence is, quote, "functionally equivalent to the simplified BSD and MIT licenses,
// but without language deemed unnecessary following the Berne Convention." (Wikipedia).
// Introduced modifications are BSD licenced, copyright JupyterLab development team.
import * as lsProtocol from 'vscode-languageserver-protocol';
import * as path from 'path';
import {
  ILspOptions,
  IPosition,
  LspWsConnection,
  IDocumentInfo
} from 'lsp-ws-connection';
import { until_ready } from './utils';
import {
  KhulnasoftStatusModel,
  IKhulnasoftStatus,
  EmptyKhulnasoftStatus
} from './adapters/jupyterlab/components/status_model';

interface ILSPOptions extends ILspOptions {
  khulnasoft_status_model?: KhulnasoftStatusModel;
}

export class LSPConnection extends LspWsConnection {
  protected documentsToOpen: IDocumentInfo[];
  protected status_model?: KhulnasoftStatusModel;

  constructor(options: ILSPOptions) {
    super(options);
    this.documentsToOpen = [];
    this.status_model = options.khulnasoft_status_model;
  }

  sendOpenWhenReady(documentInfo: IDocumentInfo) {
    if (this.isReady) {
      this._sendOpen(documentInfo);
    } else {
      this.documentsToOpen.push(documentInfo);
    }
  }

  protected onServerInitialized(params: lsProtocol.InitializeResult) {
    super.onServerInitialized(params);
    while (this.documentsToOpen.length) {
      const document = this.documentsToOpen.pop();
      if (document) {
        this._sendOpen(document);
      }
    }
  }

  async track(
    to: string,
    event: string,
    props: Record<string, unknown>
  ): Promise<void> {
    try {
      await this.connection.sendRequest('khulnasoft/track', {
        to,
        event,
        props
      });
    } catch {
      console.warn(`Could not track ${event}, ${props} to ${to}`);
    }
  }

  async fetchKhulnasoftOnboarding(): Promise<string> {
    let filepath: string;
    try {
      filepath = await this.connection.sendRequest('khulnasoft/onboarding');
      return path.basename(filepath);
    } catch {
      console.warn('Could not get Khulnasoft Onboarding file.');
    }
    return '';
  }

  async fetchKhulnasoftStatus(documentInfo: IDocumentInfo): Promise<IKhulnasoftStatus> {
    let result = EmptyKhulnasoftStatus;
    try {
      result = await this.connection.sendRequest('khulnasoft/status', {
        uri: documentInfo.uri
      });
    } catch (err) {
      console.warn('Could not fetch Khulnasoft Status:', err);
    }
    return result;
  }

  sendSelection(
    location: IPosition,
    documentInfo: IDocumentInfo,
    text: string
  ) {
    try {
      this.connection.sendNotification('khulnasoft/selection', {
        positions: [{ line: location.line, character: location.ch }],
        textDocument: { uri: documentInfo.uri },
        text
      });
    } catch (e) {
      console.warn('[Khulnasoft] Selection Notification Error:', e);
    }
    this.status_model?.refresh(this, documentInfo).catch(e => console.log(e));
  }

  public sendSelectiveChange(
    changeEvent: lsProtocol.TextDocumentContentChangeEvent,
    documentInfo: IDocumentInfo
  ) {
    this._sendChange([changeEvent], documentInfo);
  }

  public sendFullTextChange(text: string, documentInfo: IDocumentInfo): void {
    this._sendChange([{ text }], documentInfo);
  }

  public isRenameSupported() {
    return !!(
      this.serverCapabilities && this.serverCapabilities.renameProvider
    );
  }

  async rename(
    location: IPosition,
    documentInfo: IDocumentInfo,
    newName: string,
    emit = true
  ): Promise<lsProtocol.WorkspaceEdit | undefined> {
    if (!this.isReady || !this.isRenameSupported()) {
      return;
    }

    const params: lsProtocol.RenameParams = {
      textDocument: {
        uri: documentInfo.uri
      },
      position: {
        line: location.line,
        character: location.ch
      },
      newName
    };

    const edit: lsProtocol.WorkspaceEdit = await this.connection.sendRequest(
      'textDocument/rename',
      params
    );

    if (emit) {
      this.emit('renamed', edit);
    }

    return edit;
  }

  protected initializeParams(): lsProtocol.InitializeParams {
    const params = super.initializeParams();
    params.initializationOptions = { khulnasoftTypesEnabled: true };
    return params;
  }

  public connect(socket: WebSocket): this {
    super.connect(socket);

    until_ready(() => {
      return this.isConnected;
    }, -1)
      .then(() => {
        this.connection.onClose(() => {
          this.isConnected = false;
          this.emit('close', this.closing_manually);
        });
      })
      .catch(() => {
        console.error('Could not connect onClose signal');
      });
    return this;
  }

  private closing_manually = false;

  public close() {
    try {
      this.closing_manually = true;
      super.close();
    } catch (e) {
      this.closing_manually = false;
    }
  }

  private _sendOpen(documentInfo: IDocumentInfo) {
    this.sendOpen(documentInfo);
    this.status_model?.refresh(this, documentInfo).catch(e => console.log(e));
  }

  private _sendChange(
    changeEvents: lsProtocol.TextDocumentContentChangeEvent[],
    documentInfo: IDocumentInfo
  ) {
    if (!this.isConnected || !this.isInitialized) {
      return;
    }
    const textDocumentChange: lsProtocol.DidChangeTextDocumentParams = {
      textDocument: {
        uri: documentInfo.uri,
        version: documentInfo.version
      } as lsProtocol.VersionedTextDocumentIdentifier,
      contentChanges: changeEvents
    };
    this.connection.sendNotification(
      'textDocument/didChange',
      textDocumentChange
    );
    documentInfo.version++;
    this.status_model?.refresh(this, documentInfo).catch(e => console.log(e));
  }
}
