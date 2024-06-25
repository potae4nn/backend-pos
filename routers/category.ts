import { Router } from "express";
import * as category from "../controllers/category.controller";

const router = Router();

router.get("/", category.findAll);

// router.get("/:id", category.findById);

router.post("/",category.create);

// router.put("/:id",category.update);

// router.delete("/:id", category.deleteById);

export default router;