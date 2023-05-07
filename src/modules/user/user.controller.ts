import {
  ErrorHandler,
  handleErrorMiddleware,
} from "@middlewares/error_handler";
import successHandler from "@middlewares/success_handler";
import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import generateJWT from "../../utils/generateJWT";
import { UserauthService } from "./services";

/**
 * User Sign Up
 * @param req
 * @param res
 * @param next
 */
export async function singup(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password, passwordCheck } = req.body;
    if (password !== passwordCheck) {
      res.status(400).json({
        status: "fail",
        message: "密碼不一致",
      });
    }
    const finder = new UserauthService();
    const result: any = await finder.signup(email, password);
    delete result.password;
    const token = generateJWT(email);
    return successHandler(
      res,
      {
        _id: result._id,
        email: result.email,
        token,
      },
      201
    );
  } catch (error: any) {
    if (error.code === 11000) {
      // MongoDB validate email dupliucated!
      error.message = "此帳號已存在";
    }
    handleErrorMiddleware(new ErrorHandler(400, error.message), req, res, next);
  }
}

/**
 * User Login
 * @param req
 * @param res
 * @param next
 */
export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body;
    const finder = new UserauthService();
    const result: any = await finder.login(email, password);
    const token = generateJWT(email);
    return successHandler(
      res,
      {
        _id: result._id,
        email: result.email,
        token,
      },
      200
    );
  } catch (error: any) {
    handleErrorMiddleware(new ErrorHandler(400, error.message), req, res, next);
  }
}

/**
 * Update Password
 * @param req
 * @param res
 * @param next
 */
export async function updatePassword(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password, passwordCheck } = req.body;
    if (password !== passwordCheck) {
      handleErrorMiddleware(
        new ErrorHandler(400, "密碼不一致"),
        req,
        res,
        next
      );
    }
    const updater = new UserauthService();
    const result: any = await updater.updatePassword(email, password);
    const token = generateJWT(email);
    return successHandler(
      res,
      {
        _id: result._id,
        email: result.email,
        token,
      },
      200
    );
  } catch (error: any) {
    handleErrorMiddleware(new ErrorHandler(400, error.message), req, res, next);
  }
}

/**
 * Update User Profile
 * @param req
 * @param res
 * @param next
 */
export async function getProfile(req: Request, res: Response): Promise<void> {
  try {
    const { email: userEmail } = req.params;
    const finder = new UserauthService();
    const result: any = await finder.getProfile(userEmail);
    const { name, email, sex, birth, mobile, hobby } = result;
    return successHandler(
      res,
      {
        name,
        email,
        sex,
        birth,
        mobile,
        hobby,
      },
      200
    );
  } catch (error: any) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
}

/**
 * Update User Profile
 * @param req
 * @param res
 * @param next
 */
export async function updateProfile(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { name, email, sex, birth, mobile, hobby } = req.body;
    const newProfile = _.omitBy({ name, sex, birth, mobile, hobby }, _.isEmpty);
    const updater = new UserauthService();
    const result: any = await updater.updateProfile(email, newProfile);
    return successHandler(
      res,
      {
        email,
        ...newProfile,
      },
      200
    );
  } catch (error: any) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
}
