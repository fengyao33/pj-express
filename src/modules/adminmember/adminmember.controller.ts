import { NextFunction, Request, Response } from "express";
import { AdminmemberService } from "./services";
import successHandler from "@middlewares/success_handler";
import AdminMemberModel from "@models/adminMember.model";

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
    const search =
      req.query.q !== undefined ? { name: new RegExp(req.query.q) } : {};
    const timeSort = req.query.sort === "asc" ? "createdAt" : "-createdAt";
    const result = await AdminMemberModel.find(search).sort(timeSort);
    successHandler(res, result);
  } catch (error) {
    service.handleError(res, "請求失敗");
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
    const result: any = await AdminMemberModel.findById(id);
    successHandler(res, result);
  } catch (error) {
    service.handleError(res, "請求失敗");
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
    const body = req.body;
    const { name, email, password, passwordCheck } = body;
    if (password !== passwordCheck) {
      service.handleError(res, "密碼不一致");
    }
    const result = await AdminMemberModel.create({
      name: name,
      email: email,
      password: password,
      passwordCheck: passwordCheck,
    });
    successHandler(res, result);
  } catch (error: any) {
    service.handleError(res, error.message);
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
    const { id } = req.params;
    const body = req.body;
    const { password, passwordCheck } = body;
    if (!!password || (!!passwordCheck && password !== passwordCheck)) {
      service.handleError(res, "密碼不一致");
    }
    const result: any = await AdminMemberModel.findByIdAndUpdate(id, {
      ...body,
    });
    successHandler(res, result);
  } catch (error: any) {
    service.handleError(res, error.message);
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
    const result: any = await AdminMemberModel.findByIdAndDelete(id);
    successHandler(res, result);
  } catch (error) {
    service.handleError(res, "請求失敗");
  }
}
export async function delAllMember(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result: any = await AdminMemberModel.deleteMany({});
    successHandler(res, result);
  } catch (error) {
    service.handleError(res, "請求失敗");
  }
}
