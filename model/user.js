const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    phone: Number,
    password: String,
    birthDate: String,
    role: { type: mongoose.Schema.ObjectId },
    accountStatus: String,
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
