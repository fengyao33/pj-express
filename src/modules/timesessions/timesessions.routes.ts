import { Router } from 'express'
import * as Controller from './timesessions.controller'
import { storeValidators, updateValidators } from './timesessions.validator';

const router = Router()

router.get('/', Controller.getsessionList)
//
// router.get('/:id', Controller.show)
// //
// router.post('/', storeValidators, Controller.store)
// //
// router.put('/:id', updateValidators, Controller.update)
// //
// router.delete('/:id', Controller.destroy)

export default router
