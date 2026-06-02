const express = require("express");
const { handleGenerateNewShortenURL } = require("../controllers/url");

const router = express.Router();

router.post('/', handleGenerateNewShortenURL);

// router.get('/:id');

// router.get('/analytics/:id');

module.exports = router;