import { Request, Response } from 'express';
// import successHandler from '../../middlewares/success_handler';
import isAuth from "@middlewares/isAuth";
import _ from 'lodash';
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
    const updater = new UserauthService();
    const result: any = await updater.updatePassword(email, password);
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
    const { email: userEmail } = req.params;
    const finder = new UserauthService();
    const result: any = await finder.getProfile(userEmail);
    const { name, email, sex, birth, mobile, hobby } = result
    res.status(200).json({
      status: 'success',
      data: {
        name,
        email,
        sex,
        birth,
        mobile,
        hobby
      }
    })
  } catch (error: any) {
    res.status(404).json({
      status: "fail",
      message: error.message
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
  try {
    const { name, email, sex, birth, mobile, hobby } = req.body;
    const newProfile = _.omitBy({ name, sex, birth, mobile, hobby }, _.isEmpty)
    const updater = new UserauthService();
    const result: any = await updater.updateProfile(email, newProfile);
    res.status(200).json({
      status: 'success',
      data: {
        email,
        ...newProfile
      }
    })
  } catch (error: any) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}
