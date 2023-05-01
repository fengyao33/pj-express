import { Request, Response } from 'express';
// import successHandler from '../../middlewares/success_handler';
import isAuth from "@middlewares/isAuth";
import generateJWT from '../../utils/generateJWT';
import { UserauthService } from './services';


/**
 * User Sign Up
 * @param req
 * @param res
 * @param next
 */
export async function singup(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, passwordCheck } = req.body
    if (password !== passwordCheck) {
      res.status(400).json({
        status: 'fail',
        message: "密碼不一致"
      })
    }
    const finder = new UserauthService();
    const result: any = await finder.signup(email, password);
    delete result.password;
    const token = generateJWT(email);
    res.status(201).json({
      status: 'success',
      data: {
        _id: result._id,
        email: result.email,
        token
      }
    })
    return
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    })
  }
}

/**
 * User Login
 * @param req
 * @param res
 * @param next
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body
    const finder = new UserauthService()
    const result: any = await finder.login(email, password);
    const token = generateJWT(email);
    res.status(200).json({
      status: 'success',
      data: {
        _id: result._id,
        email: result.email,
        token
      }
    })
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    })
  }
}

/**
 * Update Password
 * @param req
 * @param res
 * @param next
 */
export async function updatePassword(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, passwordCheck } = req.body
    if (password !== passwordCheck) {
      res.status(400).json({
        status: 'fail',
        message: '密碼不一致'
      })
    }
    if (!isAuth(req, res)) {
      res.status(401).json({
        status: 'fail',
        message: '尚未登入'
      })
    }
    const finder = new UserauthService();
    const result: any = await finder.updatePassword(email, password);
    const token = generateJWT(email);
    res.status(201).json({
      status: 'success',
      data: {
        _id: result._id,
        email: result.email,
        token
      }
    })
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    })
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
    const { email } = req.params;
    console.log('email:', email)
    const finder = new UserauthService();
    const result: any = await finder.getProfile(email);
    if (result.error) {
      res.status(404).json({
        status: "fail",
        message: "找不到該使用者"
      })
    };
    res.status(200).json({
      status: 'success',
      data: {
        ...result
      }
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "找不到該使用者"
    })
  }
}

/**
 * Update User Profile
 * @param req
 * @param res
 * @param next
 */
export async function updateProfile(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  const updater = new UserauthService()
}
