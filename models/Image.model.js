const { Schema, model } = require("mongoose");

const imageSchema = new Schema(
    {
        imageName: {
            type: String,
            required: true
        },
        imageId: {
            type: String, 
            required: true 
        },  
        imageUrl: {
            type: String, 
            required: true
        } 
    },
);

const Image = model("Image", imageSchema);
module.exports = Image;