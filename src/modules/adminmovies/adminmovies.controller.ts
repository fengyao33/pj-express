import { ErrorHandler, handleErrorMiddleware } from "@middlewares/error_handler";
import successHandler from "@middlewares/success_handler";
import MoviesShelf from "@models/movies.model";
import checkRequireField from "@utils/checkRequireField";
import getTableParams from "@utils/getTableParams";
import { NextFunction, Request, Response } from "express";
import { AdminmoviesService } from "./services";
import _ from "lodash";

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
    const { search, sort, pageNo, pageSize } = req.query;
    checkRequireField({
      checkArr: ["pageNo", "pageSize"],
      obj: req.query,
    });
    const mySearchObj =
      search !== undefined
        ? {
          movieCName: new RegExp(search as string),
          movieEName: new RegExp(search as string),
        }
        : {};
    const inTheatersTimeSort =
      sort === "asc" ? "inTheatersTimeSort" : "-inTheatersTimeSort";
    const skip = (parseInt(pageNo as string) - 1) * parseInt(pageSize as string);
    const result = await MoviesShelf.find()
      .skip(skip)
      .sort(inTheatersTimeSort)
      .limit(parseInt(pageSize as string));
    const tableParams: object = await getTableParams({
      model: MoviesShelf,
      pageNo: parseInt(pageNo as string),
      pageSize: parseInt(pageSize as string),
      searchObj: mySearchObj,
    });
    successHandler(res, result, 200, tableParams);
  } catch (error: any) {
    handleErrorMiddleware(new ErrorHandler(400, error.message), req, res, next);
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
    const {
      isAvaliableL,
      imgUrl,
      videoUrl,
      movieCName,
      movieEName,
      director,
      cast,
      inTheatersTime,
      outOfTheatersTime,
      movieTime,
      rating,
      synopsis,
    } = body;
    checkRequireField({
      checkArr: [
        "isAvaliableL",
        "imgUrl",
        "videoUrl",
        "movieCName",
        "movieEName",
        "director",
        "cast",
        "inTheatersTime",
        "outOfTheatersTime",
        "movieTime",
        "rating",
        "synopsis",
      ],
      obj: body,
    });
    const newData = _.omitBy(
      { isAvaliableL,
      imgUrl,
      videoUrl,
      movieCName,
      movieEName,
      director,
      cast,
      inTheatersTime,
      outOfTheatersTime,
      movieTime,
      rating,
      synopsis, },
      _.isEmpty
    );
    //欄位檢查等collection欄位整合後處理
    const result = await MoviesShelf.create({
      ...newData,
    });
    successHandler(res, result);
  } catch (error: any) {
    handleErrorMiddleware(new ErrorHandler(400, error.message), req, res, next);
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
    const {
      isAvaliableL,
      imgUrl,
      videoUrl,
      movieCName,
      movieEName,
      director,
      cast,
      inTheatersTime,
      outOfTheatersTime,
      movieTime,
      rating,
      synopsis,
    } = body;
    checkRequireField({
      checkArr: [
        "isAvaliableL",
        "imgUrl",
        "videoUrl",
        "movieCName",
        "movieEName",
        "director",
        "cast",
        "inTheatersTime",
        "outOfTheatersTime",
        "movieTime",
        "rating",
        "synopsis",
      ],
      obj: body,
    });
    const newData = _.omitBy(
      {
        isAvaliableL,
        imgUrl,
        videoUrl,
        movieCName,
        movieEName,
        director,
        cast,
        inTheatersTime,
        outOfTheatersTime,
        movieTime,
        rating,
        synopsis,
      },
      _.isEmpty
    );
    const result: any = await MoviesShelf.findByIdAndUpdate(
      id,
      {
        $set: { ...newData },
      },
      { new: true }
    );
    successHandler(res, result);
  } catch (error: any) {
    handleErrorMiddleware(new ErrorHandler(400, error.message), req, res, next);
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
