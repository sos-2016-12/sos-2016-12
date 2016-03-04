var express = require("express");
var app = express();
app.get("republican-stats",(req, res) function{
	res.write("https://en.wikipedia.org/wiki/List_of_countries_by_date_of_transition_to_republican_system_of_government");
	res.write("https://es.wikipedia.org/wiki/Anexo:Pa%C3%ADses_por_PIB_(PPA)_per_c%C3%A1pita");
	res.write("https://es.wikipedia.org/wiki/Anexo:Pa%C3%ADses_por_poblaci%C3%B3n");
}

app.listen(process.env.PORT);