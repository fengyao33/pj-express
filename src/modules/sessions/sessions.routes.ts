import { Router } from 'express'
import * as Controller from './sessions.controller'
import { storeValidators, updateValidators } from './sessions.validator';
import { validateBody } from '@middlewares/validator';

const router = Router()

router.get('/', Controller.index)
router.get('/:id/ticketTypes', Controller.getTicketTypes)
router.get('/:id/seats', Controller.isLogin, Controller.getRoomInfo)
router.post('/:id/seats', Controller.isLogin, Controller.checkSeatsInfo)

export default router
