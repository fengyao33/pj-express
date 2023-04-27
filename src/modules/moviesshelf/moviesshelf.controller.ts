import { NextFunction, Request, Response } from 'express'
import { MoviesshelfService } from './services'

/**
 * 缺
 * @id theater room movie
 */
export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const finder = new MoviesshelfService()
    const result = await (req.query.id ? finder.findOne(req.query.id) : finder.findAll());
    res.json({
      message: "success",
      data: result
    })
  } catch (err) {
    next(err)
  }
}

export async function show(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.query
  console.log(1)
  const finder = new MoviesshelfService()
}
/**
 * 缺
 * @id theater room movie
 */
export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
  const saver = new MoviesshelfService()
  const result = await saver.store(req.body)
  res.json(result)
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params
  const updater = new MoviesshelfService()
}

/**
 * Destroy one instance of an entity
 * @param req
 * @param res
 * @param next
 */
// export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
//   const { id } = req.params
//   const destroyer = new MoviesshelfService()
// }
