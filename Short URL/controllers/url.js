const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortenURL(req,res){
    const body = req.body;
    if(!body?.url) return res.status(400).json({error : "Url is required!"});

    let urlEntry = await URL.findOne({
        redirectURL: body.url,
        createdBy: req.user._id,
    });

    if(!urlEntry){
        const shortID = nanoid(8);
        urlEntry = await URL.create({
            shortID,
            redirectURL : body.url,
            visitHistory : [],
            createdBy : req.user._id,
        });
    }

    return res.redirect(`/?id=${urlEntry.shortID}`);
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