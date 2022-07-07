const { Schema, model, default: mongoose } = require("mongoose");
const Sequence = require("./Sequence.model");

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    preferences: {
      type: String,
    },
    location: {
      type: String,
    },
    sequencers: [],
  },
);

const User = model("User", userSchema);
module.exports = User;
