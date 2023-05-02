import { NextFunction, Request, Response } from 'express'
import { MoviesshelfService } from './services'

export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {
    const finder = new MoviesshelfService()
    const { id, branch, hell, sdate, edate} = req.query
    const result = await (id ? finder.findOne(id, sdate, edate) : finder.findAll());
    res.json({
      message: "success",
      data: result
    })
}

export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
  const saver = new MoviesshelfService()
  const result = await saver.store(req.body)
  res.json(result)
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params
  const updater = new MoviesshelfService()
}

