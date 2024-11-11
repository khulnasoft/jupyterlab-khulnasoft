from .utils import KhulnasoftShellSpec


class KhulnasoftLanguageServer(KhulnasoftShellSpec):
    key = "khulnasoftls"
    languages = ["python"]
    spec = dict(
        display_name="khulnasoft",
        mime_types=["text/python", "text/x-ipython"]
    )
