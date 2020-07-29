var express = require("express");
const Config = require("./config.js");

var app = express();
app.use("/", Config.dashboard);

var httpServer = require("http").createServer(app);
httpServer.listen(process.env.PORT || 4040)

console.log("RUNNING ON PORT : " + process.env.PORT);