import { Router } from "express";
import * as Controller from "./movies.controller";
import { storeValidators, updateValidators } from "./movies.validator";
import { validateBody } from "@middlewares/validator";

const router = Router();

router.get("/", Controller.index);

router.get("/:id", Controller.index);


router.post("/", [...storeValidators, validateBody], Controller.store);

router.patch("/:id", [...updateValidators, validateBody], Controller.update);

export default router;
