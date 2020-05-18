const User = require('../models/user');

const getAllUsers = async () => {
    var result = await User.find({}).sort('name')
        .then((data) => {
            return { success: true, data }
        })
        .catch((error) => {
            return { success: false, data: error }
        });

    return result;
}


const addUser = async (user) => {
    var { fullname, username, email, gender, password } = user;

    var newUser = new User({
        username,
        fullname,
        email,
        gender,
        password
    });

    var result = await newUser.save()
        .then(() => {
            return { success: true, data: newUser }
        })
        .catch((error) => {
            return {success: false, data: error }
        });

    return result;
}

const login = async (req, res, next) => {
    const { username, password } = req.body.user;

    User.findOne({ username }, (error, user) => {
        if (error) {
            res.status(400).json({
                success: false,
                data: 'Something went wrong',
            });
            return;
        }
        if (user == null) {
            console.log(user);
            res.status(404).json({
                success: false,
                data: 'User not found'
            });
            return;
        }
        return user.comparePassword(password, (error, isMatch) => {
            if (error) {
                res.status(400).json({
                    success: false,
                    data: 'Something went wrong',
                });
                return;
            }
            if (!isMatch) {
                res.status(404).json({
                    success: false,
                    data: 'Wrong Credentials'
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: 'User authenticated'
            });
        });
    });
}

module.exports = {
    getAllUsers,
    addUser,
    login
}