// module.exports = function(app) {

// app.get("/", function (req, res) {
//     connection.query("SELECT * FROM newgames;", function(err, data) {
//     if (err) throw err;
//     // console.log(data, "hey")
//     res.render("index", {newgames: data, title: "Game"});
//     });
// });

// app.post("/", function (req, res){
//     console.log("You sent" + req.body.newgame);
// });

// connection.query("INSERT INTO newgames (newgame) VALUES (?)", [req.body.newgame], function(err, result) {
//     if (err) throw err;
//     res.redirect("/");
// });

// };

