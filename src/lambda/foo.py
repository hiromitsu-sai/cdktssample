from lib.log import get_logger

logger = get_logger(__name__)


def handler(event, context):
    logger.info("event: %s", event)
    return {"Message": "samplemsg", "StatusCode": 200}
