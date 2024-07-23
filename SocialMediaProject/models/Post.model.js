import mongoose, { Schema } from "mongoose";

const PostArticleSchema = new mongoose.Schema({
  postBio: {
    type: String,
    required: true,
  },
  postImage: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const PostArtical = mongoose.model("post", PostArticleSchema);

export default PostArtical;
