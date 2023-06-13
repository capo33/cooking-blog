import { Schema, model } from "mongoose";

import { IUser } from "../interfaces/userInterface";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: [true, "Please enter your answer"],
    },
    avatar: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg",
    },
    isAdmin: {
      type: Boolean,
      default: false, 
    },
    interests: {
      type: [String],
      default: [],
    },
    about: {
      type: String,
      default: "example: I am a photographer",
    },
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
    savedRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
    phone: {
      type: String,
      default: "XXX-XXX-XXXX",
    },
    address: {
      type: String,
      default: "1234 Main St",
    },
    birthday: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
