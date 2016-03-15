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
	var aux = null;
	for (var i = 0; i < games.length; i++) {
		if (games[i].name == name){
			aux = games[i];
			res.send(aux);
		}
	}
	if (aux == null) {
		res.sendStatus(404);
	}
	console.log("New GET of resource "+name);
	
	
});

app.post("/api/sandbox/games", (req,res) =>{
	var game = req.body;
	games.push(game);
	console.log("New POST of resource "+game.name);
	res.sendStatus(200);
});

app.post("/api/sandbox/games/:name", (req,res) =>{
	res.send("Operation not permitted");
});

app.put("/api/sandbox/games/:name", (req,res) =>{
	var game = req.body;
	var aux = null;
	for (var i = 0; i < games.length; i++) {
		if (games[i].name == req.params.name) {
			aux = games[i];
			aux.name = game.name;
			aux.PEGI = game.PEGI;
			res.sendStatus(200);
		}
	}
	if (aux == null) {
		res.sendStatus(404);
	}
	console.log("New PUT of resource "+game.name);
	
});

app.put("/api/sandbox/games", (req,res) =>{
	res.send("Operation not permitted.");
});

app.delete("/api/sandbox/games", (req,res) =>{
	games = [];
	console.log("You DELETED all games :(");
	res.send("You DELETED all games :(");
});

app.delete("/api/sandbox/games/:name", (req,res) =>{
	var name = req.params.name;
	var aux = null;
	for (var i = 0; i < games.length; i++) {
		if (games[i].name == name){
			aux = games[i];
			games.splice(i,1);
			res.send("You deleted the game successfully.");
		}
	}
	if (aux == null) {
		res.sendStatus(404);
	}
	console.log("You deleted the game successfully.");
	
});


//###########################################################
//###########################################################


//Código Víctor
var pirates = [];

app.get("/api/sandbox/pirates", function(req,res){
	console.log("New GET of all resources.");
	res.send(pirates);
});

app.get("/api/sandbox/pirates/:name", function(req, res){

	/*var name = req.params.name;
	var aux= Array.contains(pirates, name);
	console.log("New GET of resource" + name);
	if(aux == true){
		res.send(pirates[pirate]);
	}else{
		res.send("404");
	}*/
	var name = req.params.name;
	var aux = null;
	for (var i = 0; i < pirates.length; i++) {
		if (pirates[i].name == name){
			aux = pirates[i];
			res.send(aux);
		}
	}
	if (aux == null) {
		res.sendStatus(404);
	}
	console.log("New GET of resource "+name);


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
	res.send("");
});

app.put("/api/sandbox/pirates/:name", function(req,res){
	/*var name = req.params.name;
	var pirate = req.body;
	var aux= Array.contains(pirates, name);
	if(aux==true){
		pirates[name] = pirate;
	}else{
		res.send("404");
	}
	
	console.log("New PUT of resource "+pirate.name);
	res.sendStatus(200);*/

	var pirate = req.body;
	var aux = null;
	for (var i = 0; i < pirates.length; i++) {
		if (pirates[i].name == req.params.name) {
			aux = pirates[i];
			aux.name = pirate.name;
			res.sendStatus(200);
		}
	}
	if (aux == null) {
		res.sendStatus(404);
	}
	console.log("New PUT of resource "+pirate.name);
});

app.put("/api/sandbox/pirates", function(req,res){
	res.send("¿Qué tramas, moreno?");
});

app.delete("/api/sandbox/pirates", function(req,res){
	pirates = [];
	console.log(" You DELETED all pirates ");
	res.sendStatus(200);
});

app.delete("/api/sandbox/pirates/:name", function(req,res){
	/*var name = req.params.name;
	var aux= Array.contains(pirates, name);
	if(aux==true){
		pirates.splice(0,name);
	}else{
		res.send("404");
	} 
	console.log("You deleted the pirate:"+ name +"successfully.");
	res.sendStatus(200);*/

	var name = req.params.name;
	var aux = null;
	for (var i = 0; i < pirates.length; i++) {
		if (pirates[i].name == name){
			aux = pirates[i];
			pirates.splice(i,1);
			res.send("You deleted the pirate successfully.");
		}
	}
	if (aux == null) {
		res.sendStatus(404);
	}
	console.log("You deleted the pirate successfully.");


});


app.listen(p);    