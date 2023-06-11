import { Router } from 'express'
import * as Controller from './statistics.controller'
import { storeValidators, updateValidators } from './statistics.validator';

const router = Router()

router.get('/branch', Controller.showReport)
// //
// router.get('/:id', Controller.show)
// //
// router.post('/', storeValidators, Controller.store)
// //
// router.put('/:id', updateValidators, Controller.update)
// //
// router.delete('/:id', Controller.destroy)

export default router
