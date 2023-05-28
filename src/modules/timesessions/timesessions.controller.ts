import { NextFunction, Request, Response } from 'express'
import { TimesessionsService } from './services'
import successHandler from '@middlewares/success_handler';
import { TheatersService } from '../theaters/services'

export async function getsessionList(req: Request, res: Response, next: NextFunction): Promise<void> {
  // const Theaters = new TheatersService()
  // let id = "64664fc9421a72b472ed34ee"  //req 影城id
  // let theater = await Theaters.getOneTheater(id)

  // res.json(theater)
  const Theaters = new TimesessionsService()
  let id = "64730dd1d072951d4663a625" 
  // let theater = await Theaters.getOneTheater(id)
  let theater = await Theaters.findOne(id)
  res.json(theater)

  
}

// /**
//  * Return one instance of entity
//  * @param req
//  * @param res
//  * @param next
//  */
// export async function show(req: Request, res: Response, next: NextFunction): Promise<void> {
//   const { id } = req.params
//   const finder = new TimesessionsService()
// }

// /**
//  * Save an entity
//  * @param req
//  * @param res
//  * @param next
//  */
// export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
//   const saver = new TimesessionsService()
// }

// /**
//  * Update an entity
//  * @param req
//  * @param res
//  * @param next
//  */
// export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
//   const { id } = req.params
//   const updater = new TimesessionsService()
// }

// /**
//  * Destroy one instance of an entity
//  * @param req
//  * @param res
//  * @param next
//  */
// export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
//   const { id } = req.params
//   const destroyer = new TimesessionsService()
// }
