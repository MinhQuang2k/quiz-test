import { Router } from "express";
import User from "./userRoute.js";
import Role from "./roleRoute.js";
import Question from "./questionRoute.js";
import QuestionGroup from "./questionGroupRoute.js";
import TestCategory from "./testCategoryRoute.js";
import SubCategory from "./subCategoryRoute.js";
const router = Router();

router.use("/user", User);
router.use("/role", Role);
router.use("/question", Question);
router.use("/question-group", QuestionGroup);
router.use("/test-category", TestCategory);
router.use("/sub-category", SubCategory);

export default router;
