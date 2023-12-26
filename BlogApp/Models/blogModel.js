const {Schema, model} = require("mongoose");


const blogSchema = new Schema({
    title : {
        type : String,
        required : true
    },

    content : {
       type : String,
       required : true
    },

    coverImage : {
        type : String,
        default : "/coverImages/default.jpg"
    },

    createdBy :{
        type : Schema.Types.ObjectId,
        ref : "users"
    }
},{timestamps : true});

module.exports = new model("blogs", blogSchema, "blogs");