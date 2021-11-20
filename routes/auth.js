const express = require('express');
const router = express.Router()
const { googleLogin } = require('../controlers/auth');

router.post("/googlelogin",googleLogin)
module.exports = router