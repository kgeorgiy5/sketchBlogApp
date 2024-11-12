import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  likedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    }
  ]
})

export default model("User", UserSchema);


