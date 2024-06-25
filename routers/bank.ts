import { Router } from "express";
import * as bank from "../controllers/bank.controller";

const router = Router();

router.get("/", bank.findAll);

// router.get("/:id", bank.findById);

// router.post("/",bank.create);

// router.put("/:id",bank.update);

// router.delete("/:id", bank.deleteById);

export default router;