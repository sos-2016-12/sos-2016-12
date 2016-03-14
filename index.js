var express = require("express");

var app = express();

app.use("/",express.static(__dirname+"/static"));

var p = (process.env.PORT || 16666);

app.get("/time",(req,res) => {

	var now = new Date();
	res.write("It is "+now);
	res.end();
})

var bodyParser = require("body-parser");

app.use(bodyParser.json());

var games = [ { "name" : ""}];

app.get("/api/sandbox/games/:name", (req,res) =>{
	var name = req.params.name;
	console.log("New GET of resource "+name);
	res.send(games[name]);
});

app.post("/api/sandbox/games", (req,res) =>{
	var game = req.body;
	games.push(contact);
	console.log("New POST of resource "+game.name);
	res.sendStatus(200);
})

app.listen(p);    