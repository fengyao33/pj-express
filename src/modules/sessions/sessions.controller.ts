import { NextFunction, Request, Response } from 'express'
import { SessionsService } from './services'
import jwt from 'jsonwebtoken';
import { ErrorHandler, handleErrorMiddleware } from '@middlewares/error_handler';
import successHandler from '@middlewares/success_handler';
import { settings } from '@config/settings'


/**
 * Return all entities
 * @param req
 * @param res
 * @param next
 */
export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new SessionsService()
  successHandler(res, await finder.findAll())
}

/**
 * Return ticketTypes from the Specified session
 * @param req
 * @param res
 * @param next
 */
export async function getTicketTypes(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new SessionsService()
  successHandler(res, await finder.findTicketTypesById(req.params.id))
}

/**
 * Return seatsInfo from the Specified session
 * @param req
 * @param res
 * @param next
 */
export async function getRoomInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new SessionsService()
  successHandler(res, await finder.findRoomInfoBySessionId(req.params.id))
}

/**
 * check is login
 * @param req
 * @param res
 * @param next
 */
export async function isLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
  //#region  確認 token 是否存在
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    // return handleErrorMiddleware(new ErrorHandler(401, '未登入', true), req, res, next)
  }
  //#endregion

  //驗證 token 正確性
  await new Promise<void>((resolve, reject) => {
    jwt.verify(token, settings.JWT.JWT_SECRET, (err, payload) => {
      if (err) {
        // return handleErrorMiddleware(new ErrorHandler(401, 'token驗證失敗', true), req, res, next);
      } else {
        //resolve(payload)
        next()
      }
    });
  });


}

/**
 * Return seatsInfo from the Specified session
 * @param req
 * @param res
 * @param next
 */
export async function checkSeatsInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new SessionsService()
  
  successHandler(res, await finder.checkSeatsStatusBySessionId(req.params.id, req.body?.seats))
}