require('dotenv').config()
var express = require('express');
var app = express();
require('./db/dbcon')

var cors = require('cors');
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//routes
app.get('/', function (req, res) {
   res.send("Good Evening !")
})
app.post('/greet', function (req, res) {
   res.send("Have a Nice Day !")
})
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