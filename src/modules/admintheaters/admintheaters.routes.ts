import { Router } from 'express';
import * as Controller from './admintheaters.controller';
import { storeValidators, updateValidators, fileValidate } from './admintheaters.validator';
import { validateBody } from '@middlewares/validator';
import isAuth from '@middlewares/isAuth';

const router = Router();

router.use(isAuth);

router.get('/', Controller.index);

router.get('/:id', Controller.show);

router.post('/', [...storeValidators, validateBody], Controller.store);

router.patch('/:id', [...updateValidators, validateBody], Controller.update);

router.delete('/:id', Controller.destroy);

router.post('/file/upload', fileValidate, Controller.fileUpload)

export default router;
  