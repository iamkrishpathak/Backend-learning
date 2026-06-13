const { getUser } = require("../services/auth");

function extractToken(req){
    const authHeader = req && (req.headers && (req.headers.authorization || req.headers['authorization']));
    if(!authHeader || typeof authHeader !== 'string') return null;
    if(authHeader.startsWith('Bearer ')) return authHeader.slice(7);
    return authHeader;
}

async function restrictToLoginUserOnly(req, res, next){
    const token = extractToken(req);
    if(!token) return res.redirect("/login");

    const user = await getUser(token);
    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req, res, next){
    const token = extractToken(req);
    if(!token){
        req.user = null;
        return next();
    }

    const user = await getUser(token);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoginUserOnly,
    checkAuth,
}