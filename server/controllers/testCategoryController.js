import { TestCategory, SubCategory } from "../models/index.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const singleSubCategory = (array, id) => {
  const newArray = new Set(array.map((a) => a.name));

  return [...newArray].map((a) => {
    return { name: a, test_category_id: id };
  });
};

export const getAll = async (req, res) => {
  const user_id = "62d7d72a602584b9a6be2529";
  let { keyword = null, page = 1, per_page = 2, type_filter } = req.query;

  const limit = type_filter !== "all" ? Number(per_page) : null;
  const startIndex =
    type_filter !== "all" ? Number(per_page) * (Number(page) - 1) : null;

  let query = { user_id: ObjectId(user_id) };
  if (keyword) query.name = { $regex: keyword.trim(), $options: "i" };
  try {
    const testCategory = await TestCategory.aggregate()
      .match(query)
      .lookup({
        from: "sub_categories",
        localField: "_id",
        foreignField: "test_category_id",
        as: "sub_categories",
      })
      .sort({ updatedAt: -1, "sub_categories.updatedAt": -1 })
      .skip(startIndex)
      .limit(limit);

    const total = await TestCategory.countDocuments(query);

    const categories = await TestCategory.find().sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      message: "Successfully",
      testCategory,
      categories,
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
  const { name, sub_category } = req.body;
  try {
    const testCategory = await TestCategory.findOne({ user_id, name });
    if (testCategory)
      return res
        .status(403)
        .json({ success: false, message: "Tag name has already been taken" });

    let newTestCategory = await TestCategory.create({ user_id, name });

    let newSubCategory = [];

    if (sub_category.length > 0) {
      newSubCategory = await SubCategory.insertMany(
        singleSubCategory(sub_category, newTestCategory._id)
      );
    }

    res.status(201).json({
      success: true,
      message: "Successfully",
      testCategory: {
        ...JSON.parse(JSON.stringify(newTestCategory)),
        sub_categories: newSubCategory,
      },
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateById = async (req, res) => {
  const user_id = "62d7d72a602584b9a6be2529";
  const { name } = req.body;
  const { id } = req.params;
  try {
    const testCategory = await TestCategory.findOne({ user_id, name });

    if (testCategory)
      return res
        .status(403)
        .json({ success: false, message: "Tag name has already been taken" });

    const updateTestCategory = await TestCategory.findOneAndUpdate(
      { _id: id, user_id },
      { name }
    );
    if (!updateTestCategory)
      return res.status(401).json({
        success: false,
        message: "Test category not found or user not authorised",
      });

    res.status(200).json({
      success: true,
      message: "Successfully",
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
    await SubCategory.deleteMany({ test_category_id: id });

    const testCategory = await TestCategory.findOneAndDelete({
      _id: id,
      user_id,
    });

    if (!testCategory)
      return res.status(401).json({
        success: false,
        message: "Test category not found or user not authorised",
      });

    res.status(200).json({ success: true, message: "Successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
