const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const sequenceSchema = new Schema(
    {
        notes: Array, // sound array
        // drawing_coordinates: String // visual array
    }
); 

const Sequence = mongoose.model('Sequence', sequenceSchema); 
module.exports = Sequence; 