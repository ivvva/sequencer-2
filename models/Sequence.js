const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const sequenceSchema = new Schema({
    nodes: Array // sound array
    // drawing array
}); 

const Sequence = mongoose.model('Sequence', sequenceSchema); 
module.exports = Sequence; 