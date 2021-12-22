const express = require('express');
const router = express.Router()
/*
 controllers
  */
const {refreshTokenController} = require('../controlers/apis/refreshToken')
const {myPhotos} = require('../controlers/apis/myPhotos')
const { deletePhoto } = require('../controlers/apis/deletePhoto');
const { publish } = require('../controlers/apis/publish');
const { unPublish } = require('../controlers/apis/unPublish');
const { getUser } = require('../controlers/apis/getUser');
/*
 middlewares
  */
const { isAuthorized } = require("../middlewares/auth.js")
/* 
non authorized routes
 */
router.post("/refresh", refreshTokenController)
/* 
authorized routes
 */
router.post("/myphotos",isAuthorized,myPhotos)
router.post("/deletephoto",isAuthorized,deletePhoto)
router.post("/publish",isAuthorized,publish)
router.post("/unpublish",isAuthorized,unPublish)
router.post("/getuser",isAuthorized,getUser)

module.exports = router