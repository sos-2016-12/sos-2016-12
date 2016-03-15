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


//Cádigo Ale ###############################################

// Alejandro's part

var games = [];

app.get("/api-test/games/loadInitialData", (req,res) =>{
	games = [{ name : "cod", PEGI : "18"},{ name : "GTA", PEGI : "18"}];
	console.log("2 elements initialized.");
	res.send(200);
});

app.get("/api/sandbox/games/", (req,res) =>{
	console.log("New GET of all resources.");
	res.send(games);
});

app.get("/api/sandbox/games/:name", (req,res) =>{
	var name = req.params.name;
	console.log("New GET of resource "+name);
	res.send(games);
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
	console.log("You DELETED all games :(");
	res.sendStatus("You DELETED all games :(");
})

app.delete("/api/sandbox/games/:name", (req,res) =>{
	console.log("You deleted the game successfully.");
	res.sendStatus("You deleted the game successfully.");
})


//###########################################################


//Código Víctor
var pirates = [];

app.get("/api/sandbox/pirates", function(req,res){
	console.log("New GET of all resources.");
	res.send(pirates);
});

app.get("/api/sandbox/pirates/:name", function(req, res){

	var name = req.params.name;
	console.log("New GET of resource" + name);
	res.send(pirates[0]);
});

app.get("/api-test/pirates/loadInitialData", function(req,res){
	pirates = [{ name : "Black Bart"},{ name : "Long Ben"},{ name : "Anne Bonny"}];
	console.log("3 elements initialized.");
	res.send(200);
});

app.post("/api/sandbox/pirates", function(req, res){
	var pirate = req.body;
	pirates.push(pirate);
	console.log("New POST of resource " + pirate.name);
	res.sendStatus(200);
});


app.post("/api/sandbox/pirates/:name", function(req,res){
	res.send("¿Qué tramas, moreno?");
});

app.put("/api/sandbox/pirates/:name", (req,res) =>{
	var pirate = req.body;
	pirates[name] = pirate;
	console.log("New PUT of resource "+pirate.name);
	res.sendStatus(200);
});

app.put("/api/sandbox/pirate", function(req,res){
	res.sendStatus("¿Qué tramas, moreno?");
});

app.delete("/api/sandbox/pirates", function(req,res){
	pirates = [];
	console.log(" You DELETED all pirates :(");
	res.sendStatus(200);
});

app.delete("/api/sandbox/pirates/:name", (req,res) =>{
	console.log("You deleted the pirate successfully.");
	res.sendStatus(200);
});




// End of Alejandro's part

app.listen(p);    