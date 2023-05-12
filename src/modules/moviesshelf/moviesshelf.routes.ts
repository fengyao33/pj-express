import { Router } from "express";
import * as Controller from "./moviesshelf.controller";
import { storeValidators, updateValidators } from "./moviesshelf.validator";
import { validateBody } from "@middlewares/validator";

const router = Router();

router.get("/", Controller.index);

router.post("/", [...storeValidators, validateBody], Controller.store);

router.patch("/:id", [...updateValidators, validateBody], Controller.update);

export default router;
