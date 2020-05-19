const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.Promise = global.Promise;
const SALT_WORK_FACTOR = 10;

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
    },
    password: {
        type: String,
        required: true,
    },
    totalGames: {
        type: Number,
        default: 0,
    },
    dateofbirth: {
        type: Date,
        default: Date.now,
        required: true
    }
});

userSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


const User = mongoose.model('User', userSchema);

module.exports = User;
