var express = require("express");

var app = express();

app.get("/about",(req,res) => {

	res.write("\nGroup Members: \n");
	res.write(" - Alejandro Miguel Ruiz Rodriguez \n");
	res.write(" - Victor Alejandro Segura Segura \n");
	res.write(" - Matthias Rein \n \n");
	res.write(" Our app is a representation of the use of Death Penalty, what \n countries switched to a Democratic Government \n and the effects of earthquakes in different countries of the world. \n");
	res.end();

})

app.get("/about/death-penalty-stats",(req,res) => {

	res.write("\n");
	res.write(" - Death penalty abolition in different countries: http://www.ub.edu/penal/historia/PdeM/listapaises.htm \n");
	res.write(" - Homicide rate in the world: https://en.wikipedia.org/wiki/List_of_countries_by_intentional_homicide_rate \n");
	res.end();

})

app.get("/about/republican-stats",(req,res) => {

	res.write("\n");
	res.write(" - List of countries by date of transition to republic: https://en.wikipedia.org/wiki/List_of_countries_by_date_of_transition_to_republican_system_of_government \n");
	res.write(" - GDP of countries per capita: https://es.wikipedia.org/wiki/Anexo:Pa%C3%ADses_por_PIB_(PPA)_per_c%C3%A1pita \n");
	res.write(" - Population of countries: https://es.wikipedia.org/wiki/Anexo:Pa%C3%ADses_por_poblaci%C3%B3n \n");
	res.end();

})

app.get("/about/earthquakes-stats",(req,res) => {

	res.write("\n");
	res.write(" - Earthquakes in the 21st century: https://es.wikipedia.org/wiki/Anexo:Terremotos_del_siglo_XXI \n");
	res.end();

})



app.listen(process.env.PORT);