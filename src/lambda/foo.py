from lib.log import get_logger
from settings import settings

logger = get_logger(__name__)


def handler(event, context):
    """フォローバックする"""
    logger.info("event: %s", event)
    return { "message": "samplemsg" , statusCode: 200 }

