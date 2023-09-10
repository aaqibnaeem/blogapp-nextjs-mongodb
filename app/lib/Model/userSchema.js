import mongoose from "mongoose";

let userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

if (mongoose.models["users"]) {
  delete mongoose.models["users"];
}

export const USERMODEL = mongoose.model("users", userSchema);
