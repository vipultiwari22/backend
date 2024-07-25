import mongoose, { Schema } from "mongoose";

const PostArticleSchema = new mongoose.Schema(
  {
    postBio: {
      type: String,
    },
    postImage: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const PostArtical = mongoose.model("post", PostArticleSchema);

export default PostArtical;
