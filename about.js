var express = require("express");

var app = express();

app.get("/about",(req,res) => {

	res.write("Group Members: \n");
	res.write(" - Alejandro Miguel Ruiz Rodriguez \n");
	res.write(" - Victor Alejandro Segura Segura \n \n");
	res.write(" Our app is a representation of the use of Death Penalty \n and what countries switched to a Democratic Government in the world. \n");
	res.end();

})

app.get("/about/death-penalty-stats",(req,res) => {

	res.write("\n");
	res.write(" <html><body><a>http://www.ub.edu/penal/historia/PdeM/listapaises.htm</a> <\n>");
	res.write(" <a>https://en.wikipedia.org/wiki/List_of_countries_by_intentional_homicide_rate</a></body></html> \n");
	res.end();

})



app.listen(process.env.PORT);