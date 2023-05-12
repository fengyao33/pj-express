import isAuth from "@middlewares/isAuth";
import { Router } from "express";
import * as Controller from "./adminmovies.controller";
import { storeValidators, updateValidators } from "./adminmovies.validator";
import { validateBody } from "@middlewares/validator";

const router = Router();

router.get("/", Controller.getAllMovies);
//
router.post("/",isAuth , Controller.postMovies);
//
router.patch("/:id", isAuth, Controller.updateMovies);
//
router.delete("/:id", isAuth, Controller.deleteOneMovies);

export default router;
