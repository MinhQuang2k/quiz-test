import mongoose from "mongoose";
const Schema = mongoose.Schema;

const QuestionSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    answers: {
      type: Schema.Types.Mixed,
      default: null,
    },
    is_file_required: {
      type: Boolean,
      default: false,
    },
    correct_answers: {
      type: Array,
      default: null,
    },
    score: {
      type: Number,
      default: 0,
    },
    has_mul_correct_answers: {
      type: Boolean,
      default: false,
    },
    scoring_type: {
      type: Number,
      default: 0,
    },
    time_limit: {
      type: Number,
      default: 0,
    },
    is_answers_shufflable: {
      type: Boolean,
      default: false,
    },
    matching_answers: {
      type: Schema.Types.Mixed,
      default: null,
    },
    matching_correct_answers: {
      type: Schema.Types.Mixed,
      default: null,
    },
    fill_blank_correct_answers: {
      type: Schema.Types.Mixed,
      default: null,
    },
    note_answer: {
      type: String,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      // required: true,
    },
    tags: {
      type: Schema.Types.ObjectId,
      ref: "question_groups",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("questions", QuestionSchema);
