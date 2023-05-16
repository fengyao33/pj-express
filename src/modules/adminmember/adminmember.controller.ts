import { NextFunction, Request, Response } from "express";
import { AdminmemberService } from "./services";
import successHandler from "@middlewares/success_handler";
import User from "@models/user.model";
import _ from "lodash";
import bcrypt from "bcryptjs";
import getTableParams from "@utils/getTableParams";
import {
  ErrorHandler,
  handleErrorMiddleware,
} from "@middlewares/error_handler";
import checkRequireField from "@utils/checkRequireField";

const service = new AdminmemberService();

/**
 * Return all entities
 * @param req
 * @param res
 * @param next
 */
export async function getAllMember(
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
      search !== undefined ? { name: new RegExp(search as string) } : {};
    const timeSort = sort === "asc" ? "createdAt" : "-createdAt";
    const skip = (pageNo - 1) * pageSize;
    const result = await User.find(mySearchObj)
      .skip(skip)
      .populate({
        path: "orderId",
      })
      .sort(timeSort)
      .limit(pageSize);
    const tableParams: object = await getTableParams({
      model: User,
      pageNo: parseInt(pageNo),
      pageSize: parseInt(pageSize),
      searchObj: mySearchObj,
    });
    successHandler(res, result, 200, tableParams);
  } catch (error: any) {
    handleErrorMiddleware(new ErrorHandler(400, error.message), req, res, next);
  }
}

/**
 * Return one instance of entity
 * @param req
 * @param res
 * @param next
 */
export async function getOneMember(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const result: any = await User.findById(id).populate({
      path: "orderId",
    });
    successHandler(res, result);
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
export async function postMember(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    //建立帳號email、密碼是必填存在
    const body = req.body;
    const { name, email, sex, birth, mobile, hobby, password } = body;
    checkRequireField({
      checkArr: ["email", "password"],
      obj: body,
    });
    if (password.length < 8) {
      throw new Error(`請輸入密碼長度大於8`);
    }
    const hashPassword: string = await bcrypt.hash(password, 12);
    const newProfile = _.omitBy(
      { email, name, sex, birth, mobile, hobby },
      _.isEmpty
    );
    const result = await User.create({
      ...newProfile,
      password: hashPassword,
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
export async function updateMember(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    //更新email不可為空
    const { id } = req.params;
    const body = req.body;
    const { name, email, sex, birth, mobile, hobby } = body;
    checkRequireField({
      checkArr: ["email"],
      obj: body,
    });
    const newProfile = _.omitBy(
      { name, email, sex, birth, mobile, hobby },
      _.isEmpty
    );
    if (_.isEmpty(newProfile)) throw new Error("沒有需要更新的資料");
    const result: any = await User.findByIdAndUpdate(
      id,
      {
        $set: { ...newProfile },
      },
      { new: true }
    );
    successHandler(res, result);
  } catch (error: any) {
    handleErrorMiddleware(new ErrorHandler(400, error.message), req, res, next);
  }
}

/**
 * Destroy one instance of an entity
 * @param req
 * @param res
 * @param next
 */
export async function delOneMember(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const result: any = await User.findByIdAndDelete(id);
    successHandler(res, result);
  } catch (error: any) {
    handleErrorMiddleware(new ErrorHandler(400, error.message), req, res, next);
  }
}
export async function delAllMember(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result: any = await User.deleteMany({});
    successHandler(res, result);
  } catch (error: any) {
    handleErrorMiddleware(new ErrorHandler(400, error.message), req, res, next);
  }
}
