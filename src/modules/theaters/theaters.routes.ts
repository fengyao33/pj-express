import { Router } from 'express'
import * as Controller from './theaters.controller'
import { storeValidators, updateValidators } from './theaters.validator';
import { validateBody } from '@middlewares/validator';

const router = Router()

router.get('/', Controller.index)

export default router
