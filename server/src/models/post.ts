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
    ref: "User"
  },
  updateDate: {
    type: Date,
    required: true
  },
  numberOfLikes: Number,
})

export default model("Post", PostSchema);
