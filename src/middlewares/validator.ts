import { NextFunction, Request, Response } from 'express'
import { Result, ValidationError, validationResult } from 'express-validator'

export function validateBody(req: Request, res: Response, next: NextFunction) {
  const errors: Result<ValidationError> = validationResult(req)

  const arrayErrors = errors.array()

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      message: arrayErrors.map(error => { return error.msg }),
    })
  }

  next()
}
