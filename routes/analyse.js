const express = require("express");
const createError = require("http-errors");
const User = require("../models/user");
const readline = require("linebyline");
const fs = require("fs");
const util = require("util");

const path = require("path");
const router = express.Router();
const { success, info, error } = require("consola");
const { v4: uuidv4 } = require("uuid");

const uploadFileToServerStorage = async (file, fileName) => {
  file.mv(`./uploads/${fileName}`, async (err, data) => {
    if (err) error({ message: err.message, badge: true });
    else {
      console.log(file);
      success({ message: `${fileName} uploaded successfully`, badge: true });
    }
  });
};

router.post("/api/analyse", async (req, res, next) => {
  const { chromosomeFile, userFile } = req.files;
  try {
    const userFileId = uuidv4();
    const chromFileId = uuidv4();
    await uploadFileToServerStorage(
      chromosomeFile,
      "chrom-" + chromFileId + ".vcf"
    );
    await uploadFileToServerStorage(userFile, "user-" + userFileId + ".csv");

    const FILE_USER_PATH = path.join(
      __dirname,
      "../uploads/",
      "user-" + userFileId + ".csv"
    );
    const FILE_CHROMO_USER_PATH = path.join(
      __dirname,
      "../uploads/",
      "chrom-" + chromFileId + ".vcf"
    );
    console.log("FILE_USER_PATH", await fs.promises.access(FILE_USER_PATH));
    //Convert fs.readFile into Promise version of same
    const readFile = util.promisify(fs.readFile);
    const userdata = readFile(FILE_USER_PATH, "utf8").toLocaleString();
    const rows = userdata.split("\n"); // SPLIT ROWS
    const Barcode = rows[0].split(";")[1];
    const Name = rows[4].split(";")[1];
    const ID_Passport = rows[5].split(";")[1];
    const Nationality = rows[6].split(";")[1];
    const Gender = rows[7].split(";")[1];
    //Date = rows[8].split(";")[1];
    const Email_address = rows[9].split(";")[1];
    const Contact_number = rows[8].split(";")[1];
    let user = await User.create({
      Barcode,
      Name,
      ID_Passport,
      Nationality,
      Gender,
      Email_address,
      Contact_number,
    });
    let normalizedCase = {
      CASE00: [],
      CASE01: [],
      CASE11: [],
    };
    rl = readline(FILE_CHROMO_USER_PATH);
    rl.on("line", async (line, lineCount, byteCount) => {
      const HEADER_SIZE = 29;
      const CASE00 = "0/0:[1-14]*";
      const CASE01 = "0/1:[1-14]*";
      const CASE11 = "1/1:[1-14]*";

      if (lineCount > HEADER_SIZE) {
        console.log("Processing line number: ", lineCount);
        let qualityScore = line.split("\t")[9];
        if (qualityScore.match(CASE00)) {
          normalizedCase.CASE00.push({
            USER_ID: user._id,
            ID: line.split("\t")[2],
            POS: line.split("\t")[1],
            chrom: line.split("\t")[3] + " | " + line.split("\t")[3],
          });
        } else if (qualityScore.match(CASE01)) {
          normalizedCase.CASE01.push({
            USER_ID: user._id,
            ID: line.split("\t")[2],
            POS: line.split("\t")[1],
            chrom: line.split("\t")[4] + " | " + line.split("\t")[4],
          });
        } else if (qualityScore.match(CASE11)) {
          normalizedCase.CASE11.push({
            USER_ID: user._id,
            ID: line.split("\t")[2],
            POS: line.split("\t")[1],
            chrom: line.split("\t")[3] + " | " + line.split("\t")[4],
          });
        } else {
          console.log("Invalid qualityScore");
        }
      }
    })
      .on("error", function (e) {
        console.log("error: ", e);
        next(e);
      })
      .on("end", async function () {
        const DELAY = 1000;
        function secondsToTime(e) {
          var h = Math.floor(e / 3600)
              .toString()
              .padStart(2, "0"),
            m = Math.floor((e % 3600) / 60)
              .toString()
              .padStart(2, "0"),
            s = Math.floor(e % 60)
              .toString()
              .padStart(2, "0");

          return h + ":" + m + ":" + s;
        }
        function writeToDatabase(CASEXX, type) {
          console.log(
            `Saving ${normalizedCase[CASEXX].length} items to ${CASEXX} Database`
          );
          for (let i = 1; i <= normalizedCase[CASEXX].length; i++) {
            setTimeout(async function () {
              success({
                message: `Progress: ${i} item of ${
                  normalizedCase[CASEXX].length
                } || ${((i * 100) / normalizedCase[CASEXX].length).toFixed(
                  1
                )} % || estimated time: ${secondsToTime(
                  (DELAY * normalizedCase[CASEXX].length - DELAY * i) / 1000
                )}`,
                badge: true,
              });
              await AnalyseGenetique.create({
                USER_ID: normalizedCase[CASEXX][i - 1].USER_ID,
                ID: normalizedCase[CASEXX][i - 1].ID,
                POS: normalizedCase[CASEXX][i - 1].POS,
                chrom: normalizedCase[CASEXX][i - 1].chrom,
                TYPE: type,
              });
            }, DELAY * i);
          }
        }

        function printReport(time) {
          setTimeout(
            () =>
              info({
                message: `Result: Type 0: ${normalizedCase.CASE00.length} || Type 1: ${normalizedCase.CASE01.length} || Type 2: ${normalizedCase.CASE11.length}`,
                badge: true,
              }),
            time
          );
        }

        writeToDatabase("CASE00", 0);
        writeToDatabase("CASE01", 1);
        writeToDatabase("CASE11", 2);
        printReport(3000);
      });

    return res.json({
      status: `Analyse data of user: started successfully`,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
