const express = require('express');
const router = express.Router()
/*
 controllers
  */
const { updateTokenController} = require('../controlers/apis/updatetoken');
const {uploadImageController} = require('../controlers/apis/uploadimage')
/*
 middlewares
  */
const { isAuthorized } = require("../middlewares/auth.js")
const {uploadImageMiddleware} = require("../utils/uploadimage")
/* 
non authorized routes
 */
router.post("/refresh", updateTokenController)
/* 
authorized routes
 */
router.post("/uploadimage", isAuthorized, uploadImageMiddleware, uploadImageController)

module.exports = router