const express = require("express");
const { handleGenerateNewShortenURL, handleGetAnalytics } = require("../controllers/url");

const router = express.Router();

router.post('/', handleGenerateNewShortenURL);

router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;