// import { validateBody } from '@middlewares/validator';
import { Router } from 'express';
import * as Controller from './userauth.controller';
// import { storeValidators, updateValidators } from './userauth.validator';
import { NextFunction, Request, Response } from 'express';

const router = Router()

router.post('/signup', Controller.singup)

router.post('/login', Controller.login)

router.post('/password', Controller.updatePassword)

router.patch('/profile', Controller.updateProfile)

export default router
