import multer from 'multer';
import path from 'path';

//find a way to display multer Errors
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../app-frontend/public/images"),
    // main?.path + "/" +  "../app-frontend/public/images",
    // (req,file,callback) => {
    //     callback(null,'../app-frontend/public/images')
    // },
    filename: (req,file,callback) => {
        callback(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    },
});

const upload = multer({
    storage:storage
});

export default upload;