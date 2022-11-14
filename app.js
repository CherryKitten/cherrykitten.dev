const path = require("path");
const express = require("express");
const app = express();
const mainRoutes = require("./routes/main.js");
require("dotenv").config();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.set("view engine", "pug");

mainRoutes(app);

app.listen(port, hostname, (err) => {
  if (err) console.log(err);
  console.log(`App listening on http://${hostname}/${port}`);
});
