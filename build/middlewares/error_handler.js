"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorMiddleware = exports.ErrorHandler = void 0;
const logger_1 = __importDefault(require("@helpers/logger"));
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ErrorHandler = ErrorHandler;
const handleErrorMiddleware = (err, req, res, next) => {
    if (err instanceof ErrorHandler) {
        const { statusCode, message } = err;
        logger_1.default.error(`Error ${statusCode}: ${message}`);
        res.status(statusCode).json({
            statusCode,
            message,
        });
    }
    else {
        logger_1.default.error(`Error de servidor ${err}`);
        res.status(500).json({
            statusCode: 500,
            message: 'Internal Server Error',
        });
    }
};
exports.handleErrorMiddleware = handleErrorMiddleware;
