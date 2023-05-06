import logger from '@helpers/logger'
import { NextFunction, Request, Response } from 'express'

export class ErrorHandler extends Error {
  statusCode: number
  message: string

  constructor(statusCode: number, message: string) {
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
    next()
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
