const config = require("../config");
const CustomError = require("../utils/customError");

const duplicateKeyErrorHandler = (error, req)=>{
    if(error.keyValue.mobile){
       const error = new CustomError("Mobile Number already exists", 400)
        error.user = req.user
        return error;

    }else if(error.keyValue.email){
        const error = new CustomError("Email already exists", 400);
        error.user = req.user
        return error;
    }
}

const ValidationErrorhandler = (error)=>{
    const errors = Object.values(error.errors).map((val) => val.message);
    const errorMassage = errors.join(".");
    return new CustomError(errorMassage, 400);
}

const productionHandler = (resp, error)=>{
    console.log("productional Error")
    if(error.isOperational){
      if(error.message === "wrong email" || error.message === "Incorrect Password"){
        return resp.render("login", {message : error.message, user : error.user});
      }
      resp.render("signup", {message : error.message, user : error.user});        
    }else{
      resp.send(error)
    }
}



module.exports = (error, req, resp, next)=>{
    console.log("Global Error", error.name)
      error.status = error.status || "error";
      error.statusCode = error.statusCode || 500;
    
      if(config.NODE_ENV === "development"){
         if(error.code === 11000) error = duplicateKeyErrorHandler(error, req);
         if (error.name === "ValidationError") error = ValidationErrorhandler(error, req);

         productionHandler(resp, error);
      }
}