import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: null,
    },
    language: {
      type: String,
      default: "vi",
    },
    role_id: {
      type: Schema.Types.ObjectId,
      ref: "roles",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", UserSchema);
