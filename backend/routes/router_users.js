
const express = require('express');
const HttpError = require('../models/http-error')
const Usercontrollers = require('../controllers/Usercontrollers')

const userrouter = express.Router();

userrouter.get("/".Usercontrollers.getUsers)
userrouter.get("/:uid".Usercontrollers.getUserById)
userrouter.post("/".Usercontrollers.createUser)
userrouter.patch("/:uid".Usercontrollers.updateUser)
userrouter.delete("/:uid".Usercontrollers.deleteUser)


module.exports = userrouter;



module.exports = router;