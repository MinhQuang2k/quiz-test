import { Router } from "express";
import { TestCategory } from "../controllers/index.js";
const router = Router();

router.get("/", TestCategory.getAll);
router.post("/", TestCategory.create);
router.patch("/:id", TestCategory.updateById);
router.delete("/:id", TestCategory.deleteById);

export default router;
