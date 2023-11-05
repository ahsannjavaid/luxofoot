import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
    },
    lname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    post: {
        type: String,
        required: true,
    },
    securityAnswer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("admins", adminSchema);
