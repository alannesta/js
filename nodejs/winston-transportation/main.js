const createLogger = require('./logger');

const logger = createLogger('TestLogger');

kaka = {
    key: "stuff"
};

setInterval(() => {
    logger.info('What the heck, test object : %O', kaka);
    try {
        JSON.parse(kaka);
    } catch (e) {
        logger.error("Failed: %s", e);
    }
    logger.debug('debug stuff: ', kaka)
}, 2000);