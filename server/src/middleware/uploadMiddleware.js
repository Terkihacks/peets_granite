const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// Store image  in cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products', // Folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file formats
     transformation: [
    { width: 512, height: 651, crop: 'limit' } // Resize with max width and height
  ]
  
  }
 
});

const upload = multer({ storage });

module.exports = upload;
