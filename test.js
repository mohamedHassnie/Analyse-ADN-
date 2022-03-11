const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./config/database");
AnalyseGenetique = require("./models/AnalyseGenetique");
const User = require("./models/user");

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
const xlsx = require("xlsx");
var workbook = xlsx.readFile("uploads/Medical-questionnaire_Livewellgx.xlsx");
const sheet_name_list = workbook.SheetNames;
var data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);
var data5 = JSON.stringify(data[5]);
//console.log("--------", data[2].__EMPTY);
console.log(data5);
app.post("/Adduser", async (req, res) => {
  let user = await User.create({
    Name: data[3].__EMPTY,
    age: data[4].__EMPTY,
    ID_password: data[5].__EMPTY,
    Nationality: data[6].__EMPTY,
    Gender: data[7].__EMPTY,
    Date_of_birth: data[8].__EMPTY,
    Email_address: data[9].__EMPTY,
    Contact_number: data[10].__EMPTY,
    Physical_Address: data[11].__EMPTY,
    Country_of_Origin: data[12].__EMPTY,
    Do_you_drink_Alcohol: data[13].__EMPTY,
    Have_you_ever_smoked: data[14].__EMPTY,
    Do_you_currently_smoke: data[15].__EMPTY,
  });
  console.log(user);
  console.log(data[13]);
  var myInterface = readline.createInterface({
    input: fs.createReadStream("uploads/txt.vcf"),
  });
  var lineno = 0;
  myInterface.on("line", async (item) => {
    if (lineno > 29) {
      var x = item.split("\t")[9];
      if (x.match("0/0:[1-14]*")) {
        console.log("ref,ref : ", x);
        await AnalyseGenetique.create({
          USER_ID: User._id,
          chromosome1: {
            ID: item.split("\t")[1],
            POS: item.split("\t")[2],
            REF: item.split("\t")[3],
            RES: item.split("\t")[9],
            TYPE: 1,
          },
        });
      } else if (x.match("0/1:[1-14]*")) {
        console.log("ref,alt : ", x);
        await AnalyseGenetique.create({
          USER_ID: User._id,
          chromosome2: {
            ID: item.split("\t")[1],
            POS: item.split("\t")[2],
            REF: item.split("\t")[3],
            RES: item.split("\t")[9],
            TYPE: 2,
          },
        });
      } else if (x.match("^1/1:[1-14]*")) {
        console.log("alt,alt : ", x);
        await AnalyseGenetique.create({
          USER_ID: User._id,
          chromosome3: {
            ID: item.split("\t")[1],
            POS: item.split("\t")[2],
            REF: item.split("\t")[3],
            RES: item.split("\t")[9],
            TYPE: 3,
          },
        });
      }
    }
    lineno++;
  });
  return res.json({ status: "OK", id: user._id });
});

app.listen(3016, () => {
  console.log("THIS SERVER IS RUNING ON PORTS");
});
