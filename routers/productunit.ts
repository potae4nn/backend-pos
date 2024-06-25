import { Router } from "express";
import * as productunit from "../controllers/productunit.controller";

const router = Router();

router.get("/", productunit.findAll);

router.get("/:id", productunit.findById);

router.post("/",productunit.create);

router.put("/:id",productunit.update);

router.delete("/:id", productunit.deleteById);

export default router;