import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TestCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("test_categories", TestCategorySchema);
