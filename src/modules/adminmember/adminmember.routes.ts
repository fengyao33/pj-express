import { Router } from "express";
import * as Controller from "./adminmember.controller";
import isAuth from "@middlewares/isAuth";

const router = Router();

router.get("/", isAuth, Controller.getAllMember);
router.get("/:id", isAuth, Controller.getOneMember);
router.post("/", isAuth, Controller.postMember);
router.patch("/:id", isAuth, Controller.updateMember);
router.delete("/:id", isAuth, Controller.delOneMember);
router.delete("/", isAuth, Controller.delAllMember);

export default router;
