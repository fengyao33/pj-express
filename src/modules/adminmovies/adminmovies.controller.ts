import { NextFunction, Request, Response } from "express";
import { AdminmoviesService } from "./services";
import MoviesShelf from "@models/moviesshelf.model";
import successHandler from "@middlewares/success_handler";
import { ErrorHandler, handleErrorMiddleware } from "@middlewares/error_handler";

const service = new AdminmoviesService();
/**
 * Return all entities
 * @param req
 * @param res
 * @param next
 */
export async function getAllMovies(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const pageNo = parseInt(req.query.pageNo) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (pageNo - 1) * pageSize;
    const result = await MoviesShelf.find().skip(skip).limit(pageSize);
    const tableParams:object = await service.getTableParams({
      model: MoviesShelf,
      pageNo,
      pageSize,
    });
    successHandler(res, result,200, tableParams);
  } catch (error) {
    handleErrorMiddleware(new ErrorHandler(400, "請求失敗"), req, res, next);
  }
}

/**
 * Save an entity
 * @param req
 * @param res
 * @param next
 */
export async function postMovies(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const body = req.body;
    // const { } = body;
    //欄位檢查等collection欄位整合後處理
    const result = await MoviesShelf.create({
      ...body
    });
    successHandler(res, result);
  } catch (error: any) {
    handleErrorMiddleware(new ErrorHandler(400, "請求失敗"), req, res, next);
  }
}

/**
 * Update an entity
 * @param req
 * @param res
 * @param next
 */
export async function updateMovies(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const body = req.body;
    // const { } = body;
    //欄位檢查等collection欄位整合後處理
    const result: any = await MoviesShelf.findByIdAndUpdate(id, {
      ...body,
    });
    successHandler(res, result);
  } catch (error: any) {
    handleErrorMiddleware(new ErrorHandler(400, "請求失敗"), req, res, next);
  }
}

/**
 * Destroy all instance of an entity
 * @param req
 * @param res
 * @param next
 */
export async function deleteAllMovies(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result: any = await MoviesShelf.deleteMany({});
    successHandler(res, result);
  } catch (error) {
    handleErrorMiddleware(new ErrorHandler(400, "請求失敗"), req, res, next);
  }
}
/**
 * Destroy one instance of an entity
 * @param req
 * @param res
 * @param next
 */
export async function deleteOneMovies(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const result: any = await MoviesShelf.findByIdAndDelete(id);
    successHandler(res, result);
  } catch (error) {
    handleErrorMiddleware(new ErrorHandler(400, "請求失敗"), req, res, next);
  }
}
