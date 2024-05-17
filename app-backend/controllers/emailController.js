import User from "../models/user.js";
import transporter from '../middlewares/emailHandler.js';

const emailController = {

    async sendorderconfirmationemail(req,res,next){
        const {message, customer} = req.body
        // console.log(message,customer)
        try{
            let employee =  await User.findOne({role:'employee'});
            var mailOptions = {
                from: "noreplyautomated999@gmail.com" ,
                to:  `${employee.email} ${customer}`,
                subject: "Order Placement Confirmation Email", 
                text: `${message}`
                //html tag to present content can also be used...
            }
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error(error);
                } else {
                //   console.log('Email sent: %s', info);
                }
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
            var mailOptions = {
                from: "noreplyautomated999@gmail.com" ,
                to:   `${employee.email}`,
                subject: "Customer Contact Form Submission Email", 
                text: `${message}`
                //html tag to present content can also be used...
            }
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error(error);
                } else {
                //   console.log('Email sent: %s', info);
                }
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
    
            var mailOptions = {
                from: "noreplyautomated999@gmail.com" ,
                to:  `${employee.email}`,
                subject: "List of User emails", 
                text: `${email_list}`
                //html tag to present content can also be used...
            }
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error(error);
                } else {
                //   console.log('Email sent: %s', info);
                }
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
        // console.log("sending mail")
        try{
            let employee =  await User.findOne({role:'employee'});

            const randomDecimal = Math.random();
            const randomNumber = Math.floor(randomDecimal * 1000000);
            let number =  randomNumber.toString().padStart(6, '0');

            var mailOptions = {
                from: "noreplyautomated999@gmail.com" ,
                to:  `${employee.email}`,
                subject: "One Time Passcode Email", 
                text: `${number}`
            }
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error(error);
                } else {
                //   console.log('Email sent: %s', info);
                }
            });
            return res.status(200).json({number});
        } catch(e)    {   console.log("mail-err",e);     return next(e); }
     
    }

}

export default emailController;