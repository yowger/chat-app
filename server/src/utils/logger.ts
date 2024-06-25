import DailyRotateFile from "winston-daily-rotate-file"
import winston, { format } from "winston"

import { isDevEnv } from "@/utils/env"

const customFormat = format.combine(
    format.errors({ stack: true }),
    format.splat(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((info) => {
        const { timestamp, level, message, ...meta } = info

        const formattedMeta = Object.keys(meta).length
            ? "\n" + JSON.stringify(meta, null, 2)
            : ""

        return `${timestamp} [${level}]: ${message} ${formattedMeta}`
    })
)

const level = isDevEnv ? "debug" : "error"

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

const log = winston.createLogger({
    format: customFormat,
    transports: [fileTransports.dailyFile, fileTransports.dailyErrorFile],
    exceptionHandlers: [
        fileTransports.dailyFile,
        fileTransports.dailyErrorFile,
    ],
    exitOnError: false,
})

if (isDevEnv) {
    log.add(consoleTransport)
}

export default log
