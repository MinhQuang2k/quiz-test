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
    answers: [
      {
        key: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
    note: {
      type: String,
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
      questions: [
        {
          key: {
            type: Number,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
        },
      ],
      answers: [
        {
          key: {
            type: String,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
        },
      ],
    },
    matching_correct_answers: {
      type: Map,
      of: Array,
    },
    fill_blank_correct_answers: [
      {
        key: { type: Number, required: true },
        content: { type: String, required: true },
      },
    ],
    note_answer: {
      type: String,
      default: null,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    question_group_id: {
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
