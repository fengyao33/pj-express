import { NextFunction, Request, Response } from 'express';
import { AdminseatsService } from './services';
import successHandler from '@middlewares/success_handler';
import { ErrorHandler, handleErrorMiddleware } from '@middlewares/error_handler';
import { ISeat } from '@models/seats.model';

/**
 * Return all entities
 * @param req
 * @param res
 * @param next
 */
export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new AdminseatsService();
  successHandler(res, await finder.findExample());
}

/**
 * Return one instance of entity
 * @param req
 * @param res
 * @param next
 */
export async function show(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { theaterId, roomId } = req.query;
    const finder = new AdminseatsService();
    const room = await finder.findOne(theaterId as string, roomId as string);
    successHandler(res, room as ISeat[]);
  } catch (err) {
    handleErrorMiddleware(new ErrorHandler(400, '查無此影廳'), req, res, next);
  }
}

/**
 * Save an entity
 * @param req
 * @param res
 * @param next
 */
export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
  const saver = new AdminseatsService();
}

/**
 * Update an entity
 * @param req
 * @param res
 * @param next
 */
export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;
  const updater = new AdminseatsService();
}

/**
 * Destroy one instance of an entity
 * @param req
 * @param res
 * @param next
 */
export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;
  const destroyer = new AdminseatsService();
}
