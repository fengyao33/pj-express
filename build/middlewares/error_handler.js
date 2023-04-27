"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCatchError = exports.handleError404Middleware = exports.handleErrorMiddleware = exports.ErrorHandler = void 0;
const logger_1 = __importDefault(require("@helpers/logger"));
class ErrorHandler extends Error {
    constructor(statusCode, message, isOperational) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = isOperational;
    }
}
exports.ErrorHandler = ErrorHandler;
// other error
const handleErrorMiddleware = (err, req, res, next) => {
    if (err instanceof ErrorHandler) {
        const { statusCode, message } = err;
        logger_1.default.error(`Error ${statusCode}: ${message}`);
        res.status(statusCode).json({
            status: 'fail',
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
// 404 error
const handleError404Middleware = (req, res, next) => {
    res.status(404).json({
        statusCode: 404,
        status: 'fail',
        message: "No Router Information",
    });
};
exports.handleError404Middleware = handleError404Middleware;
// catch miss error
const handleCatchError = (err) => {
    process.on('unhandledRejection', (err, promise) => {
        console.error('Missed rejection:', promise, 'Reason:', err);
    });
};
exports.handleCatchError = handleCatchError;
// env error handle
// export const handleErrorByEnv = (err: ErrorHandler | Error, req: Request, res: Response, next: NextFunction) => {
//   err.statusCode = err.statusCode || 500;
//   if (process.env.NODE_ENV === 'dev') {
//     return resDevError(err, res);
//   }
//   // production
//   if (err.name === 'ValidationError') {
//     err.message = "資料欄位未填寫正確，請重新輸入！"
//     err.isOperational = true;
//     return resProductionError(err, res)
//   }
//   resProductionError(err, res)
// }
// const resDevError = (err: ErrorHandler | Error, res: Response) => {
//   res.status(err.statusCode).json({
//     statusCode: err.statusCode,
//     message: err.message,
//     error: err,
//     stack: err.stack
//   });
// };
// const resProductionError = (err: ErrorHandler | Error, res: Response) => {
//   if (err.isOperational) {
//     res.status(err.statusCode).json({
//       statusCode: err.statusCode,
//       message: err.message
//     });
//   } else {
//     // log 紀錄
//     console.error('出現重大錯誤', err);
//     res.status(500).json({
//       statusCode: 500,
//       status: 'fail',
//       message: '系統錯誤，請恰系統管理員'
//     });
//   }
// };
