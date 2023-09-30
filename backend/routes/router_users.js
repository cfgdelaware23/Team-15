
// const express = require('express');
// const HttpError = require('../models/http-error')
// const Usercontrollers = require('../controllers/Usercontrollers')

// const userrouter = express.Router();

// userrouter.get("/".Usercontrollers.getUsers)

// module.exports = userrouter;

const router = require('express').Router();
let User = require('../schema/UserSchema');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json("User added!"))
        .catch(err => res.status(400).json('Error: ' + err))
});


module.exports = router;