const express = require('express');
const { updateToken } = require('../controlers/api');
const router = express.Router()

router.post("/refresh",updateToken)
module.exports = router