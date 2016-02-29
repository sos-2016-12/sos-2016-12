var express = require("express");

var app = express();

app.get("/about",(req,res) => {

	res.write("Group Members: \n");
	res.write(" - Alejandro Miguel Ruiz Rodriguez \n");
	res.write(" - Victor Alejandro Segura Segura \n");
	res.write("Our app is a representation of the use of Death Penalty \n and what countries switched to a Democratic Government in the world. \n");
	res.end();

})

app.listen(process.env.PORT);