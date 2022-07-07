const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const sequenceSchema = new Schema(
    {
        notes: [String],
        drawingX: [String], 
        drawingY: [String]
    }
); 

const Sequence = mongoose.model('Sequence', sequenceSchema); 
module.exports = Sequence; 