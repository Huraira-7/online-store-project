import multer from 'multer';
import path from 'path';

//find a way to display multer Errors
const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null,'public/images')
    },
    filename: (req,file,callback) => {
        callback(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    },
});

const upload = multer({
    storage:storage
});

export default upload;