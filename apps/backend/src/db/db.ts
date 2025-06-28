import mongoose from "mongoose";
import { UserSchema } from "../zod/zod";
mongoose.connect("mongodb://localhost:27017/paytm");

console.log("hello world from db");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
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
  amount: {
    type: Number,
  },
});
const Usermodel = mongoose.model("user", User);
export { Usermodel };
