import { Router } from "express";
import * as invoice from "../controllers/invoice.controller";

const router = Router();

router.get("/", invoice.findAll);

router.get("/countdate", invoice.findByDate);

router.get("/latest", invoice.findLatestId);

router.post("/",invoice.create);

export default router;