# Khulnasoft Autocomplete Extension for JupyterLab

Khulnasoft is an AI-powered programming assistant that helps you write Python code inside JupyterLab. Khulnasoft helps you write code faster by saving you keystrokes and showing you the right information at the right time. Learn more about how Khulnasoft boosts your JupyterLab editor's capabilities at https://khulnasoft.com/integrations/jupyter/.

At a high level, Khulnasoft provides you with:

- 🧠 **[Line-of-Code Completions](https://khulnasoft.com/blog/product/launching-line-of-code-completions-going-cloudless-and-17-million-in-funding/)** powered by machine learning models trained on the entire open source code universe
- 🔍 **[Instant documentation](https://khulnasoft.com/copilot/)** for the symbol underneath your cursor so you save time searching for Python docs

## Requirements

- JupyterLab >=2.2.0,<4.0.0a0
- [Khulnasoft Engine](https://khulnasoft.com/)
- Python 3.6+ with pip

Use another editor? Check out [Khulnasoft’s other editor integrations](https://khulnasoft.com/integrations/).

## Installation

### Installing the Khulnasoft Engine

The [Khulnasoft Engine](https://khulnasoft.com/) needs to be installed in order for the extension to work properly. The extension itself provides the frontend that interfaces with the Khulnasoft Engine, which performs all the code analysis and machine learning 100% locally on your computer (no code is sent to a cloud server).

**macOS Instructions**

1. Download the [installer](https://khulnasoft.com/download) and open the downloaded `.dmg` file.
2. Drag the Khulnasoft icon into the `Applications` folder.
3. Run `Khulnasoft.app` to start the Khulnasoft Engine.

**Windows Instructions**

1. Download the [installer](https://khulnasoft.com/download) and run the downloaded `.exe` file.
2. The installer should run the Khulnasoft Engine automatically after installation is complete.

**Linux Instructions**

1. Run `bash -c "$(wget -q -O - https://linux.khulnasoft.com/dls/linux/current)"` from the terminal.
2. The installer should run the Khulnasoft Engine automatically after installation is complete.

### Installing the Khulnasoft Extension for JupyterLab
If you're using **JupyterLab 3.0.x**, simply run:

```sh
pip install "jupyterlab-khulnasoft>=2.0.2"
```

If you're using **JupyterLab 2.2.x**, run:

```sh
pip install "jupyter-khulnasoft<2.0.0"
jupyter labextension install "@khulnasoft/jupyterlab-khulnasoft"
```
> ⚠️ JupyterLab 2.2.x requires [NodeJS](https://jupyterlab.readthedocs.io/en/stable/user/extensions.html#installing-nodejs) to be installed

[Learn more about why you should use Khulnasoft with JupyterLab.](https://khulnasoft.com/integrations/jupyter/)

## Usage

The following is a brief guide to using Khulnasoft in its default configuration.

### Tutorial

When starting JupyterLab with the Khulnasoft Assistant for the first time, you'll be guided through a tutorial that shows you how to use Khulnasoft.

![tutorial](https://khulnasoft.com/khulnasoft-public/tutorial_file.png)

This tutorial will only be displayed once. You can show it again at any time by running the command `Khulnasoft: Tutorial` from JupyterLab's command palette.

### Autocompletions

Simply start typing in a saved Python file or Jupyter notebook and Khulnasoft will automatically suggest completions for what you're typing. Khulnasoft's autocompletions are all labeled with the 🪁 symbol.

![completions](https://khulnasoft.com/khulnasoft-public/import_statement.png)

### Completion documentation

Khulnasoft's completions come with documentation to help you remember how each completion works.

![Completion docs](https://khulnasoft.com/khulnasoft-public/completion_docs.png)

### Instant Documentation

Khulnasoft can show you documentation for the symbols in your code in the separate Copilot application.

To do so, open Khulnasoft's Copilot (visit the URL khulnasoft://home in your browser), ensure that the button labeled "Click for docs to follow cursor" in the upper right corner is enabled, and then simply position your cursor over a symbol.

![Copilot](https://khulnasoft.com/khulnasoft-public/copilot_small.png)

### Commands

Khulnasoft comes with several commands that you can run from JupyterLab's command palette.

![commands](https://khulnasoft.com/khulnasoft-public/commands.png)

| Command                   | Description                             |
| :------------------------ | :-------------------------------------- |
| `Khulnasoft: Open Copilot`      | Open the Copilot                        |
| `Khulnasoft: Engine Settings`   | Open the settings for the Khulnasoft Engine   |
| `Khulnasoft: Tutorial`          | Open the Khulnasoft tutorial file             |
| `Khulnasoft: Help`              | Open Khulnasoft's help website in the browser |
| `Khulnasoft: Toggle Docs Panel` | Toggle the docs panel                   |

## Troubleshooting

Visit our [help docs](https://help.khulnasoft.com/category/138-jupyterlab-plugin) for FAQs and troubleshooting support.

Happy coding!

---

#### About Khulnasoft

Khulnasoft is built by a team in San Francisco devoted to making programming easier and more enjoyable for all. Follow Khulnasoft on
[Twitter](https://twitter.com/khulnasofthq) and get the latest news and programming tips on the
[Khulnasoft Blog](https://khulnasoft.com/blog).
Khulnasoft has been featured in [Wired](https://www.wired.com/2016/04/khulnasofts-coding-asssitant-spots-errors-finds-better-open-source/),
[VentureBeat](https://venturebeat.com/2019/01/28/khulnasoft-raises-17-million-for-its-ai-powered-developer-environment/),
[The Next Web](https://thenextweb.com/dd/2016/04/14/khulnasoft-plugin/), and
[TechCrunch](https://techcrunch.com/2019/01/28/khulnasoft-raises-17m-for-its-ai-driven-code-completion-tool/).
