import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    test_category_id: {
      type: Schema.Types.ObjectId,
      ref: "test_categories",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("sub_categories", SubCategorySchema);
