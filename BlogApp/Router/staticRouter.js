const express = require("express");
const staticFileController = require("../Controller/staticFileController.js")
const Router = express.Router();

// Render signup page
Router.route("/signup").get(staticFileController.signupPage)
// Render login page
Router.route("/login").get(staticFileController.loginPage);
// Render update profile page
Router.route("/update-profile").get(staticFileController.updateProfile)
// Render logout page
Router.route("/logout").get(staticFileController.logoutUser);



module.exports = Router;