const createLogger = require('./logger');

const logger = createLogger('TestLogger');
const winston = require('winston');

kaka = {
    key: "stuff"
};

setInterval(() => {
    logger.info('What the heck, test object : %O', kaka);
    JSON.parse(kaka);
    logger.debug('debug stuff: ', kaka)
}, 2000);

// console.log(logger.transports);