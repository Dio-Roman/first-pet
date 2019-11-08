const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
// const https = require("https");
// const path = require("path");
// const router = express.Router();
const app = express();

mongoose.connect("mongodb://roman:petcoon8@ds261377.mlab.com:61377/firstpet", { useNewUrlParser: true })

// const dbase
//  = client.

app.use(bodyParser.json());
app.use("/", require("./api"));
// app.use(bodyParser.urlencoded({ extended: false }));

// router.get("/api", (req, res) => {
//   res.send({ method: "GET" });
// });


app.listen(3000, () => console.log("Listening on port 3000"));
