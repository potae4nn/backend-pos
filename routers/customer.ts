import { Router } from "express";
import * as customer from "../controllers/customer.controller";

const router = Router();

router.get("/username/:name",customer.findOne);

router.get("/", customer.findAll);

router.get("/:id", customer.findById);

router.post("/",customer.create);

// router.put("/:id",user.update);

// router.delete("/:id", user.deleteById);

export default router;
