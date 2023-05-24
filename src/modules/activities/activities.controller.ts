import { NextFunction, Request, Response } from 'express'
import { ActivitiesService } from './services'

export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new ActivitiesService()
  const { pageNo, pageSize } = req.query;
  
  let skip = (parseInt(pageNo as string) - 1) * parseInt(pageSize as string)
  

  let { data, tableParams }:any = await finder.findAll(skip, pageSize, pageNo)


  res.json({
    message: "success",
    data,
    tableParams
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
