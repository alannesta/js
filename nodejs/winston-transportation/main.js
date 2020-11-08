const createLogger = require('./logger');

const logger = createLogger('TestLogger');
const winston = require('winston');

kaka = {
    key: "stuff"
};

// setInterval(() => {
//     logger.info('What the heck, test object : %O', kaka);
//     JSON.parse(kaka);
//     logger.debug('debug stuff: ', kaka)
// }, 2000);

function kaka(word) {
    return word.length
}

try {
    kaka();
    // JSON.parse(kaka);
} catch (error) {
    // logger.error('Got some object error ma Geez: %O', e);
    // logger.error('Got some object error ma Geez: %o', e);
    // console.log(JSON.parse(error));
    // logger.error('Got some string error ma Geez: %O', error);
    logger.error('Got some string error ma Geez: ' + error);
}

