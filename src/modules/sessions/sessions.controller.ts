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
  const result = await finder.findTicketTypesById(req.params.id);
  if (result instanceof ErrorHandler)handleErrorMiddleware(result,req,res,next)
  else successHandler(res, result)
}

/**
 * Return seatsInfo from the Specified session
 * @param req
 * @param res
 * @param next
 */
export async function getRoomInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new SessionsService()
  const result = await finder.findRoomInfoBySessionId(req.params.id);
  if (result instanceof ErrorHandler)handleErrorMiddleware(result,req,res,next)
  else successHandler(res, result)
}

/**
 * Return seatsInfo from the Specified session
 * @param req
 * @param res
 * @param next
 */
export async function checkSeatsInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new SessionsService()
  const result = await finder.checkSeatsStatusBySessionId(req.params.id, req.body?.seats);
  if (result instanceof ErrorHandler)handleErrorMiddleware(result,req,res,next)
  else successHandler(res, result)
}