const path = require('path');
const fs = require('fs');

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const WinstonCloudWatch = require('winston-cloudwatch');

const {combine, timestamp, label, colorize, printf, json, splat} = winston.format;

const logFormat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}]${getFormattingTabs(label)} ${level}\t: ${message}`;
});

function getFormattingTabs(label) {
    if (label.length > 20) {
        return '';
    }

    if (label.length > 15) {
        return '\t';
    }
    return '\t\t';
}

/**
 *
 * @param loggerLabel label to be used for the logger
 * @param loggerType WORKFLOW | TASK
 * @param logBaseDir the log folder
 * @returns {Logger}
 */
function createLoggerWithLabel(loggerLabel) {
    const logger = winston.createLogger({
        level: 'info',
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: combine(
                    splat(),    // object interpolation
                    colorize({all: true}),
                    timestamp(),
                    label({label: loggerLabel}),
                    logFormat
                )
            }),
            new DailyRotateFile({
                level: 'info',
                filename: 'application-%DATE%.log',
                frequency: '3m',
                datePattern: 'HH_mm',
                zippedArchive: false,
                maxSize: '100k',
                maxFiles: '5',
                format: combine(
                    splat(),    // object interpolation
                    timestamp(),
                    label({label: loggerLabel}),
                    logFormat
                )
            }),
            new DailyRotateFile({
                level: 'error',
                filename: 'application-error-%DATE%.log',
                frequency: '3m',
                datePattern: 'HH_mm',
                zippedArchive: false,
                maxSize: '100k',
                maxFiles: '5',
                format: combine(
                    splat(),    // object interpolation
                    timestamp(),
                    label({label: loggerLabel}),
                    logFormat
                )
            })
        ]
    });

    return logger;
}

module.exports = createLoggerWithLabel;