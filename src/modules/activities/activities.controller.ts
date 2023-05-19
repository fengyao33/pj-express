import { NextFunction, Request, Response } from 'express'
import { ActivitiesService } from './services'

export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new ActivitiesService()
  const { id, branch, hell, sdate, edate } = req.query;
  const result = await (id
    ? finder.findOne(id as string)
    : finder.findAll());
  res.json({
    message: "success",
    data: result,
  });

}

// export async function show(req: Request, res: Response, next: NextFunction): Promise<void> {
//   const { id } = req.params
//   const finder = new ActivitiesService()
// }

export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
  const saver = new ActivitiesService()
  const result = await saver.store(req.body);
  res.json(result);
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params
  const updater = new ActivitiesService()
}


// export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
//   const { id } = req.params
//   const destroyer = new ActivitiesService()
// }
