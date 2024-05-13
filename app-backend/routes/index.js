import express from 'express';
// import authController from '../controllers/authController.js';
import emailController from '../controllers/emailController.js';
import productController from '../controllers/productController.js';
import upload from '../middlewares/uploadHandler.js';

const router = express.Router();

// testing endpoints   --------------------------------------------------

// router.get('/test',(req,res) => res.json({Test:"Passed"}));

// router.post('/test',(req,res) => res.json({Test:"Passed by POST"}));



// product endpoints ----------------------------------------------------------------

router.post('/addproduct',upload.single('file'),productController.addproduct);

router.post('/editproductaddphoto',upload.single('file'),productController.editproductaddphoto);

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


// basic USER endpoints   --------------------------------------------------

// router.post('/login', authController.login);

// router.post('/register', authController.register);

// router.post('/logout', authController.logout);

// router.post('/changepassword',authController.changepassword);

// trade endpoints ----------------------------------------------------------------

// router.post('/createtrade', tradeController.createtrade);

// router.post('/acceptoffer', tradeController.acceptoffer); //end trade

// router.post('/declineoffer',tradeController.declineoffer);

// router.post('/gettradesandoffersforthisuser', tradeController.gettradesandoffersforthisuser); 

// router.post('/getongoingtrades',tradeController.getongoingtrades);






// active users endpoints ----------------------------------------------------------

// router.post('/setactiveuser', activeController.setactiveuser);

// router.post('/delactiveuser', activeController.delactiveuser); //should be DELETE request

// router.post('/getactiveusers', activeController.getactiveusers); //should be GET request 



export default router;

