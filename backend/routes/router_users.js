
const express = require('express');
const HttpError = require('../models/http-error')
const Usercontrollers = require('../controllers/Usercontrollers')

const userrouter = express.Router();

userrouter.get("/get-user", async() => {
    Usercontrollers.getallusers();
});

/*userrouter.get("/get-user", async(req, res, next) => {
    try {
        users = await User.find();
    } catch (err) {
        const error = new HttpError('Fetching users failed, please try again later.', 500);
        return next(error);
    }
    res.json({ users: users.map(user => user.toObject({ getters: true })) });
} )*/

module.exports = userrouter;