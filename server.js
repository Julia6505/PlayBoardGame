var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 8080;
// var PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mySQL = require("mysql");

// require("./routes/apiRoutes")(app);

//connection to mySQL 
// var connection = mySQL.createConnection({
//     user: "root",
//     database: "games_db"
// });

var connection;
if(process.env.JAWSDB_URL) {
  //Heroku deployment
    connection = mySQL.createConnection(process.env.JAWSDB_URL);
} else {
  //local host
    connection = mySQL.createConnection({
        root: 3000,
        host: "localhost",
        user: "root",
        password: "",
        database: "games_db",
    });
};

connection.connect(function(err) {
    if (err) {
        console.log("error connecting: " + err.stack);
        return;
    }
console.log("connected as id " + connection.threadId);
});

app.use(express.static(__dirname + '/public/assets'));

app.get("/", function (req, res) {
    connection.query("SELECT * FROM newgames;", function(err, data) {
    if (err) {
        throw err;
    }
    console.log(data);
    res.render("index", { newgames: data });
    });
});

app.post("/", function (req, res){
    console.log("You sent " + req.body.newgame);
connection.query("INSERT INTO newgames (newgame) VALUES (?)", [req.body.newgame], function(err, result) {
    if (err) {
        throw err;
    }
    res.redirect("/");
});
});

app.post("/update/:id", function (req,res) {
    console.log("SERVER LINE 60");
    var updateID = parseInt(req.params.id);
    connection.query("UPDATE newgames SET ? WHERE id = " + updateID,
      {newgame: req.body.newgame, played: req.body.played}, 
      function(err, results) {
        if (err) 
          throw err;
        res.redirect('/')
      });
  });

  app.listen(PORT, function() {
    console.log("Server listening on: http://localhost: " + PORT);
});

    // app.get("/playedgames", function(req, res) {
    //     connection.query("SELECT * FROM playedgames;", function(err, data) {
    //       if (err) {
    //     return res.status(500).end();
    //       }
    //     });
    // });






