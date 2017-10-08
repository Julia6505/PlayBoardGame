var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// var PORT = process.env.PORT || 8080;
var PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mySQL = require("mysql");

// require("./routes/apiRoutes")(app);

//connection to mySQL 
var connection = mySQL.createConnection({
    user: "root",
    database: "games_db"
});
connection.connect(function(err) {
    if (err) {
        console.log("error connecting: " + err.stack);
        return;
    }

console.log("connected as id " + connection.threadId);
});

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
    console.log("You sent" + req.body.newgame);
connection.query("INSERT INTO newgames (newgame) VALUES (?)", [req.body.newgame], function(err, result) {
    if (err) {
        throw err;
    }
    res.redirect("/");
});
});

    app.get("/playedgames", function(req, res) {
        connection.query("SELECT * FROM playedgames;", function(err, data) {
          if (err) {
        return res.status(500).end();
          }
        });
    });

app.post("/newgames", function(req, res) {
    connection.query("INSERT INTO newgames (newgame) VALUES (?)", [req.body.newgame], function(err, result) {
      if (err) {
        return res.status(500).end();
      }
      // Send back the ID of the new todo
      res.json({ id: result.insertId });
    //   console.log({ id: result.insertId });
    });
  });

//   app.post("/playedgames", function(req, res) {
//     connection.query("INSERT INTO playedgames (playedgame) VALUES (?)", [req.body.playedgame], function(err, result) {
//       if (err) {
//         return res.status(500).end();
//       }
//       // Send back the ID of the new todo
//       res.render({ playedgames: playedgame});
//     //   console.log({ id: result.insertId });
//     });
//   });


app.listen(PORT, function() {
    console.log("Server listening on: http://localhost: " + PORT);
});


