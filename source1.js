var express = require("express");

var app = express();

app.get("/about/death-penalty-stats",(req,res) => {

	res.write("\n");
	res.write(" <html><body><a src="http://www.ub.edu/penal/historia/PdeM/listapaises.htm">death-penalty-stats</a></body></html> \n");
	res.end();

})

app.listen(process.env.PORT);