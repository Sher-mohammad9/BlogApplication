const express = require("express");
const mongoose = require("mongoose")
const staticRoute = require("./Router/staticRouter");
const userRoute = require("./Router/userRouter");
const blogRoute = require("./Router/blogRouter")
const globalErrorHandler = require("./Controller/globalErrorHandler");
const {authVerify} = require("./Middleware/authVerify");
const path = require("path");
const config = require("./config");
const cookieParser = require("cookie-parser")


const app = express();

mongoose.connect(config.LOCAL_CONN_STR + config.DATABASE_NAME, {useNewUrlParser : true})
.then(()=>console.log("mongodb connected"))

app.use(express.static(path.resolve("./public")))

//Decrypt form Data
app.use(express.urlencoded({ extended : false}))

//Decrypt JSON Data
app.use(express.json());

app.use(cookieParser())

//Authentication
app.use(authVerify);


//Set Template Engine
app.set("view engine", "ejs");
//Set template directory
app.set("views", path.resolve("./views"))

app.get("/home", (req, resp)=>{
    resp.render("home", {user : req.user})
});

app.use("/app", staticRoute);
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.use(globalErrorHandler)

module.exports = app;
