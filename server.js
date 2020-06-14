const express = require("express");
const user = require("./app/routes/user"); 
const InitiateMongoServer = require("./app/config/db");
const mongoose = require('mongoose');
const path = require('path');


InitiateMongoServer();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded());
app.use(express.json({limit:"10mb"}));
require('./app/routes/web.routes.js')(app);
require('./app/routes/puntuaciones.routes.js')(app);


mongoose.Promise = global.Promise;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/api", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/user", user);


app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});



