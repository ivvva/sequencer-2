const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary"); 
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary, 
    params: {
        folder: 'uploads', // name of folder in Cloudinary. possibly change?
        allowed_formats: ['jpg, png, jpeg']
    }
});

const uploader = multer({ storage })

module.exports = { uploader, cloudinary };