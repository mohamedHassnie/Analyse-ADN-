const mongoose = require("mongoose");

AnalyseGenetique = new mongoose.Schema({
  USER_ID: {
    type: String,
  },
  USER_barcode: { type: String },
  ID: {
    type: String,
  },
  POS: {
    type: String,
  },

  chrom: {
    type: String,
  },
  TYPE: {
    type: String,
  },
});
module.exports = AnalyseGenetique = mongoose.model(
  "AnalyseGenetique",
  AnalyseGenetique
);
