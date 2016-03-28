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


//Codigo Ale API de prueba (games) ###############################################


var games = [];

app.get("/api-test/games/loadInitialData", (req,res) =>{
	games = [{ name : "cod", PEGI : "18"},{ name : "GTA", PEGI : "18"}];
	console.log("2 elements initialized.");
	res.sendStatus(201);
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
	res.sendStatus(201);
});

app.post("/api/sandbox/games/:name", (req,res) =>{
	res.sendStatus(405);
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
	res.sendStatus(405);
});

app.delete("/api/sandbox/games", (req,res) =>{
	games = [];
	console.log("You DELETED all games :(");
	res.send(200);
});

app.delete("/api/sandbox/games/:name", (req,res) =>{
	var name = req.params.name;
	var aux = null;
	for (var i = 0; i < games.length; i++) {
		if (games[i].name == name){
			aux = games[i];
			games.splice(i,1);
			res.send(200);
		}
	}
	if (aux == null) {
		res.sendStatus(404);
	}
	console.log("You deleted the game successfully.");
	
});

// Codigo de Ale API principal (death-penalty-stats)

var death_penalty_stats = [];

app.get("/api/v1/death_penalty_stats/loadInitialData", (req,res) =>{
	games = [{ country : "SPAIN", abolition_year : 1995, for_all_crimes : "yes", murder_rate_per_100k_people : 0.8},
	{ country : "GERMANY", abolition_year : 1987, for_all_crimes : "yes", murder_rate_per_100k_people : 0.8},
	{ country : "PERU", abolition_year : 1979, for_all_crimes : "no", murder_rate_per_100k_people : 9.6},
	{ country : "TURKEY", abolition_year : 1984, for_all_crimes : "no", murder_rate_per_100k_people : 2.6},
	{ country : "SWEDEN", abolition_year : 1972, for_all_crimes : "yes", murder_rate_per_100k_people : 0.7}];
	console.log("5 elements initialized.");
	res.sendStatus(201);
});

app.get("/api/v1/death_penalty_stats", (req,res) =>{
	console.log("New GET of all resources.");
	res.send(games);
});

app.get("/api/v1/death_penalty_stats/:country", (req,res) =>{
	var country = req.params.country;
	var aux = null;
	for (var i = 0; i < death_penalty_stats.length; i++) {
		if (death_penalty_stats[i].country == country){
			aux = death_penalty_stats[i];
			res.send(aux);
		}
	}
	if (aux == null) {
		res.sendStatus(404);
	}
	console.log("New GET of resource "+country);
	
});

app.post("/api/v1/death_penalty_stats", (req,res) =>{
	var stat = req.body;
	death_penalty_stats.push(stat);
	console.log("New POST of resource "+stat.country);
	res.sendStatus(201);
});

app.post("/api/v1/death_penalty_stats/:country", (req,res) =>{
	res.sendStatus(405);
});

app.put("/api/v1/death_penalty_stats/:country", (req,res) =>{
	var stat = req.body;
	var aux = null;
	for (var i = 0; i < death_penalty_stats.length; i++) {
		if (death_penalty_stats[i].country == req.params.country) {
			aux = death_penalty_stats[i];
			aux.country = stat.country;
			aux.abolition_year = stat.abolition_year;
			aux.for_all_crimes = stat.for_all_crimes;
			aux.murder_rate_per_100k_people = murder_rate_per_100k_people;
			res.sendStatus(200);
		}
	}
	if (aux == null) {
		res.sendStatus(404);
	}
	console.log("New PUT of resource "+stat.country);
	
});

app.put("/api/v1/death_penalty_stats", (req,res) =>{
	res.sendStatus(405);
});

app.delete("/api/v1/death_penalty_stats", (req,res) =>{
	death_penalty_stats = [];
	console.log("You DELETED all statistics :(");
	res.send(200);
});

app.delete("/api/v1/death_penalty_stats/:country", (req,res) =>{
	var country = req.params.country;
	var aux = null;
	for (var i = 0; i < death_penalty_stats.length; i++) {
		if (death_penalty_stats[i].country == country){
			aux = death_penalty_stats[i];
			death_penalty_stats.splice(i,1);
			res.send(200);
		}
	}
	if (aux == null) {
		res.sendStatus(404);
	}
	console.log("You deleted the country's statistics successfully.");
	
});

// //#####################################################
// //#####################################################



var republican_stats = [];

app.get("/api/v1/republican_stats/loadInitialData", (req,res) =>{
	
	countries = [{ country : "CHILE", year : 1818, gdppc : 23556, population : 18192000},
	{ country : "SWITZERLAND", year : 1648, gdppc : 58730, population : 8362000},
	{ country : "PARAGUAY", year : 1811, gdppc : 5294, population : 6855000},];
	console.log("3 elements initialized.");
	res.sendStatus(201);
});

app.get("/api/v1/republican_stats", (req,res) =>{
	console.log("New GET of all resources.");
	res.send(countries);
});

app.get("/api/v1/republican_stats/:country", (req,res) =>{
	var country = req.params.country;
	var aux = null;
	for (var i = 0; i < republican_stats.length; i++) {
		if (republican_stats[i].country == country){
			aux = republican_stats[i];
			res.send(aux);
		}
	}
	if (aux == null) {
		res.sendStatus(404);
	}
	console.log("New GET of resource "+country);
	
});

app.post("/api/v1/republican_stats", (req,res) =>{
	var stat = req.body;
	republican_stats.push(stat);
	console.log("New POST of resource "+stat.country);
	res.sendStatus(201);
});

app.post("/api/v1/republican_stats/:country", (req,res) =>{
	res.sendStatus(405);
});

app.put("/api/v1/republican_stats/:country", (req,res) =>{
	var stat = req.body;
	var aux = null;
	for (var i = 0; i < republican_stats.length; i++) {
		if (republican_stats[i].country == req.params.country) {
			aux = republican_stats[i];
			aux.country = stat.country;
			aux.year = stat.year;
			aux.gdppc = stat.gdppc;
			aux.population = population;
			res.sendStatus(200);
		}
	}
	if (aux == null) {
		res.sendStatus(404);
	}
	console.log("New PUT of resource "+stat.country);
	
});

app.put("/api/v1/republican_stats", (req,res) =>{
	res.sendStatus(405);
});

app.delete("/api/v1/republican_stats", (req,res) =>{
	republican_stats = [];
	console.log("You DELETED all statistics :(");
	res.send(200);
});

app.delete("/api/v1/republican_stats/:country", (req,res) =>{
	var country = req.params.country;
	var aux = null;
	for (var i = 0; i < republican_stats.length; i++) {
		if (republican_stats[i].country == country){
			aux = republican_stats[i];
			republican_stats(i,1);
			res.send(200);
		}
	}
	if (aux == null) {
		res.sendStatus(404);
	}
	console.log("You deleted the country's statistics successfully.");
	
});




//Código Víctor API prueba (pirates)
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
	res.sendStatus(403);
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
	res.sendStatus(403);
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