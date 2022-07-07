const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
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