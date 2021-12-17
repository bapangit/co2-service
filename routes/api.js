const express = require('express');
const router = express.Router()
/*
 controllers
  */
const {updateTokenController} = require('../controlers/apis/updateToken')
const {uploadImageController} = require('../controlers/apis/uploadImage')
const {myPhotos} = require('../controlers/apis/myPhotos')
const { deletePhoto } = require('../controlers/apis/deletePhoto');
const { publish } = require('../controlers/apis/publish');
const { getUser } = require('../controlers/apis/getUser');
const { route } = require('express/lib/application');
const { photosToday } = require('../controlers/apis/photosToday');
/*
 middlewares
  */
const { isAuthorized } = require("../middlewares/auth.js")
const {uploadImageMiddleware} = require("../utils/uploadimage");
/* 
non authorized routes
 */
router.post("/refresh", updateTokenController)
/* 
authorized routes
 */
router.post("/uploadimage", isAuthorized, uploadImageMiddleware, uploadImageController)
router.post("/myphotos",isAuthorized,myPhotos)
router.post("/deletephoto",isAuthorized,deletePhoto)
router.post("/publish",isAuthorized,publish)
router.post("/getuser",isAuthorized,getUser)

module.exports = router