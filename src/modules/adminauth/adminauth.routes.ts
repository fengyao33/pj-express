// import { validateBody } from '@middlewares/validator';
import { validateBody } from '@middlewares/validator';
import { Router } from 'express';
import * as Controller from './adminauth.controller';
import { loginValidators } from './adminauth.validator';

const router = Router()

router.post('/login', [...loginValidators, validateBody], Controller.login)

export default router
