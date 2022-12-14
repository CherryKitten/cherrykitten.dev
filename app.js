const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const mainRoutes = require("./routes/main");

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const hcaptchasecretkey = process.env.HCAPTCHA_SECRET_KEY;

app.use(express.static(path.join(__dirname, "public")));
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "pug");

mainRoutes(app, hcaptchasecretkey);

app.all("*", (req, res) => {
  res.render("404", { url: req.hostname + req.originalUrl });
});

app.listen(port, hostname, (err) => {
  if (err) console.log(err);
  console.log(`App listening on http://${hostname}:${port}`);
});
