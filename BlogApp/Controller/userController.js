const userModel = require("../Models/userModel.js");
const CustomError = require("../utils/customError.js");
const asyncErrorHandler = require("../utils/asyncErrorHandler.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config.js")

exports.signupUser = asyncErrorHandler(async(req, resp, next)=>{
    const USER_DATA = JSON.parse(JSON.stringify(req.body));
    if(!USER_DATA.password || USER_DATA.confirmPassword !== USER_DATA.password){
        const error = new CustomError("Confirm Password is not matched", 400);
        error.user = USER_DATA;
        return next(error)
    }
    req.user = USER_DATA
    const NEW_USER = await userModel.create(USER_DATA);
    NEW_USER.password = undefined;

    const token = jwt.sign({USER_DATA}, config.SECRET_KEY);
 
    resp.cookie("token", token).render("home", {user : NEW_USER});
});

exports.logInUser = asyncErrorHandler(async(req, resp, next)=>{
    const USER_DATA = await userModel.findOne({email : req.body.email});
    if(USER_DATA){
        const checkPassword = await bcrypt.compare(req.body.password, USER_DATA.password);
        if(checkPassword){
            const token = jwt.sign({USER_DATA}, config.SECRET_KEY);
            return resp.cookie("token", token).render("home", {user : USER_DATA});
        }else{
            const error = new CustomError("Incorrect Password", 400);
            error.user = req.body
            return next(error);
        }
    }else{
        const error = new CustomError("wrong email", 404);
        error.user = req.body
        return next(error);
    }
});

exports.updateProfile = asyncErrorHandler(async(req, resp, next)=>{
    let existsUser = null;
    if(req?.file?.filename){
        req.body.profileImage = `/Images/${req.file.filename}`
         existsUser = await userModel.findOneAndUpdate(
            {email : req.user.email},
            {$set : req.body}
            );
    }else{
        existsUser = await userModel.findOneAndUpdate(
            {email : req.user.email},
            {$set : req.body}
            );
    }
        resp.render("home", {user : existsUser});
})
