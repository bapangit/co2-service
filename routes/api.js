const express = require('express');
const router = express.Router()
/*
 controllers
  */
const {updateTokenController} = require('../controlers/apis/updatetoken')
const {uploadImageController} = require('../controlers/apis/uploadimage')
const {myPhotos} = require('../controlers/apis/myPhotos')
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
router.post("/myphotos",isAuthorized,myPhotos)

module.exports = router