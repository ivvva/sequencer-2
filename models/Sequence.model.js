const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const sequenceSchema = new Schema(
    {
        notes: Array,
        // drawing: url() // cloudinary url for the png drawing
    }
); 

const Sequence = mongoose.model('Sequence', sequenceSchema); 
module.exports = Sequence; 