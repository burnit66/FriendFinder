var express = require("express")
var path = require("path")
var fs = require("fs");


var app = express()

var PORT = process.env.PORT || 8080



app.listen(PORT, function(){
    console.log("Server is on and listening port: " + PORT)
})