// import { validateBody } from '@middlewares/validator';
import { validateBody } from '@middlewares/validator';
import { Router } from 'express';
import * as Controller from './userauth.controller';
import { loginValidators, signupValidators, updatePasswordValidators, updateProfileValidators } from './userauth.validator';

const router = Router()

router.post('/signup', [...signupValidators, validateBody], Controller.singup)

router.post('/login', [...loginValidators, validateBody], Controller.login)

router.post('/password', [...updatePasswordValidators, validateBody], Controller.updatePassword)

router.get('/profile/:email', Controller.getProfile)

router.patch('/profile', [...updateProfileValidators, validateBody], Controller.updateProfile)

export default router
