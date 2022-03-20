const mongoose = require("mongoose");

adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = Admin = mongoose.model("admincollection", adminSchema);
