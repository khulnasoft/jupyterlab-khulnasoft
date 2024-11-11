import { JupyterFrontEnd } from '@jupyterlab/application';
import { ServiceManager } from '@jupyterlab/services';
import { PageConfig } from '@jupyterlab/coreutils';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { ListModel } from '@jupyterlab/extensionmanager';

import { INotification } from 'jupyterlab_toastify';
import React from 'react';
import Semver from 'semver';

import { VirtualDocument } from './virtual/document';
import { DocumentConnectionManager } from './connection_manager';

import '../style/khulnasoft_accessible.css';
import { LanguageServerManager } from './manager';

enum Health {
  ServerExtensionUnreachable = 'ServerExtensionUnreachable',
  RequirementsNotMet = 'RequirementsNotMet',
  KhulnasoftEngineNotInstalled = 'KhulnasoftNotInstalled',
  BelowMinJLabVersion = 'BelowMinJLabVersion',
  IncompatibleJLabLSPPlugin = 'HasIncompatibleJLabLSP',
  JLabKhulnasoftHasUpdate = 'JLabKhulnasoftHasUpdate',
  Healthy = 'Healthy'
}

const _MinJlabVersion = '3.0.0';

// KhulnasoftAccessible must access fetchInstalled, etc
export class KhulnasoftAccessible extends ListModel {
  private connectionManager: DocumentConnectionManager;
  private languageServerManager: LanguageServerManager;

  public static CreateAsync = async (
    app: JupyterFrontEnd,
    serviceManager: ServiceManager,
    registery: ISettingRegistry,
    connectionManager: DocumentConnectionManager,
    languageServerManager: LanguageServerManager
  ): Promise<KhulnasoftAccessible> => {
    // Use extensionmanager settings because KhulnasoftAccessible needs
    // protected ListModel.queryInstalled
    const settings = await registery.load(
      '@jupyterlab/extensionmanager-extension:plugin'
    );
    return new KhulnasoftAccessible(
      app,
      serviceManager,
      settings,
      connectionManager,
      languageServerManager
    );
  };

  constructor(
    app: JupyterFrontEnd,
    serviceManager: ServiceManager,
    settings: ISettingRegistry.ISettings,
    connectionManager: DocumentConnectionManager,
    languageServerManager: LanguageServerManager
  ) {
    super(app, serviceManager, settings);
    this.connectionManager = connectionManager;
    this.languageServerManager = languageServerManager;
  }

  public async checkHealth(): Promise<void> {
    try {
      const health = await this.getHealth();
      await this.notifyHealth(health);
      if (health === Health.IncompatibleJLabLSPPlugin) {
        this.trackIncompatiblity().catch(e => console.log(e));
      }
    } catch (e) {
      console.log('Health check failed:', e);
    }
  }

  private async notifyHealth(health: string): Promise<void> {
    const baseToastOptions = {
      autoClose: false,
      closeOnClick: false,
      className: '--jp-khulnasoft-notifcontainer'
    } as {
      // To avoid type mismatch with ToastOptions
      autoClose: number | false;
      closeOnClick: boolean;
      className: string;
    };

    let id: string | number;
    switch (health) {
      case Health.ServerExtensionUnreachable:
        id = await INotification.notify(
          <InnerNotif title="Server Extension Unreachable">
            <p className="--jp-khulnasoft-innernotif-main-msg">
              The jupyterlab-khulnasoft extension will not work because the
              jupyter-khulnasoft server extension could not be reached.
            </p>
            <p>
              To fix this, please ensure the jupyter-khulnasoft server extension is
              installed and active (`jupyter serverextension list`), then
              restart the JupyterLab process.
            </p>
            <ButtonBar
              label="Fix This"
              onClick={() => {
                window.open(
                  'https://github.com/khulnasoftco/jupyterlab-khulnasoft#installing-the-khulnasoft-extension-for-jupyterlab',
                  '_blank'
                );
                void INotification.dismiss(id);
              }}
            />
          </InnerNotif>,
          {
            ...baseToastOptions,
            type: 'error'
          }
        );
        break;
      case Health.RequirementsNotMet:
        id = await INotification.notify(
          <InnerNotif title="Khulnasoft is missing some dependencies">
            <p className="--jp-khulnasoft-innernotif-main-msg">
              The jupyterlab-khulnasoft extension will not work because you using an
              unsupported version of JupyterLab and you are missing the desktop
              application.
            </p>
            <p>
              To fix this, please upgrade JupyterLab to version 2.2 or later and
              install the Khulnasoft Engine desktop application.
            </p>
            <ButtonBar
              label="Fix This"
              onClick={() => {
                window.open(
                  'https://www.khulnasoft.com/download?utm_source=jupyterlab-plugin&utm_content=update-jlab',
                  '_blank'
                );
                void INotification.dismiss(id);
              }}
            />
          </InnerNotif>,
          {
            ...baseToastOptions,
            type: 'error'
          }
        );
        break;
      case Health.BelowMinJLabVersion:
        id = await INotification.notify(
          <InnerNotif title="Khulnasoft is missing some dependencies">
            <p className="--jp-khulnasoft-innernotif-main-msg">
              The jupyterlab-khulnasoft extension will not work because you are using
              an unsupported version of JupyterLab.
            </p>
            <p>
              To fix this, please upgrade JupyterLab to version 2.2 or later.
            </p>
            <ButtonBar
              label="Fix This"
              onClick={() => {
                window.open(
                  'https://stackoverflow.com/questions/55772171/how-to-update-jupyterlab-using-conda-or-pip',
                  '_blank'
                );
                void INotification.dismiss(id);
              }}
            />
          </InnerNotif>,
          {
            ...baseToastOptions,
            type: 'error'
          }
        );
        break;
      case Health.KhulnasoftEngineNotInstalled:
        id = await INotification.notify(
          <InnerNotif title="Khulnasoft is missing some dependencies">
            <p className="--jp-khulnasoft-innernotif-main-msg">
              The jupyterlab-khulnasoft extension will not work because you are
              missing the Khulnasoft Engine desktop application.
            </p>
            <p>
              To fix this, please install the Khulnasoft Engine desktop application.
            </p>
            <ButtonBar
              label="Fix This"
              onClick={() => {
                window.open(
                  'https://www.khulnasoft.com/download?utm_source=jupyterlab-plugin',
                  '_blank'
                );
                void INotification.dismiss(id);
              }}
            />
          </InnerNotif>,
          {
            ...baseToastOptions,
            type: 'error'
          }
        );
        break;
      case Health.IncompatibleJLabLSPPlugin:
        id = await INotification.notify(
          <InnerNotif title="Khulnasoft may not work properly in your environment">
            <p className="--jp-khulnasoft-innernotif-main-msg">
              The jupyterlab-khulnasoft extension is incompatible with your JupyterLab
              configuration.
            </p>
            <p>It will not work with the jupyterlab-lsp extension.</p>
            <ButtonBar
              label="Learn More"
              onClick={() => {
                window.open(
                  'https://help.khulnasoft.com/article/143-how-to-install-the-jupyterlab-plugin#troubleshooting',
                  '_blank'
                );
                void INotification.dismiss(id);
              }}
            />
          </InnerNotif>,
          {
            ...baseToastOptions,
            type: 'warning'
          }
        );
        break;
      case Health.JLabKhulnasoftHasUpdate:
        id = await INotification.notify(
          <>
            <InnerNotif title="There is a new version of Khulnasoft available">
              <p className="--jp-khulnasoft-innernotif-main-msg">
                Please update your jupyterlab-khulnasoft extension with the terminal
                commands:
              </p>
              <ul className="--jp-khulnasoft-innernotif-list --jp-khulnasoft-innernotif-no-bullets">
                <li className="--jp-khulnasoft-innernotif-li">
                  pip install --upgrade jupyter-khulnasoft
                </li>
                <li className="--jp-khulnasoft-innernotif-li">
                  jupyter labextension update @khulnasoftco/jupyterlab-khulnasoft
                </li>
              </ul>
              <ButtonBar
                label="Update"
                onClick={() => {
                  window.open(
                    'https://help.khulnasoft.com/article/143-how-to-install-the-jupyterlab-plugin#updating-the-plugin'
                  );
                  void INotification.dismiss(id);
                }}
              />
            </InnerNotif>
          </>,
          {
            ...baseToastOptions,
            type: 'info'
          }
        );
        break;
    }
  }

  private async getHealth(): Promise<string> {
    try {
      await this.languageServerManager.fetchSessions();
    } catch {
      return Health.ServerExtensionUnreachable;
    }
    const installed = await this.languageServerManager.fetchKhulnasoftInstalled();
    const version = PageConfig.getOption('appVersion');
    if (!installed && Semver.lt(version, _MinJlabVersion)) {
      return Health.RequirementsNotMet;
    } else if (!installed) {
      return Health.KhulnasoftEngineNotInstalled;
    } else if (Semver.lt(version, _MinJlabVersion)) {
      return Health.BelowMinJLabVersion;
    }

    const pluginMap = await this.queryInstalled(false);
    if (pluginMap['@krassowski/jupyterlab-lsp']) {
      return Health.IncompatibleJLabLSPPlugin;
    }
    if (ListModel.entryHasUpdate(pluginMap['@khulnasoftco/jupyterlab-khulnasoft'])) {
      return Health.JLabKhulnasoftHasUpdate;
    }

    return Health.Healthy;
  }

  private async trackIncompatiblity(): Promise<void> {
    // Allow using the connection without an actual doucment open
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
      void connection.track('mixpanel', 'jupyterlab_incompatibility', {
        type: 'jupyter-lab-lsp'
      });
    }
  }
}

function InnerNotif(props: {
  title: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <>
      <p className="--jp-khulnasoft-innernotif-title">{props.title}</p>
      <div className="--jp-khulnasoft-innernotif-body">{props.children}</div>
    </>
  );
}

function ButtonBar(props: {
  label: string;
  onClick: () => void;
}): React.ReactElement {
  return (
    <div className="--jp-khulnasoft-buttonbar">
      <div className="--jp-khulnasoft-buttonbar-spacer" />
      <button className="--jp-khulnasoft-innernotif-button" onClick={props.onClick}>
        {props.label}
      </button>
    </div>
  );
}
