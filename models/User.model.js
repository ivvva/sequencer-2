const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  cloudinary_id: {
    type: String, 
  },
});

const User = model("User", userSchema);
module.exports = User;
