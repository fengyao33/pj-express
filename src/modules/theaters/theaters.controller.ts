import { NextFunction, Request, Response } from 'express';
import { TheatersService } from './services';
import successHandler from '@middlewares/success_handler';

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
