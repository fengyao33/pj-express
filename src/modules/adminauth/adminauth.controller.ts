import { ErrorHandler, handleErrorMiddleware } from '@middlewares/error_handler';
import generateJWT from '@utils/generateJWT';
import { NextFunction, Request, Response } from 'express';
import successHandler from '../../middlewares/success_handler';
import { AdminauthService } from './services';

/**
 * User Login
 * @param req
 * @param res
 * @param next
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body
    const finder = new AdminauthService()
    const result: any = await finder.login(email, password);
    const token = generateJWT(email);
    successHandler(res, {
      _id: result._id,
      email: result.email,
      token
    }, 200)
  } catch (error: any) {
    if (error.message === '沒有管理者權限') {
      handleErrorMiddleware(new ErrorHandler(403, '沒有管理者權限'), req, res, next)
    }
    handleErrorMiddleware(new ErrorHandler(400, error.message), req, res, next)
  }
}
