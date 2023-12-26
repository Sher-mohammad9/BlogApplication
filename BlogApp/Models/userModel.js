const {Schema, model} = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    name : {
        type : String,
        minlength : 1,
        maxlength : 50,
        required : true
    },

    mobile : {
        type : String,
        required : true,
        unique : true,
        validate : {
            validator : function(mobile){
                return /^[6-9]\d{9}$/.test(mobile)
            },
            message : "Mobile Number Invalid"
        }
    },

    email : {
        type : String,
        required : true,
        unique : true,
        validate : [validator.isEmail, "Email Address Invalid"]
    },

    password : {
        type : String,
        required : true
    },

    confirmPassword : {
        type : String,
    },

    userType : {
        type : String,
        enum : ["USER", "SUBCRIBER", "ADMIN"],
        default : "USER"
    },

    profileImage : {
        type : String,
        default : "/Images/default.png"
    }
}, {timestamps : true});

userSchema.pre("save", async function(next){

    if(!this.isModified("password")) return;

     const HASH_PASSWORD = await bcrypt.hash(this.password, 10);
     this.password = HASH_PASSWORD;

     this.confirmPassword = undefined
    next();
})

module.exports = model("users", userSchema, "users");
