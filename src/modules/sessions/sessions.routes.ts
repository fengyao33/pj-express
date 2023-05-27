import { Router } from 'express'
import * as Controller from './sessions.controller'
import { storeValidators, updateValidators } from './sessions.validator';
import { validateBody } from '@middlewares/validator';
import isAuth from '@middlewares/isAuth';

const router = Router()

router.get('/', Controller.index)
router.get('/:id/ticketTypes', Controller.getTicketTypes)
router.get('/:id', Controller.getInfo)
router.get('/:id/seats', isAuth, Controller.getRoomInfo)
router.post('/:id/seats', isAuth, Controller.checkSeatsInfo)

export default router
