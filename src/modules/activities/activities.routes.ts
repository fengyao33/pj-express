import { Router } from 'express'
import * as Controller from './activities.controller'
import { createActivityValidators, updateActivityValidators } from './activities.validator';
import { validateBody } from '@middlewares/validator';

const router = Router()

router.get('/', Controller.getActivities)
router.post('/', [...createActivityValidators, validateBody], Controller.createActivity)
router.patch('/:id', [...updateActivityValidators, validateBody], Controller.updateActivity)
router.delete('/:id', Controller.deleteActivity)

export default router
