import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "comment", "follow"],
      required: true,
    },
    targetUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    targetPost: {
      type: Schema.Types.ObjectId,
      ref: "PostArtical",
    },
    targetComment: {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
