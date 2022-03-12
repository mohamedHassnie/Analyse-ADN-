const express = require("express");
const app = express();
const multer = require("multer");
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

app.use(bodyParser.json());
const xlsx = require("xlsx");
var workbook = xlsx.readFile("");
const sheet_name_list = workbook.SheetNames;
var data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);
var data5 = JSON.stringify(data[21]);

//console.log("--------", data[2].__EMPTY);
console.log(data5);
app.post("/Adduser", async (req, res) => {
  let user = await User.create({
    Name: data[3].__EMPTY,
    ID_Passport: data[4].__EMPTY,
    Nationality: data[5].__EMPTY,
    Gender: data[6].__EMPTY,
    Date_of_birth: data[7].__EMPTY,
    Email_address: data[8].__EMPTY,
    Contact_number: data[9].__EMPTY,
    Physical_Address: data[10].__EMPTY,
    Medical_Questions: {
      Do_you_drink_Alcohol: {
        Country_of_Origin: data[12].__EMPTY,
        You: data[12].__EMPTY_1,
        Father: data[12 - 0].__EMPTY_2,
        MOther: data[12 - 1].__EMPTY_3,
      },
      Have_you_ever_smoked: {
        You: data[15].__EMPTY,
        Father: data[15 - 0].__EMPTY,
        MOther: data[15 - 1].__EMPTY,
      },
      Do_you_currently_smoke: {
        You: data[16].__EMPTY,
        Father: data[16 - 0].__EMPTY,
        MOther: data[16 - 1].__EMPTY,
      },
    },
    Family_medical_history: {
      Hypertension: {
        You: data[18].__EMPTY,
        MOther: data[18 - 1].__EMPTY,
        Father: data[18 - 2].__EMPTY,
        Child: data[18 - 3].__EMPTY,
      },

      Diabetes_TypeI: {
        You: data[19].__EMPTY,
        MOther: data[19].__EMPTY,
        Father: data[19].__EMPTY,
        Child: data[19].__EMPTY,
      },
      Diabetes_TypeII: {
        You: data[20].__EMPTY,
        MOther: data[20 - 1].__EMPTY,
        Father: data[20 - 2].__EMPTY,
        Child: data[20 - 3].__EMPTY,
      },
      Heart_disease: {
        You: data[21].__EMPTY,
        MOther: data[21 - 1].__EMPTY,
        Father: data[21].__EMPTY,
        Child: data[21].__EMPTY,
      },
      Cholesterol: {
        You: data[22].__EMPTY,
        MOther: data[22 - 1].__EMPTY,
        Father: data[22 - 2].__EMPTY,
        Child: data[22 - 3].__EMPTY,
      },
    },
    Family_Cancer_History: [
      {
        Breast_cancer: {
          You: data[24].__EMPTY,
          MOther: data[24 - 1].__EMPTY,
          Father: data[24 - 2].__EMPTY,
          Child: data[24 - 3].__EMPTY,
        },
        Colon_rectal_colorectal_cancer: {
          You: data[25].__EMPTY,
          MOther: data[25 - 1].__EMPTY,
          Father: data[25 - 2].__EMPTY,
          Child: data[25 - 3].__EMPTY,
        },
        Female_reproductive_cancer: {
          You: data[26].__EMPTY,
          MOther: data[26 - 1].__EMPTY,
          Father: data[26 - 2].__EMPTY,
          Child: data[26 - 3].__EMPTY,
        },
        Liver_cancer: {
          You: data[27].__EMPTY,
          MOther: data[27 - 1].__EMPTY,
          Father: data[27 - 2].__EMPTY,
          Child: data[27 - 3].__EMPTY,
        },
        Lung_cancer: {
          You: data[28 - 1].__EMPTY,
          MOther: data[28 - 2].__EMPTY,
          Father: data[28 - 3].__EMPTY,
          Child: data[28 - 3].__EMPTY,
        },

        Pancreatic_cancer: {
          You: data[29].__EMPTY,
          MOther: data[29 - 1].__EMPTY,
          Father: data[29 - 2].__EMPTY,
          Child: data[29 - 2].__EMPTY,
        },
        Prostate_cancer: {
          You: data[30].__EMPTY,
          MOther: data[30 - 1].__EMPTY,
          Father: data[30 - 2].__EMPTY,
          Child: data[30 - 2].__EMPTY,
        },

        Skin_cancer: {
          You: data[31].__EMPTY,
          MOther: data[31 - 1].__EMPTY,
          Father: data[31 - 2].__EMPTY,
          Child: data[31 - 3].__EMPTY,
        },
      },
    ],
    Reproductive_history: [
      {
        Polycystic_ovarian_syndrome: {
          You: data[33].__EMPTY,
          MOther: data[33 - 1].__EMPTY,
          Father: data[33 - 2].__EMPTY,
          Child: data[33 - 3].__EMPTY,
        },

        Endometriosis: {
          You: data[34].__EMPTY,
          MOther: data[34 - 1].__EMPTY,
          Father: data[34 - 2].__EMPTY,
          Child: data[34 - 3].__EMPTY,
        },
        Problems_falling_pregnant: {
          You: data[35].__EMPTY,
          MOther: data[35 - 1].__EMPTY,
          Father: data[35 - 2].__EMPTY,
          Child: data[35 - 3].__EMPTY,
        },
        Past_miscarriages: {
          You: data[36].__EMPTY,
          MOther: data[36 - 1].__EMPTY,
          Father: data[36 - 2].__EMPTY,
          Child: data[36 - 3].__EMPTY,
        },
        Currently_pregnant: {
          You: data[37].__EMPTY,
          MOther: data[37 - 1].__EMPTY,
          Father: data[37 - 2].__EMPTY,
          Child: data[37 - 3].__EMPTY,
        },
        Menopausal: {
          You: data[38].__EMPTY,
          MOther: data[38 - 1].__EMPTY,
          Father: data[38 - 2].__EMPTY,
          Child: data[38 - 3].__EMPTY,
        },
        Post_menopausal: {
          You: data[39].__EMPTY,
          MOther: data[39 - 1].__EMPTY,
          Father: data[39 - 2].__EMPTY,
          Child: data[39 - 3].__EMPTY,
        },
      },
    ],
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
          chromosome1: {
            USER_ID: User._id,
            ID: item.split("\t")[2],
            POS: item.split("\t")[1],
            REF: item.split("\t")[3],
            RES: item.split("\t")[9],
            TYPE: 1,
          },
        });
      } else if (x.match("0/1:[1-14]*")) {
        console.log("ref,alt : ", x);
        await AnalyseGenetique.create({
          chromosome2: {
            USER_ID: User._id,
            ID: item.split("\t")[2],
            POS: item.split("\t")[1],
            REF: item.split("\t")[3],
            RES: item.split("\t")[9],
            TYPE: 2,
          },
        });
      } else if (x.match("^1/1:[1-14]*")) {
        console.log("alt,alt : ", x);
        await AnalyseGenetique.create({
          chromosome3: {
            USER_ID: User._id,
            ID: item.split("\t")[2],
            POS: item.split("\t")[1],
            REF: item.split("\t")[3],
            RES: item.split("\t")[9],
            TYPE: 3,
          },
        });
      } else if (
        x.match("^0/0:0*") ||
        x.match("^1/1:0*") ||
        x.match("^1/0:0*")
      ) {
      }
      console.log("info:", 0);
    }
    lineno++;
  });
  return res.json({ status: "OK", id: user._id });
});

app.listen(3016, () => {
  console.log("THIS SERVER IS RUNING ON PORTS");
});
