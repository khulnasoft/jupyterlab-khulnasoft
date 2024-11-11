import { JupyterFrontEnd } from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils';
import { IDocumentManager } from '@jupyterlab/docmanager';
import { IStateDB } from '@jupyterlab/statedb';
import { DocumentConnectionManager } from './connection_manager';
import { category, cmdIds, IKhulnasoftCommand } from './khulnasoft_commands';
import { VirtualDocument } from './virtual/document';

export const onboardingShownKey = 'onboardingShown';

export class KhulnasoftOnboarding {
  private app: JupyterFrontEnd;
  private palette: ICommandPalette;
  private documentManager: IDocumentManager;
  private state: IStateDB;
  private connectionManager: DocumentConnectionManager;

  constructor(
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    documentManager: IDocumentManager,
    state: IStateDB,
    connectionManager: DocumentConnectionManager
  ) {
    this.app = app;
    this.palette = palette;
    this.documentManager = documentManager;
    this.state = state;
    this.connectionManager = connectionManager;

    this.registerCommand();
  }

  registerCommand() {
    const cmd: IKhulnasoftCommand = {
      id: cmdIds.tutorial,
      options: {
        label: 'Khulnasoft: Tutorial',
        execute: () => {
          this._show().catch(e => console.log(e));
        }
      }
    };
    if (this.app.commands.hasCommand(cmd.id)) {
      return;
    }
    this.app.commands.addCommand(cmd.id, cmd.options);
    this.palette.addItem({ command: cmd.id, category });
  }

  async showOnBoot() {
    const onboardingShown = await this.state.fetch(onboardingShownKey);
    if (!onboardingShown) {
      this._show().catch(e => console.log(e));
    }
    this.state.save(onboardingShownKey, true).catch(e => console.log(e));
  }

  async _fetch(): Promise<string> {
    // Enable connection even without open document
    const emptyVirtualDocument = new VirtualDocument(
      'python',
      '',
      {},
      {},
      false,
      '.py',
      false
    );
    const options = {
      virtual_document: emptyVirtualDocument,
      language: 'python',
      document_path: ''
    };
    const connection = await this.connectionManager.connect(options);
    if (connection) {
      return connection.fetchKhulnasoftOnboarding();
    } else {
      return '';
    }
  }

  private async _show() {
    const filename = await this._fetch();
    if (filename) {
      this.documentManager.openOrReveal(filename);
    }
  }
}
