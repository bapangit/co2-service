const express = require('express');
const router = express.Router()
const { googleLogin } = require('../controlers/auths/googleauth');

router.post("/googlelogin",googleLogin)
module.exports = router