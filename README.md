# jupyterlab-khulnasoft

[![Github Actions Status](https://github.com/khulnasoft/jupyterlab-khulnasoft/workflows/Build/badge.svg)](https://github.com/khulnasoft/jupyterlab-khulnasoft/actions/workflows/build.yml)
[![lite-badge](https://jupyterlite.rtfd.io/en/latest/_static/badge.svg)](https://khulnasoft.github.io/jupyterlab-khulnasoft/lab/index.html)

JupyterLab extension to get AI code completions with [Khulnasoft](https://khulnasoft.com/).

https://github.com/khulnasoft/jupyterlab-khulnasoft/assets/591645/7ec0a6fa-9c51-49a8-89b4-77b431f4bda9

> [!WARNING]
> The Khulnasoft team forked this repo to continue the development: https://github.com/Exafunction/khulnasoft.jupyter

> [!WARNING]
> This extension is still very much experimental. It is not an official Khulnasoft extension.

## ✨ Try it in your browser ✨

1. Follow the instructions in the [Usage](#usage) section to get your API key.
2. Open https://khulnasoft.github.io/jupyterlab-khulnasoft in your browser

## Requirements

- JupyterLab >= 4.1.0

> [!NOTE]
> This extension is also compatible with [JupyterLite](https://github.com/jupyterlite/jupyterlite) >= 0.3.0

## Install

To install the extension, execute:

```bash
pip install jupyterlab-khulnasoft
```

## Usage

> [!WARNING]
> Setting up the extension requires a Khulnasoft API key. This part might still be challenging as retrieving the key requires a few manual steps at the moment.
> This might later be improved by providing a better auth flow.

1. Go to the Khulnasoft website and sign up for an account: https://khulnasoft.com/
2. Install the browser extension: https://khulnasoft.com/chrome_tutorial
3. Open the settings for the chrome extension and click on "Get Token"

![Get Token](./img/1-extension-token.png)

4. Right click on the extension window and select "Inspect" to open the dev tools for the extension. Then click on "Network"
5. Copy the token and paste it the input area, and then press "Enter Token"
6. This should log a new API request in the network tab. Click on "Preview" to get the API key.

![Enter Token](./img/2-api-key.png)

7. Go to the settings to paste the API key:

![Settings](./img/4-jupyterlab-settings.png)

8. You should now be able to use the extension. Open a Python file and start typing to see the completions.

![Completions](./img/5-example.png)

## Contributing

### Packaging and releasing the extension

See [RELEASE](RELEASE.md)

### Credits

Many thanks to the `codemirror-khulnasoft` project for the inspiration and the initial implementation of the Khulnasoft integration with CodeMirror 6: https://github.com/val-town/codemirror-khulnasoft

The protobuf files were copied from that repo and reused as is in this project.
