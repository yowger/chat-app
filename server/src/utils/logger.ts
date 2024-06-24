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

const level = isDevEnv() ? "debug" : "error"

const transports = {
    console: new winston.transports.Console({
        level,
    }),
    dailyFile: new DailyRotateFile({
        filename: "logs/combined-%DATE%.log",
        datePattern: "YYYY-MM-DD-HH",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
    }),
    dailyErrorFile: new DailyRotateFile({
        level: "error",
        filename: "logs/errors-%DATE%.log",
        datePattern: "YYYY-MM-DD-HH",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
    }),
}

const log = winston.createLogger({
    format: customFormat,
    transports: [
        transports.console,
        transports.dailyFile,
        transports.dailyErrorFile,
    ],
    exceptionHandlers: [transports.dailyFile, transports.dailyErrorFile],
    exitOnError: false,
})

export default log
