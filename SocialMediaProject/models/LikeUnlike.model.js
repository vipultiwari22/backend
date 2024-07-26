import mongoose, { Schema } from "mongoose";

const LikeUnlikeSchema = new mongoose.Schema(
  {
    Like: {
      type: Boolean,
      default: false,
    },
    LikedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    LikeOnPost: {
      type: Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const likeUnlike = mongoose.model("LikeUnlike", LikeUnlikeSchema);

export default likeUnlike;
