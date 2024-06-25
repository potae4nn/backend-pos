import { Router } from "express";
import * as sale from "../controllers/sale.controller";

const router = Router();

router.get("/", sale.findAll);

// router.get("/:id", sale.findById);

router.get("/invoice/:id", sale.findByIdInvoice);

router.post("/",sale.create);

// router.put("/:id",sale.update);

// router.delete("/:id", sale.deleteById);

export default router;