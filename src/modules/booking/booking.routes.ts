import { Router } from 'express'
import * as Controller from './booking.controller'
import { storeValidators, updateValidators } from './booking.validator';
import { validateBody } from '@middlewares/validator';
import isAuth from '@middlewares/isAuth';

const router = Router()

router.post('/result', Controller.result)
router.post('/', isAuth, Controller.index)

export default router
