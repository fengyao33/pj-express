import { ErrorHandler, handleErrorMiddleware } from '@middlewares/error_handler';
import successHandler from '@middlewares/success_handler';
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import { ActivitiesService } from './services';

/**
 * Return all entities
 * @param req
 * @param res
 * @param next
 */
export async function getActivities(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { withExpired } = req.query;
    const finder = new ActivitiesService();
    const result: any = await finder.getActivities(withExpired);
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
    const result: any = await saver.createActivity(newActivityInfo);
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
    const result: any = await updater.updateActivity(id, newActivity);
    successHandler(res, {
      ...newActivity
    }, 200)
  } catch (error: any) {
    if (error.message === '沒有需要更新的資料') error.statusCode = 404
    handleErrorMiddleware(new ErrorHandler(error.statusCode || 400, error.message), req, res, next)
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
    const result = await deleter.deleteActivity(id);
    successHandler(res, result, 200);
  } catch (error: any) {
    if (error.message === "該筆資料不存在") error.statusCode = 404
    handleErrorMiddleware(new ErrorHandler(error.statusCode || 400, error.message), req, res, next)
  }
}
