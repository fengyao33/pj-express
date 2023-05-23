import { NextFunction, Request, Response } from 'express'
import { HomeService } from './services'


export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {

  const finder = new HomeService()
  let date = await finder.findAll()

  res.json({
    date,
    status: "success",
  })
}
