const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/photodb',{useUnifiedTopology: true , useNewUrlParser: true})
.then(
    ()=>{
        console.log("database connected")
    },
()=>{
    console.log("could not connect to database")
});