import DailyRotateFile from "winston-daily-rotate-file"
import winston, { format } from "winston"

import { sensitiveKeys } from "@/data/keys"

import { generateId } from "@/utils/generateId"
import { isDevEnv } from "@/utils/env"
import { isEmptyObject } from "@/utils/helpers"
import { redact } from "@/utils/redact"

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

const fileTransports = {
    dailyFile: new DailyRotateFile({
        filename: "logs/app-%DATE%.log",
        datePattern: "YYYY-MM-DD-HH",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
    }),
    dailyErrorFile: new DailyRotateFile({
        level: "error",
        filename: "logs/app-error-%DATE%.log",
        datePattern: "YYYY-MM-DD-HH",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
    }),
}

const logger = winston.createLogger({
    format: customFormat,
    transports: [fileTransports.dailyFile, fileTransports.dailyErrorFile],
    exceptionHandlers: [
        fileTransports.dailyFile,
        fileTransports.dailyErrorFile,
    ],
    exitOnError: false,
})

if (isDevEnv()) {
    logger.add(consoleTransport)
}

export default logger
