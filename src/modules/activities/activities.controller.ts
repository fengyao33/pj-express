import { NextFunction, Request, Response } from 'express'
import { ActivitiesService } from './services'
import successHandler from '@middlewares/success_handler';
import { handleErrorMiddleware, ErrorHandler } from '@middlewares/error_handler';
import _ from 'lodash';

/**
 * Return all entities
 * @param req
 * @param res
 * @param next
 */
export async function getActivities(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const finder = new ActivitiesService();
    const result: any = await finder.getActivities();
    successHandler(res, result, 200)
  } catch (error: any) {
    handleErrorMiddleware(new ErrorHandler(400, error.message), req, res, next)
  }
}

/**
 * Return one instance of entity
 * @param req
 * @param res
 * @param next
 */
export async function createActivity(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { title, content, img, startDatetime, endDatetime } = req.body;
    const saver = new ActivitiesService();
    const newActivityInfo = { title, content, img, startDatetime, endDatetime }
    const result: any = saver.createActivity(newActivityInfo);
    successHandler(res, {
      _id: result._id,
      title,
      content,
      img,
      startDatetime,
      endDatetime
    }, 201)
  } catch (error: any) {
    handleErrorMiddleware(new ErrorHandler(400, error.message), req, res, next)
  }
}

/**
 * Save an entity
 * @param req
 * @param res
 * @param next
 */
export async function updateActivity(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { title, content, img, startDatetime, endDatetime } = req.body;
    const newActivity = _.omitBy({ title, content, img, startDatetime, endDatetime }, _.isEmpty);
    const updater = new ActivitiesService();
    const result: any = updater.updateActivity(id, newActivity);
    successHandler(res, {
      ...newActivity
    }, 200)
  } catch (error: any) {
    handleErrorMiddleware(new ErrorHandler(400, error.message), req, res, next)
  }
}

/**
 * Update an entity
 * @param req
 * @param res
 * @param next
 */
export async function deleteActivity(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const deleter = new ActivitiesService();
    const result = deleter.deleteActivity(id)
    successHandler(res, {
      id
    }, 204)
  } catch (error: any) {
    handleErrorMiddleware(new ErrorHandler(400, error.message), req, res, next)
  }
}
