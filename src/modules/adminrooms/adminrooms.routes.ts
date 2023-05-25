import { Router } from 'express';
import * as Controller from './adminrooms.controller';
import { storeValidators, updateValidators } from './adminrooms.validator';
import { validateBody } from '@middlewares/validator';
import isAuth from '@middlewares/isAuth';

const router = Router();

router.use(isAuth);

router.get('/', Controller.index);
//
router.get('/:id', Controller.show);
//
router.post('/', [...storeValidators, validateBody], Controller.store);
//
router.patch('/', [...updateValidators, validateBody], Controller.update);
//
router.delete('/', Controller.destroy);

export default router;
