const { getUser } = require("../services/auth");

async function restrictToLoginUserOnly(req, res, next){
    const UserUid = req.cookies?.uid;

    if(!UserUid) return res.redirect("/login");
    const user = getUser(UserUid);

    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req, res, next){
    const UserUid = req.cookies?.uid;
    const user = getUser(UserUid);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoginUserOnly,
    checkAuth,
}