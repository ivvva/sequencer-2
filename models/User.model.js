const { Schema, model, default: mongoose } = require("mongoose");
const Sequence = require("./Sequence.model");

const userSchema = new Schema(
  {
    username: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
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
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
