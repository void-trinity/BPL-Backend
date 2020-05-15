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
    var { fullname, username, email, gender } = user;

    var newUser = new User({
        username,
        fullname,
        email,
        gender
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

module.exports = {
    getAllUsers,
    addUser
}