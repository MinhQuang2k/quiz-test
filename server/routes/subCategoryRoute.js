import { Router } from "express";
import { SubCategory } from "../controllers/index.js";
const router = Router();

router.post("/", SubCategory.create);
router.patch("/:id", SubCategory.updateById);
router.patch("/move/:id", SubCategory.moveById);
router.delete("/:id", SubCategory.deleteById);

export default router;
