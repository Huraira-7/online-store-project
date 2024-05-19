// import multer from 'multer';
// import path from 'path';

// //find a way to display multer Errors
// const storage = multer.diskStorage({
    // destination: 
    //  (req,file,callback) => {
    //      callback(null,'../app-frontend/public/images')
    //  },
//     filename: (req,file,callback) => {
//         callback(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     },
// });

// const upload = multer({
//     storage:storage
// });

import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config()
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDNAME, 
  api_key:process.env.CLOUDAPI, 
  api_secret:process.env.CLOUDAPISECRET
});

const upload = async (path, folder = "bling-boutique") => {
    try {
      const data = await cloudinary.uploader.upload(path, { folder: folder });
      return { url: data.secure_url, publicId: data.public_id };
    } catch (err) {
      console.log("error ... ",err);
      throw err;
    }
  };

export default upload;