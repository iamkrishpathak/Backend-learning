const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortenURL(req,res){
    console.log(`Body : ${req.body}`);
    const body = req.body;
    if(!body?.url) return res.status(400).json({error : "Url is required!"});
    const shortID = nanoid(8);
    
    await URL.create({
        shortID : shortID,
        redirectURL : body.url, 
        visitHistory : [],
    });
    return res.json({id:shortID});
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortID : shortId });
    return res.json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory
    });
}

module.exports = {
    handleGenerateNewShortenURL,
    handleGetAnalytics
}; 