const User = require('../models/user');

const { generate_jwt } = require('./jwt');

const getLeaderboard = (req, res, next) => {
    User.find({}).sort([['totalScore', 'descending'], ['totalGames', 'ascending'], ['dateofbirth', 'ascending']])
        .then((data) => {
            var result = data.map((item, index) => {
                return {
                    username: item.username,
                    totalScore: item.totalScore,
                    totalGames: item.totalGames,
                    rank: index + 1,
                }
            });
            res.status(200).json({
                success: true,
                data: result
            })
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                data: 'Something went wrong, we\'ll be back soon' 
            });
        });
}


const addUser = (req, res, next) => {
    if (req.body && req.body.user) {
        var { fullname, username, email, gender, password } = req.body.user;
        var newUser = new User({
            username,
            fullname,
            email,
            gender,
            password
        });

        newUser.save()
            .then(() => {
                res.status(200).json({
                    success: true,
                    data: newUser
                });
            })
            .catch((error) => {
                res.status(400).json({
                    success: false,
                    data: 'Something went wrong, we\'ll be back soon'
                })
            });
    } else {
        res.status(404).json({
            success: false,
            data: 'Data not found'
        })
    }
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
            const token = generate_jwt(user);
            res.status(200).json({
                success: true,
                data: 'User authenticated',
                token
            });
        });
    });
}

module.exports = {
    getLeaderboard,
    addUser,
    login
}