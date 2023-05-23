import { NextFunction, Request, Response } from 'express';
import { TheatersService } from './services';
import successHandler from '@middlewares/success_handler';
import { ErrorHandler, handleErrorMiddleware } from '@middlewares/error_handler';

/**
 * Return all entities
 * @param req
 * @param res
 * @param next
 */
export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new TheatersService();
  successHandler(res, await finder.findAll());
}

/**
 * Return data from name
 * @param req
 * @param res
 * @param next
 */
export async function findOneByName(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new TheatersService();
  const result = await finder.findOne(req.params.name)
  if(result instanceof ErrorHandler)handleErrorMiddleware(result,req,res,next)
  else successHandler(res, result)
}