var express = require("express");

var app = express();

app.use("/about",express.static(__dirname+"/static"));

app.listen(process.env.PORT);