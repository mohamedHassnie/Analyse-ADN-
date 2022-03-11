const mongoose = require("mongoose");

user = new mongoose.Schema({
  Name: {
    type: String,
  },
  age: {
    type: String,
  },
  ID_password: {
    type: String,
  },
  Nationality: {
    type: String,
  },
  Gender: {
    type: String,
  },
  Date_of_birth: {
    type: Date,
  },
  Email_address: { type: String },
  Contact_number: { type: String },
  Physical_Address: { type: String },
  Contact_number: { type: Number },
  Physical_Address: { type: String },

  Medical_Questions: [
    {
      Country_of_Origin: { type: String },
      Do_you_drink_Alcohol: { type: String },
      Have_you_ever_smoked: { type: String },
      Do_you_currently_smoke: { type: String },
    },
  ],
});

module.exports = user = mongoose.model("user", user);
