const mongoose = require("mongoose");

AnalyseGenetique = new mongoose.Schema({
  USER_ID: { type: String },
  chromosome: [
    {
      ID: {
        type: String,
      },
      POS: {
        type: String,
      },

      REF: {
        type: String,
      },
      FORMAT: {
        type: String,
      },
      RES: {
        type: String,
      },
      TYPE: {
        type: String,
      },
    },
  ],
});
module.exports = AnalyseGenetique = mongoose.model(
  "AnalyseGenetique",
  AnalyseGenetique
);
