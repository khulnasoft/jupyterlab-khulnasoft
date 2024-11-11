from ._version import __version__

def _jupyter_labextension_paths():
    return [
        {
            "src": "labextensions/@khulnasoft/jupyterlab-khulnasoft",
            "dest": "@khulnasoft/jupyterlab-khulnasoft",
        }
    ]
