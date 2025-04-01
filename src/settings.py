import os
from dataclasses import dataclass
from logging import DEBUG, INFO


@dataclass
class Settings:
    SRC_VERSION: str
    APP_NAME: str
    STAGE: str
    LOGLEVEL: int

    def __new__(cls, *args, **kargs):
        """Singleton pattern for Settings class"""
        if not hasattr(cls, "_instance"):
            cls._instance = super(Settings, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        _secrets = get_secret(f"{os.getenv('SECRET_NAME')}")
        self.SRC_VERSION = self._get_src_version()
        self.APP_NAME = os.getenv("APP_NAME", default="sampleapp")
        self.STAGE = os.getenv("STAGE", default="dev")
        self.LOGLEVEL = INFO if self.STAGE.lower == "prod" else DEBUG

settings = Settings()
