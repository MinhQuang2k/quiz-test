import { TestCategory, SubCategory } from "../models/index.js";

export const create = async (req, res) => {
  const user_id = "62d7d72a602584b9a6be2529";
  const { name, test_category_id } = req.body;
  try {
    const testCategory = new TestCategory({ user_id, _id: test_category_id });
    if (!testCategory)
      return res.status(401).json({
        success: false,
        message: "Test category not found or user not authorised",
      });

    const newSubCategory = await SubCategory.create({
      test_category_id,
      name,
    });

    res.status(201).json({
      success: true,
      message: "Successfully",
      subCategory: newSubCategory,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateById = async (req, res) => {
  const user_id = "62d7d72a602584b9a6be2529";
  const { name, test_category_id } = req.body;
  const { id } = req.params;
  try {
    const testCategory = new TestCategory({ user_id, _id: test_category_id });
    if (!testCategory)
      return res.status(401).json({
        success: false,
        message: "Test category not found or user not authorised",
      });

    const updateSubCategory = await SubCategory.findOneAndUpdate(
      { _id: id, test_category_id },
      { name }
    );

    if (!updateSubCategory)
      return res.status(401).json({
        success: false,
        message: "Sub category not found or user not authorised",
      });

    res.status(201).json({
      success: true,
      message: "Successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const moveById = async (req, res) => {
  const user_id = "62d7d72a602584b9a6be2529";
  const { new_parent_id } = req.body;
  const { id } = req.params;
  try {
    const testCategory = new TestCategory({ user_id, _id: new_parent_id });
    if (!testCategory)
      return res.status(401).json({
        success: false,
        message: "Test category not found or user not authorised",
      });

    const updateSubCategory = await SubCategory.findOneAndUpdate(
      { _id: id },
      { test_category_id: new_parent_id }
    );

    if (!updateSubCategory)
      return res.status(401).json({
        success: false,
        message: "Sub category not found",
      });

    res.status(201).json({
      success: true,
      message: "Successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteSub = await SubCategory.findOneAndDelete({ _id: id });

    if (!deleteSub)
      return res.status(401).json({
        success: false,
        message: "Sub category not found",
      });

    res.status(201).json({
      success: true,
      message: "Successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
