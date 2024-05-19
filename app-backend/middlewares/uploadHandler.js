import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const root = path.dirname(path.dirname(__dirname))
console.log(root)

//find a way to display multer Errors
const storage = multer.diskStorage({
    destination: path.join(root, "app-frontend/public/images"),
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