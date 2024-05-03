import User  from "../models/user.js";

const authController = {

    async register(req, res, next)  {
        // console.log("register_req-----",req.body)
        const {username, password, confirmPassword, itemsOwned, cashOwned} = req.body;
        try {
            const usernameInUse = await User.exists({ username });
      
            if (usernameInUse) {
              return next({
                status: 409,
                message: "Username not available, choose another username!",
              });
            }
        }   catch (error) { console.log("one",error); return next(error); }

        if(password != confirmPassword){
          return next({
            status: 408,
            message: "The passwords do not match!",
          });
        }

        let user;
        try {
              const userToRegister = new User({
                username,
                password,
                num_owned_items: itemsOwned,
                cash: cashOwned,
                trades: [],
            });
      
            user = await userToRegister.save();

        } catch (error) { console.log("two",error); return next(error);  }
        return res.status(201).json({ user:user,auth:true});
    },

    async login(req, res, next) {
        // console.log("login_req-----",req.body)
        const { username, password } = req.body;
        let user;
        try {
            user = await User.findOne({username});

            if (!user) {
                const error = { status: 401,  message: "This username does NOT exist "  };
                return next(error);
            }

            if (password != user.password) {
                const error = {  status: 401,  message: "Password does not exist for this user"  };
                return next(error);
            }
        } catch (error) {  console.log("one",error);  return next(error);  }

        return res.status(200).json({ user:user,auth:true});
    },

    async logout(req,res,next) {
        //console.log("logout_req-----",req.body)
        return res.status(200).json({user: null,auth:false});
    },

    async changepassword(req,res,next) {
      // console.log("change_pass_req-----",req.body)
      const { username, newpassword } = req.body;
      let user;
      try {
          user = await User.findOne({username});
          user.password = newpassword;
          await user.save();
      } catch (error) {  console.log("one",error);  return next(error);  }

      return res.status(202).json({ user:user,auth:true});
    }
}

export default authController;