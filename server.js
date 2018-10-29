var express = require("express")
var path = require("path")


//INITIALIZE
var app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//PORT
var PORT = process.env.PORT || 8080


// ROUTING
app.get('/survey', function(req, res){
    res.sendFile(path.join(__dirname, "app", "public", "survey.html"));
})

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "app", "public", "home.html"));
  });


  //API
  app.get('/api/friends', function(req, res){
    return res.json(friends);
})

app.post("/api/friends", function(req, res) {
    // var newFriend = req.body;
    // newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();
    // console.log(newFriend);
    // characters.push(newFriend);
    // res.json(newFriend);
  });


  //LISTEN
app.listen(PORT, function(){
    console.log("Server is on and listening port: " + PORT)
})