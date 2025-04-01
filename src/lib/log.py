import os
from logging import DEBUG, Formatter, StreamHandler, getLogger

LOGLEVEL = os.getenv("LOGLEVEL", default=DEBUG)


def get_logger(logger_name, loglevel):
    logger = getLogger(logger_name)
    handler = StreamHandler()
    handler.setFormatter(
        Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
    )
    setting_loglevel = loglevel if loglevel else LOGLEVEL
    try:
        handler.setLevel(setting_loglevel)
        logger.setLevel(setting_loglevel)
        logger.addHandler(handler)
    except BaseException:
        handler.setLevel(DEBUG)
        logger.setLevel(DEBUG)
        logger.addHandler(handler)
    logger.propagate = False
    return logger


logger = get_logger(logger_name=os.getenv("APP_NAME", default="app_name"), loglevel=LOGLEVEL)
