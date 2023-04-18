"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const Logger = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.File({
            level: 'warn',
            filename: 'app.log',
            dirname: `${app_root_path_1.default}/logs/`,
            handleExceptions: true,
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.simple()),
        }),
        new winston_1.default.transports.Console({
            level: 'silly',
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.printf((info) => `[${new Date().toISOString()}] ${info.level}: ${info.message}`)),
        }),
    ],
    exitOnError: false,
});
const logger = {
    log: (message) => Logger.debug(message),
    info: (message, obj) => Logger.info(message, obj),
    error: (message, obj) => Logger.error(message, obj),
    warn: (message, obj) => Logger.warn(message, obj),
    debug: (message, obj) => Logger.debug(message, obj),
    silly: (message, obj) => Logger.silly(message, obj),
};
exports.default = logger;
