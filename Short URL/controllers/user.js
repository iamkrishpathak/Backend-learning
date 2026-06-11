
const User = require("../models/user");
const { setUser } = require("../services/auth");

async function handleSignUp(req,res){
    const {
        name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect("/");
}

async function handleLogin(req,res){
    const { email, password } = req.body;
    const user = await User.findOne({email,password});
    if(!user) return res.render("login", {
        error : "Invalid usernme or password",
    })
    const token = setUser(user);
    res.cookie("uid",token);
    return res.redirect("/");
}

module.exports = {
    handleSignUp,
    handleLogin
}