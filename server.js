var express = require("express")
var path = require("path")
var friends = require("./app/data/friends")



//INITIALIZE
var app = express()
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());



//PORT
var PORT = process.env.PORT || 8080



// ROUTING
app.get('/survey', function (req, res) {
    res.sendFile(path.join(__dirname, "app", "public", "survey.html"));
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "app", "public", "home.html"));
});



//API
app.get('/api/friends', function (req, res) {
    return res.json(friends);
})

app.post("/api/friends", function (req, res) {

    var newFriend = req.body;

    console.log(newFriend)

    var totalArray = []

    for (var i = 0; i < friends.length; i++) {
        var friendScores = friends[i].scores
        var total = 0

        friendScores.forEach(function (x) {
            total += x
        })
        totalArray.push(total)
    }

    console.log("totalArray: " + totalArray)

    var newFriendTotal = 0

    var newFriendScores = newFriend.scores
    newFriendScores = newFriendScores.map(Number);

    newFriendScores.forEach(function (x) {
        newFriendTotal += x
    })

    console.log("newFriendTotal: " + newFriendTotal)

    function closest(array, num) {
        var i = 0;
        var minDiff = 1000;
        var ans;
        for (i in array) {
            var m = Math.abs(num - array[i]);
            if (m < minDiff) {
                minDiff = m;
                ans = array[i];
            }
        }
        return ans;
    }

    var closest = closest(totalArray, newFriendTotal)

    var index = totalArray.indexOf(closest)

    console.log("Closest Value is: " + closest)

    console.log("With an index of: " + index)

    console.log("Your match is: " + friends[index].name)

    friends.push(newFriend);

    res.json(friends[index])
});



//LISTEN
app.listen(PORT, function () {
    console.log("Server is on and listening PORT: " + PORT)
})