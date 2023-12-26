const jwt = require("jsonwebtoken");
const config = require("../config");
const CustomError = require("../utils/customError");
const userModel = require("../Models/userModel")

exports.authVerify = async (req, resp, next)=>{
    const token = req.cookies["token"];
    if(token){
         const verifyToken = jwt.verify(token, config.SECRET_KEY);
         const existsUser = await userModel.findOne({email : verifyToken.USER_DATA.email})
         req.user = existsUser;
         if(verifyToken){
           return next()
         }
    }
       next()
}