const express = require('express');
const { googleLogin } = require('../controlers/auth');
const router = express.Router()

router.post("/googlelogin",googleLogin)
module.exports = router