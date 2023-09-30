// const express = require('express');
// const HttpError = require('../models/http-error')
// const Usercontrollers = require('../controllers/Usercontrollers')

// const userrouter = express.Router();

// userrouter.get("/".Usercontrollers.getUsers)

// module.exports = userrouter;

const router = require("express").Router();
let User = require("../schema/UserSchema");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  const interests = req.body.interests;

  const newUser = new User({ 
    firstname,
    lastname,
    email,
    phoneNumber,
    password,
    interests
  });

  newUser.save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
