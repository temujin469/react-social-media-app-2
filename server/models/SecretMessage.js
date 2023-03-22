import mongoose from "mongoose";

const secretSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    description: String,
    picturePath: String,
  },
  { timestamps: true }
);

const Secret = mongoose.model("SecretMessage", secretSchema);

export default Secret;
