
var republican_stats = [];

 module.exports.getLoadInitialData = (req,res) =>{
	
	republican_stats = [
	{ country : "switzerland", year : 1648, gdppc : 58730, population : 8362000},
	{ country : "paraguay", year : 1811, gdppc : 5294, population : 6855000},
	{ country : "argentina", year : 1816, gdppc : 22458, population : 43590000},
	{ country : "venezuela", year : 1819, gdppc : 13633, population : 31029000},
	{ country : "peru", year : 1824, gdppc : 11403, population : 31490000},
	{ country : "colombia", year : 1819, gdppc : 11284, population : 48782000},
	{ country : "panama", year : 1819, gdppc : 16993, population : 3816000}];


	console.log("6 elements initialized.");
	res.sendStatus(201);
}

module.exports.getResources = (req,res) =>{
	console.log("New GET of all resources.");
	res.send(republican_stats);
}

module.exports.getData = (req,res) =>{
	var data = req.params.data;
	var aux = null;
	var aux2= []
	if(isNaN(data)){
		for (var i = 0; i < republican_stats.length; i++) {
			if (republican_stats[i].country == data){
				aux = republican_stats[i];
				res.send(aux);
			}
		}
	}else{
		for (var i = 0; i < republican_stats.length; i++) {
			if (republican_stats[i].year == data){
				aux2.push(republican_stats[i]);
			}
		}
		if (aux2.length == 0){
			res.sendStatus(404);
		}
		res.send(aux2);
	}

	if (aux == null) {
		res.sendStatus(404);
	}
	console.log("New GET of resource ");
	
}

module.exports.getPost = (req,res) =>{
	var stat = req.body;
	republican_stats.push(stat);
	console.log("New POST of resource "+stat.country);
	res.sendStatus(201);
}

module.exports.getPostForbidden = (req,res) =>{
	res.sendStatus(405);
}

module.exports.getPut =  (req,res) =>{
	var stat = req.body;
	var aux = null;
	for (var i = 0; i < republican_stats.length; i++) {
		if (republican_stats[i].country == req.params.country) {
			aux = republican_stats[i];
			aux.country = stat.country;
			aux.year = stat.year;
			aux.gdppc = stat.gdppc;
			aux.population = stat.population;
			res.sendStatus(200);
		}
	}
	if (aux == null) {
		res.sendStatus(404);
	}

	console.log("New PUT of resource "+stat.country);
	
}

module.exports.getPutYear = (req,res) =>{
	var year = req.params.year;
	var country = req.params.country;

	var aux = null;
	if(isNaN(country)){
		for (var i = 0; i < republican_stats.length; i++) {
			if (republican_stats[i].country == country) {
				aux = republican_stats[i];
				aux.year = year;
				res.sendStatus(200);
			}
		}
	}
	if(aux == null) {
		res.sendStatus(404);
	}
	console.log("New PUT of resource "+stat.country);
	
}

module.exports.getPutForbidden =  (req,res) =>{
	res.sendStatus(405);
}

module.exports.getDelete = (req,res) =>{
	republican_stats = [];
	console.log("You DELETED all statistics");
	res.send(200);
}

module.exports.getDeleteOne = (req,res) =>{
	var country = req.params.country;
	var aux = null;
	for (var i = 0; i < republican_stats.length; i++) {
		if (republican_stats[i].country == country){
			aux = republican_stats[i];
			republican_stats.splice(i,1);
			res.send(200);
		}
	}
	if (aux == null) {
		res.sendStatus(404);
	}
	
	console.log("You deleted the country's statistics successfully.");
	
}


module.exports.getDataDouble = (res,req)=>{
	var country = req.params.country;
	var year = req.params.data;
	var aux= [];
	if(isNaN(country)){
		for (var i = 0; i < republican_stats.length; i++) {
			if (republican_stats[i].country == country){
				if(republican_stats[i].year == year ){
					aux.push(republican_stats[i]);
				}
			}
		}
		if (aux.length == 0){
				res.sendStatus(404);
		}	
		res.send(aux);
	}
	
	console.log("New GET of resource ");

}