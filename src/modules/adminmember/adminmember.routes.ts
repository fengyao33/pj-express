import { Router } from 'express'
import * as Controller from './adminmember.controller'
import { storeValidators, updateValidators } from './adminmember.validator';
import { validateBody } from '@middlewares/validator';

const router = Router()

router.get("/", Controller.getAllMember);
//
router.get("/:id", Controller.getOneMember);
//
router.post("/", [...storeValidators, validateBody], Controller.postMember);
//
router.patch(
  "/:id",
  [...updateValidators, validateBody],
  Controller.updateMember
);
//
router.delete("/:id", Controller.delOneMember);
router.delete("/", Controller.delAllMember);


export default router
