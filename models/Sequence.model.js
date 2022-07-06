const { Schema, model } = require("mongoose");

const sequenceSchema = new Schema(
  {
    notes: [String],
    coordinates: [String],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Sequence = model("Sequence", sequenceSchema);

module.exports = Sequence;
