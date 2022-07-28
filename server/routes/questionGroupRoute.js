import { Router } from "express";
import { QuestionGroup } from "../controllers/index.js";
const router = Router();

router.post("/", QuestionGroup.create);
router.get("/", QuestionGroup.getAll);
router.patch("/:id", QuestionGroup.updateById);
router.delete("/:id", QuestionGroup.deleteById);

export default router;
