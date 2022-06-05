const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    feedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    childOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comments", commentSchema);

module.exports = commentModel;
