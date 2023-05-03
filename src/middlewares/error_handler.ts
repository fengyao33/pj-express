import logger from '@helpers/logger'
import { NextFunction, Request, Response } from 'express'

export class ErrorHandler extends Error {
  statusCode: number
  message: string

  constructor(statusCode: number, message: string, isOperational: boolean) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

// other error
export const handleErrorMiddleware = (err: ErrorHandler | Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorHandler) {
    const { statusCode, message } = err
    logger.error(`Error ${statusCode}: ${message}`)
    res.status(statusCode).json({
      status: 'fail',
      statusCode,
      message,
    })
  } else {
    logger.error(`Server Error: ${err}`)
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
    })
  }
}


// 404 error
export const handleError404Middleware = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    statusCode: 404,
    status: 'fail',
    message: "No Router Information",
  });
}


// catch missed error
export const handleCatchError = (err: ErrorHandler | Error) => {
  process.on('unhandledRejection', (err, promise) => {
    console.error('Missed rejection:', promise, 'Reason:', err);
  });
}

export const handleAsyncError = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((error) => { return next(error) })
  }
}

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
