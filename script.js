"use strict";
const express = require("express");
const app = express();
require("./config/database");
var xlsx = require("xlsx");
var Workbook = require("workbook");

var wb = xlsx.readFile("uploads/Medical questionnaire_Livewellgx.xlsx");

var Y = wb.Sheets[SheetName];
var data = xlsx.utils.sheet_to_json(Y);
console.log(data);

app.listen(3016, () => {
  console.log("THIS SERVER IS RUNING ON PORTS");
});
