const express = require("express");
const Admin = require("../models/AdminModel");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const bcrypt = require("bcryptjs");
const router = express.Router();
var SECRET_KEY = "AZyWmZ1456@TOOP";

router.post("/api/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const admin = await Admin.findOne({ email: email });
    console.log("eeee", admin);
    if (admin) {
      bcrypt
        .compare(password, admin.password)
        .then(async (match) => {
          if (!match) throw new createError(403, "Password is not correct");
          const accesToken = jwt.sign(
            { id: admin.id, email: admin.email },
            SECRET_KEY,
            {
              expiresIn: "2h",
            }
          );
          return res
            .status(200)
            .json({ message: "Welcome Admin!", accesToken });
        })
        .catch((error) => {
          console.error(error);
          next(error);
        });
    } else {
      throw new createError(404, "Email not found");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/api/hash", async (req, res, next) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  try {
    const hash = bcrypt.hashSync(password, salt);
    res.status(201).json({ hash });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
/*
VerifToken = (req, res, next) => {
  let token = req.header.authorization;
  if (!token) {
    res.status(400).json({ msg: "acces reject" });
  }
  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

app.post("/logout", function (req, res) {
  res.session.destroy(() => {
    res.redirect("/login");
  });
});
*/
module.exports = router;
