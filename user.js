const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
//require("./config/database");
//AnalyseGenetique = require("./models/AnalyseGenetique");

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
var XLSX = require("xlsx");

const workbook = XLSX.readFile("uploads/Medical questionnaire_Livewellgx.xlsx");
const sheet_name_list = workbook.SheetNames;
var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);
var data5 = JSON.stringify(data[5]);
console.log(data5);

//console.log("--------", data[1].__EMPTY);

app.listen(3016, () => {
  console.log("THIS SERVER IS RUNING ON PORTS");
});
