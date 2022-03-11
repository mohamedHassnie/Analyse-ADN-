"use strict";
const express = require("express");
const app = express();
const multer = require("multer");
const bodyParser = require("body-parser");
AnalyseGenetique = require("./models/AnalyseGenetique");
var fs = require("fs");
var readline = require("readline");
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(
    '<form action="fileupload" method="post" enctype="multipart/form-data"><br>'
  );
  res.write('<input type="file" name="filetoupload"><br><br><br>');
  res.write('<input type="submit" value="envoyer">');
  res.write("</form>");
  return res.end();
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, originalname);
  },
});
const upload1 = multer({ storage });
app.post("/telecharger", upload1.single("filetoupload"), (req, res) => {
  return res.json({ status: "OK" });
});

var myInterface = readline.createInterface({
  input: fs.createReadStream("uploads/txt.vcf"),
});

var lineno = 0;
myInterface.on("line", function (line) {
  if (lineno > 29) {
    console.log(lineno);

    var Res = line.split("\t");

    var i = Res[3];
    var j = Res[4];
    var y = Res[1];
    var t = Res[2];
    var x = Res[9];

    if (x.match("^0/0:[1-14]*")) {
      var chromosome1 = [];
      chromosome1.push(y, t, i, i);
      console.log("ref/ref", chromosome1);
    } else if (x.match("^0/1:[1-14]*")) {
      var chromosome2 = [];
      chromosome2.push(y, t, i, j);
      console.log("ref/alt", chromosome2);
    } else if (x.match("^1/1:[1-14]*")) {
      var chromosome3 = [];
      chromosome3.push((y, t, j, j));
      console.log("ref/alt", chromosome3);
    }
    var chromosome1 = JSON.stringify(Object.assign({}, chromosome1));
    var chromosome2 = JSON.stringify(Object.assign({}, chromosome1));
    var chromosome3 = JSON.stringify(Object.assign({}, chromosome1));
    AnalyseGenetique.create(chromosome1, chromosome2, chromosome3);

    lineno++;
  }
});
app.listen(3016, () => {
  console.log("THIS SERVER IS RUNING ON PORTS");
});
