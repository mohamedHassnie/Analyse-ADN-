"use strict";
const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./config/database");
AnalyseGenetique = require("./models/AnalyseGenetique");

var fs = require("fs");
var readline = require("readline");

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

app.use(cors);
app.use(bodyParser.json());
/*
var str2json = require("string-to-json");
fs.readFile("uploads/txt.vcf", "utf8", (err, data) => {
});*/
var myInterface = readline.createInterface({
  //input: fs.createReadStream("uploads/chrom1.vcf"),
  input: fs.createReadStream("uploads/txt.vcf"),
});
const chromosome = require("./models/chromsome");

var lineno = 0;
myInterface.on("line", async (item) => {
  if (lineno > 29) {
    var x = item.split("\t")[9];
    if (x.match("0/0:[1-14]*")) {
      console.log("ref,ref : ", x);
      await chromosome.create({
        ID: item.split("\t")[1],
        POS: item.split("\t")[2],
        REF: item.split("\t")[3],
        RES: item.split("\t")[9],
        TYPE: 1,
      });
    } else if (x.match("0/1:[1-14]*")) {
      console.log("ref,alt : ", x);
      await chromosome.create({
        ID: item.split("\t")[1],
        POS: item.split("\t")[2],
        REF: item.split("\t")[3],
        RES: item.split("\t")[9],
        TYPE: 2,
      });
    } else if (x.match("^1/1:[1-14]*")) {
      console.log("alt,alt : ", x);
      await chromosome.create({
        ID: item.split("\t")[1],
        POS: item.split("\t")[2],
        REF: item.split("\t")[3],
        RES: item.split("\t")[9],
        TYPE: 3,
      });
    }
  }
  lineno++;
});

app.listen(3016, () => {
  console.log("THIS SERVER IS RUNING ON PORTS");
});
