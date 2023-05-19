import { Router } from 'express';
import * as Controller from './adminseats.controller';
import { storeValidators, updateValidators } from './adminseats.validator';
import { validateBody } from '@middlewares/validator';
import isAuth from '@middlewares/isAuth';

const router = Router();

router.use(isAuth);

router.get('/examples', Controller.index);
//
router.get('/', Controller.show);
//
router.post('/', [...storeValidators, validateBody], Controller.store);
//
router.put('/:id', [...updateValidators, validateBody], Controller.update);
//
router.delete('/:id', Controller.destroy);

export default router;
