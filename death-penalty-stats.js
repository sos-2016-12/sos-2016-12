var express = require("express");

var app = express();

app.get("/about/death-penalty-stats",(req,res) => {

	res.write("\n");
	res.write(" http://www.ub.edu/penal/historia/PdeM/listapaises.htm" \n");
	res.end();

})

app.listen(process.env.PORT);