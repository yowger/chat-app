import DailyRotateFile from "winston-daily-rotate-file"
import winston, { format } from "winston"

import { sensitiveKeys } from "@/data/keys"

import { generateId } from "@/utils/generateId"
import { isDevEnv } from "@/utils/env"
import { isEmptyObject } from "@/utils/helpers"
import { redact } from "@/utils/redact"

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
}

const customFormat = format.combine(
    format.errors({ stack: true }),
    format.splat(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((info) => {
        const redactedInfo = redact(info, sensitiveKeys)

        const { timestamp, level, message, ...data } = redactedInfo

        const response: any = {
            level: level.toUpperCase(),
            logId: generateId(),
            timestamp,
            message,
        }

        if (!isEmptyObject(data)) {
            response.data = data
        }

        return JSON.stringify(response, null, 3)
    })
)

const level = isDevEnv() ? "debug" : "error"

const consoleTransport = new winston.transports.Console({
    level,
})

const datePattern = "YYYY-MM-DD-HH"

const fileTransports = {
    dailyFile: new DailyRotateFile({
        filename: "logs/combined/combined-%DATE%.log",
        datePattern: datePattern,
        zippedArchive: true,
        maxSize: "50m",
        maxFiles: "7d",
    }),
    dailyFatalFile: new DailyRotateFile({
        level: "fatal",
        filename: "logs/fatal/fatal-%DATE%.log",
        datePattern: datePattern,
        zippedArchive: true,
        maxSize: "10m",
        maxFiles: "30d",
    }),
}

const logger = winston.createLogger({
    levels: logLevels,
    format: customFormat,
    transports: [...Object.values(fileTransports)],
    exceptionHandlers: [...Object.values(fileTransports)],
    exitOnError: false,
})

if (isDevEnv()) {
    logger.add(consoleTransport)
}

export default logger
