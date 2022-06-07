const express = require("express");
const session = require("express-session");

const app = express.Router();

// Model Imports
const userModel = require("../database/models/users");

app.route("/user").post(async (req, res) => {
  let userObj = {
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
  };

  // Check for if user already exists :)
  let check = await checkUser({ userName: userObj.userName });
  // console.log("check: ", check);
  if (check.length) {
    // console.log("user already exists :)");
    res.status(400).json({ err: "user already exists" });
    return;
  }

  await saveUser(userObj);

  res.status(200).json({ mssg: "user saved" });
});

app.route("/signin").post(async (req, res) => {
  let userObj = req.body;
  let trueUser = await checkUser(userObj);

  if (!trueUser.length) {
    res.status(400).json({ err: "Wrong Credentials" });
    return;
  }
  req.session.isLoggedIn = true;
  req.session.userName = trueUser[0].userName;
  req.session.userMail = trueUser[0].email;
  req.session.userId = trueUser[0]._id;
  // console.log("session obj: ", req.session);
  res.status(200).json({ mssg: "Login success", token: req.session || null });
});

app.route("/signout").get(async (req, res) => {
  req.session.destroy();
  res.status(200).json({ mssg: "logged Out" });
});

// Functions

function checkUser(condition) {
  return userModel.find(condition);
}

function saveUser(userObj) {
  return userModel.create(userObj);
}

function fakeCaller(callback) {
  return new Promise(function (res, rej) {
    callback(res, rej);
  });
}

module.exports = app;