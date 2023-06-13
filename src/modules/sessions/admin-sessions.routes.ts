import { Router } from 'express'
import * as Controller from './sessions.controller'
import { sessionsList, addSessions } from './sessions.validator';
import { validateBody } from '@middlewares/validator';
import isAuth from '@middlewares/isAuth';

const router = Router()

//取得
router.get('/list', [...sessionsList, validateBody], Controller.getSessionList)
//修改
router.post('/list', Controller.postUpdateSession)

export default router
