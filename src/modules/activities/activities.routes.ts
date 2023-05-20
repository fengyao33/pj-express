import isAuth from '@middlewares/isAuth';
import { validateBody } from '@middlewares/validator';
import { Router } from 'express';
import * as Controller from './activities.controller';
import { createActivityValidators, updateActivityValidators } from './activities.validator';

const router = Router()

router.get('/', [isAuth], Controller.getActivities)
router.post('/', [isAuth, ...createActivityValidators, validateBody], Controller.createActivity)
router.patch('/:id', [isAuth, ...updateActivityValidators, validateBody], Controller.updateActivity)
router.delete('/:id', [isAuth], Controller.deleteActivity)

export default router
