// Render signup page
exports.signupPage = (req, resp)=>{
    resp.render("signup");
}

// Render login page
exports.loginPage = (req, resp)=>{
    resp.render("login");
}

// User logout handle
exports.logoutUser = (req, resp, next)=>{
    const clearCoo = resp.clearCookie("token").redirect("/home")
}

// Render profile page
exports.updateProfile = (req, resp, next)=>{
    resp.render("profile", {user : req.user});
}

