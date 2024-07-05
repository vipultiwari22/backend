import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    visitHistory: [{ timestamps: { type: Number } }],
  },
  {
    timestamps: true,
  }
);

const URL = mongoose.model("URL", urlSchema);

export default URL;
