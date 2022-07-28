import mongoose from "mongoose";
const Schema = mongoose.Schema;

const QuestionGroupSchema = new Schema(
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

export default mongoose.model("question_groups", QuestionGroupSchema);
