import { ErrorHandler, handleErrorMiddleware } from '@middlewares/error_handler';
import successHandler from '@middlewares/success_handler';
import generateJWT from '@utils/generateJWT';
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import { UserauthService } from './services';


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
    successHandler(
      res,
      {
        _id: result._id,
        email: result.email,
        token,
      },
      201
    );
  } catch (error: any) {
    // MongoDB validate email dupliucated!
    if (error.code === 11000) {
      error.message = '此帳號已存在'
    };
    // env lost JWT_EXPIRE_DAYS
    if (error.message === '"expiresIn" should be a number of seconds or string representing a timespan') {
      handleErrorMiddleware(new Error('lost JWT_EXPIRE_DAYS'), req, res, next)
    }
    // env lost JWT_SECRET
    if (error.message === 'secretOrPrivateKey must have a value') {
      handleErrorMiddleware(new Error('lost JWT_SECRET'), req, res, next)
    }
    handleErrorMiddleware(new ErrorHandler(400, error.message), req, res, next)
  }
}

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
    successHandler(
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
    successHandler(
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

export async function getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email: userEmail } = req.params;
    const finder = new UserauthService();
    const result: any = await finder.getProfile(userEmail);
    const { name, email, sex, birth, mobile, hobby, roles } = result
    successHandler(res, {
      name,
      email,
      sex,
      birth,
      mobile,
      hobby,
      roles
    }, 200)
  } catch (error: any) {
    handleErrorMiddleware(new ErrorHandler(404, error.message), req, res, next)
  }
}

export async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { name, email, sex, birth, mobile, hobby } = req.body;
    const newProfile = _.omitBy({ name, sex, birth, mobile, hobby }, _.isEmpty);
    const updater = new UserauthService();
    const result: any = await updater.updateProfile(email, newProfile);
    successHandler(
      res,
      {
        email,
        ...newProfile,
      },
      200
    );
  } catch (error: any) {
    if (error.message === '沒有需要更新的資料') error.statusCode = 404
    handleErrorMiddleware(new ErrorHandler(error.statusCode || 400, error.message), req, res, next)
  }
}

/**
 * Get User purchaseRecord
 * @param req
 * @param res
 * @param next
 */
export async function getPurchaseRecord(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new UserauthService()
  const result = await finder.getPurchaseRecord(req.headers.authorization?.split(' ')[1],req.query.page,req.query.limit)
  if(result instanceof ErrorHandler)handleErrorMiddleware(result,req,res,next)
  else successHandler(res, result)
}

/**
 * Get User bonusRecord
 * @param req
 * @param res
 * @param next
 */
export async function getBonusRecord(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new UserauthService()
  const result = await finder.getBonusRecord(req.headers.authorization?.split(' ')[1],req.query.page,req.query.limit)
  if(result instanceof ErrorHandler)handleErrorMiddleware(result,req,res,next)
  else successHandler(res, result)
}

export async function getPasswordMail(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email } = req.body;
    const updater = new UserauthService();
    const result: any = await updater.updatePasswordAndSentMail(email);
    successHandler(
      res,
      {
        email,
      },
      200
    );
  } catch (error: any) {
    handleErrorMiddleware(new ErrorHandler(400, error.message), req, res, next);
  }
}