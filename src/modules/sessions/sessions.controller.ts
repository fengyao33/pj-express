import { NextFunction, Request, Response } from 'express'
import { SessionsService } from './services'
import { ErrorHandler, handleErrorMiddleware } from '@middlewares/error_handler';
import successHandler from '@middlewares/success_handler';
import moment from 'moment'
import { Types } from 'mongoose';

export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new SessionsService()
  successHandler(res, await finder.findAll())
}

export async function getTicketTypes(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new SessionsService()
  const result = await finder.findTicketTypesById(req.params.id);
  if (result instanceof ErrorHandler)handleErrorMiddleware(result,req,res,next)
  else successHandler(res, result)
}

export async function getInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new SessionsService()
  const result = await finder.getSessionInfoById(req.params.id);
  if (result instanceof ErrorHandler)handleErrorMiddleware(result,req,res,next)
  else successHandler(res, result)
}

export async function getRoomInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new SessionsService()
  const result = await finder.findRoomInfoBySessionId(req.params.id);
  if (result instanceof ErrorHandler)handleErrorMiddleware(result,req,res,next)
  else successHandler(res, result)
}

export async function checkSeatsInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new SessionsService()
  const result = await finder.checkSeatsStatusBySessionId(req.params.id, req.body?.seats);
  if (result instanceof ErrorHandler)handleErrorMiddleware(result,req,res,next)
  else successHandler(res, result)
}

export async function getSessionList(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new SessionsService()

  let { cinemaId, roomId, startDate, endDate} = req.query
  const pattern = /^\d{4}-\d{2}-\d{2}$/

  if (!pattern.test(startDate as string) || !pattern.test(endDate as string)) {
    res.json({
      status: "false",
      messege: '時間格式錯誤'
    })
  } 

  let sd = moment.utc(startDate as moment.MomentInput, 'YYYY-MM-DD').utcOffset(480).toDate()
  let ed = moment.utc(endDate as moment.MomentInput, 'YYYY-MM-DD').utcOffset(480).toDate()

  let query = {
    sd,
    ed,
    theaterId: cinemaId,
    roomInfo: roomId
  }

  const result = await finder.getSesstionsList(query);

  res.json({
    data: result
  })

}

export async function postUpdateSession(req: Request, res: Response, next: NextFunction): Promise<void> {
  const session = new SessionsService()
  let result = session.postSesstionsList(req.body)
  res.json({
    data: result
  })

}