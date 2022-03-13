const mongoose = require("mongoose");

user = new mongoose.Schema({
  Barcode: { type: Number },
  Product_selection: { type: String },
  Name: {
    type: String,
  },

  ID_Passport: {
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
  Physical_Address: { type: String },

  Medical_Questions: [
    {
      Country_of_Origin: {
        type: String,
      },
      Do_you_drink_Alcohol: {
        You: { type: String },
        Father: { type: String },
        MOther: { type: String },
      },
      Have_you_ever_smoked: {
        You: { type: String },
        Father: { type: String },
        MOther: { type: String },
      },
      Do_you_currently_smoke: {
        You: { type: String },
        Father: { type: String },
        MOther: { type: String },
      },
    },
  ],
  Family_medical_history: [
    {
      Hypertension: {
        You: { type: String },
        Father: { type: String },
        MOther: { type: String },
      },

      Diabetes_TypeI: {
        Breast_cancer: {
          You: { type: String },
          Father: { type: String },
          MOther: { type: String },
        },
      },
      Diabetes_TypeII: {
        Breast_cancer: {
          You: { type: String },
          Father: { type: String },
          MOther: { type: String },
        },
      },
      Heart_disease: {
        You: { type: String },
        Father: { type: String },
        MOther: { type: String },
      },
      Cholesterol: {
        You: { type: String },
        Father: { type: String },
        MOther: { type: String },
      },
    },
  ],
  Family_Cancer_History: [
    {
      Breast_cancer: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Colon_rectal_colorectal_cancer: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Female_reproductive_cancer: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Liver_cancer: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Lung_cancer: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },

      Pancreatic_cancer: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Prostate_cancer: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },

      Skin_cancer: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
    },
  ],
  Reproductive_history: [
    {
      Polycystic_ovarian_syndrome: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },

      Endometriosis: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Problems_falling_pregnant: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Past_miscarriages: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Currently_pregnant: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Menopausal: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Post_menopausal: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
    },
  ],
});

module.exports = user = mongoose.model("user", user);
