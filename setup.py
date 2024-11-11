import json
from pathlib import Path
from re import findall

ROOT = Path(__file__).resolve().parent


JUPYTER_KHULNASOFT_PATH = ROOT / "python_packages" / "jupyter_khulnasoft"
_VERSION_PY = JUPYTER_KHULNASOFT_PATH / "jupyter_khulnasoft" / "_version.py"
JUPYTER_KHULNASOFT_VERSION = findall(r'= "(.*)"$', _VERSION_PY.read_text(encoding="utf-8"))[0]

with open(ROOT / "packages/jupyterlab-khulnasoft/package.json") as f:
    jupyterlab_khulnasoft_package = json.load(f)

JUPYTERLAB_KHULNASOFT_VERSION = jupyterlab_khulnasoft_package['version']
JUPYTERLAB_VERSION = (
    jupyterlab_khulnasoft_package
    ['devDependencies']
    ['@jupyterlab/application']
    .lstrip('~^')
)
JUPYTERLAB_NEXT_MAJOR_VERSION = int(JUPYTERLAB_VERSION.split('.')[0]) + 1
REQUIRED_JUPYTERLAB = f'>={JUPYTERLAB_VERSION},<{JUPYTERLAB_NEXT_MAJOR_VERSION}.0.0a0'
REQUIRED_JUPYTER_SERVER = '>=1.1.2'
REQUIRED_PYTHON = '>=3.6'