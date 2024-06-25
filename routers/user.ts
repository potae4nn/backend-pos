import { Router } from "express";
import * as user from "../controllers/user.controller";

const router = Router();

router.get("/username/:name",user.findOne);

router.get("/", user.findAll);

router.get("/:id", user.findById);

router.post("/",user.create);

// router.put("/:id",user.update);

// router.delete("/:id", user.deleteById);

export default router;
