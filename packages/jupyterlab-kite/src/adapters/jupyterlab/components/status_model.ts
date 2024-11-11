import { VDomModel } from '@jupyterlab/apputils';
import { LabIcon } from '@jupyterlab/ui-components';

import { isEqual } from 'lodash';

import { JupyterLabWidgetAdapter } from '../jl_adapter';
import { LSPConnection } from '../../../connection';

import khulnasoftLogo from '../../../../style/icons/khulnasoft-logo.svg';
import { IDocumentInfo } from 'lsp-ws-connection';
import { LanguageServerManager } from '../../../manager';

export interface IKhulnasoftStatus {
  status: string;
  short: string;
  long: string;
}

export const EmptyKhulnasoftStatus = { status: '', short: '', long: '' };

export interface State {
  disconnected: boolean;
  khulnasoftUninstalled: boolean;
  serverUnreachable: boolean;
  khulnasoftStatus: IKhulnasoftStatus;
}

/**
 * A VDomModel for the LSP of current file editor/notebook.
 */
export class KhulnasoftStatusModel extends VDomModel {
  private _language_server_manager: LanguageServerManager;
  private _icon: LabIcon = new LabIcon({
    name: 'jupyterlab-khulnasoft:status-icon',
    svgstr: khulnasoftLogo
  });
  private _state: State;
  private _adapter: JupyterLabWidgetAdapter | null = null;

  constructor(language_server_manager: LanguageServerManager) {
    super();

    this._language_server_manager = language_server_manager;
    this.icon.bindprops({ className: 'khulnasoft-logo' });
    this._state = {
      khulnasoftUninstalled: false,
      serverUnreachable: false,
      disconnected: false,
      khulnasoftStatus: EmptyKhulnasoftStatus
    };
  }

  async refresh(connection?: LSPConnection, documentInfo?: IDocumentInfo) {
    // Check /lsp/status for server reachability
    try {
      await this.languageServerManager.fetchSessions();
    } catch (err) {
      console.warn('Could not get server status:', err);
      this.setState({ serverUnreachable: true });
      return;
    }

    // Check if Khulnasoft engine is installed
    const installed = await this.languageServerManager.fetchKhulnasoftInstalled();
    if (!installed) {
      console.warn('Khulnasoft engine not installed');
      this.setState({ khulnasoftUninstalled: true });
      return;
    }

    if (this.reloadRequired) {
      return;
    }

    // Get status from Khulnasoft Engine
    if (connection && documentInfo) {
      const khulnasoftStatus = await connection.fetchKhulnasoftStatus(documentInfo);
      this.setState({ khulnasoftStatus });
    }
  }

  get languageServerManager(): LanguageServerManager {
    return this._language_server_manager;
  }

  get icon(): LabIcon {
    return this._icon;
  }

  get reloadRequired(): boolean {
    return this.state.disconnected;
  }

  get message(): { text: string; tooltip: string } {
    if (this.state.serverUnreachable) {
      return {
        text: 'Khulnasoft: server extension unreachable',
        tooltip: 'The jupyter-khulnasoft server extension could not be reached.'
      };
    }

    if (this.state.khulnasoftUninstalled) {
      return {
        text: 'Khulnasoft: engine not installed',
        tooltip: 'Khulnasoft engine install could not be found.'
      };
    }

    if (this.reloadRequired) {
      return {
        text: 'Khulnasoft: disconnected (reload page)',
        tooltip:
          'The connection to Khulnasoft was interrupted. Save your changes and reload the page to reconnect.'
      };
    }

    if (this.adapter && this.state.khulnasoftStatus.status) {
      return {
        text: 'Khulnasoft: ' + this.state.khulnasoftStatus.short,
        tooltip: this.state.khulnasoftStatus.long
      };
    }

    return {
      text: 'Khulnasoft: not running',
      tooltip: 'Khulnasoft is not reachable.'
    };
  }

  get adapter(): JupyterLabWidgetAdapter | null {
    return this._adapter;
  }

  set adapter(adapter: JupyterLabWidgetAdapter | null) {
    if (this._adapter) {
      this._adapter.connection_manager.closed.disconnect(
        this._connectionClosed
      );
    }
    if (adapter) {
      adapter.connection_manager.closed.connect(this._connectionClosed);
    }
    this._adapter = adapter;
  }

  get state(): State {
    return this._state;
  }

  /**
   * Loosely based on React's setState.
   * Only signals a change if the potential new state
   * is not deeply equal to the current state.
   */
  setState<K extends keyof State>(newValues: Pick<State, K>) {
    const merged = { ...this._state, ...newValues };
    if (!isEqual(this._state, merged)) {
      this._state = merged;
      this._onChange();
    }
  }

  private _connectionClosed = () => {
    this.setState({ disconnected: true });
  };

  private _onChange = () => {
    this.stateChanged.emit(void 0);
  };
}
