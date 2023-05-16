import isAuth from "@middlewares/isAuth";
import { validateBody } from '@middlewares/validator';
import { Router } from 'express';
import * as Controller from './user.controller';
import { loginValidators, signupValidators, updatePasswordValidators, updateProfileValidators } from './user.validator';

const router = Router()

router.post('/signup', [...signupValidators, validateBody], Controller.singup)

router.post('/login', [...loginValidators, validateBody], Controller.login)

router.post('/password', [isAuth, ...updatePasswordValidators, validateBody], Controller.updatePassword)

router.get('/profile/:email', isAuth, Controller.getProfile)

router.patch('/profile', [isAuth, ...updateProfileValidators, validateBody], Controller.updateProfile)

export default router
