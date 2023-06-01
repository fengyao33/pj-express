import { NextFunction, Request, Response } from 'express';
import { AdminroomsService } from './services';
import successHandler from '@middlewares/success_handler';
import { ErrorHandler, handleErrorMiddleware } from '@middlewares/error_handler';

/**
 * Return all entities
 * @param req
 * @param res
 * @param next
 */
export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { theaterId } = req.query;
    const finder = new AdminroomsService();
    const rooms = await finder.findAll(theaterId as string);
    successHandler(res, rooms as Object);
  } catch (err: any) {
    handleErrorMiddleware(new ErrorHandler(400, '查無此影城'), req, res, next);
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
    const { theaterId } = req.query;
    const finder = new AdminroomsService();
    const room = await finder.findOne(id, theaterId as string);
    successHandler(res, room as Object);
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
  try {
    const saver = new AdminroomsService();
    const rooms = await saver.store(req.body);
    successHandler(res, rooms as Object);
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
    const updater = new AdminroomsService();
    await updater.update(req.body);
    const room = await updater.update(req.body);
    successHandler(res, {});
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
    const { roomId, theaterId } = req.body;
    const destroyer = new AdminroomsService();
    const room = await destroyer.destroy(roomId, theaterId);
    successHandler(res, {});
  } catch (err: any) {
    handleErrorMiddleware(new ErrorHandler(400, err.message), req, res, next);
  }
}
