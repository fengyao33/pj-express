import { NextFunction, Request, Response } from 'express';
import successHandler from '../../middlewares/success_handler';
import { AdminauthService } from './services';


/**
 * User Sign Up
 * @param req
 * @param res
 * @param next
 */
export async function singup(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new AdminauthService()
  const result: any = 'QQQ'
  successHandler(res, result);
}

/**
 * User Login
 * @param req
 * @param res
 * @param next
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params
  const finder = new AdminauthService()
}

/**
 * Update Password
 * @param req
 * @param res
 * @param next
 */
export async function updatePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  const saver = new AdminauthService()
}
