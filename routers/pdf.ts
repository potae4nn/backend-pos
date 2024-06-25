import { Router } from "express";
import * as pdf from "../controllers/pdf.controller";

const router = Router();

router.get("/bills/:id", pdf.printBillAllById)

// router.post("/",pdf.create);

export default router;