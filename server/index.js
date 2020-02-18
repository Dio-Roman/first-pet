const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
// const https = require("https");
// const path = require("path");
// const router = express.Router();
const app = express();

// for PROD:
mongoose.connect("mongodb://roman:petcoon8@ds261377.mlab.com:61377/firstpet", { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connect("http://localhost:3001", { useNewUrlParser: true })

// const dbase
//  = client.

app.use(bodyParser.json());
app.use("/", require("./api"));
// app.use(bodyParser.urlencoded({ extended: false }));

// router.get("/api", (req, res) => {
//   res.send({ method: "GET" });
// });
app.use(async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.listen(3000, () => console.log("Listening on port 3000"));
