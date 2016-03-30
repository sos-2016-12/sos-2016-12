var pirates = [];

module.exports.getResources = function(req,res){
	console.log("New GET of all resources.");
	res.send(pirates);
}

module.exports.getPirate =  function(req, res){

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


}

module.exports.getLoadInitialData = function(req,res){
	pirates = [{ name : "Black Bart"},{ name : "Long Ben"},{ name : "Anne Bonny"}];
	console.log("3 elements initialized.");
	res.send(200);
}

module.exports.getPost = function(req, res){
	var pirate = req.body;
	pirates.push(pirate);
	console.log("New POST of resource " + pirate.name);
	res.sendStatus(200);
}

module.exports.getPut = function(req,res){
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
}

module.exports.getDelete = function(req,res){
	pirates = [];
	console.log(" You DELETED all pirates ");
	res.sendStatus(200);
}

module.exports.getDeleteOne = function(req,res){
	

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


}