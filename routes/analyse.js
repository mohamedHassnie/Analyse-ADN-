const express = require("express");
const createError = require("http-errors");
const User = require("../models/user");
const readline = require("linebyline");
const orgreadline = require("readline");
const fs = require("fs");
const util = require("util");
const path = require("path");
const router = express.Router();
const { success, info, error } = require("consola");
const { v4: uuidv4 } = require("uuid");

// const uploadFileToServerStorage = async (file, fileName, callback) => {
//   file.mv(`./uploads/${fileName}`, async (err, data) => {
//     if (err) error({ message: err.message, badge: true });
//     else {
//       success({ message: `${fileName} uploaded successfully`, badge: true });
//       callback();
//     }
//   });
// };
const uploadFileToServerStorage = (file, fileName, callback) => {
  return new Promise((resolve, reject) => {
    file.mv(`./uploads/${fileName}`, async (err, data) => {
      if (err) reject(err.message);
      else {
        success({ message: `${fileName} uploaded successfully`, badge: true });
        resolve();
      }
    });
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

    function countFileLines(filePath) {
      return new Promise((resolve, reject) => {
        let lineCount = 0;
        fs.createReadStream(filePath)
          .on("data", (buffer) => {
            let idx = -1;
            lineCount--; // Because the loop will run once for idx=-1
            do {
              idx = buffer.indexOf(10, idx + 1);
              lineCount++;
            } while (idx !== -1);
          })
          .on("end", () => {
            resolve(lineCount);
          })
          .on("error", reject);
      });
    }
    const fileSize = await countFileLines(FILE_CHROMO_USER_PATH);
    //Convert fs.readFile into Promise version of same
    /* XLSX = require('xlsx');

    const workBook = XLSX.readFile(inputFilename);
    XLSX.writeFile(workBook, outputFilename, { bookType: "csv" });*/
    const userdata = fs.readFileSync(FILE_USER_PATH).toLocaleString();
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
      CASENS: [],
    };
    rl = readline(FILE_CHROMO_USER_PATH);
    rl.on("line", async (line, lineCount, byteCount) => {
      const HEADER = 0;
      const CASE00 = "0/0:[1-14]*";
      const CASE01 = "0/1:[1-14]*";
      const CASE11 = "1/1:[1-14]*";

      if (line.split("\t")[0][0] !== "#") {
        console.log(
          "Processing line number: ",
          lineCount,
          "of ",
          fileSize,
          "| ",
          ((lineCount / fileSize) * 100).toFixed(2),
          "%"
        );
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
          // console.log("Invalid qualityScore");
          normalizedCase.CASENS.push({
            POS: line.split("\t")[1],
          });
        }
      }
    })
      .on("error", function (e) {
        console.log("error: ", e);
        next(e);
      })
      .on("end", async function () {
        const irl = orgreadline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        info({
          message: `Report: Type 0: ${normalizedCase.CASE00.length} | Type 1: ${normalizedCase.CASE01.length} | Type 2: ${normalizedCase.CASE11.length} | Type NS: ${normalizedCase.CASENS.length}`,
          badge: true,
        });
        irl.question("Do you want to continue? yes/no ", function (answer) {
          if (answer === "yes") {
            const DELAY = 50;
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

            writeToDatabase("CASE00", 0);
            writeToDatabase("CASE01", 1);
            writeToDatabase("CASE11", 2);
          } else {
            irl.close();
          }
        });
        irl.on("close", function () {
          console.log("\nOperation stopped by user");
          process.exit(0);
        });
      });

    return res.json({
      message: `Analyse data of file :${
        (chromosomeFile, "chrom-" + chromFileId + ".vcf")
      } started successfully`,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
