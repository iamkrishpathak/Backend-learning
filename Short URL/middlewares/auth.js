const { getUser } = require("../services/auth");

async function restrictToLoginUserOnly(req,res){
    const UserUid = req.cookie.uid;

    if(!UserUid) return res.redirect("/login");
    const user = getUser(Useruid);

    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

module.exports = {
    restrictToLoginUserOnly,
}