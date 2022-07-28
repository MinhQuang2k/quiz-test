import { QuestionGroup } from "../models/index.js";

export const getAll = async (req, res) => {
  const user_id = "62d7d72a602584b9a6be2529";
  let { keyword = null, page = 1, per_page = 2, type_filter } = req.query;

  const limit = type_filter !== "all" ? Number(per_page) : null;
  const startIndex =
    type_filter !== "all" ? Number(per_page) * (Number(page) - 1) : null;
  let query = { user_id };
  if (keyword) query.name = { $regex: keyword.trim(), $options: "i" };

  try {
    const questionGroups = await QuestionGroup.find(query)
      .sort("-updatedAt")
      .skip(startIndex)
      .limit(limit);

    const total = await QuestionGroup.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Successfully",
      questionGroups,
      pagination: {
        current_page: Number(page),
        per_page: Number(per_page),
        total,
      },
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const create = async (req, res) => {
  const user_id = "62d7d72a602584b9a6be2529";
  const { name } = req.body;

  if (!name || name.trim() === "")
    return res
      .status(400)
      .json({ success: false, message: "Tag name is required" });
  try {
    const questionGroup = await QuestionGroup.findOne({ name, user_id });

    if (questionGroup)
      return res.status(403).json({
        success: false,
        message: "Tag name has already been taken",
      });

    const newQuestionGroup = new QuestionGroup({
      name,
      user_id,
    });

    await newQuestionGroup.save();

    res.status(201).json({
      success: true,
      message: "Successfully",
      questionGroup: newQuestionGroup,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateById = async (req, res) => {
  const user_id = "62d7d72a602584b9a6be2529";
  const { id } = req.params;
  const { name } = req.body;

  if (!name || name.trim() === "")
    return res
      .status(400)
      .json({ success: false, message: "Tag name is required" });
  try {
    const questionGroup = await QuestionGroup.findOne({ name, user_id });
    if (questionGroup)
      return res.status(403).json({
        success: false,
        message: "Tag name has already been taken",
      });

    const updateQuestionGroup = await QuestionGroup.findOneAndUpdate(
      { _id: id, user_id },
      { name }
    );

    if (!updateQuestionGroup)
      return res.status(401).json({
        success: false,
        message: "Question group not found or user not authorised",
      });

    res.status(200).json({
      success: true,
      message: "Successfully",
      questionGroup: updateQuestionGroup,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteById = async (req, res) => {
  const user_id = "62d7d72a602584b9a6be2529";
  const { id } = req.params;
  try {
    const questionGroup = await QuestionGroup.findOneAndDelete({
      _id: id,
      user_id,
    });

    if (!questionGroup)
      return res.status(401).json({
        success: false,
        message: "Question group not found or user not authorised",
      });

    res
      .status(200)
      .json({ success: true, message: "Successfully", questionGroup });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
