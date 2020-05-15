const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    totalScore: {
        type: Number,
        default: 0,
    },
    gender: {
        required: true,
        type: String,
        enum: ['M', 'F']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
