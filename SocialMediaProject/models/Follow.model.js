import mongoose, { Schema } from "mongoose";

const followSchema = new mongoose.Schema({
  FollwedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  following: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Follow = mongoose.model("Follow", followSchema);
export default Follow;
