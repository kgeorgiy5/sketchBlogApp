import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  updateDate: {
    type: Date,
    required: true
  },
  numberOfLikes: {
    type: Number,
    required: true
  },
})

export default model("Post", PostSchema);
