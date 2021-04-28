require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = mongoose.model('User');


module.exports.register =  async (req,res,next) => {
    try{
        let user;
        user = await User.findOne({ $or: [ { email: req.body.email }, { userLoginId: req.body.userLoginId } ] });
        if(user) return res.status(400).json({ type: "Invalid", msg: "User is already registered with this Email Or UserId."});
        
        user = new User(_.pick(req.body, ['firstName','lastName','dateOfBirth','email','password','countryCode','phoneNo','userLoginId','latitude','longitude','activeStatus']));
        const salt = await bcrypt.genSalt(10);
        
        await user.save(async(err, doc) => {
            if(!err) {
                const token = jwt.sign({ _id: user._id ,name:user.firstName }, 'gambling_jwtprivatekey',{ expiresIn : '2h'});
                const refreshToken = jwt.sign({ _id: user._id  }, process.env.REFRESH_TOKEN ,{ expiresIn : '1y'});
                res.status(200).header('x-auth-token',token).send( [_.pick(user, ['_id','firstName','lastName','userLoginId','email','activeStatus']), {'success':true}]);
            }
            else {
                return next(err); 
            }
        });
        }
        catch(ex){
            next(ex);
        }
}

module.exports.loginUser =  async (req,res,next) => {
    try{
        let user = await User.findOne({ $or: [ { email: req.body.email.toLowerCase() }, { userLoginId: req.body.email.toLowerCase() } ] });
        if(!user) { return res.status(400).json({ type: "Not Found", msg: "Invalid  Email Or Password"}); }
        else {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword) return res.status(400).json({ type: "Not Found", msg: "Invalid Email Or Password" });

            if(user.activeStatus == false) return res.status(400).json({ type: "Not Found", msg: "Account Disabled ! Contact Admin" });
            const token = jwt.sign({ _id: user._id ,userRole: user.userRole ,status: user.activeStatus,email:user.email,name:user.firstName,
                lastName:user.lastName}, 'gambling_jwtprivatekey' ,{ expiresIn : '2h'});
            const refreshToken = jwt.sign({ _id: user._id ,userRole: user.userRole }, process.env.REFRESH_TOKEN ,{ expiresIn : '1y'});
            res.status(200).json({success : true, token: token, refreshToken : refreshToken})
        }
    }
    catch(ex){
        next(ex);
    }
}