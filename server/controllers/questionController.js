import { Question } from "../models/index.js";

export const getAll = async (req, res) => {
  const user_id = "62d7d72a602584b9a6be2529";
  let { keyword, page = 1, per_page = 10, group } = req.query;

  const limit = Number(per_page);
  const startIndex = Number(per_page) * (Number(page) - 1);
  let query = { user_id };

  if (keyword)
    query.name = {
      $regex: keyword.trim(),
      $options: "i",
    };

  if (group) query.question_group_id = group;

  try {
    const questions = await Question.find(query)
      .sort("-updatedAt")
      .skip(startIndex)
      .limit(limit);

    res.status(200).json(questions);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getById = async (req, res) => {
  const user_id = "62d7d72a602584b9a6be2529";
  const { id } = req.params;
  try {
    const question = await Question.findOne({ user_id, _id: id });

    if (!question)
      return res.status(401).json({
        success: false,
        message: "Question not found or user not authorised",
      });

    res.status(200).json({ success: false, message: "Successfully", question });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const create = async (req, res) => {
  const user_id = "62d7d72a602584b9a6be2529";
  try {
    const newQuestion = new Question({
      user_id,
      ...req.body,
    });

    await newQuestion.save();

    res
      .status(201)
      .json({ success: true, message: "Successfully", question: newQuestion });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateById = async (req, res) => {
  const user_id = "62d7d72a602584b9a6be2529";
  const { id } = req.params;
  try {
    const updateQuestion = await Question.findOneAndDelete({
      _id: id,
      user_id,
      ...req.body,
    });

    if (!updateQuestion)
      return res.status(401).json({
        success: false,
        message: "Question not found or user not authorised",
      });

    res.status(200).json({
      success: true,
      message: "Successfully",
      question: updateQuestion,
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
    const question = await Question.findOneAndDelete({
      _id: id,
      user_id,
    });

    if (!question)
      return res.status(401).json({
        success: false,
        message: "Question not found or user not authorised",
      });

    res.status(200).json({ success: true, message: "Successfully", question });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
