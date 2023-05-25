import { Router } from 'express'
import * as Controller from './activities.controller'
import { storeValidators, updateValidators } from './activities.validator';

const router = Router()

router.get('/', Controller.index)

router.post('/', Controller.store)

router.put('/:id', Controller.update)

export default router
