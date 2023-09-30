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

const createuser = async (req, res, next) => {
    const { name, email, password } = req.body;

    const createdUser = new User({
        name,
        email,
        password
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again later.', 500);
        return next(error);
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
}


const updateuser = async (req, res, next) => {
    const { name, email, password } = req.body;
    const userId = req.params.uid;

    try {
        // Assuming you are using mongoose
        let user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user details
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = password;  // Consider hashing the password
        }

        // Save the updated user back to the database
        await user.save();

        // Return the updated user (or any appropriate response)
        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


/* const updateuserbyid = async (req, res, next) => {
    const userId = req.params.uid;
    const { name, email, password } = req.body;

    try {
        // Find user by ID and update
        const user = await UserModel.findByIdAndUpdate(
            userId,
            { name, email, password },
            { new: true, runValidators: true }
        );

        // If no user was found, return a 404
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return updated user data
        res.json({ message: 'User successfully updated', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}; */


const deleteuser = async (req, res, next) => {
    const userId = req.params.uid;

    try {
        // Find the user by ID and delete
        const user = await UserModel.findByIdAndDelete(userId);

        // If no user was found, return a 404
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return a success message or any other appropriate response
        res.json({ message: 'User successfully deleted' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const updateuserbyid = async (req, res, next) => {
    const userId = req.params.uid;
    const { name, email, password } = req.body;

    try {
        // Find user by ID and update
        const user = await UserModel.findByIdAndUpdate(
            userId,
            { name, email, password },
            { new: true, runValidators: true }
        );

        // If no user was found, return a 404
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return updated user data
        res.json({ message: 'User successfully updated', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};







exports.getallusers = getallusers;
exports.getuserbyid = getuserbyid;
exports.deleteuser = deleteuser;
exports.createdUser = createuser;
exports.updateuser = updateuser;