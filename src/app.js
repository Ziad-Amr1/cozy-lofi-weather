const express = require("express");
const app = express();
const port = 3000;
require('dotenv').config();
const hbs = require("hbs");
const request = require("request");
const path = require("path");
const weatherHandler = require("./weatherhandler");
app.use(express.static(path.join(__dirname, "../public")));
const viewsDir = path.join(__dirname, "../public/views");

app.set("view engine", "hbs");
app.set("views", viewsDir);


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/weather", (req, res) => {
  res.render("weather");
});

app.get("/api/weather", weatherHandler);


app.use((req, res) => {
  res.status(404).send("404 page not found");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}/weather?city=toronto`);
  console.log("Press CTRL + C to stop the server");
});

