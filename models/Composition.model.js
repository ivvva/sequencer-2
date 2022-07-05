const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const compositionSchema = new Schema(
  {
   notes: {
      type: Array,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    drawing_coordinates: String,
  
  createdAt: {
    type: Date,
    immutable: true 

  }
},
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }

);

const Composition = model("Composition", compositionSchema);

module.exports = Composition;