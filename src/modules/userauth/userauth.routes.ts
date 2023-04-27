import { validateBody } from '@middlewares/validator';
import { Router } from 'express';
import * as Controller from './userauth.controller';
import { storeValidators, updateValidators } from './userauth.validator';

const router = Router()

router.post('/singup', [...storeValidators, validateBody], Controller.singup)

router.post('/login', [...storeValidators, validateBody], Controller.login)

router.put('/logout/:id', [...updateValidators, validateBody], Controller.logout)

router.post('/password', Controller.updatePassword)

router.patch('/profile', Controller.updateProfile)

export default router
