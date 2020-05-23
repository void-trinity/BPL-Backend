const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    totalGames: {
        type: Number,
        default: 0,
    },
    username: {
        type: String,
        unique: true,
    },
    avatar: {
        type: Number,
        default: 1,
        min: 1,
        max: 80
    },
    notificationID: {
        type: String,
        unique: true
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
