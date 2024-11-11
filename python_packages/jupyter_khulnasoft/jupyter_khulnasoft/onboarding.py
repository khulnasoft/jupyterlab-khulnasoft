import json

from .manager import lsp_message_listener


class KhulnasoftOnboardingHandler:
    def process_message(self, contents, message):
        """
        Attach server root_dir to khulnasoft/onboarding message params
        """
        message_dict = json.loads(message)
        if message_dict.get("method") != "khulnasoft/onboarding":
            return message
        serverRoot = contents.root_dir if hasattr(contents, "root_dir") else ""
        message_dict["params"] = {"serverRoot": serverRoot}
        return json.dumps(message_dict)
