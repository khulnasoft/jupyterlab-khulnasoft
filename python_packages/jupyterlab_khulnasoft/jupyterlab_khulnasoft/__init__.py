from ._version import __version__

def _jupyter_labextension_paths():
    return [
        {
            "src": "labextensions/@khulnasoftco/jupyterlab-khulnasoft",
            "dest": "@khulnasoftco/jupyterlab-khulnasoft",
        }
    ]
