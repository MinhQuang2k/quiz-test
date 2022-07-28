import { Router } from "express";
import { Role } from "../controllers/index.js";
const router = Router();

router.post("/", Role.create);
router.get("/", Role.getAll);

export default router;
