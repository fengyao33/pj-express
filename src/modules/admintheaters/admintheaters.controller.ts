import { NextFunction, Request, Response } from 'express';
import { AdmintheatersService } from './services';
import successHandler from '@middlewares/success_handler';
import { ErrorHandler, handleErrorMiddleware } from '@middlewares/error_handler';
import { ITheater } from '@models/theaters.model';

/**
 * Return all entities
 * @param req
 * @param res
 * @param next
 */
export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const finder = new AdmintheatersService();
    const theaters = await finder.findAll();
    successHandler(res, theaters);
  } catch (err: any) {
    handleErrorMiddleware(new ErrorHandler(400, err.message), req, res, next);
  }
}

/**
 * Return one instance of entity
 * @param req
 * @param res
 * @param next
 */
export async function show(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const finder = new AdmintheatersService();

    const theater = await finder.findOne(id);

    successHandler(res, theater as Object);
  } catch (err) {
    handleErrorMiddleware(new ErrorHandler(400, '查無此影城'), req, res, next);
  }
}

/**
 * Save an entity
 * @param req
 * @param res
 * @param next
 */
export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const newTheater = req.body as ITheater;
    const saver = new AdmintheatersService();
    const theater = await saver.store(newTheater);
    successHandler(res, theater);
  } catch (err: any) {
    handleErrorMiddleware(new ErrorHandler(400, err.message), req, res, next);
  }
}

/**
 * Update an entity
 * @param req
 * @param res
 * @param next
 */
export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const theater = req.body as ITheater;
    const updater = new AdmintheatersService();
    const newTheater = await updater.update(id, theater);
    successHandler(res, newTheater as ITheater);
  } catch (err: any) {
    handleErrorMiddleware(new ErrorHandler(400, err.message), req, res, next);
  }
}

/**
 * Destroy one instance of an entity
 * @param req
 * @param res
 * @param next
 */
export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const destroyer = new AdmintheatersService();
    const theater = await destroyer.destroy(id);
    successHandler(res, {});
  } catch (err: any) {
    handleErrorMiddleware(new ErrorHandler(400, err.message), req, res, next);
  }

}

export async function fileUpload(req: Request, res: Response, next: NextFunction): Promise<void> {
  console.log(111)
}
