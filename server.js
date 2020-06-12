const express = require("express");
const bodyParser = require("body-parser");
const user = require("./app/routes/user"); 
const InitiateMongoServer = require("./app/config/db");
const mongoose = require('mongoose');
const path = require('path');


InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

require('./app/routes/web.routes.js')(app);
require('./app/routes/puntuaciones.routes.js')(app);


mongoose.Promise = global.Promise;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/api", (req, res) => {
  res.json({ message: "API Working" });
});


/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);


app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});



