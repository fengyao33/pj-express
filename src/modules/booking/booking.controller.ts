import { NextFunction, Request, Response } from 'express'
import { BookingService } from './services'
import successHandler from '@middlewares/success_handler'
import { ErrorHandler, handleErrorMiddleware } from '@middlewares/error_handler'

/**
 * hash booking data
 * @param req
 * @param res
 * @param next
 */
export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {
  const cashService = new BookingService()
  const err = await cashService.checkData(req.body)
  if(err instanceof ErrorHandler){
    handleErrorMiddleware(err,req,res,next)
  }
  else{
    successHandler(res, await cashService.hashData(req.headers.authorization.split(' ')[1],req.body))
  }
}

/**
 * order completed payment
 * @param req
 * @param res
 * @param next
 */
export async function result(req: Request, res: Response, next: NextFunction): Promise<void> {
  const cashService = new BookingService()
  res.send(cashService.completedPay(req.body))
}