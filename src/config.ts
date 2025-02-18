// Some of this code is based on the code from https://github.com/val-town/codemirror-khulnasoft/blob/main/src/config.ts
// licensed under the ISC License: https://github.com/val-town/codemirror-khulnasoft/blob/main/LICENSE

export interface IKhulnasoftConfig {
  /**
   * Khulnasoft API key
   */
  apiKey: string;

  /**
   * The programming language of the given document.
   */
  language?: string;
  /**
   * Time in millseconds after typing to fetch
   * completions from khulnasoft
   */
  timeout?: number;

  authSource?: number;
}
