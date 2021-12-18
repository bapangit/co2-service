require('dotenv').config()
var express = require('express');
const mongoose = require('mongoose')
const { photosToday } = require('./controlers/apis/photosToday');
var app = express();
require('./db/dbcon')
const router = express.Router()
router.use(express.static(__dirname+"./public/"))

var cors = require('cors');
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


//routes
app.get('/', function (req, res) {
   res.send("Welcome !")
})
app.post('/greet', function (req, res) {
   var s = new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
   res.send("Good morning ! "+s)
})
app.get('/photostoday',photosToday)
//auth routes
app.use("/",require('./routes/auth'))

//api routes
app.use("/",require('./routes/api'))

//server
const port = process.env.PORT || 8080

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})