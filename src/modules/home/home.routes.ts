import { Router } from 'express'
import * as Controller from './home.controller'
import { storeValidators, updateValidators } from './home.validator';

const router = Router()

router.get('/', Controller.index)

export default router
