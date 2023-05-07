import { Router } from 'express'
import * as Controller from './adminmovies.controller'
import { storeValidators, updateValidators } from './adminmovies.validator';
import { validateBody } from '@middlewares/validator';

const router = Router()

router.get("/", Controller.getAllMovies);
//
router.post("/", [...storeValidators, validateBody], Controller.postMovies);
//
router.patch(
  "/:id",
  [...updateValidators, validateBody],
  Controller.updateMovies
);
//
router.delete("/:id", Controller.deleteOneMovies);

export default router
