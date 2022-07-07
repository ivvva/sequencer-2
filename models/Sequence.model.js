const { Schema, model } = require("mongoose");

const sequenceSchema = new Schema(
  {
    notes: [String],
    drawingX: [Number],
    drawingY: [Number],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Sequence = model("Sequence", sequenceSchema);
module.exports = Sequence;
