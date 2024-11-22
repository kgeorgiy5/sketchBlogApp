import { ObjectId } from "mongoose";

export interface IPost {
  _id: string;
  title: string;
  content: string;
  userId: ObjectId;
  updateDate: Date;
  numberOfLikes: number;
}

