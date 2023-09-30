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

const getuserbyid = async (req, res, next) => {
    const teacherid = req.params.tid;

    let user
    try {
        user = await User.findById(teacherid);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a teacher.', 500); //500 is for server error
        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find a teacher for the provided id.', 404); //404 is for resource not found
        return next(error);
    }

    res.json({ user: user.toObject({ getters: true })});  
}






exports.getallusers = getallusers;
exports.getuserbyid = getuserbyid;
