import express from 'express';
import emailController from '../controllers/emailController.js';
import productController from '../controllers/productController.js';
// import upload from '../middlewares/uploadHandler.js';

const router = express.Router();

// testing endpoints   --------------------------------------------------

// router.get('/test',(req,res) => res.json({Test:"Passed"}));

// router.post('/test',(req,res) => res.json({Test:"Passed by POST"}));


// product endpoints ----------------------------------------------------------------

// router.post('/addproduct',upload.single('file'),productController.addproduct); //MULTER
router.post('/addproduct',productController.addproduct);

// router.post('/editproductaddphoto',upload.single('file'),productController.editproductaddphoto); //MULTER
router.post('/editproductaddphoto',productController.editproductaddphoto);

router.post('/editproduct',productController.editproduct); 

router.post('/deleteproduct',productController.deleteproduct); 

router.post('/fetchproductbycategory',productController.fetchproductbycategory);

router.post('/fetchallproducts',productController.fetchallproducts);

router.post('/fetchinitialdata',productController.fetchinitialdata); 


// email endpoints ----------------------------------------------------------------

router.post('/sendorderconfirmationemail',emailController.sendorderconfirmationemail); 

router.post('/sendformsubmissionemail',emailController.sendformsubmissionemail); 

router.post('/addemail',emailController.addemail); 

router.post('/changemail',emailController.changemail);

router.post('/getallemails',emailController.getallemails); 

router.post('/changedowntime',emailController.changedowntime); 

router.post('/otp',emailController.otp); 



export default router;

