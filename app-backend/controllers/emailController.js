import User from "../models/user.js";
import transporter from '../middlewares/emailHandler.js';

const emailController = {

    async sendorderconfirmationemail(req,res,next){
        console.log("sending mail")
        const {message, customer} = req.body
        try{
            let employee =  await User.findOne({role:'employee', active:true});
            var mailOptions = {
                from: "noreplyautomated999@gmail.com" ,
                to:  "hahuraira@gmail.com, fatimameerab515@gmail.com",  //  `${employee} ${customer}`,
                subject: "Order Placement Confirmation Email", 
                text: "this msg"  // `${message}`
                //html tag to present content can also be used...
            }
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error(error);
                } else {
                  console.log('Email sent: %s', info);
                }
            });
            return res.status(200).json({email:"sent"});
        } catch(e)    {   console.log("mail-err",e);     return next(e); }
        // console.log("Message sent: %s", info.messageId);
    },

    async sendformsubmissionemail(req,res,next) {
        console.log("sending mail")
        const {message} = req.body
        try{
            let employee =  await User.findOne({role:'employee', active:true});
            var mailOptions = {
                from: "noreplyautomated999@gmail.com" ,
                to:  "hahuraira@gmail.com",  //  `${employee}`,
                subject: "Customer Contact Form Submission Email", 
                text: `${message}`
                //html tag to present content can also be used...
            }
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error(error);
                } else {
                  console.log('Email sent: %s', info);
                }
            });
            return res.status(200).json({email:"sent"});
        } catch(e)    {   console.log("mail-err",e);     return next(e); }
        // console.log("Message sent: %s", info.messageId);
    },

    async addemail(req,res,next){
        const {email} = req.body
        try{
            let user;
             const userToAdd = new User({
                    email: email,
                    role: 'customer',
                    active: true
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

            let employee =  await User.findOne({role:'employee', active:true});
    
            var mailOptions = {
                from: "noreplyautomated999@gmail.com" ,
                to:  "hahuraira@gmail.com",  //  `${employee}`,
                subject: "List of User emails", 
                text: `${email_list}`
                //html tag to present content can also be used...
            }
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error(error);
                } else {
                  console.log('Email sent: %s', info);
                }
            });
            return res.status(200).json({ email_list: email_list});
        } catch(e) {  console.log("one",e); return next(e);  }
    },

    async changemail(req,res,next){
        const {email} = req.body
        let users; 
        try {
            users = await User.find({role:'employee'});
            for (var i in users){
                users[i].active = false
                await users[i].save();
            }
            let user;
            const userToAdd = new User({
                   email: email,
                   role: 'employee',
                   active: true
            });
            user = await userToAdd.save();
            return res.status(200).json({ user: user});
        } catch(e) {  console.log("one",e); return next(e);  }
    },

    async changedowntime(req,res,next){
        let user; 
        try {
            user = await User.findOne({role:'downtime'});
            user.active = !user.active
            await user.save();
            return res.status(200).json({ user: user});
        } catch(e) {  console.log("one",e); return next(e);  }
    }

}

export default emailController;