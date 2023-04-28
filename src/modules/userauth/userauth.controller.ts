import { NextFunction, Request, Response } from 'express';
// import successHandler from '../../middlewares/success_handler';
import { UserauthService } from './services';
import generateJWT from '../../utils/generateJWT';


/**
 * User Sign Up
 * @param req
 * @param res
 * @param next
 */
export async function singup(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, passwordCheck } = req.body
    if (!email || !password || !passwordCheck) {
      res.status(400).json({
        status: 'fail',
        message: '欄位未填寫正確'
      })
    }
    if (password !== passwordCheck) {
      res.status(400).json({
        status: 'fail',
        message: '密碼不一致'
      })
    }
    const finder = new UserauthService();
    const result = await finder.signup(email, password);
    const token = generateJWT(email);
    res.status(201).json({
      status: 'success',
      data: {
        ...result,
        token
      }
    })
    
  } catch (error) {
    console.log(error);
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
    if(!email||!password) {
      res.status(400).json({
        status: 'fail',
        message: '欄位未填寫'
      })
    }
    const finder = new UserauthService()
    const result = await finder.login(email, password);
    const token = generateJWT(email);
    res.status(200).json({
      status: 'success',
      data: {
        ...result,
        token
      }
    })
  } catch (error) {
    console.log(error);
  }
}

/**
 * Update Password
 * @param req
 * @param res
 * @param next
 */
export async function updatePassword(req: Request, res: Response): Promise<void> {
  const saver = new UserauthService()
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
