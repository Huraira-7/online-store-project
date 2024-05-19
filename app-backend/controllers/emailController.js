import User from "../models/user.js";
import transporter from '../middlewares/emailHandler.js';

const emailController = {

    async sendorderconfirmationemail(req,res,next){
        const {message, customer} = req.body
        // console.log(message,customer)
        try{
            let employee =  await User.findOne({role:'employee'});
            let email = employee.email;
            var mailOptions = {
                from:process.env.EMAIL,
                to:  `${email}, ${customer}`,
                subject: "Order Placement Confirmation Email - Bling Boutique", 
                text: `${message}`
                //html tag to present content can also be used...
            }
    
            // transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //       console.error(error);
            //     } else {
            //     //   console.log('Email sent: %s', info);
            //     }
            // });

            await new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        console.log("email-sent");
                        resolve("email-sent");
                    }
                });
            });

            return res.status(200).json({email:"sent"});
        } catch(e)    {   console.log("mail-err",e);     return next(e); }
        // console.log("Message sent: %s", info.messageId);
    },

    async sendformsubmissionemail(req,res,next) {
        // console.log("sending mail")
        const {message} = req.body
        try{
            let employee =  await User.findOne({role:'employee'});
            let email = employee.email;
            var mailOptions = {
                from:process.env.EMAIL,
                to:   `${email}`,
                subject: "Customer Contact Form Submission Email - Bling Boutique", 
                text: `${message}`
                //html tag to present content can also be used...
            }
    
            // transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //       console.error(error);
            //     } else {
            //     //   console.log('Email sent: %s', info);
            //     }
            // });

            await new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        console.log("email-sent");
                        resolve("email-sent");
                    }
                });
            });
            
            return res.status(200).json({email:"sent"});
        } catch(e)    {   console.log("mail-err",e);     return next(e); }
    },

    async addemail(req,res,next){
        const {email} = req.body
        try{
            let user;
             const userToAdd = new User({
                    email: email,
                    role: 'customer',
             });
            user = await userToAdd.save();
            return res.status(201).json({user:user});
        } catch(e)  {console.log("one",e);    return next(e); }
    },

    
    async getallemails(req,res,next){
        let users; 
        try {
            users = await User.find();
            let email_list = []
            for (var i in users){
                let u = users[i]
                if (u.role === 'customer') {  email_list.push(u.email)    }
            }

            let employee =  await User.findOne({role:'employee'});
            let email = employee.email;
    
            var mailOptions = {
                from:process.env.EMAIL,
                to:  `${email}`,
                subject: "List of User emails -  Bling Boutique Admin", 
                text: `${email_list}`
                //html tag to present content can also be used...
            }
    
            // transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //       console.error(error);
            //     } else {
            //     //   console.log('Email sent: %s', info);
            //     }
            // });

            await new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        console.log("email-sent");
                        resolve("email-sent");
                    }
                });
            });

            return res.status(200).json({ email_list: email_list});
        } catch(e) {  console.log("one",e); return next(e);  }
    },

    async changemail(req,res,next){
        const {email} = req.body
        try {
            let user = await User.findOne({role:'employee'});
            user.email = email;
            await user.save();
            return res.status(200).json({ user: user});
        } catch(e) {  console.log("one",e); return next(e);  }
    },

    async changedowntime(req,res,next){
        let user; 
        try {
            user = await User.findOne({role:'downtime'});
            if (user.email === 'false') {  user.email = 'true' } 
            else { user.email = 'false'}
            await user.save();
            return res.status(200).json({ user: user});
        } catch(e) {  console.log("one",e); return next(e);  }
    },

    async otp(req,res,next) {
        try{
            let employee =  await User.findOne({role:'employee'});
            let email = employee.email;

            const randomDecimal = Math.random();
            const randomNumber = Math.floor(randomDecimal * 1000000);
            let number =  randomNumber.toString().padStart(6, '0');

            var mailOptions = {
                from:process.env.EMAIL,
                to:  `${email}`,
                subject: "One Time Passcode Email - Bling Boutique Admin", 
                text: `${number}`
            }
    
            // transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //       console.error(error);
            //     } else {
            //     //   console.log('Email sent: %s', info);
            //     }
            // });

            await new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        console.log("email-sent");
                        resolve("email-sent");
                    }
                });
            });

            return res.status(200).json({number});
        } catch(e)    {   console.log("mail-err",e);     return next(e); }
     
    }

}

export default emailController;