import { Router } from "express";
import * as product from "../controllers/product.controller";
import upload from "../middleware/upload";

const router = Router();

router.get("/", product.findAll);

router.get("/count", product.findCount);

router.get("/pages", product.findByPage);

router.get("/:id", product.findById);

router.get("/name/:name", product.findByProductName);

router.get("/search/:search", product.findBySearch);

router.get("/code/:code", product.findByProductCode);

router.post("/", upload.single("Product_Image"), product.create);

router.put("/:id", upload.single("Product_Image"), product.update);

router.delete("/:id", product.deleteById);

export default router;
