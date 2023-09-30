const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, required: true},
    phoneNumber: {type: String, required: true},
    password: { type: String, required: true},
    phoneNumber: { type: String, required: true},
    //array 
    interests: { type: String, required: true}, //double check if this is an array or string
});


module.exports = mongoose.model('User', userSchema) //