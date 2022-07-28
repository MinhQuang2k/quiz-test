import { Router } from "express";
import { User } from "../controllers/index.js";
const router = Router();

router.post("/", User.create);
router.get("/", User.getAll);

export default router;
