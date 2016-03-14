var express = require("express");

var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use("/",express.static(__dirname+"/static"));

var p = (process.env.PORT || 16666);

app.get("/time",(req,res) => {

	var now = new Date();
	res.write("It is "+now);
	res.end();
})



var games = [];

app.get("/api/sandbox/games/:name", (req,res) =>{
	var name = req.params.name;
	console.log("New GET of resource "+name);
	res.send(games[name]);
});

app.post("/api/sandbox/games", (req,res) =>{
	var game = req.body;
	games.push(game);
	console.log("New POST of resource "+game.name);
	res.sendStatus(200);
})

app.post("/api/sandbox/games/:name", (req,res) =>{
	res.send("Operation not permitted");
})

app.put("/api/sandbox/games/:name", (req,res) =>{
	var game = req.body;
	games[name] = game;
	console.log("New PUT of resource "+game.name);
	res.sendStatus(200);
})

app.put("/api/sandbox/games", (req,res) =>{
	res.sendStatus("Operation not permitted.");
})

app.delete("/api/sandbox/games", (req,res) =>{
	games = [];
	console.log(" You DELETED all games :(");
	res.sendStatus(200);
})

app.delete("/api/sandbox/games/:name", (req,res) =>{
	console.log("You deleted the game successfully.");
	res.sendStatus(200);
})


app.listen(p);    