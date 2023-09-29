const express = require('express');
const HttpError = require('../models/http-error')
const Usercontrollers = require('../controllers/Usercontrollers')

const userrouter = express.Router();

userrouter.get("/".Usercontrollers.getUsers)

export default userrouter;