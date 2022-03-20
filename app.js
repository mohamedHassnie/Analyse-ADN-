const express = require("express");
const app = express();
const upload = require("express-fileupload");

const multer = require("multer");
const bodyParser = require("body-parser");
require("./config/database");
AnalyseGenetique = require("./models/AnalyseGenetique");
const User = require("./models/user");
const authRoutes = require("./routes/authentication");
const analyseRoutes = require("./routes/analyse");

const PORT = 3017;

var fs = require("fs");
const cors = require("cors");
app.use(cors({ origin: true }));
app.use(upload({ limit: "5mb" }));
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
//var userdata = fs
// .readFileSync("Medical_questionnaire_Livewellgx.csv")
// .toLocaleString();
//var rows = userdata.split("\n"); // SPLIT ROWS
//console.log(rows);

//console.log(rows[8].split(";")[1]);
app.use(bodyParser.json());
app.use(authRoutes);
app.use(analyseRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: { status: err.status || 500, message: err.message } });
});

app.listen(PORT, () => {
  console.log("THIS SERVER IS RUNING ON PORT: " + PORT);
});
