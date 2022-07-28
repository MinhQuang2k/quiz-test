import { Router } from "express";
import { Question } from "../controllers/index.js";
const router = Router();

router.post("/", Question.create);
router.get("/", Question.getAll);
router.get("/", Question.getById);
router.patch("/:id", Question.updateById);
router.delete("/:id", Question.deleteById);

export default router;
