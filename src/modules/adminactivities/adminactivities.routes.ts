import isAuth from '@middlewares/isAuth';
import { validateBody } from '@middlewares/validator';
import { Router } from 'express';
import * as Controller from './adminactivities.controller';
import { createActivityValidators } from './adminactivities.validator';

const router = Router()

router.get('/', [isAuth], Controller.getActivities)
router.post('/', [isAuth, ...createActivityValidators, validateBody], Controller.createActivity)
router.patch('/:id', [isAuth, validateBody], Controller.updateActivity)
router.delete('/:id', [isAuth], Controller.deleteActivity)

export default router
