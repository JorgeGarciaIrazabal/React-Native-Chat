import os

from services.Env import Env


class Constants:
    __instance = None

    def __new__(cls):
        if Constants.__instance is None:
            Constants.__instance = object.__new__(cls)
            __instance = Constants.__instance

            __instance.environment = os.getenv('ENVIRONMENT', Env.LOCAL)
            __instance.mongo_uri = os.getenv('MONGODB_URI', None)
            __instance.server_port = os.getenv('PORT', 8844)
            __instance.root_path = os.getenv('REACT_CHAT_PATH', './')
            __instance.back_end_path = os.path.join(__instance.root_path, 'backend')
            __instance.logging_config_path = os.path.join(
                __instance.back_end_path,
                os.getenv('LOGGING_CONFIG_NAME', 'logging_local.json')
            )

        return Constants.__instance
