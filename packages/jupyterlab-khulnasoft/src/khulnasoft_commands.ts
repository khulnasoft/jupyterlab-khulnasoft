import { JupyterFrontEnd } from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils';
import { CommandRegistry } from '@lumino/commands';
import { toggle } from './adapters/jupyterlab/khulnasoft_completer';

export const category = 'khulnasoft';
export const cmdIds = {
  tutorial: 'khulnasoft:tutorial',
  copilot: 'khulnasoft:copilot',
  settings: 'khulnasoft:settings',
  help: 'khulnasoft:help',
  toggleDocs: 'khulnasoft:toggle-docs'
};
export interface IKhulnasoftCommand {
  id: string;
  options: CommandRegistry.ICommandOptions;
}

const paletteCommands: ReadonlyArray<IKhulnasoftCommand> = [
  {
    id: cmdIds.copilot,
    options: {
      label: 'Khulnasoft: Open Copilot',
      execute: () => {
        window.open('khulnasoft://home');
      }
    }
  },
  {
    id: cmdIds.settings,
    options: {
      label: 'Khulnasoft: Engine Settings',
      execute: () => {
        window.open('khulnasoft://settings');
      }
    }
  },
  {
    id: cmdIds.help,
    options: {
      label: 'Khulnasoft: Help',
      execute: () => {
        window.open(
          'https://help.khulnasoft.com/category/138-jupyterlab-plugin'
        );
      }
    }
  },
  {
    id: cmdIds.toggleDocs,
    options: {
      label: 'Khulnasoft: Toggle Docs Panel',
      execute: () => {
        toggle();
      }
    }
  }
];

export function registerKhulnasoftCommands(
  app: JupyterFrontEnd,
  palette: ICommandPalette
) {
  // Register palette commands
  paletteCommands.forEach(cmd => {
    app.commands.addCommand(cmd.id, cmd.options);
    palette.addItem({ command: cmd.id, category });
  });
}
