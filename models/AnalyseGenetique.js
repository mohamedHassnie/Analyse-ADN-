const mongoose = require("mongoose");

AnalyseGenetique = new mongoose.Schema({
  chromosome: [
    {
      /*USER_ID: {
        type: String,
      },*/
      ID: {
        type: String,
      },
      POS: {
        type: String,
      },

      REF: {
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
