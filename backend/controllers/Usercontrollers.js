const HttpError = require('../models/http-error');
const User =require('../schema/UserSchema.js');



const getallusers = async (req, res, next) => {
    //i want to get all users in database
    try {
        users = await User.find();
    } catch (err) {
        const error = new HttpError('Fetching users failed, please try again later.', 500);
        return next(error);
    }
    res.json({ users: users.map(user => user.toObject({ getters: true })) });
}




export.getallusers = getallusers;
