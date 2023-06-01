import isAuth from "@middlewares/isAuth";
import { validateBody } from '@middlewares/validator';
import { Router } from 'express';
import * as Controller from './user.controller';
import { forgetPasswordValidators, loginValidators, signupValidators, updatePasswordValidators } from './user.validator';

const router = Router()

router.post('/signup', [...signupValidators, validateBody], Controller.singup)

router.post('/login', [...loginValidators, validateBody], Controller.login)

router.post('/password', [isAuth, ...updatePasswordValidators, validateBody], Controller.updatePassword)

router.get('/profile/:email', isAuth, Controller.getProfile)

router.patch('/profile', [isAuth, validateBody], Controller.updateProfile)

router.post('/password/forget', [...forgetPasswordValidators, validateBody], Controller.getPasswordMail)

router.get('/purchaseRecord', isAuth, Controller.getPurchaseRecord)
router.get('/bonusRecord', isAuth, Controller.getBonusRecord)

export default router
